-- Create request_access table for storing access request form submissions
-- Run this in your Supabase SQL Editor

-- Create the request_access table
CREATE TABLE IF NOT EXISTS public.request_access (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Drop existing constraints if they exist
ALTER TABLE public.request_access DROP CONSTRAINT IF EXISTS valid_email;
ALTER TABLE public.request_access DROP CONSTRAINT IF EXISTS valid_status;

-- Add email validation constraint
ALTER TABLE public.request_access 
ADD CONSTRAINT valid_email 
CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

-- Add status constraint to ensure valid status values
ALTER TABLE public.request_access 
ADD CONSTRAINT valid_status 
CHECK (status IN ('pending', 'approved', 'rejected', 'reviewed'));

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_request_access_email ON public.request_access(email);
CREATE INDEX IF NOT EXISTS idx_request_access_submitted_at ON public.request_access(submitted_at);
CREATE INDEX IF NOT EXISTS idx_request_access_status ON public.request_access(status);

-- Create function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_request_access_updated_at ON public.request_access;
CREATE TRIGGER update_request_access_updated_at
    BEFORE UPDATE ON public.request_access
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE public.request_access ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can submit access requests" ON public.request_access;
DROP POLICY IF EXISTS "Authenticated users can view access requests" ON public.request_access;
DROP POLICY IF EXISTS "Allow anonymous insert" ON public.request_access;
DROP POLICY IF EXISTS "Allow anonymous select for email check" ON public.request_access;
DROP POLICY IF EXISTS "Allow authenticated select" ON public.request_access;

-- Create policy to allow INSERT for anonymous users (for form submissions)
CREATE POLICY "Allow anonymous insert" ON public.request_access
    FOR INSERT TO anon WITH CHECK (true);

-- Create policy to allow SELECT for anonymous users (for duplicate email checking)
CREATE POLICY "Allow anonymous select for email check" ON public.request_access
    FOR SELECT TO anon USING (true);

-- Create policy to allow SELECT for authenticated users (for admin review)
CREATE POLICY "Allow authenticated select" ON public.request_access
    FOR SELECT TO authenticated USING (true);

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon;
GRANT INSERT ON public.request_access TO anon;
GRANT SELECT ON public.request_access TO anon;
GRANT SELECT ON public.request_access TO authenticated;

