import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://brebcyfwyqlefbbaussq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJyZWJjeWZ3eXFsZWZiYmF1c3NxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1MzMyNDgsImV4cCI6MjA2MzEwOTI0OH0.WEBzldKxCK4jIGauV3YzlP7BI_h-vdlI9stKwd5Q8eE';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;