import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://knxwqksgfjkgfyadadce.supabase.co'; // TODO: fill
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtueHdxa3NnZmprZ2Z5YWRhZGNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzMzIxMDEsImV4cCI6MjA3OTkwODEwMX0.oRlgcG1vNiAfGruTDHiKuzQaedKsV49eYh9YRAd90b0'; // TODO: fill

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: false },
});

// --- Example helpers ---

// Passcode is stored in table `app_config` with row { key: 'passcode', value: '1234' }
export async function validatePasscode(code: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('app_config')
      .select('value')
      .eq('key', 'passcode')
      .single();

    if (error || !data?.value) {
      // Fallback to local default if backend not configured
      return code === '1234';
    }
    return code === String(data.value);
  } catch (e) {
    console.warn('validatePasscode error', e);
    return code === '1234';
  }
}

// Dummy fetches – in real app these hit Supabase tables: menu_items, tables, orders, customers, receipts
export async function fetchMenuItems() {
  const { data, error } = await supabase.from('menu_items').select('*');
  if (error || !data) return [];
  return data;
}

