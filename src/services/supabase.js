/**
 * Supabase Client Configuration
 * 
 * IMPORTANT: Replace the placeholder values below with your actual Supabase credentials
 * You can find these in your Supabase project dashboard:
 * Settings -> API -> Project URL and anon/public key
 */
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

// Supabase project URL - Get from Settings -> API in Supabase dashboard
const SUPABASE_URL = 'https://knxwqksgfjkgfyadadce.supabase.co';

// Supabase anon/public key - Get from Settings -> API in Supabase dashboard  
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtueHdxa3NnZmprZ2Z5YWRhZGNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzMzIxMDEsImV4cCI6MjA3OTkwODEwMX0.oRlgcG1vNiAfGruTDHiKuzQaedKsV49eYh9YRAd90b0';

console.log('Supabase URL:', SUPABASE_URL);

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
 * Falls back to default '1234' if table doesn't exist
 * @returns {Promise<string>} The passcode
 */
export const fetchPasscode = async () => {
  try {
    const { data, error } = await supabase
      .from(TABLES.SETTINGS)
      .select('value')
      .eq('key', 'passcode')
      .single();

    if (error) {
      // Table doesn't exist or other error - use default
      console.log('Using default passcode (settings table not found)');
      return '1234';
    }
    return data?.value || '1234';
  } catch (error) {
    console.log('Using default passcode');
    return '1234';
  }
};

/**
 * Fetch all menu items
 * @returns {Promise<Array>} Array of menu items
 */
export const fetchMenuItems = async () => {
  try {
    console.log('Fetching menu items from Supabase...');
    const { data, error } = await supabase
      .from(TABLES.MENU_ITEMS)
      .select('*');

    console.log('Menu items response:', { data, error });

    if (error) {
      console.log('Menu items error:', error.message);
      return [];
    }
    console.log('Menu items fetched:', data?.length || 0, 'items');
    return data || [];
  } catch (error) {
    console.log('Error fetching menu items:', error);
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
      .select('*');

    if (error) {
      console.log('Tables table not found or error:', error.message);
      return [];
    }
    return data || [];
  } catch (error) {
    console.log('Error fetching tables:', error);
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
      query = query.ilike('status', status);
    }

    const { data, error } = await query;

    if (error) {
      console.log('Orders table not found or error:', error.message);
      return [];
    }
    return data || [];
  } catch (error) {
    console.log('Error fetching orders:', error);
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
      .select('*');

    if (error) {
      console.log('Customers table not found or error:', error.message);
      return [];
    }
    return data || [];
  } catch (error) {
    console.log('Error fetching customers:', error);
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

    if (error) {
      console.log('Receipts table not found or error:', error.message);
      return [];
    }
    return data || [];
  } catch (error) {
    console.log('Error fetching receipts:', error);
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

