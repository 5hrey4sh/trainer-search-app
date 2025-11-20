import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#4fc3f7',
        tabBarInactiveTintColor: '#b0bec5',
        tabBarLabelStyle: { fontSize: 14, fontWeight: '600' },
        tabBarStyle: {
          backgroundColor: '#121212',
          borderTopWidth: 0,
          height: 70,
          elevation: 5,
        },
        headerStyle: { backgroundColor: '#121212' },
        headerTintColor: '#4fc3f7',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={26} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => <FontAwesome size={26} name="plane" color={color} />,
        }}
      />
      <Tabs.Screen
        name="project"
        options={{
          title: 'Project',
          tabBarIcon: ({ color }) => <FontAwesome size={26} name="cog" color={color} />,
        }}
      />
      <Tabs.Screen
        name="contact"
        options={{
          title: 'Contact',
          tabBarIcon: ({ color }) => <FontAwesome size={26} name="address-book" color={color} />,
        }}
      />
    </Tabs>
  );
}
