/**
 * MenuScreen Component
 * Displays menu items in a 2-column grid layout
 * Matches Figma design
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
import { fetchMenuItems } from '../services/supabase';
import TopBar from '../components/TopBar';
import SearchBar from '../components/SearchBar';
import MenuCard from '../components/MenuCard';

const MenuScreen = ({ navigation }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadMenuItems();
  }, []);

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

  const loadMenuItems = async () => {
    try {
      const data = await fetchMenuItems();
      setMenuItems(data);
      setFilteredItems(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadMenuItems();
    setRefreshing(false);
  }, []);

  const handleAddToOrder = (item) => {
    Alert.alert('Added to Order', `${item.name} has been added.`);
  };

  const handleSettingsPress = () => {
    navigation.navigate('Settings');
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const renderMenuItem = ({ item }) => (
    <MenuCard item={item} onAddToOrder={handleAddToOrder} />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>🍽️</Text>
      <Text style={styles.emptyTitle}>No Menu Items</Text>
      <Text style={styles.emptyText}>
        {searchQuery ? 'No items match your search' : 'Add menu items in your Supabase dashboard'}
      </Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <TopBar onProfilePress={handleSettingsPress} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#d4a574" />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TopBar onProfilePress={handleSettingsPress} />
      
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search menu..."
        onClear={handleClearSearch}
      />

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
            tintColor="#d4a574"
            colors={['#d4a574']}
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
    backgroundColor: '#ffffff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingHorizontal: 14,
    paddingBottom: 100,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 80,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 15,
    color: '#6b7280',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});

export default MenuScreen;
