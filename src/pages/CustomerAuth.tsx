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

const CustomerAuth = () => {
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
      // Check if user is customer and redirect to dashboard
      checkUserRole();
    }
  }, [user, navigate]);

  const checkUserRole = async () => {
    if (!user) return;
    
    try {
      const { data: customer } = await supabase
        .from('customers')
        .select('id')
        .eq('user_id', user.id)
        .single();
      
      if (customer) {
        navigate('/dashboard');
      } else {
        navigate('/');
      }
    } catch (error) {
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
              description: 'Please check your email and password. If you don\'t have an account, please contact our team to set one up.',
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
          checkUserRole();
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
          } else {
            toast({
              title: 'Sign up error',
              description: error.message,
              variant: 'destructive',
            });
          }
        } else {
          // Create customer profile after successful signup
          await createCustomerProfile();
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

  const createCustomerProfile = async () => {
    try {
      const { data: authData } = await supabase.auth.getUser();
      if (!authData.user) return;

      // Create customer record
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
        .select()
        .single();

      if (customerError) {
        console.error('Error creating customer profile:', customerError);
        return;
      }

      // Update profile to customer role
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ role: 'customer' })
        .eq('user_id', authData.user.id);

      if (profileError) {
        console.error('Error updating profile role:', profileError);
      }

      // Send Discord notification with customer ID for interactive buttons
      try {
        await supabase.functions.invoke('send-discord-notification', {
          body: {
            eventType: 'signup',
            data: {
              name: fullName,
              email: email,
              company: company || null,
              planName: 'Basic',
              customerId: customerData.id
            }
          }
        });
      } catch (discordError) {
        console.error('Failed to send Discord notification:', discordError);
      }
    } catch (error) {
      console.error('Error in createCustomerProfile:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Back to home link */}
        <Link 
          to="/" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to home
        </Link>

        <Card className="border-border/50 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              {isLogin ? 'Customer Portal' : 'Request Access'}
            </CardTitle>
            <CardDescription className="text-center">
              {isLogin 
                ? 'Sign in to access your customer dashboard' 
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
                        required={!isLogin}
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
                  Don't have login credentials? Please contact our team.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomerAuth;