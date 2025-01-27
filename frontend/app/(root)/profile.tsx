import React, { useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import { View, StyleSheet, Modal, TextInput, TouchableOpacity, Button, Text } from "react-native";
import { RadioButton, Provider as PaperProvider } from "react-native-paper";
import RadioButtonGroup from "react-native-paper/lib/typescript/components/RadioButton/RadioButtonGroup";
import { AuthService } from "@/services/auth/auth.service";
import useAuthStore from "@/stores/auth.store";

const styles = StyleSheet.create({
    header: {
        paddingTop: 50,
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
    },
    main: {
        backgroundColor: '#FFFFFF',
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContainer: {
        flex: 1,
        //height: 500,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        padding: 10,
    },
    radio: {
        flexDirection: 'row'
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        width: '80%',
        marginBottom: 10,
        padding: 5,
        borderRadius: 5,
    },
    button: {
        width: '40%',
        backgroundColor: "#FF8C00",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 15,
        alignItems: 'center',
        margin: 10
      },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

const TEACHER_NAMES = ["Назина Н.Б.", "Шайторова И.А.", "Жебель И.А."];
const STUDENT_GROUPS = {
    "607-11": ["Комендант Яна", "Абсатаров Тимур", "Кравченко Анжелика"],
    "607-12": ["Квасов Максим", "Смирнова Анастасия", "Шикшанов Егор"],
};

export default function Index() {
    const [modalVisible, setModalVisible] = useState(true);
    const [role, setRole] = useState<"teacher" | "student" | null>(null);
    const [surname, setSurname] = useState("");
    const [name, setName] = useState("");
    const [group, setGroup] = useState<"607-11" | "607-12" | null>(null);
    const [error, setError] = useState("");
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [isCodeSent, setIsCodeSent] = useState(false);

    const { setToken } = useAuthStore()

    const handleGetCode = () => {
        // Здесь можно добавить логику отправки кода на email
        console.log('Код отправлен на:', email);
        setIsCodeSent(true);
      };
    
      const handleLogin = () => {
        // Логика для обработки входа
        console.log('Введенный код:', code);
      };

    const handleLogout = () => {
        setRole(null);
        setGroup(null);
        setSurname("");
        setName("");
        setModalVisible(true); // Открываем модальное окно при выходе
    };


    const resetError = () => {
        setError("");
    };

    const handleRoleChange = (value: "teacher" | "student") => {
        setRole(value);
        setGroup(null);  // Сброс группы при смене роли
        setSurname("");  // Сброс фамилии при смене роли
        setName("");     // Сброс имени при смене роли
        resetError();
    };

    const renderUserData = () => {
        if (role === "student") {
            return (
                <><ThemedText>Студент</ThemedText>
                <ThemedText>Группа: {group}</ThemedText></>
            );
        } else if (role === "teacher") {
            // Отображаем инициалы с учетом точек.
            const initials = `${name.substring(0, 1)}.${name.substring(2, 3)}.`;
            return (
                <><ThemedText>Преподаватель</ThemedText>
                <ThemedText>{`${surname} ${initials}`}</ThemedText></>
            );
        }
        return <ThemedText>Пользователь не авторизован</ThemedText>;
    };

    return (
        <PaperProvider>
            <View style={styles.header}>
                {renderUserData()}
            </View>
            <View style={styles.main}>
                <ThemedText>Тут основной контент</ThemedText>
                <Button title="Выход" onPress={handleLogout}>
                    
                </Button>
            </View>

            {/* Модальное окно для выбора роли/входа */}
            <Modal
                transparent={true}
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <ThemedText style={{ fontSize: 20, marginBottom: 20 }}>Введите ваш корпоративный email:</ThemedText>
                    
                    <TextInput
                        style={styles.input}
                        placeholder="Введите ваш Email"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <TouchableOpacity style={styles.button} onPress={async () => {
                        await AuthService.login(email);
                        handleGetCode()
                    }} >
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

                        <TouchableOpacity style={styles.button} onPress={async () => { 
                        setToken(await AuthService.getCode(code));
                    }} >
                        <Text style={styles.buttonText}>Войти</Text>
                        </TouchableOpacity> 
                        </>
                     )}   
                </View>
            </Modal>
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