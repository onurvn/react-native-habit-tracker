import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useHabits } from "../context/HabitsContext";
import { Habit, HabitFormData } from "../types/Habit";

interface HabitModalProps {
  visible: boolean;
  onClose: () => void;
  habit?: Habit;
  mode?: "add" | "edit";
}

const COMMON_ICONS = [
  "💧",
  "🏃‍♂️",
  "📚",
  "🧘‍♀️",
  "🥗",
  "💤",
  "🎵",
  "☕",
  "🚶‍♀️",
  "📱",
  "🧹",
  "💊",
  "🎯",
  "📝",
  "🎨",
  "🌱",
  "🏋️‍♀️",
  "🍎",
  "🧠",
  "❤️",
  "⭐",
  "🔥",
  "✨",
  "🌟",
  "🛏️",
  "🧘",
  "🥗",
];

const HabitModal: React.FC<HabitModalProps> = ({
  visible,
  onClose,
  habit,
  mode = "add",
}) => {
  const { addHabit, updateHabit } = useHabits();
  const [formData, setFormData] = useState<HabitFormData>({
    icon: "🎯",
    name: "",
    subtitle: "",
  });

  useEffect(() => {
    if (habit && mode === "edit") {
      setFormData({
        icon: habit.icon,
        name: habit.name,
        subtitle: habit.subtitle,
      });
    } else {
      setFormData({
        icon: "🎯",
        name: "",
        subtitle: "",
      });
    }
  }, [habit, mode, visible]);

  const handleSave = () => {
    if (!formData.name.trim()) {
      Alert.alert("Error", "Please enter a habit name");
      return;
    }

    if (mode === "edit" && habit) {
      updateHabit(habit.id, formData);
    } else {
      addHabit(formData);
    }

    onClose();
  };

  const handleClose = () => {
    setFormData({
      icon: "🎯",
      name: "",
      subtitle: "",
    });
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleClose}
    >
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
          <View style={styles.header}>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <AntDesign name="close" size={24} color="#6c757d" />
            </TouchableOpacity>
            <Text style={styles.title}>
              {mode === "edit" ? "Edit Habit" : "Add New Habit"}
            </Text>
            <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Icon</Text>
              <View style={styles.iconGrid}>
                {COMMON_ICONS.map((icon) => (
                  <TouchableOpacity
                    key={icon}
                    style={[
                      styles.iconOption,
                      formData.icon === icon && styles.selectedIcon,
                    ]}
                    onPress={() => setFormData({ ...formData, icon })}
                  >
                    <Text style={styles.iconText}>{icon}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Habit Name</Text>
              <TextInput
                style={styles.textInput}
                value={formData.name}
                onChangeText={(name) => setFormData({ ...formData, name })}
                placeholder="e.g., Drink water"
                placeholderTextColor="#adb5bd"
                maxLength={50}
                returnKeyType="next"
                blurOnSubmit={false}
              />
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Description (Optional)</Text>
              <TextInput
                style={styles.textInput}
                value={formData.subtitle}
                onChangeText={(subtitle) =>
                  setFormData({ ...formData, subtitle })
                }
                placeholder="e.g., 8 glasses a day"
                placeholderTextColor="#adb5bd"
                maxLength={100}
                returnKeyType="done"
                blurOnSubmit={true}
              />
            </View>

            <View style={styles.preview}>
              <Text style={styles.previewTitle}>Preview</Text>
              <View style={styles.previewCard}>
                <View style={styles.previewIcon}>
                  <Text style={styles.previewIconText}>{formData.icon}</Text>
                </View>
                <View style={styles.previewText}>
                  <Text style={styles.previewName}>
                    {formData.name || "Habit name"}
                  </Text>
                  <Text style={styles.previewSubtitle}>
                    {formData.subtitle || "Description"}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.bottomPadding} />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f7fb",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 18,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#2d3748",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  closeButton: {
    padding: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  saveButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
    borderRadius: 1,
    shadowColor: "#764ba2",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 2,
  },
  saveButtonText: {
    fontWeight: "700",
    fontSize: 17,
    letterSpacing: 0.2,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  section: {
    marginTop: 28,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 12,
  },
  iconGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  iconOption: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
    shadowColor: "#2d3748",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedIcon: {
    borderColor: "#667eea",
    backgroundColor: "#f0f8ff",
  },
  iconText: {
    fontSize: 24,
  },
  textInput: {
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 16,
    fontSize: 17,
    color: "#23235b",
    borderWidth: 1,
    borderColor: "#e9ecef",
    marginBottom: 2,
  },
  preview: {
    marginTop: 32,
  },
  previewTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 12,
  },
  previewCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#2d3748",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.13,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: "#f1f1f1",
  },
  previewIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#f5f7fa",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  previewIconText: {
    fontSize: 24,
  },
  previewText: {
    flex: 1,
  },
  previewName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  previewSubtitle: {
    fontSize: 14,
    color: "#6c757d",
  },
  bottomPadding: {
    height: 100,
  },
});

export default HabitModal;
