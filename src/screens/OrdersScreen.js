/**
 * OrdersScreen Component
 * Displays orders with filter buttons (All, Paid, Pending)
 */
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';
import { fetchOrders } from '../services/supabase';
import TopBar from '../components/TopBar';
import OrderItem from '../components/OrderItem';

// Filter options
const FILTERS = [
  { key: 'all', label: 'All', value: null },
  { key: 'paid', label: 'Paid', value: 'paid' },
  { key: 'pending', label: 'Pending', value: 'pending' },
];

const OrdersScreen = ({ navigation }) => {
  // State
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [error, setError] = useState(null);

  // Fetch orders on mount and when filter changes
  useEffect(() => {
    loadOrders();
  }, [activeFilter]);

  /**
   * Load orders from Supabase
   */
  const loadOrders = async () => {
    try {
      setError(null);
      const filter = FILTERS.find((f) => f.key === activeFilter);
      const data = await fetchOrders(filter?.value);
      setOrders(data);
    } catch (err) {
      setError('Failed to load orders');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle pull-to-refresh
   */
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadOrders();
    setRefreshing(false);
  }, [activeFilter]);

  /**
   * Handle order press
   */
  const handleOrderPress = (order) => {
    Alert.alert(
      `Order #${order.id}`,
      `Table: ${order.table_number}\nTotal: $${order.total?.toFixed(2)}\nStatus: ${order.status}`,
      [{ text: 'OK' }]
    );
  };

  /**
   * Handle profile press
   */
  const handleProfilePress = () => {
    navigation.navigate('Settings');
  };

  /**
   * Handle filter change
   */
  const handleFilterChange = (filterKey) => {
    setActiveFilter(filterKey);
    setLoading(true);
  };

  /**
   * Render filter buttons
   */
  const renderFilters = () => (
    <View style={styles.filterContainer}>
      {FILTERS.map((filter) => (
        <TouchableOpacity
          key={filter.key}
          style={[
            styles.filterButton,
            activeFilter === filter.key && styles.filterButtonActive,
          ]}
          onPress={() => handleFilterChange(filter.key)}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.filterText,
              activeFilter === filter.key && styles.filterTextActive,
            ]}
          >
            {filter.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  /**
   * Render order item
   */
  const renderOrderItem = ({ item }) => (
    <OrderItem order={item} onPress={handleOrderPress} />
  );

  /**
   * Render empty state
   */
  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>📋</Text>
      <Text style={styles.emptyTitle}>No Orders</Text>
      <Text style={styles.emptyText}>
        {activeFilter === 'all'
          ? 'Orders will appear here'
          : `No ${activeFilter} orders found`}
      </Text>
    </View>
  );

  // Loading state
  if (loading && orders.length === 0) {
    return (
      <View style={styles.container}>
        <TopBar title="Orders" onProfilePress={handleProfilePress} />
        {renderFilters()}
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading orders...</Text>
        </View>
      </View>
    );
  }

  // Error state
  if (error && orders.length === 0) {
    return (
      <View style={styles.container}>
        <TopBar title="Orders" onProfilePress={handleProfilePress} />
        {renderFilters()}
        <View style={styles.errorContainer}>
          <Text style={styles.errorIcon}>⚠️</Text>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <TopBar title="Orders" onProfilePress={handleProfilePress} />

      {/* Filter Buttons */}
      {renderFilters()}

      {/* Orders List */}
      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id?.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
        ListEmptyComponent={renderEmptyState}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: spacing.lg,
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xxl,
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: spacing.lg,
  },
  errorText: {
    fontSize: typography.sizes.md,
    color: colors.error,
    textAlign: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  filterButton: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
    marginHorizontal: spacing.xs,
    borderRadius: spacing.borderRadius.round,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.textSecondary,
  },
  filterTextActive: {
    color: colors.white,
  },
  listContent: {
    paddingVertical: spacing.md,
    paddingBottom: spacing.xxl,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: spacing.huge,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: spacing.lg,
  },
  emptyTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  emptyText: {
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: spacing.xxl,
  },
});

export default OrdersScreen;

