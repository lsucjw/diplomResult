import React, { useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import { View, StyleSheet, Modal, TextInput, TouchableOpacity } from "react-native";
import { Button, RadioButton, Provider as PaperProvider } from "react-native-paper";
import RadioButtonGroup from "react-native-paper/lib/typescript/components/RadioButton/RadioButtonGroup";

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
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        padding: 20,
    },
    radio: {
        flexDirection: 'row'
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        width: '80%',
        marginBottom: 10,
        padding: 10,
    },
    fullScreenButton: {
        backgroundColor: '#6200EE',
        padding: 10,
        borderRadius: 5,
    },
    fullScreenButtonText: {
        color: '#FFF',
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

    const handleLogout = () => {
        setRole(null);
        setGroup(null);
        setSurname("");
        setName("");
        setModalVisible(true); // Открываем модальное окно при выходе
    };

    const handleLogin = () => {
        if (role === "teacher") {
            const fullName = `${surname} ${name}`;
            if (TEACHER_NAMES.includes(fullName)) {
                setModalVisible(false); // Закрываем модал при успешном входе
                return;
            }
        } else if (role === "student") {
            const fullName = `${surname} ${name}`;
            if (STUDENT_GROUPS[group!]?.includes(fullName)) {
                setModalVisible(false); // Закрываем модал при успешном входе
                return;
            }
        }
        setError("Введены некорректные данные");
        setSurname(""); // Сбрасываем фамилию и состояния
        setName(""); // Сбрасываем имя
        setGroup(null);
        setRole(null);
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
                <Button mode="contained" onPress={handleLogout}>
                    Выход
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
                    <ThemedText style={{ fontSize: 20, marginBottom: 20 }}>Выберите вашу роль:</ThemedText>
                    <RadioButton.Group
                        onValueChange={(value) => handleRoleChange(value as "teacher" | "student")}
                        value={role || ""}>

                        <View style={styles.radio}>
                            <RadioButton value='teacher'/>
                            <ThemedText>Преподаватель</ThemedText>
                        </View>
                        <View style={styles.radio}>
                            <RadioButton value="student" />
                            <ThemedText>Студент</ThemedText>
                        </View>
                    </RadioButton.Group>

                    {role && ( // Показываем поля ввода после выбора роли
                        <>
                            <TextInput
                                style={styles.input}
                                placeholder={role === "teacher" ? "Введите фамилию" : "Введите ФИО"}
                                value={surname}
                                onChangeText={setSurname}
                                onFocus={resetError}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder={role === "teacher" ? "Введите инициалы в формате И.И." : "Введите имя"}
                                value={name}
                                onChangeText={setName}
                                onFocus={resetError}
                            />
                            {role === "student" && (
                                <>
                                    <ThemedText>Выберите группу:</ThemedText>
                                    <RadioButton.Group
                                        onValueChange={value => {
                                            setGroup(value as "607-11" | "607-12");
                                            resetError();
                                        }}
                                        value={group || ""}
                                    >
                                        <View style={styles.radio}>
                                            <RadioButton value="607-11" />
                                            <ThemedText>607-11</ThemedText>
                                        </View>
                                        <View style={styles.radio}>
                                            <RadioButton value="607-12" />
                                            <ThemedText>607-12</ThemedText>
                                        </View>
                                    </RadioButton.Group>
                                </>
                            )}

                            <TouchableOpacity style={styles.fullScreenButton} onPress={handleLogin}>
                                <ThemedText style={styles.fullScreenButtonText}>Войти</ThemedText>
                            </TouchableOpacity>
                        </>
                    )}

                    {error && <ThemedText style={{ color: 'red' }}>{error}</ThemedText>}
                </View>
            </Modal>
        </PaperProvider>
    );
}