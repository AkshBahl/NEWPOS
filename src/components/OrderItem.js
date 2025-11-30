/**
 * OrderItem Component
 * Displays order with table number, total, status, and date
 * Used in Orders screen list
 */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';

const OrderItem = ({ order, onPress }) => {
  const { id, table_number, total, status, created_at } = order;

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Get status styling
  const getStatusStyle = () => {
    return status === 'paid'
      ? { backgroundColor: colors.success }
      : { backgroundColor: colors.warning };
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress?.(order)}
      activeOpacity={0.8}
    >
      {/* Left Section - Order Info */}
      <View style={styles.leftSection}>
        {/* Order ID */}
        <Text style={styles.orderId}>Order #{id}</Text>
        
        {/* Table Number */}
        <Text style={styles.tableNumber}>Table {table_number}</Text>
        
        {/* Date */}
        <Text style={styles.date}>{formatDate(created_at)}</Text>
      </View>
      
      {/* Right Section - Total & Status */}
      <View style={styles.rightSection}>
        {/* Total Amount */}
        <Text style={styles.total}>${total?.toFixed(2)}</Text>
        
        {/* Status Badge */}
        <View style={[styles.statusBadge, getStatusStyle()]}>
          <Text style={styles.statusText}>
            {status?.toUpperCase()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: spacing.borderRadius.lg,
    marginHorizontal: spacing.lg,
    marginVertical: spacing.sm,
    padding: spacing.lg,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  leftSection: {
    flex: 1,
  },
  orderId: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  tableNumber: {
    fontSize: typography.sizes.sm,
    color: colors.primary,
    fontWeight: typography.weights.medium,
    marginBottom: spacing.xs,
  },
  date: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  total: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  statusBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: spacing.borderRadius.round,
  },
  statusText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.semiBold,
    color: colors.white,
  },
});

export default OrderItem;

