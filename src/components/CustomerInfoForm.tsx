import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { User, Mail, Phone, Building, ArrowRight, Globe, Target, Clock, Lock, Shield } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const customerInfoSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  company: z.string().optional(),
  websiteUrl: z.string().optional(),
  projectGoals: z.string().min(1, "Please select your project goals"),
  timeline: z.string().min(1, "Please select your preferred timeline"),
  addHosting: z.boolean().default(false),
});

type CustomerInfo = z.infer<typeof customerInfoSchema>;

interface CustomerInfoFormProps {
  onSubmit: (customerInfo: CustomerInfo & { addHosting?: boolean }) => void;
  isLoading?: boolean;
  serviceName: string;
}

export const CustomerInfoForm = ({ onSubmit, isLoading, serviceName }: CustomerInfoFormProps) => {
  const form = useForm<CustomerInfo>({
    resolver: zodResolver(customerInfoSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      company: "",
      websiteUrl: "",
      projectGoals: "",
      timeline: "",
      addHosting: false,
    },
  });

  const handleSubmit = async (data: CustomerInfo) => {
    // Send Discord notification first
    try {
      const { error: discordError } = await supabase.functions.invoke('send-discord-notification', {
        body: {
          eventType: 'customer_info',
          data: {
            fullName: data.fullName,
            email: data.email,
            phone: data.phone,
            company: data.company || 'N/A',
            websiteUrl: data.websiteUrl || 'N/A',
            projectGoals: data.projectGoals,
            timeline: data.timeline,
            addHosting: data.addHosting,
            serviceName
          }
        }
      });

      if (discordError) {
        console.error('Discord notification failed:', discordError);
      }
    } catch (error) {
      console.error('Failed to send Discord notification:', error);
    }

    onSubmit(data);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-orange/10 to-orange/5 p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold flex items-center gap-3 text-gray-900 dark:text-white">
          <div className="p-2 bg-orange/20 rounded-lg">
            <User className="h-5 w-5 text-orange" />
          </div>
          Your Information
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
          Once you complete payment, we'll contact you within 24 hours to discuss your project details and next steps. You'll be working directly with our small team — no sales reps, no middlemen.
        </p>
      </div>
      
      <div className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-700 dark:text-gray-300">Full Name *</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-4 top-4 h-5 w-5 text-orange" />
                      <Input 
                        placeholder="Enter your full name" 
                        className="pl-12 h-12 border-2 border-gray-200 dark:border-gray-700 focus:border-orange transition-colors" 
                        {...field} 
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-700 dark:text-gray-300">Email Address *</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-4 top-4 h-5 w-5 text-orange" />
                      <Input 
                        type="email" 
                        placeholder="Enter your email address" 
                        className="pl-12 h-12 border-2 border-gray-200 dark:border-gray-700 focus:border-orange transition-colors" 
                        {...field} 
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-700 dark:text-gray-300">Phone Number *</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Phone className="absolute left-4 top-4 h-5 w-5 text-orange" />
                      <Input 
                        type="tel" 
                        placeholder="Enter your phone number" 
                        className="pl-12 h-12 border-2 border-gray-200 dark:border-gray-700 focus:border-orange transition-colors" 
                        {...field} 
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-700 dark:text-gray-300">Company Name (Optional)</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Building className="absolute left-4 top-4 h-5 w-5 text-orange" />
                      <Input 
                        placeholder="Enter your company name" 
                        className="pl-12 h-12 border-2 border-gray-200 dark:border-gray-700 focus:border-orange transition-colors" 
                        {...field} 
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="websiteUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-700 dark:text-gray-300">Website URL (Optional)</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Globe className="absolute left-4 top-4 h-5 w-5 text-orange" />
                      <Input 
                        placeholder="https://yourwebsite.com" 
                        className="pl-12 h-12 border-2 border-gray-200 dark:border-gray-700 focus:border-orange transition-colors" 
                        {...field} 
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="projectGoals"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-700 dark:text-gray-300">Project Goals *</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Target className="absolute left-4 top-4 h-5 w-5 text-orange z-10" />
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="pl-12 h-12 border-2 border-gray-200 dark:border-gray-700 focus:border-orange transition-colors">
                          <SelectValue placeholder="What's your main goal?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new-website">New Website</SelectItem>
                          <SelectItem value="redesign">Redesign</SelectItem>
                          <SelectItem value="ecommerce">E-commerce</SelectItem>
                          <SelectItem value="ai-tools">AI Tools</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="timeline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-700 dark:text-gray-300">Timeline *</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Clock className="absolute left-4 top-4 h-5 w-5 text-orange z-10" />
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="pl-12 h-12 border-2 border-gray-200 dark:border-gray-700 focus:border-orange transition-colors">
                          <SelectValue placeholder="When do you need this completed?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="asap">ASAP</SelectItem>
                          <SelectItem value="1-2-weeks">1–2 weeks</SelectItem>
                          <SelectItem value="1-month-plus">1 month+</SelectItem>
                          <SelectItem value="flexible">Flexible</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="addHosting"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-lg border-2 border-orange/20 p-4 bg-orange/5">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:bg-orange data-[state=checked]:border-orange"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Yes, add hosting & maintenance (£40/month, cancel anytime)
                    </FormLabel>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Includes domain, SSL, updates, backups, and ongoing support
                    </p>
                  </div>
                </FormItem>
              )}
            />

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-orange to-orange/80 hover:from-orange/90 hover:to-orange/70 text-white font-bold py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>Processing...</>
                ) : (
                  <>
                    Continue to Payment
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Lock className="h-4 w-4 text-green-600" />
                  SSL Secured Payment
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Shield className="h-4 w-4 text-green-600" />
                  30-day money-back guarantee on all plans
                </div>
                <p className="text-center text-xs text-gray-400 dark:text-gray-500">
                  Secure checkout powered by Stripe
                </p>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};