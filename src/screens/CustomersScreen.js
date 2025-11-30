/**
 * CustomersScreen Component
 * Displays customers with search and loyalty points
 * Matches Figma design
 */
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { fetchCustomers } from '../services/supabase';
import TopBar from '../components/TopBar';

const CustomersScreen = ({ navigation }) => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      const data = await fetchCustomers();
      setCustomers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadCustomers();
    setRefreshing(false);
  }, []);

  const handleSettingsPress = () => {
    navigation.navigate('Settings');
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const filteredCustomers = customers.filter(
    (c) =>
      c.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone?.includes(searchQuery)
  );

  const renderCustomerCard = (customer) => (
    <TouchableOpacity key={customer.id} style={styles.customerCard} activeOpacity={0.7}>
      {/* Avatar */}
      <View style={styles.avatar}>
        <MaterialCommunityIcons name="account-outline" size={24} color="#d4a574" />
      </View>

      {/* Customer Info */}
      <View style={styles.customerInfo}>
        <Text style={styles.customerName}>{customer.name}</Text>
        <Text style={styles.customerPhone}>{customer.phone}</Text>
        <Text style={styles.lastOrder}>
          Last order: {formatDate(customer.last_order)}
        </Text>
      </View>

      {/* Points Badge */}
      <View style={styles.pointsBadge}>
        <Text style={styles.pointsText}>★ {customer.points || 0}</Text>
      </View>
    </TouchableOpacity>
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

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <MaterialCommunityIcons name="magnify" size={20} color="#9ca3af" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search customers..."
          placeholderTextColor="#9ca3af"
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {searchQuery ? (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <MaterialCommunityIcons name="close-circle" size={18} color="#9ca3af" />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Customers List */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#d4a574"
            colors={['#d4a574']}
          />
        }
      >
        <View style={styles.customersContainer}>
          {filteredCustomers.map(renderCustomerCard)}

          {filteredCustomers.length === 0 && (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>👥</Text>
              <Text style={styles.emptyTitle}>No Customers</Text>
              <Text style={styles.emptyText}>
                {searchQuery
                  ? 'No customers match your search'
                  : 'Add customers in your Supabase dashboard'}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 20,
    marginVertical: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#374151',
    marginLeft: 10,
    paddingVertical: 0,
  },
  scrollView: {
    flex: 1,
  },
  customersContainer: {
    paddingHorizontal: 20,
  },
  customerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fef3c7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  customerPhone: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 2,
  },
  lastOrder: {
    fontSize: 12,
    color: '#9ca3af',
  },
  pointsBadge: {
    backgroundColor: '#fef3c7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fde68a',
  },
  pointsText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#d4a574',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingTop: 60,
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
  },
  bottomPadding: {
    height: 100,
  },
});

export default CustomersScreen;
