/**
 * Supabase Client Configuration
 * 
 * IMPORTANT: Replace the placeholder values below with your actual Supabase credentials
 * You can find these in your Supabase project dashboard:
 * Settings -> API -> Project URL and anon/public key
 */
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

// TODO: Replace with your Supabase project URL
const SUPABASE_URL = 'YOUR_SUPABASE_URL';

// TODO: Replace with your Supabase anon/public key
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

// Create and export the Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Database table names for reference
 */
export const TABLES = {
  SETTINGS: 'settings',
  MENU_ITEMS: 'menu_items',
  TABLES: 'tables',
  ORDERS: 'orders',
  CUSTOMERS: 'customers',
  RECEIPTS: 'receipts',
};

/**
 * Fetch passcode from settings table
 * @returns {Promise<string|null>} The passcode or null if not found
 */
export const fetchPasscode = async () => {
  try {
    const { data, error } = await supabase
      .from(TABLES.SETTINGS)
      .select('value')
      .eq('key', 'passcode')
      .single();

    if (error) throw error;
    return data?.value || null;
  } catch (error) {
    console.error('Error fetching passcode:', error);
    return null;
  }
};

/**
 * Fetch all menu items
 * @returns {Promise<Array>} Array of menu items
 */
export const fetchMenuItems = async () => {
  try {
    const { data, error } = await supabase
      .from(TABLES.MENU_ITEMS)
      .select('*')
      .order('category', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching menu items:', error);
    return [];
  }
};

/**
 * Fetch all tables
 * @returns {Promise<Array>} Array of tables
 */
export const fetchTables = async () => {
  try {
    const { data, error } = await supabase
      .from(TABLES.TABLES)
      .select('*')
      .order('name', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching tables:', error);
    return [];
  }
};

/**
 * Fetch all orders with optional status filter
 * @param {string|null} status - Filter by status ('paid', 'pending', or null for all)
 * @returns {Promise<Array>} Array of orders
 */
export const fetchOrders = async (status = null) => {
  try {
    let query = supabase
      .from(TABLES.ORDERS)
      .select('*')
      .order('created_at', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
};

/**
 * Fetch all customers
 * @returns {Promise<Array>} Array of customers
 */
export const fetchCustomers = async () => {
  try {
    const { data, error } = await supabase
      .from(TABLES.CUSTOMERS)
      .select('*')
      .order('name', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching customers:', error);
    return [];
  }
};

/**
 * Fetch all receipts
 * @returns {Promise<Array>} Array of receipts
 */
export const fetchReceipts = async () => {
  try {
    const { data, error } = await supabase
      .from(TABLES.RECEIPTS)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching receipts:', error);
    return [];
  }
};

/**
 * Update table status
 * @param {number} tableId - The table ID
 * @param {string} status - New status ('free', 'occupied', 'reserved')
 * @returns {Promise<boolean>} Success status
 */
export const updateTableStatus = async (tableId, status) => {
  try {
    const { error } = await supabase
      .from(TABLES.TABLES)
      .update({ status })
      .eq('id', tableId);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error updating table status:', error);
    return false;
  }
};

export default supabase;

