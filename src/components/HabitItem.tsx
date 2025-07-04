import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useHabits } from "../context/HabitsContext";
import { Habit } from "../types/Habit";
import Checkbox from "./Checkbox";
import HabitModal from "./HabitModal";

interface HabitItemProps {
  habit: Habit;
}

const HabitItem: React.FC<HabitItemProps> = ({ habit }) => {
  const { toggleHabit, deleteHabit } = useHabits();
  const [modalVisible, setModalVisible] = useState(false);
  const scaleValue = React.useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    toggleHabit(habit.id);
  };

  const handleCheckboxToggle = () => {
    toggleHabit(habit.id);
  };

  const handleEdit = () => {
    setModalVisible(true);
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Habit",
      `Are you sure you want to delete "${habit.name}"?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteHabit(habit.id),
        },
      ]
    );
  };

  return (
    <Animated.View
      style={[styles.container, { transform: [{ scale: scaleValue }] }]}
    >
      <TouchableOpacity
        style={[
          styles.habitContainer,
          habit.completed && styles.completedContainer,
        ]}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <View style={styles.leftContent}>
          <View
            style={[
              styles.iconContainer,
              habit.completed && styles.completedIconContainer,
            ]}
          >
            <Text style={styles.icon}>{habit.icon}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text
              style={[
                styles.habitName,
                habit.completed && styles.completedText,
              ]}
            >
              {habit.name}
            </Text>
            <Text
              style={[
                styles.habitSubtitle,
                habit.completed && styles.completedSubtitle,
              ]}
            >
              {habit.subtitle}
            </Text>
          </View>
        </View>
        <View style={styles.rightContent}>
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleEdit}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <AntDesign name="edit" size={18} color="#6c757d" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleDelete}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <AntDesign name="delete" size={18} color="#dc3545" />
            </TouchableOpacity>
          </View>
          <Checkbox
            checked={habit.completed}
            onToggle={handleCheckboxToggle}
            size={36}
            style={styles.completeButton}
            checkedStyle={styles.completeButtonChecked}
            checkedColor="#c7ffd8"
            uncheckedColor="#f3f0ff"
            borderColor="#764ba2"
          />
        </View>
      </TouchableOpacity>

      <HabitModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        habit={habit}
        mode="edit"
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  habitContainer: {
    backgroundColor: "#fff",
    borderRadius: 28,
    padding: 28,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#764ba2",
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.22,
    shadowRadius: 32,
    elevation: 16,
    borderWidth: 0,
  },
  completedContainer: {
    backgroundColor: "#e0e7ff",
    opacity: 0.8,
  },
  leftContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#f3f0ff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    borderWidth: 0,
    shadowColor: "#764ba2",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  completedIconContainer: {
    backgroundColor: "#c7ffd8",
  },
  icon: {
    fontSize: 26,
    textAlign: "center",
    textAlignVertical: "center",
    includeFontPadding: false,
    paddingTop: 2,
  },
  textContainer: {
    flex: 1,
  },
  habitName: {
    fontSize: 17,
    fontWeight: "700",
    color: "#764ba2",
    marginBottom: 2,
    letterSpacing: 0.1,
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#6c757d",
    opacity: 0.7,
  },
  habitSubtitle: {
    fontSize: 16,
    color: "#5a5a89",
    opacity: 0.95,
  },
  completedSubtitle: {
    textDecorationLine: "line-through",
    color: "#adb5bd",
    opacity: 0.7,
  },
  rightContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButtons: {
    flexDirection: "row",
    marginRight: 12,
  },
  actionButton: {
    padding: 12,
    marginHorizontal: 6,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#764ba2",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },

  completeButton: {
    borderWidth: 2,
    borderColor: "#764ba2",
    backgroundColor: "#f3f0ff",
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
    shadowColor: "#764ba2",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  completeButtonChecked: {
    backgroundColor: "#c7ffd8",
    borderColor: "#22bb77",
  },
});

export default HabitItem;
