-- Add customer information fields to the orders table
ALTER TABLE public.orders 
ADD COLUMN customer_name TEXT,
ADD COLUMN customer_email TEXT,
ADD COLUMN customer_phone TEXT,
ADD COLUMN customer_company TEXT;