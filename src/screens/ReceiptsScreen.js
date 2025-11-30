/**
 * ReceiptsScreen Component
 * Displays receipts with download functionality
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
import { fetchReceipts } from '../services/supabase';
import TopBar from '../components/TopBar';
import ReceiptItem from '../components/ReceiptItem';

const ReceiptsScreen = ({ navigation }) => {
  // State
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // Fetch receipts on mount
  useEffect(() => {
    loadReceipts();
  }, []);

  /**
   * Load receipts from Supabase
   */
  const loadReceipts = async () => {
    try {
      setError(null);
      const data = await fetchReceipts();
      setReceipts(data);
    } catch (err) {
      setError('Failed to load receipts');
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
    await loadReceipts();
    setRefreshing(false);
  }, []);

  /**
   * Handle receipt press
   */
  const handleReceiptPress = (receipt) => {
    Alert.alert(
      `Receipt #${receipt.id}`,
      `Amount: $${receipt.amount?.toFixed(2)}\nDate: ${new Date(receipt.created_at).toLocaleString()}`,
      [{ text: 'OK' }]
    );
  };

  /**
   * Handle download press (static - just shows alert)
   */
  const handleDownload = (receipt) => {
    Alert.alert(
      'Download Receipt',
      `Receipt #${receipt.id} download initiated.`,
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
   * Calculate total receipts amount
   */
  const getTotalAmount = () => {
    return receipts.reduce((sum, r) => sum + (r.amount || 0), 0);
  };

  /**
   * Render receipt item
   */
  const renderReceiptItem = ({ item }) => (
    <ReceiptItem
      receipt={item}
      onPress={handleReceiptPress}
      onDownload={handleDownload}
    />
  );

  /**
   * Render empty state
   */
  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>🧾</Text>
      <Text style={styles.emptyTitle}>No Receipts</Text>
      <Text style={styles.emptyText}>
        Receipts will appear here after orders are completed
      </Text>
    </View>
  );

  // Loading state
  if (loading) {
    return (
      <View style={styles.container}>
        <TopBar title="Receipts" onProfilePress={handleProfilePress} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading receipts...</Text>
        </View>
      </View>
    );
  }

  // Error state
  if (error && receipts.length === 0) {
    return (
      <View style={styles.container}>
        <TopBar title="Receipts" onProfilePress={handleProfilePress} />
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
      <TopBar title="Receipts" onProfilePress={handleProfilePress} />

      {/* Summary Stats */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>{receipts.length}</Text>
          <Text style={styles.summaryLabel}>Total Receipts</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>${getTotalAmount().toFixed(2)}</Text>
          <Text style={styles.summaryLabel}>Total Revenue</Text>
        </View>
      </View>

      {/* Receipts List */}
      <FlatList
        data={receipts}
        renderItem={renderReceiptItem}
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
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.lg,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  summaryItem: {
    alignItems: 'center',
    paddingHorizontal: spacing.xxl,
  },
  summaryValue: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.primary,
  },
  summaryLabel: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  summaryDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.border,
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

export default ReceiptsScreen;

