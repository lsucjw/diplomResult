import React from "react";
import { ThemedText } from "@/components/ThemedText";
import { View, StyleSheet, Button } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import useAuthStore from "@/stores/auth.store";
import useUserStore from "@/stores/user.store";

const styles = StyleSheet.create({
  header: {
    paddingTop: 50,
    height: 150,
    alignItems: "center",
    justifyContent: "center",
  },
  main: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    flex: 1,
    //height: 500,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 1)",
    padding: 10,
  },
  radio: {
    flexDirection: "row",
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    width: "80%",
    marginBottom: 10,
    padding: 5,
    borderRadius: 5,
  },
  button: {
    width: "40%",
    backgroundColor: "#FF8C00",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 15,
    alignItems: "center",
    margin: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default function Index() {
  const { removeToken } = useAuthStore();
  const { getUser } = useUserStore();
  const user = getUser();

  const handleLogout = () => {
    removeToken();
  };

  const renderUserData = () => {
    return (
      <>
        <ThemedText>{user?.role}</ThemedText>
        <ThemedText>Группа: {user?.group.name}</ThemedText>
      </>
    );
  };

  return (
    <PaperProvider>
      <View style={styles.header}>{renderUserData()}</View>
      <View style={styles.main}>
        <ThemedText>Тут основной контент</ThemedText>
        <Button title="Выход" onPress={handleLogout}></Button>
      </View>
    </PaperProvider>
  );
}
