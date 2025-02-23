import React, { useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import {
  View,
  Modal,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { AuthService } from "@/services/auth/auth.service";
import useAuthStore from "@/stores/auth.store";

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#FF8C00",
    borderRadius: 15,
    margin: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: "40%",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    borderColor: "black",
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 10,
    padding: 5,
    width: "80%",
  },
  modalContainer: {
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 1)",
    flex: 1,
    //height: 500,
    justifyContent: "center",
    padding: 10,
  },
  radio: {
    flexDirection: "row",
  },
});

export default function AuthModal() {
  const { setToken, isExistToken } = useAuthStore();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);

  const handleSendEmail = async () => {
    const resultStatus = await AuthService.login(email);
    if (resultStatus == 201) {
      setIsCodeSent(true);
      return;
    }
    if (resultStatus == 400) {
      console.log("Пользователь не найдет");
      return;
    }

    console.log("Сервер не отвечает");
  };

  const handleSendCode = async () => {
    try {
      const token = await AuthService.sendCode(code);
      setToken(token);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Modal transparent={true} animationType="slide" visible={!isExistToken()}>
        <View style={styles.modalContainer}>
          <ThemedText style={{ fontSize: 20, marginBottom: 20 }}>
            Введите ваш корпоративный email:
          </ThemedText>

          <TextInput
            style={styles.input}
            placeholder="Введите ваш Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <TouchableOpacity style={styles.button} onPress={handleSendEmail}>
            <Text style={styles.buttonText}>Получить код</Text>
          </TouchableOpacity>
          {isCodeSent && (
            <>
              <TextInput
                style={styles.input}
                placeholder="Введите код"
                value={code}
                onChangeText={setCode}
              />

              <TouchableOpacity style={styles.button} onPress={handleSendCode}>
                <Text style={styles.buttonText}>Войти</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </Modal>
    </>
  );
}
