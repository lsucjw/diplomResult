import React, { useState, useEffect } from "react";
import { ThemedText } from "@/components/ThemedText";
import {
  View,
  StyleSheet,
  TextInput,
  FlatList,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Icon } from "react-native-elements"; // Импортируем Icon из react-native-elements

interface Teacher {
  id: string;
  name: string;
  department: string;
  schedule: string;
}

// Список преподавателей с фамилиями и расписанием
const teachers: Teacher[] = [
  {
    id: "1",
    name: "Острейковский В. А.",
    department: "Кафедра ИВТ",
    schedule: "Среда(Числитель)\n12:00-13:00\nУ806",
  },
  {
    id: "2",
    name: "Шайторова И. А.",
    department: "Кафедра ИВТ",
    schedule: "Четверг(Знаменатель)\n11:00-12:30\nУ807",
  },
  {
    id: "3",
    name: "Жебель В. А.",
    department: "Кафедра ИВТ",
    schedule: "Суббота\n12:00-13:00\nУ804",
  },
  {
    id: "4",
    name: "Лысенкова С. А.",
    department: "Кафедра ИВТ",
    schedule: "Вторник\n15:00-16:00\nУ806",
  },
  {
    id: "5",
    name: "Живайкин Е. А.",
    department: "Кафедра ИВТ",
    schedule: "Вторник(Числитель)\n15:00-16:00\nУ806",
  },
  {
    id: "6",
    name: "Еловой С. Г.",
    department: "Кафедра ИВТ",
    schedule: "Пятница\n15:00-16:00\nУ806",
  },
  {
    id: "7",
    name: "Назина Н. Б.",
    department: "Кафедра ИВТ",
    schedule: "Вторник(Знаменатель)\n15:00-16:00\nУ806",
  },
];

const styles = StyleSheet.create({
  closeButton: {
    position: "absolute",
    right: 10,
    top: 10, // Крестик теперь в правом верхнем углу
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    height: 60,
    justifyContent: "space-between",
    marginTop: 20,
    paddingHorizontal: 15,
  },
  heartButton: {
    left: 10,
    position: "absolute",
    top: 10, // Сердечко теперь в левом верхнем углу
  },
  input: {
    borderColor: "#666",
    borderRadius: 5,
    borderWidth: 1,
    margin: 5,
    padding: 5,
    width: "85%",
  },
  main: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
    padding: 15,
  },
  modalContainer: {
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flex: 1,
    justifyContent: "center",
  },
  modalContent: {
    alignItems: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 10,
    height: 400,
    maxHeight: 400,
    padding: 20,
    width: "80%",
    // Максимальная высота модального окна
    // Вырравниваем содержимое влево
  },
  search: {
    backgroundColor: "#FF8C00",
    borderRadius: 5,
    padding: 10, // Задайте фон или цвет, как вам нужно
  },
  searchContainer: {
    alignItems: "center",
    flexDirection: "row",
    //marginBottom: 20,
    //borderRadius: 5,
  },
  teacherItem: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    padding: 10,
  },
});

export default function Index() {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [favoritesModalVisible, setFavoritesModalVisible] =
    useState<boolean>(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [isHearted, setIsHearted] = useState<boolean>(false); // Статус избранного
  const [favorites, setFavorites] = useState<Teacher[]>([]); // Состояние для избранного

  const handleSelectTeacher = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setModalVisible(true);
  };

  // Эффект для проверки, есть ли преподаватель в избранных
  useEffect(() => {
    if (selectedTeacher) {
      const isFavored = favorites.some((fav) => fav.id === selectedTeacher.id);
      setIsHearted(isFavored); // Устанавливаем статус сердечка
    }
  }, [selectedTeacher, favorites]);

  const toggleFavorites = () => {
    if (isHearted) {
      setFavorites((prev) =>
        prev.filter((fav) => fav.id !== selectedTeacher?.id),
      ); // Удаляем из избранного
    } else {
      setFavorites((prev) => [...prev, selectedTeacher!]); // Добавляем в избранное
    }
    setIsHearted(!isHearted); // Переключаем статус сердечка
  };

  const renderTeacher = ({ item }: { item: Teacher }) => (
    <TouchableOpacity
      onPress={() => handleSelectTeacher(item)}
      style={styles.teacherItem}
    >
      <ThemedText>{item.name}</ThemedText>
      <ThemedText>{item.department}</ThemedText>
    </TouchableOpacity>
  );

  const renderFavorite = ({ item }: { item: Teacher }) => (
    <TouchableOpacity style={styles.teacherItem}>
      <ThemedText>{item.name}</ThemedText>
      <ThemedText>{item.schedule}</ThemedText>
    </TouchableOpacity>
  );

  return (
    <>
      <View style={styles.header}>
        <ThemedText>График консультаций</ThemedText>
        <TouchableOpacity onPress={() => setFavoritesModalVisible(true)}>
          <Icon name="heart" type="font-awesome" size={24} color="red" />
        </TouchableOpacity>
      </View>
      <View style={styles.main}>
        <View style={styles.searchContainer}>
          <TextInput style={styles.input} placeholder="Поиск" />
          <TouchableOpacity
            onPress={async () => {
              // Ваш код для обработки нажатия
            }}
            style={styles.search}
          >
            <Icon name="search" type="font-awesome" size={20} color="black" />
          </TouchableOpacity>
        </View>
        <FlatList
          data={teachers}
          renderItem={renderTeacher}
          keyExtractor={(item) => item.id}
        />
      </View>

      {/* Модальное окно для деталей преподавателя */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.heartButton}
              onPress={toggleFavorites} // Обработчик для добавления/удаления из избранного
            >
              <Icon
                name="heart"
                type="font-awesome"
                size={24}
                color={isHearted ? "red" : "gray"}
              />
            </TouchableOpacity>
            <ThemedText style={{ marginLeft: 10 }}>
              {selectedTeacher?.name}
            </ThemedText>

            <ThemedText style={{ marginLeft: 10 }}>
              {selectedTeacher?.schedule}
            </ThemedText>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Icon name="times" type="font-awesome" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Модальное окно для избранных преподавателей */}
      <Modal
        visible={favoritesModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setFavoritesModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setFavoritesModalVisible(false)}
            >
              <Icon name="times" type="font-awesome" size={24} color="black" />
            </TouchableOpacity>
            <ThemedText style={{ marginBottom: 10, fontSize: 18 }}>
              Избранные преподаватели
            </ThemedText>
            <ScrollView style={{ width: "100%" }}>
              <FlatList
                data={favorites}
                renderItem={renderFavorite}
                keyExtractor={(item) => item.id}
                scrollEnabled={false} // Отключаем прокрутку FlatList, чтобы использовать ScrollView
              />
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}
