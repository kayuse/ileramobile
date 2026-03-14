import { Tabs } from 'expo-router';
import React from 'react';
import { View, Platform } from 'react-native';
import { LayoutGrid, Heart, BookOpenText, Bluetooth, Utensils } from 'lucide-react-native';

const ACTIVE_BG = '#3B82F6';
const INACTIVE_COLOR = '#94A3B8';
const ACTIVE_COLOR = '#FFFFFF';

function TabIcon({ Icon, focused }: { Icon: any; focused: boolean }) {
  return (
    <View style={{
      width: 42, height: 42, borderRadius: 14,
      backgroundColor: focused ? ACTIVE_BG : 'transparent',
      alignItems: 'center', justifyContent: 'center',
    }}>
      <Icon size={21} color={focused ? ACTIVE_COLOR : INACTIVE_COLOR} />
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: ACTIVE_COLOR,
        tabBarInactiveTintColor: INACTIVE_COLOR,
        tabBarStyle: {
          position: 'absolute',
          bottom: 20,
          left: 24,
          right: 24,
          height: 68,
          backgroundColor: '#1E293B',
          borderRadius: 28,
          borderTopWidth: 0,
          paddingBottom: 8,
          paddingTop: 8,
          elevation: 20,
          shadowColor: '#1E293B',
          shadowOpacity: 0.35,
          shadowRadius: 24,
          shadowOffset: { width: 0, height: 8 },
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
          marginTop: 0,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ focused }) => <TabIcon Icon={LayoutGrid} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="health"
        options={{
          title: 'Health',
          tabBarIcon: ({ focused }) => <TabIcon Icon={Heart} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="finance"
        options={{
          title: 'Finance',
          tabBarIcon: ({ focused }) => <TabIcon Icon={BookOpenText} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="devices"
        options={{
          title: 'Devices',
          tabBarIcon: ({ focused }) => <TabIcon Icon={Bluetooth} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="food"
        options={{
          title: 'Food',
          tabBarIcon: ({ focused }) => <TabIcon Icon={Utensils} focused={focused} />,
        }}
      />
    </Tabs>
  );
}
