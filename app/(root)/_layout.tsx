import { TabBarIcon } from "@/components/navigation/TabBarIcon"
import { ThemedText } from "@/components/ThemedText"
import { Tabs } from "expo-router"

export default function RootLayout() {

    return (
        <Tabs
        screenOptions={{
          headerShown: false,
        }}>
        <Tabs.Screen
          name="index"
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="consule"
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
            ),
          }}
        />
      </Tabs>
    )
}