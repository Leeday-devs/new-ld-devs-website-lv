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

const customerInfoSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  company: z.string().optional(),
});

type CustomerInfo = z.infer<typeof customerInfoSchema>;

interface Service {
  title: string;
  description: string;
  features: string[];
  price: string;
  monthlyPrice: string;
  gradient: string;
  popular: boolean;
  pricingFeatures: string[];
  icon: any;
  isMonthlyOnly?: boolean;
}

interface CustomerInfoFormProps {
  onSubmit: (customerInfo: CustomerInfo) => void;
  isLoading?: boolean;
  service: Service;
}

export const CustomerInfoForm = ({ onSubmit, isLoading, service }: CustomerInfoFormProps) => {
  const form = useForm<CustomerInfo>({
    resolver: zodResolver(customerInfoSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      company: "",
    },
  });

  const handleSubmit = (data: CustomerInfo) => {
    onSubmit(data);
  };

  const isCustomPricing = service.price === "Custom";
  const isMonthlyOnly = service.isMonthlyOnly;

  return (
    <div className="space-y-6">
      {/* Service Summary Card */}
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <service.icon className="h-5 w-5 text-primary" />
            Order Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg">{service.title}</h3>
            <p className="text-sm text-muted-foreground">{service.description}</p>
          </div>
          
          {/* Pricing */}
          <div className="bg-background rounded-lg p-4 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">Service Price:</span>
              <span className="font-bold text-lg">
                {isCustomPricing ? "Custom Quote" : service.price}
              </span>
            </div>
            {!isMonthlyOnly && !isCustomPricing && (
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <span>Monthly option:</span>
                <span>{service.monthlyPrice}</span>
              </div>
            )}
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">Deposit Required:</span>
                <span className="font-bold text-primary">£20</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Fully refundable - deducted from final payment
              </p>
            </div>
          </div>

          {/* Key Features */}
          <div>
            <h4 className="font-medium mb-2">What's Included:</h4>
            <div className="grid grid-cols-1 gap-2">
              {service.pricingFeatures.slice(0, 3).map((feature, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
              {service.pricingFeatures.length > 3 && (
                <p className="text-xs text-muted-foreground">
                  + {service.pricingFeatures.length - 3} more features included
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customer Information Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Your Information
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            We need a few details to get started with your {service.title.toLowerCase()}
          </p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name *</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          placeholder="Enter your full name" 
                          className="pl-10" 
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
                    <FormLabel>Email Address *</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          type="email" 
                          placeholder="Enter your email address" 
                          className="pl-10" 
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
                    <FormLabel>Phone Number *</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          type="tel" 
                          placeholder="Enter your phone number" 
                          className="pl-10" 
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
                    <FormLabel>Company Name (Optional)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          placeholder="Enter your company name" 
                          className="pl-10" 
                          {...field} 
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>Processing...</>
                ) : (
                  <>
                    Continue to Payment
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};