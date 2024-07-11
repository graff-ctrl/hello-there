import { Tabs } from 'expo-router'
import React from 'react'

import { TabBarIcon } from '@/components/navigation/TabBarIcon'
import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme'

export default function TabLayout() {
  const colorScheme = useColorScheme()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name='home'
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name='earth-americas' color={color} />
          ),
          headerShown: true,
          headerStyle: {
            backgroundColor: '#ee82ee',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Tabs.Screen
        name='characters'
        options={{
          title: 'Characters',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name='jedi' color={color} />
          ),
          headerShown: true,
          headerStyle: {
            backgroundColor: '#556b2f',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Tabs.Screen
        name='films'
        options={{
          title: 'Films',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name='sith' color={color} />
          ),
          headerShown: true,
          headerStyle: {
            backgroundColor: '#8b0000',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Tabs.Screen
        name='settings'
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='user-gear' color={color} />
          ),
          headerShown: true,
          headerStyle: {
            backgroundColor: '#dda0dd',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Tabs>
  )
}
