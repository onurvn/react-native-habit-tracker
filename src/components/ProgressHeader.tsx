import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useHabits } from "../context/HabitsContext";

const ProgressHeader: React.FC = () => {
  const { getCompletedCount, getTotalCount } = useHabits();

  const completed = getCompletedCount();
  const total = getTotalCount();
  const progressPercentage = total > 0 ? (completed / total) * 100 : 0;

  return (
    <View style={styles.container}>
      <View style={styles.progressInfo}>
        <Text style={styles.progressHeadingText}>You are almost there!</Text>
      </View>
      <View style={styles.progressInfo}>
        <Text style={styles.progressText}>
          {completed}/{total} habits completed
        </Text>
        <Text style={styles.percentageText}>
          {Math.round(progressPercentage)}%
        </Text>
      </View>
      <View style={styles.progressBarContainer}>
        <View
          style={[styles.progressBar, { width: `${progressPercentage}%` }]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 28,
    padding: 32,
    marginBottom: 32,
    shadowColor: "#764ba2",
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.22,
    shadowRadius: 32,
    elevation: 16,
    borderWidth: 0,
  },
  progressInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  progressHeadingText: {
    fontSize: 26,
    fontWeight: "900",
    color: "#764ba2",
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  progressText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#5a5a89",
    opacity: 0.95,
  },
  percentageText: {
    fontSize: 30,
    fontWeight: "900",
    color: "#ff6a00",
    marginLeft: 12,
    textShadowColor: "rgba(255,106,0,0.18)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  progressBarContainer: {
    height: 14,
    backgroundColor: "#e0e7ff",
    borderRadius: 7,
    overflow: "hidden",
    marginTop: 12,
    borderWidth: 0,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#ff6a00",
    borderRadius: 7,
    shadowColor: "#ff6a00",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 4,
  },
});

export default ProgressHeader;
