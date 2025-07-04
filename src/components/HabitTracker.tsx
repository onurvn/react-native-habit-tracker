import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useHabits } from "../context/HabitsContext";
import HabitItem from "./HabitItem";
import ProgressHeader from "./ProgressHeader";
import HabitModal from "./HabitModal";
import BannerImage from "./BannerImage";

const HabitTracker: React.FC = () => {
  const { habits, loading } = useHabits();
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddHabit = () => {
    setModalVisible(true);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading your habits...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Daily Habits</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddHabit}
            activeOpacity={0.7}
          >
            <AntDesign name="plus" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        <BannerImage />
        <ProgressHeader />

        {habits.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateIcon}>🎯</Text>
            <Text style={styles.emptyStateTitle}>No habits yet!</Text>
            <Text style={styles.emptyStateSubtitle}>
              Tap the + button to add your first habit
            </Text>
          </View>
        ) : (
          <FlatList
            data={habits}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <HabitItem habit={item} />}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

      <HabitModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f0ff",
    marginTop: 50,
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 36,
    marginBottom: 32,
  },
  title: {
    fontSize: 36,
    fontWeight: "900",
    color: "#764ba2",
    letterSpacing: 0.5,
    textShadowColor: "rgba(118,75,162,0.18)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  addButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#ff6a00",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#ff6a00",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.22,
    shadowRadius: 12,
    elevation: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  listContainer: {
    paddingBottom: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    marginTop: 48,
  },
  emptyStateIcon: {
    fontSize: 80,
    marginBottom: 32,
    backgroundColor: "#fff",
    borderRadius: 40,
    padding: 12,
    shadowColor: "#764ba2",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 6,
  },
  emptyStateTitle: {
    fontSize: 30,
    fontWeight: "900",
    color: "#764ba2",
    marginBottom: 14,
    letterSpacing: 0.3,
  },
  emptyStateSubtitle: {
    fontSize: 18,
    color: "#5a5a89",
    textAlign: "center",
    lineHeight: 28,
    opacity: 0.95,
  },
});

export default HabitTracker;
