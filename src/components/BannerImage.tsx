import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const BannerImage: React.FC = () => {
  const currentHour = new Date().getHours();
  let greeting = "Good Evening";
  let gradientColors: [string, string] = ["#667eea", "#764ba2"];
  let emoji = "🌙";

  if (currentHour >= 5 && currentHour < 12) {
    greeting = "Good Morning";
    gradientColors = ["#ff9a9e", "#fecfef"];
    emoji = "☀️";
  } else if (currentHour >= 12 && currentHour < 17) {
    greeting = "Good Afternoon";
    gradientColors = ["#a8edea", "#fed6e3"];
    emoji = "🌤️";
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.decorativeShapes}>
          <View style={[styles.shape, styles.shape1]} />
          <View style={[styles.shape, styles.shape2]} />
          <View style={[styles.shape, styles.shape3]} />
          <View style={[styles.shape, styles.shape4]} />
        </View>

        <View style={styles.content}>
          <Text style={styles.emoji}>{emoji}</Text>
          <Text style={styles.greeting}>{greeting}!</Text>
          <Text style={styles.subtitle}>Ready to build great habits?</Text>
        </View>

        <View style={styles.wave}>
          <View style={styles.waveShape} />
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
    borderRadius: 32,
    overflow: "hidden",
    shadowColor: "#764ba2",
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.22,
    shadowRadius: 32,
    elevation: 16,
    backgroundColor: "#f3f0ff",
  },
  gradient: {
    height: 200,
    paddingHorizontal: 36,
    paddingVertical: 36,
    position: "relative",
    overflow: "hidden",
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  decorativeShapes: {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0.22,
    zIndex: 1,
  },
  shape: {
    position: "absolute",
    backgroundColor: "#fff",
    opacity: 0.22,
    borderRadius: 50,
    shadowColor: "#764ba2",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
  shape1: {
    width: 80,
    height: 80,
    top: -20,
    right: -10,
    transform: [{ rotate: "45deg" }],
  },
  shape2: {
    width: 60,
    height: 60,
    bottom: -20,
    left: -20,
    borderRadius: 30,
  },
  shape3: {
    width: 40,
    height: 40,
    top: 60,
    right: 60,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
  shape4: {
    width: 100,
    height: 20,
    bottom: 40,
    right: -30,
    borderRadius: 10,
    transform: [{ rotate: "-15deg" }],
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
    paddingVertical: 12,
  },
  emoji: {
    fontSize: 60,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 32,
    padding: 12,
    shadowColor: "#764ba2",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 6,
  },
  greeting: {
    fontSize: 30,
    fontWeight: "900",
    color: "#fff",
    marginBottom: 6,
    letterSpacing: 0.5,
    textShadowColor: "rgba(118,75,162,0.25)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  subtitle: {
    fontSize: 19,
    color: "#f3f0ff",
    fontWeight: "600",
    opacity: 0.95,
    textShadowColor: "rgba(118,75,162,0.18)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
  },
  wave: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 44,
    zIndex: 2,
  },
  waveShape: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 44,
    backgroundColor: "rgba(255,255,255,0.22)",
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    opacity: 0.22,
    transform: [{ scaleX: 1.7 }],
  },
});

export default BannerImage;
