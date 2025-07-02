import { AntDesign } from '@expo/vector-icons'
import { Tabs } from 'expo-router'

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name='home' color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name='exercises'
        options={{
          title: 'Exercises',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name='book' color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name='workout'
        options={{
          title: 'Workout',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name='pluscircleo' color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name='active-workout'
        options={{
          title: 'Active Workout',
          headerShown: false,
          href: null,
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tabs.Screen
        name='history'
        options={{
          title: 'History',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name='clockcircleo' color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name='profile'
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name='user' color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  )
}
