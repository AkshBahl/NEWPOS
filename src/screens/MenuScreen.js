/**
 * MenuScreen Component
 * Displays menu items in a 2-column grid layout
 * Includes search functionality
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
import { fetchMenuItems } from '../services/supabase';
import TopBar from '../components/TopBar';
import SearchBar from '../components/SearchBar';
import MenuCard from '../components/MenuCard';

const MenuScreen = ({ navigation }) => {
  // State
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);

  // Fetch menu items on mount
  useEffect(() => {
    loadMenuItems();
  }, []);

  // Filter items when search query changes
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredItems(menuItems);
    } else {
      const filtered = menuItems.filter(
        (item) =>
          item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  }, [searchQuery, menuItems]);

  /**
   * Load menu items from Supabase
   */
  const loadMenuItems = async () => {
    try {
      setError(null);
      const data = await fetchMenuItems();
      setMenuItems(data);
      setFilteredItems(data);
    } catch (err) {
      setError('Failed to load menu items');
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
    await loadMenuItems();
    setRefreshing(false);
  }, []);

  /**
   * Handle add to order
   */
  const handleAddToOrder = (item) => {
    Alert.alert(
      'Added to Order',
      `${item.name} has been added to your order.`,
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
   * Render menu item
   */
  const renderMenuItem = ({ item }) => (
    <MenuCard item={item} onAddToOrder={handleAddToOrder} />
  );

  /**
   * Render empty state
   */
  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>🍽️</Text>
      <Text style={styles.emptyTitle}>No Menu Items</Text>
      <Text style={styles.emptyText}>
        {searchQuery
          ? 'No items match your search'
          : 'Add menu items in your Supabase dashboard'}
      </Text>
    </View>
  );

  // Loading state
  if (loading) {
    return (
      <View style={styles.container}>
        <TopBar title="Menu" onProfilePress={handleProfilePress} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading menu...</Text>
        </View>
      </View>
    );
  }

  // Error state
  if (error && menuItems.length === 0) {
    return (
      <View style={styles.container}>
        <TopBar title="Menu" onProfilePress={handleProfilePress} />
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
      <TopBar title="Menu" onProfilePress={handleProfilePress} />

      {/* Search Bar */}
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search menu items..."
        onClear={handleClearSearch}
      />

      {/* Menu Grid */}
      <FlatList
        data={filteredItems}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.id?.toString()}
        numColumns={2}
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
  listContent: {
    paddingHorizontal: spacing.sm,
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

export default MenuScreen;

