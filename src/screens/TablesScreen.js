/**
 * TablesScreen Component
 * Displays tables in a grid with status-based color coding
 * free → green, occupied → red, reserved → yellow
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
import { fetchTables, updateTableStatus } from '../services/supabase';
import TopBar from '../components/TopBar';
import TableCard from '../components/TableCard';

const TablesScreen = ({ navigation }) => {
  // State
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // Fetch tables on mount
  useEffect(() => {
    loadTables();
  }, []);

  /**
   * Load tables from Supabase
   */
  const loadTables = async () => {
    try {
      setError(null);
      const data = await fetchTables();
      setTables(data);
    } catch (err) {
      setError('Failed to load tables');
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
    await loadTables();
    setRefreshing(false);
  }, []);

  /**
   * Handle table press - show status options
   */
  const handleTablePress = (table) => {
    Alert.alert(
      table.name,
      `Current status: ${table.status}`,
      [
        { text: 'Set Free', onPress: () => changeTableStatus(table.id, 'free') },
        { text: 'Set Occupied', onPress: () => changeTableStatus(table.id, 'occupied') },
        { text: 'Set Reserved', onPress: () => changeTableStatus(table.id, 'reserved') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  /**
   * Change table status
   */
  const changeTableStatus = async (tableId, newStatus) => {
    const success = await updateTableStatus(tableId, newStatus);
    if (success) {
      // Update local state
      setTables((prev) =>
        prev.map((t) =>
          t.id === tableId ? { ...t, status: newStatus } : t
        )
      );
    } else {
      Alert.alert('Error', 'Failed to update table status');
    }
  };

  /**
   * Handle profile press
   */
  const handleProfilePress = () => {
    navigation.navigate('Settings');
  };

  /**
   * Render table item
   */
  const renderTableItem = ({ item }) => (
    <TableCard table={item} onPress={handleTablePress} />
  );

  /**
   * Render empty state
   */
  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>🪑</Text>
      <Text style={styles.emptyTitle}>No Tables</Text>
      <Text style={styles.emptyText}>
        Add tables in your Supabase dashboard
      </Text>
    </View>
  );

  // Loading state
  if (loading) {
    return (
      <View style={styles.container}>
        <TopBar title="Tables" onProfilePress={handleProfilePress} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading tables...</Text>
        </View>
      </View>
    );
  }

  // Error state
  if (error && tables.length === 0) {
    return (
      <View style={styles.container}>
        <TopBar title="Tables" onProfilePress={handleProfilePress} />
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
      <TopBar title="Tables" onProfilePress={handleProfilePress} />

      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: colors.tableFree }]} />
          <Text style={styles.legendText}>Free</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: colors.tableOccupied }]} />
          <Text style={styles.legendText}>Occupied</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: colors.tableReserved }]} />
          <Text style={styles.legendText}>Reserved</Text>
        </View>
      </View>

      {/* Tables Grid */}
      <FlatList
        data={tables}
        renderItem={renderTableItem}
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
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.lg,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: spacing.sm,
  },
  legendText: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
  },
  listContent: {
    padding: spacing.sm,
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

export default TablesScreen;

