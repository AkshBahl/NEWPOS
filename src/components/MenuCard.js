/**
 * MenuCard Component
 * Displays menu item with image, title, price, and add button
 * Used in a 2-column grid layout on Menu screen
 */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';

const MenuCard = ({ item, onAddToOrder }) => {
  const { name, price, category, image_url } = item;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onAddToOrder?.(item)}
      activeOpacity={0.8}
    >
      {/* Item Image */}
      <View style={styles.imageContainer}>
        {image_url ? (
          <Image
            source={{ uri: image_url }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>🍽️</Text>
          </View>
        )}
      </View>
      
      {/* Item Details */}
      <View style={styles.details}>
        {/* Category Tag */}
        <Text style={styles.category}>{category}</Text>
        
        {/* Item Name */}
        <Text style={styles.name} numberOfLines={2}>
          {name}
        </Text>
        
        {/* Price and Add Button Row */}
        <View style={styles.footer}>
          <Text style={styles.price}>${price?.toFixed(2)}</Text>
          
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => onAddToOrder?.(item)}
            activeOpacity={0.7}
          >
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
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
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  imageContainer: {
    height: 120,
    backgroundColor: colors.surface,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.surface,
  },
  placeholderText: {
    fontSize: 40,
  },
  details: {
    padding: spacing.md,
  },
  category: {
    fontSize: typography.sizes.xs,
    color: colors.primary,
    fontWeight: typography.weights.medium,
    textTransform: 'uppercase',
    marginBottom: spacing.xs,
  },
  name: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semiBold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 20,
    color: colors.white,
    fontWeight: typography.weights.bold,
    lineHeight: 22,
  },
});

export default MenuCard;

