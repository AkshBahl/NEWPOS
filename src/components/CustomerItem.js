/**
 * CustomerItem Component
 * Displays customer info with name, phone, last order, and loyalty points
 * Used in Customers screen list
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

const CustomerItem = ({ customer, onPress }) => {
  const { name, phone, last_order_date, loyalty_points } = customer;

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'No orders yet';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Get initials for avatar
  const getInitials = (fullName) => {
    if (!fullName) return '?';
    const names = fullName.trim().split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return fullName.substring(0, 2).toUpperCase();
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress?.(customer)}
      activeOpacity={0.8}
    >
      {/* Avatar */}
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{getInitials(name)}</Text>
      </View>
      
      {/* Customer Info */}
      <View style={styles.info}>
        {/* Name */}
        <Text style={styles.name}>{name}</Text>
        
        {/* Phone */}
        <Text style={styles.phone}>{phone}</Text>
        
        {/* Last Order Date */}
        <Text style={styles.lastOrder}>
          Last order: {formatDate(last_order_date)}
        </Text>
      </View>
      
      {/* Loyalty Points */}
      <View style={styles.loyaltyContainer}>
        <Text style={styles.loyaltyLabel}>Points</Text>
        <Text style={styles.loyaltyPoints}>{loyalty_points || 0}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
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
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  avatarText: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.white,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  phone: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  lastOrder: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
  },
  loyaltyContainer: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: spacing.borderRadius.md,
    padding: spacing.md,
    minWidth: 60,
  },
  loyaltyLabel: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  loyaltyPoints: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.primary,
  },
});

export default CustomerItem;

