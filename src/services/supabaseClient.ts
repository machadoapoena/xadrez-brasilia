import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://uczqrewiacyziyoufvmw.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_88wwasyo-5gVcEXAI-SnlA_lqJeLi1i';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
