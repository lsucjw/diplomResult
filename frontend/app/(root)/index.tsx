import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";

// Helper function to get detailed date information
const getDateDetails = () => {
  const today = new Date();
  const weekdays = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];
  const months = [
    "январь",
    "февраль",
    "март",
    "апрель",
    "май",
    "июнь",
    "июль",
    "август",
    "сентябрь",
    "октябрь",
    "ноябрь",
    "декабрь",
  ];

  const dayOfWeek = weekdays[today.getDay()]; // Get the name of the day
  const dayOfMonth = today.getDate(); // Get the day of the month
  const month = months[today.getMonth()]; // Get the name of the month
  const year = today.getFullYear(); // Get the year

  return { dayOfWeek, dayOfMonth, month, year, weekdays };
};

// Sample schedule data
const SCHEDULE = [
  {
    time: "11:30\n12:50",
    subject: "Иностранный язык в проф. сфере",
    format: "Практика",
    location: "У507",
    teacher: "Солопий Дмитрий Константинович",
    backgroundColor: "#b6e6b0", // Green for the first block
  },
  {
    time: "13:20\n14:40",
    subject: "Инструментальные средства информ.систем",
    format: "Практика",
    location: "У607",
    teacher: "Шайторова Ирина Анатольевна",
    backgroundColor: "#e0e0e0", // Grey for other blocks
  },
  {
    time: "14:50\n16:10",
    subject: "Инструментальные средства информ.систем",
    format: "Лекция",
    location: "У902",
    teacher: "Шайторова Ирина Анатольевна",
    backgroundColor: "#e0e0e0", // Grey for other blocks
  },
];

const styles = StyleSheet.create({
  dateDetails: {
    justifyContent: "center",
    marginLeft: 10,
  },
  dateItem: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 5,

    height: 50,

    justifyContent: "center",
    marginHorizontal: 6,
    width: 35, // Default background color
  },
  dateScroll: {
    flexDirection: "row",
    marginVertical: 10,
    marginBottom: 10, // Adjusted for spacing under the carousel
    paddingHorizontal: 5,
  },
  dateText: {
    fontWeight: "bold",
    fontSize: 12, // Smaller font size for the date
    color: "#000", // Default text color
  },
  dayOfMonthText: {
    fontSize: 40, // Reduced size for the day number
    fontWeight: "400",
    color: "#000",
    marginLeft: 10,
  },
  dayOfWeekText: {
    fontSize: 14, // Reduced size for weekday text
    color: "#666",
    textTransform: "capitalize", // Ensure lowercase except the first letter
  },
  header: {
    alignItems: "center",
    flexDirection: "row",

    height: 100,

    marginTop: 10,

    paddingHorizontal: 10,

    // Center everything vertically
  },
  labelRow: {
    flexDirection: "row",
    marginTop: 0,
    marginBottom: 15,
    paddingBottom: 5,
    //borderBottomWidth: 1,
    borderBottomColor: "#CCC",
  },
  main: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
    padding: 10,
  },
  monthYearText: {
    color: "#666",
    fontSize: 14,
    textTransform: "capitalize",
  },
  scheduleRow: {
    alignItems: "flex-start",
    flexDirection: "row",
    marginBottom: 20,
  },
  selectedDateItem: {
    backgroundColor: "#FF8C00", // Orange background for selected date
  },
  selectedDateText: {
    color: "#FFF", // White text for selected date
  },
  selectedWeekdayText: {
    color: "#FFF", // Highlighted weekday text color
  },
  sortIcon: {
    color: "#666",
    fontSize: 12,
    width: 20,
  },
  subInfoText: {
    fontSize: 10,
  },
  subjectContainer: {
    borderRadius: 10,
    justifyContent: "center",
    padding: 8,
    width: "70%",
  },
  subjectLabel: {
    flex: 1,
    fontSize: 12,
    color: "#666",
    textAlign: "left",
    fontWeight: "bold",
    flexDirection: "row",
    justifyContent: "space-between", // Align the sort icon to the far right
    paddingRight: 10,
    paddingLeft: 10,
  },
  subjectText: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 3,
  },
  timeContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    width: "20%",
  },
  timeLabel: {
    width: "25%", // Match the width of the time blocks
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    fontWeight: "bold",
  },
  timeText: {
    fontSize: 13, // Smaller font for time
    fontWeight: "bold",
    textAlign: "center",
  },
  todayContainer: {
    position: "absolute",
    top: "50%",
    right: 10,
    transform: [{ translateY: -8 }], // Adjusted to fit smaller header
    flexDirection: "row",
    backgroundColor: "#e3f8e0", // Light green background
    borderRadius: 10,
    paddingVertical: 3,
    paddingHorizontal: 8,
    alignItems: "center",
    marginRight: 20,
  },
  todayText: {
    fontSize: 12, // Reduced size for "Сегодня"
    fontWeight: "bold",
    color: "#2C9A29", // Green text
  },
  verticalDivider: {
    width: 1,
    height: "90%",
    backgroundColor: "#CCC", // Gray divider
    marginRight: 10,
  },
  weekdayText: {
    fontSize: 10, // Small font size for weekday names
    color: "#666", // Default weekday color
    marginBottom: 2,
  },
});

