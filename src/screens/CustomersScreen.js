/**
 * CustomersScreen Component
 * Displays customers with search functionality
 */
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
  Alert,
  RefreshControl,
} from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';
import { fetchCustomers } from '../services/supabase';
import TopBar from '../components/TopBar';
import SearchBar from '../components/SearchBar';
import CustomerItem from '../components/CustomerItem';

const CustomersScreen = ({ navigation }) => {
  // State
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);

  // Fetch customers on mount
  useEffect(() => {
    loadCustomers();
  }, []);

  // Filter customers when search query changes
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredCustomers(customers);
    } else {
      const filtered = customers.filter(
        (customer) =>
          customer.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          customer.phone?.includes(searchQuery)
      );
      setFilteredCustomers(filtered);
    }
  }, [searchQuery, customers]);

  /**
   * Load customers from Supabase
   */
  const loadCustomers = async () => {
    try {
      setError(null);
      const data = await fetchCustomers();
      setCustomers(data);
      setFilteredCustomers(data);
    } catch (err) {
      setError('Failed to load customers');
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
    await loadCustomers();
    setRefreshing(false);
  }, []);

  /**
   * Handle customer press
   */
  const handleCustomerPress = (customer) => {
    Alert.alert(
      customer.name,
      `Phone: ${customer.phone}\nLoyalty Points: ${customer.loyalty_points || 0}`,
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
   * Clear search
   */
  const handleClearSearch = () => {
    setSearchQuery('');
  };

  /**
   * Render customer item
   */
  const renderCustomerItem = ({ item }) => (
    <CustomerItem customer={item} onPress={handleCustomerPress} />
  );

  /**
   * Render empty state
   */
  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>👥</Text>
      <Text style={styles.emptyTitle}>No Customers</Text>
      <Text style={styles.emptyText}>
        {searchQuery
          ? 'No customers match your search'
          : 'Add customers in your Supabase dashboard'}
      </Text>
    </View>
  );

  // Loading state
  if (loading) {
    return (
      <View style={styles.container}>
        <TopBar title="Customers" onProfilePress={handleProfilePress} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading customers...</Text>
        </View>
      </View>
    );
  }

  // Error state
  if (error && customers.length === 0) {
    return (
      <View style={styles.container}>
        <TopBar title="Customers" onProfilePress={handleProfilePress} />
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
      <TopBar title="Customers" onProfilePress={handleProfilePress} />

      {/* Search Bar */}
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search customers..."
        onClear={handleClearSearch}
      />

      {/* Customer Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{customers.length}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>
            {customers.reduce((sum, c) => sum + (c.loyalty_points || 0), 0)}
          </Text>
          <Text style={styles.statLabel}>Total Points</Text>
        </View>
      </View>

      {/* Customers List */}
      <FlatList
        data={filteredCustomers}
        renderItem={renderCustomerItem}
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  statItem: {
    alignItems: 'center',
    paddingHorizontal: spacing.xxxl,
  },
  statValue: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.primary,
  },
  statLabel: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    marginTop: spacing.xs,
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

export default CustomersScreen;

