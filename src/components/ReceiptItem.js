/**
 * ReceiptItem Component
 * Displays receipt with amount, date, and download icon
 * Used in Receipts screen list
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

const ReceiptItem = ({ receipt, onPress, onDownload }) => {
  const { id, amount, created_at } = receipt;

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Format time
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress?.(receipt)}
      activeOpacity={0.8}
    >
      {/* Receipt Icon */}
      <View style={styles.iconContainer}>
        <Text style={styles.receiptIcon}>🧾</Text>
      </View>
      
      {/* Receipt Info */}
      <View style={styles.info}>
        {/* Receipt ID */}
        <Text style={styles.receiptId}>Receipt #{id}</Text>
        
        {/* Date & Time */}
        <Text style={styles.date}>{formatDate(created_at)}</Text>
        <Text style={styles.time}>{formatTime(created_at)}</Text>
      </View>
      
      {/* Amount & Download */}
      <View style={styles.rightSection}>
        {/* Amount */}
        <Text style={styles.amount}>${amount?.toFixed(2)}</Text>
        
        {/* Download Button */}
        <TouchableOpacity
          style={styles.downloadButton}
          onPress={() => onDownload?.(receipt)}
          activeOpacity={0.7}
        >
          <Text style={styles.downloadIcon}>⬇️</Text>
        </TouchableOpacity>
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
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: spacing.borderRadius.md,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  receiptIcon: {
    fontSize: 24,
  },
  info: {
    flex: 1,
  },
  receiptId: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  date: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
  },
  time: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  downloadButton: {
    width: 36,
    height: 36,
    borderRadius: spacing.borderRadius.md,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  downloadIcon: {
    fontSize: 16,
  },
});

export default ReceiptItem;

