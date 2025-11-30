/**
 * OrdersScreen Component
 * Displays orders with filter tabs and order cards
 * Matches Figma design
 */
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { fetchOrders } from '../services/supabase';
import TopBar from '../components/TopBar';

const filters = ['All', 'Paid', 'Pending'];

const OrdersScreen = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    loadOrders();
  }, [activeFilter]);

  const loadOrders = async () => {
    try {
      const status = activeFilter === 'All' ? null : activeFilter.toLowerCase();
      const data = await fetchOrders(status);
      setOrders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadOrders();
    setRefreshing(false);
  }, [activeFilter]);

  const handleSettingsPress = () => {
    navigation.navigate('Settings');
  };

  const formatTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const renderOrderCard = (order) => {
    const isPaid = order.status?.toLowerCase() === 'paid';

    return (
      <View key={order.id} style={styles.orderCard}>
        {/* Left Section - Status Icon + Order Info */}
        <View style={styles.leftSection}>
          {/* Status Circle */}
          <View style={[styles.statusCircle, isPaid ? styles.paidCircle : styles.pendingCircle]}>
            {isPaid ? (
              <MaterialCommunityIcons name="check" size={18} color="#22c55e" />
            ) : (
              <View style={styles.pendingDot} />
            )}
          </View>

          {/* Order Info */}
          <View style={styles.orderInfo}>
            <View style={styles.orderHeader}>
              <Text style={styles.orderNumber}>#{order.order_number || order.id}</Text>
              <View style={[styles.statusBadge, isPaid ? styles.paidBadge : styles.pendingBadge]}>
                <Text style={[styles.statusBadgeText, isPaid ? styles.paidText : styles.pendingText]}>
                  {isPaid ? 'Paid' : 'Pending'}
                </Text>
              </View>
            </View>
            <Text style={styles.tableText}>
              {order.table_name || `Table ${order.table_id}`}
            </Text>
          </View>
        </View>

        {/* Bottom Row - Time and Amount */}
        <View style={styles.bottomRow}>
          <View style={styles.timeContainer}>
            <MaterialCommunityIcons name="clock-outline" size={16} color="#9ca3af" />
            <Text style={styles.timeText}>{formatTime(order.created_at)}</Text>
          </View>
          <Text style={styles.amountText}>${order.total?.toFixed(2)}</Text>
        </View>
      </View>
    );
  };

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

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        {filters.map((filter) => {
          const isActive = activeFilter === filter;
          return (
            <TouchableOpacity
              key={filter}
              style={[styles.filterTab, isActive && styles.filterTabActive]}
              onPress={() => setActiveFilter(filter)}
              activeOpacity={0.7}
            >
              <Text style={[styles.filterText, isActive && styles.filterTextActive]}>
                {filter}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Orders List */}
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
        <View style={styles.ordersContainer}>
          {orders.map(renderOrderCard)}

          {orders.length === 0 && (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>📋</Text>
              <Text style={styles.emptyTitle}>No Orders</Text>
              <Text style={styles.emptyText}>
                {activeFilter === 'All'
                  ? 'No orders found'
                  : `No ${activeFilter.toLowerCase()} orders`}
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
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 10,
  },
  filterTab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#ffffff',
  },
  filterTabActive: {
    backgroundColor: '#1f2937',
    borderColor: '#1f2937',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  filterTextActive: {
    color: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  ordersContainer: {
    paddingHorizontal: 20,
  },
  orderCard: {
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
  leftSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  statusCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  paidCircle: {
    backgroundColor: '#dcfce7',
  },
  pendingCircle: {
    backgroundColor: '#fef3c7',
  },
  pendingDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#f59e0b',
  },
  orderInfo: {
    flex: 1,
  },
  orderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  paidBadge: {
    backgroundColor: '#dcfce7',
  },
  pendingBadge: {
    backgroundColor: '#fef3c7',
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  paidText: {
    color: '#15803d',
  },
  pendingText: {
    color: '#d97706',
  },
  tableText: {
    fontSize: 14,
    color: '#6b7280',
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingLeft: 44,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 14,
    color: '#9ca3af',
    marginLeft: 6,
  },
  amountText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
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
  },
  bottomPadding: {
    height: 100,
  },
});

export default OrdersScreen;
