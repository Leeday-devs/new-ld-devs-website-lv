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
import { User, Mail, Phone, Building, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const customerInfoSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  company: z.string().optional(),
});

type CustomerInfo = z.infer<typeof customerInfoSchema>;

interface CustomerInfoFormProps {
  onSubmit: (customerInfo: CustomerInfo) => void;
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
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          I need a few details to get started with your {serviceName.toLowerCase()}
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
              <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">
                Secure checkout powered by Stripe
              </p>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};