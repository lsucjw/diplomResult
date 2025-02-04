import { ThemedText } from "@/components/ThemedText";
import React from "react";
import { View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  header: {
    height: 100,
    marginTop: 20,
  },
  main: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20, // Скругление верхнего левого угла
    borderTopRightRadius: 20,
    flex: 1,
  },
});

export default function Index() {
  return (
    <>
      <View style={styles.header}>
        <ThemedText>Header форума</ThemedText>
      </View>
      <View style={styles.main}>
        <ThemedText>Тут основной контент</ThemedText>
      </View>
    </>
  );
}
