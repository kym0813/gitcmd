import { createClient } from '@supabase/supabase-js';

export const SUPABASE_URL = 'https://sxgotnjypgtsfkchzrfh.supabase.co';
export const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_s4Lcqz5Y2lWgLaSmPM7gHg_PMF4nk-V';
export const ADMIN_EMAIL = 'wingkym@nate.com';

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});