export default function Index() {
  const { dayOfWeek, dayOfMonth, month, year, weekdays } = getDateDetails();
  const [selectedDate, setSelectedDate] = useState(
    `${dayOfMonth}.${month}.${year}`,
  );

  return (
    <>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.dayOfMonthText}>{dayOfMonth}</Text>
        <View style={styles.dateDetails}>
          <Text style={styles.dayOfWeekText}>{dayOfWeek}</Text>
          <Text style={styles.monthYearText}>
            {month} {year}
          </Text>
        </View>
        <View style={styles.todayContainer}>
          <Text style={styles.todayText}>Сегодня</Text>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.main}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.dateScroll}
        >
          {Array.from({ length: 7 }, (_, index) => {
            const day = dayOfMonth + index - 3; // Generate dates relative to today
            const displayedDay = day > 0 ? day : (day + 31) % 31 || 31; // Handle negative or overflow dates
            const weekdayIndex = (new Date().getDay() + index - 3 + 7) % 7; // Calculate weekday index
            return (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  setSelectedDate(`${displayedDay}.${month}.${year}`)
                }
                style={[
                  styles.dateItem,
                  selectedDate === `${displayedDay}.${month}.${year}` &&
                    styles.selectedDateItem,
                ]}
              >
                <Text
                  style={[
                    styles.weekdayText,
                    selectedDate === `${displayedDay}.${month}.${year}` &&
                      styles.selectedWeekdayText,
                  ]}
                >
                  {weekdays[weekdayIndex]}
                </Text>
                <Text
                  style={[
                    styles.dateText,
                    selectedDate === `${displayedDay}.${month}.${year}` &&
                      styles.selectedDateText,
                  ]}
                >
                  {displayedDay}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Column Labels */}
        <View style={styles.labelRow}>
          <Text style={styles.timeLabel}>Время</Text>
          <Text style={styles.subjectLabel}>Дисциплина</Text>
          <Text style={styles.sortIcon}>↓</Text>
        </View>

        {/* Schedule Rows */}
        <View>
          {SCHEDULE.map((item, index) => (
            <View key={index} style={styles.scheduleRow}>
              <View style={styles.timeContainer}>
                <Text style={styles.timeText}>{item.time}</Text>
              </View>
              <View style={styles.verticalDivider} />
              <View
                style={[
                  styles.subjectContainer,
                  { backgroundColor: item.backgroundColor },
                ]}
              >
                <Text style={styles.subjectText}>{item.subject}</Text>
                <Text style={styles.subInfoText}>{item.format}</Text>
                <Text style={styles.subInfoText}>{item.location}</Text>
                <Text style={styles.subInfoText}>{item.teacher}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </>
  );
}
