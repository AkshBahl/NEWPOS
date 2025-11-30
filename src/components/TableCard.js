/**
 * TableCard Component
 * Displays table with status-based color coding
 * free → green, occupied → red, reserved → yellow
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

const TableCard = ({ table, onPress }) => {
  const { name, status } = table;

  // Get status-based styling
  const getStatusColor = () => {
    switch (status) {
      case 'free':
        return colors.tableFree;
      case 'occupied':
        return colors.tableOccupied;
      case 'reserved':
        return colors.tableReserved;
      default:
        return colors.border;
    }
  };

  const getStatusLabel = () => {
    switch (status) {
      case 'free':
        return 'Available';
      case 'occupied':
        return 'Occupied';
      case 'reserved':
        return 'Reserved';
      default:
        return 'Unknown';
    }
  };

  const statusColor = getStatusColor();

  return (
    <TouchableOpacity
      style={[styles.container, { borderColor: statusColor }]}
      onPress={() => onPress?.(table)}
      activeOpacity={0.8}
    >
      {/* Table Icon */}
      <View style={[styles.iconContainer, { backgroundColor: statusColor }]}>
        <Text style={styles.tableIcon}>🪑</Text>
      </View>
      
      {/* Table Name */}
      <Text style={styles.tableName}>{name}</Text>
      
      {/* Status Badge */}
      <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
        <Text style={styles.statusText}>{getStatusLabel()}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: spacing.borderRadius.lg,
    margin: spacing.sm,
    padding: spacing.lg,
    alignItems: 'center',
    borderWidth: 2,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minHeight: 150,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  tableIcon: {
    fontSize: 28,
  },
  tableName: {
    fontSize: typography.sizes.lg,
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
    textTransform: 'uppercase',
  },
});

export default TableCard;

