/**
 * MenuCard Component
 * Displays menu item with image, title, and price
 * Matches Figma design - simple card layout
 */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const MenuCard = ({ item, onAddToOrder }) => {
  const { name, price, image_url } = item;

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
            <MaterialCommunityIcons name="food" size={40} color="#d1d5db" />
          </View>
        )}
      </View>
      
      {/* Item Details */}
      <View style={styles.details}>
        {/* Item Name */}
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        
        {/* Price */}
        <Text style={styles.price}>${price?.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    margin: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  imageContainer: {
    height: 110,
    backgroundColor: '#f9fafb',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
  },
  details: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: '500',
    color: '#d4a574',
  },
});

export default MenuCard;
