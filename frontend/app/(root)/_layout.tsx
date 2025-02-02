import { TabBarIcon } from "@/components/navigation/TabBarIcon"
import { ThemedText } from "@/components/ThemedText"
import { Tabs } from "expo-router"
import { View, StatusBar, StyleSheet } from "react-native";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AuthModal from "@/components/auth/AuthModal";


const styles = StyleSheet.create({
  container1: {
      backgroundColor: 'FAF9F9',
      flex: 1, // Занимает все доступное пространство
      flexDirection: 'row',
  }
})


export default function RootLayout() {

    return (
      <View style={styles.container1}>
        <AuthModal />
        <StatusBar barStyle="light-content" backgroundColor="#000" translucent={false} />
        <Tabs
        screenOptions={{
          headerShown: false,
        }}>
        <Tabs.Screen
          name="index"
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={'calendar'} size={24} color={focused ? "#FF7648" : color} />
            ),
          }}
        />
        <Tabs.Screen
          name="consule"
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ color, focused }) => (
              <FontAwesome6 name="people-group" size={24} color={focused ? "#FF7648" : color} />
            ),
          }}
        />
        <Tabs.Screen
          name="forum"
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons name="email-mark-as-unread" size={24} color={focused ? "#FF7648" : color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ color, focused }) => (
              <MaterialIcons name="manage-accounts" size={24} color={focused ? "#FF7648" : color} />
            ),
          }}
        />
      </Tabs>
      </View>
    )
}