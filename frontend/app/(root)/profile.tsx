import React, { useEffect, useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import { View, StyleSheet, Button } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import useAuthStore from "@/stores/auth.store";
import { UserService } from "@/services/user/user.service";

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
  const { removeToken, token } = useAuthStore();
  const [role, setRole] = useState<"teacher" | "student" | null>(null);
  const [surname, setSurname] = useState("");
  const [name, setName] = useState("");
  const [group, setGroup] = useState<"607-11" | "607-12" | null>(null);

  useEffect(() => {
    if (token) {
      UserService.getCurrentUser().then((x) => {
        console.log(x);
      });
    }
  }, [token]);

  const handleLogout = () => {
    removeToken();
  };

  const renderUserData = () => {
    if (role === "student") {
      return (
        <>
          <ThemedText>Студент</ThemedText>
          <ThemedText>Группа: {group}</ThemedText>
        </>
      );
    } else if (role === "teacher") {
      // Отображаем инициалы с учетом точек.
      const initials = `${name.substring(0, 1)}.${name.substring(2, 3)}.`;
      return (
        <>
          <ThemedText>Преподаватель</ThemedText>
          <ThemedText>{`${surname} ${initials}`}</ThemedText>
        </>
      );
    }
    return <ThemedText>Пользователь не авторизован</ThemedText>;
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

/*
onPress={async () => { 
                        const result = await fetch('https://83ta6z-95-172-117-69.ru.tuna.am/v1/user/getAll');
                        const json  = await result.json();
                        console.log(json);
                        
                    }}

*/
