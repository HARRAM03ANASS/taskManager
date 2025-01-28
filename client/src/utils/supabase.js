// import { createClient } from "@supabase/supabase-js";
// // import dotenv from 'dotenv';

// const supabaseUrl = process.env.VITE_APP_SUPABASE_URL;
// const supabaseKey = process.env.VITE_APP_SUPABASE_ANON_KEY;

// export const supabase = createClient(supabaseUrl, supabaseKey);





// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://rpeeeghwhbjviythnbet.supabase.co';
// const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwZWVlZ2h3aGJqdml5dGhuYmV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcxMDY5NDMsImV4cCI6MjA1MjY4Mjk0M30.KBqaJNHjoNp-voYLhNVb5g0wcfPOJEEQgPlEuwWVOys';

// if (!supabaseUrl || !supabaseAnonKey) {
//   throw new Error("Supabase environment variables are not set.");
// }

// const supabase = createClient(supabaseUrl, supabaseAnonKey);
// export default supabase;