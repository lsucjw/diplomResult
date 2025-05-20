import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Modal,
  StyleSheet,
} from 'react-native';

const DISCIPLINES = [
  'Информационная безопасность и защита информации',
  'Методы защиты информации',
  'ФТД: Основы программирования в системе 1С предприятие 8.3',
  'Инструментальные средства информ. систем',
  'Иностранный язык в проф. сфере (24 ч)',
  'Корпоративные информ. системы',
  'Производственная практика, научно-исследовательская работа',
  'Информ. безопасность и защита информации',
];

const PARTICIPANTS = [
  'Шайторова И.А. (преподаватель)',
  'Абсатаров Тимур',
  'Абзалимов Айдар',
  'Галайтата Елизавета',
  'Гуторов Захар',
  'Добрынин Артемий',
  'Карпов Андрей',
  'Комендант Яна',
  'Кравченко Анжелика',
  'Монастырская Анжелика',
  'Сапожникова Елизавета',
  'Фахриева Аделина',
  'Царенко Татьяна',
  'Шабалин Сергей',
  'Шумский Даниил',
  'Якубчик Лариса (вы)',
];

export default function ForumsScreen() {
  const [selectedDiscipline, setSelectedDiscipline] = useState<string | null>(null);
  const [messages, setMessages] = useState<{ [key: string]: string[] }>({});
  const [inputText, setInputText] = useState('');
  const [showParticipants, setShowParticipants] = useState(false);

  const sendMessage = () => {
    if (selectedDiscipline && inputText.trim()) {
      setMessages(prev => ({
        ...prev,
        [selectedDiscipline]: [...(prev[selectedDiscipline] || []), inputText.trim()],
      }));
      setInputText('');
    }
  };

  const renderChat = () => (
    <View style={styles.chatContainer}>
      {/* Верхний заголовок с кнопкой назад и названием дисциплины */}
      <View style={styles.chatHeader}>
        <TouchableOpacity onPress={() => setSelectedDiscipline(null)} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.chatTitle}>{selectedDiscipline}</Text>
      </View>
  
      {/* Кнопка Список участников по центру */}
      <View style={styles.participantsSection}>
        <TouchableOpacity onPress={() => setShowParticipants(true)}>
          <Text style={styles.participantsButton}>Список участников</Text>
        </TouchableOpacity>
      </View>
  
      {/* Список сообщений */}
      <FlatList
        style={styles.chatArea}
        data={messages[selectedDiscipline as string] || []}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.messageContainer}>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => {
                const updatedMessages = [...(messages[selectedDiscipline as string] || [])];
                updatedMessages.splice(index, 1);
                setMessages(prev => ({
                  ...prev,
                  [selectedDiscipline as string]: updatedMessages,
                }));
              }}
            >
              <Text style={styles.deleteButtonText}>×</Text>
            </TouchableOpacity>
        
            <Text style={styles.authorLabel}>Якубчик Лариса</Text>
            <Text style={styles.messageText}>{item}</Text>
          </View>
        )}
        
      />
  
      {/* Ввод сообщения */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Введите сообщение..."
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Отправить</Text>
        </TouchableOpacity>
      </View>
  
      {/* Модальное окно участников */}
      <Modal visible={showParticipants} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={() => setShowParticipants(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Участники</Text>
            {PARTICIPANTS.map((name, index) => (
              <Text key={index} style={styles.participantName}>{name}</Text>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
  

  return (
    <SafeAreaView style={styles.container}>
      {!selectedDiscipline ? (
        <>
          <Text style={styles.header}>Форумы</Text>
          <FlatList
            data={DISCIPLINES}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.disciplineItem}
                onPress={() => setSelectedDiscipline(item)}
              >
                <Text style={styles.disciplineText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </>
      ) : (
        renderChat()
      )}
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  deleteButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#ff4d4d',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 14,
    textAlign: 'center',
  },
  messageContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 10,
    marginVertical: 6,
    position: 'relative', // Чтобы позиционировать крестик относительно контейнера
  },
  authorLabel: {
    fontSize: 10,
    color: '#555',
    marginBottom: 4,
  },
  messageText: {
    fontSize: 14,
  },
  
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  backButton: {
    paddingRight: 12,
  },
  backButtonText: {
    fontSize: 24,
    color: '#007AFF',
  },
  chatTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  participantsSection: {
    alignItems: 'center',
    marginBottom: 10,
  },
  participantsButton: {
    color: '#007AFF',
    fontSize: 16,
    paddingVertical: 4,
  },
  
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  disciplineItem: {
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 10,
  },
  disciplineText: {
    fontSize: 16,
  },
  chatContainer: {
    flex: 1,
  },
  chatArea: {
    flex: 1,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingTop: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 18,
    width: '80%',
    maxHeight: '85%',
  },
  closeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 18,
    color: '#999',
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  participantName: {
    fontSize: 14,
    paddingVertical: 2,
  },
  
});
