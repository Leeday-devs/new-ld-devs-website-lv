import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, Mail, Lock, User, Building } from 'lucide-react';

const UnifiedAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      checkUserRoleAndRedirect();
    }
  }, [user, navigate]);

  const checkUserRoleAndRedirect = async () => {
    if (!user) return;
    
    console.log('Checking user role for user:', user.id);
    
    try {
      // Check if user is admin
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('user_id', user.id)
        .maybeSingle();

      console.log('Profile data:', profile, 'Profile error:', profileError);

      if (profile?.role === 'admin') {
        console.log('User is admin, redirecting to admin panel');
        navigate('/admin/panel');
        return;
      }

      // Check if user is customer
      const { data: customer, error: customerError } = await supabase
        .from('customers')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();
      
      console.log('Customer data:', customer, 'Customer error:', customerError);
      
      if (customer) {
        console.log('User is customer, redirecting to dashboard');
        navigate('/dashboard');
        return;
      }

      // If no specific role found, go to home
      console.log('No specific role found, redirecting to home');
      navigate('/');
    } catch (error) {
      console.error('Error checking user role:', error);
      navigate('/');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            toast({
              title: 'Invalid credentials',
              description: 'Please check your email and password.',
              variant: 'destructive',
            });
          } else {
            toast({
              title: 'Sign in error',
              description: error.message,
              variant: 'destructive',
            });
          }
        } else {
          toast({
            title: 'Welcome back!',
            description: 'You have been signed in successfully.',
          });
          checkUserRoleAndRedirect();
        }
      } else {
        const { error } = await signUp(email, password, fullName);
        if (error) {
          if (error.message.includes('User already registered')) {
            toast({
              title: 'Account exists',
              description: 'An account with this email already exists. Please sign in instead.',
              variant: 'destructive',
            });
          } else if (error.message.includes('Signups not allowed')) {
            toast({
              title: 'Registration unavailable',
              description: 'Account registration is currently disabled. Please contact support for assistance.',
              variant: 'destructive',
            });
          } else {
            toast({
              title: 'Sign up error',
              description: error.message,
              variant: 'destructive',
            });
          }
        } else {
          // Create customer profile after successful signup
          const customerId = await createCustomerProfile();
          console.log('Customer ID created:', customerId);
          
          // Send Discord notification for new customer signup with buttons
          if (customerId) {
            try {
              console.log('Sending Discord notification with data:', {
                eventType: 'signup',
                data: {
                  name: fullName,
                  email: email,
                  company: company || 'N/A',
                  customerId: customerId,
                  planName: 'Basic'
                }
              });
              await supabase.functions.invoke('send-discord-notification', {
                body: {
                  eventType: 'signup',
                  data: {
                    name: fullName,
                    email: email,
                    company: company || 'N/A',
                    customerId: customerId,
                    planName: 'Basic'
                  }
                }
              });
            } catch (error) {
              console.error('Failed to send Discord signup notification:', error);
            }
          } else {
            console.log('No customer ID found, not sending Discord notification');
          }
          
          toast({
            title: 'Account created!',
            description: 'Your account has been created successfully. You can now sign in.',
          });
          setIsLogin(true);
          setPassword('');
          setFullName('');
          setCompany('');
        }
      }
    } catch (error) {
      toast({
        title: 'An error occurred',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const createCustomerProfile = async (): Promise<string | null> => {
    try {
      const { data: authData } = await supabase.auth.getUser();
      if (!authData.user) return null;

      // Create customer record and get the ID
      const { data: customerData, error: customerError } = await supabase
        .from('customers')
        .insert({
          user_id: authData.user.id,
          name: fullName,
          email: email,
          company: company || null,
          plan_name: 'Basic',
          plan_price: 0,
          payment_amount: 0,
        })
        .select('id')
        .single();

      if (customerError) {
        console.error('Error creating customer profile:', customerError);
        return null;
      }

      // Create profile with customer role using the secure function
      const { error: profileError } = await supabase.rpc('create_user_profile', {
        user_id_param: authData.user.id,
        full_name_param: fullName,
        role_param: 'customer'
      });

      if (profileError) {
        console.error('Error creating user profile:', profileError);
      }

      return customerData?.id || null;
    } catch (error) {
      console.error('Error creating customer profile:', error);
      return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to home link */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <Card className="card-premium shadow-premium">
          <CardHeader className="text-center">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <img 
                src="/lovable-uploads/878b9662-eea5-4ca8-9c6d-9cff0126c5eb.png" 
                alt="Company Logo" 
                className="h-16 w-auto object-contain"
              />
            </div>
            <CardTitle className="text-2xl font-serif">
              {isLogin ? 'Welcome Back' : 'Request Access'}
            </CardTitle>
            <CardDescription>
              {isLogin 
                ? 'Sign in to access your dashboard' 
                : 'Request access to our customer portal'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="Enter your full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company">Company (Optional)</Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="company"
                        type="text"
                        placeholder="Enter your company name"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    minLength={6}
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full btn-premium"
                disabled={loading}
              >
                {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Request Access')}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                {isLogin ? "Need access to the portal?" : "Already have access?"}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="ml-1 font-medium text-primary hover:underline"
                >
                  {isLogin ? 'Request access' : 'Sign in'}
                </button>
              </p>
              
              {isLogin && (
                <p className="text-xs text-muted-foreground mt-2">
                  This portal serves both customers and administrators.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UnifiedAuth;