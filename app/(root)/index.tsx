import { ThemedText } from "@/components/ThemedText";
import { View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    header: {
        height: 100,
    },
    main: {
        backgroundColor: '#FFFFFF',
        flex: 1,
        borderTopLeftRadius: 20,  // Скругление верхнего левого угла
        borderTopRightRadius: 20,
    }
})

export default function Index() {
    return (
        <>
        <View style={styles.header}>
            <ThemedText>
                Тут основной контент
            </ThemedText>
        </View>
        <View style={styles.main}>
            <ThemedText>
                Тут основной контент
            </ThemedText>            
        </View>
        </>
    )
}