import React, { useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import {
  View,
  Modal,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Button,
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
});

export default function AuthModal() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);

  const handleGetCode = () => {
    // Здесь можно добавить логику отправки кода на email
    console.log("Код отправлен на:", email);
    setIsCodeSent(true);
  };

  const { setToken } = useAuthStore();

  return (
    <>
      <Modal transparent={true} animationType="slide" visible={false}>
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
          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              await AuthService.login(email);
              handleGetCode();
            }}
          >
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

              <TouchableOpacity
                style={styles.button}
                onPress={async () => {
                  setToken(await AuthService.getCode(code));
                }}
              >
                <Text style={styles.buttonText}>Войти</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </Modal>
    </>
  );
}
