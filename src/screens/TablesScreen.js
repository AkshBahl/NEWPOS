/**
 * TablesScreen Component
 * Displays tables in a 2-column grid with status indicators
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
import { fetchTables } from '../services/supabase';
import TopBar from '../components/TopBar';

const getStatusStyle = (status) => {
  switch (status?.toLowerCase()) {
    case 'free':
      return {
        bg: '#dcfce7',
        border: '#22c55e',
        text: '#15803d',
        icon: '#22c55e',
        badgeBg: '#bbf7d0',
      };
    case 'occupied':
      return {
        bg: '#fef3c7',
        border: '#d97706',
        text: '#92400e',
        icon: '#92400e',
        badgeBg: '#fde68a',
      };
    case 'reserved':
      return {
        bg: '#dbeafe',
        border: '#3b82f6',
        text: '#1d4ed8',
        icon: '#3b82f6',
        badgeBg: '#bfdbfe',
      };
    default:
      return {
        bg: '#f3f4f6',
        border: '#9ca3af',
        text: '#6b7280',
        icon: '#9ca3af',
        badgeBg: '#e5e7eb',
      };
  }
};

const TablesScreen = ({ navigation }) => {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadTables();
  }, []);

  const loadTables = async () => {
    try {
      const data = await fetchTables();
      setTables(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadTables();
    setRefreshing(false);
  }, []);

  const handleSettingsPress = () => {
    navigation.navigate('Settings');
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
        <Text style={styles.sectionTitle}>Tables</Text>

        <View style={styles.grid}>
          {tables.map((table) => {
            const style = getStatusStyle(table.status);
            return (
              <TouchableOpacity
                key={table.id}
                style={[
                  styles.tableCard,
                  {
                    backgroundColor: style.bg,
                    borderColor: style.border,
                  },
                ]}
                activeOpacity={0.7}
              >
                {/* Sofa Icon */}
                <MaterialCommunityIcons
                  name="sofa-single"
                  size={32}
                  color={style.icon}
                />

                {/* Table Name */}
                <Text style={[styles.tableName, { color: style.text }]}>
                  {table.name}
                </Text>

                {/* Status Badge */}
                <View style={[styles.statusBadge, { backgroundColor: style.badgeBg }]}>
                  <Text style={[styles.statusText, { color: style.text }]}>
                    {table.status}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {tables.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🪑</Text>
            <Text style={styles.emptyTitle}>No Tables</Text>
            <Text style={styles.emptyText}>
              Add tables in your Supabase dashboard
            </Text>
          </View>
        )}

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
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 14,
  },
  tableCard: {
    width: '46%',
    marginHorizontal: '2%',
    marginBottom: 16,
    borderRadius: 16,
    borderWidth: 1.5,
    paddingVertical: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tableName: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
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

export default TablesScreen;
