import { BlurView } from "expo-blur";
import { useState } from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withTiming } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

// Import UpdatesEvents component
import UpdatesEvents from "../student/Dashboard/UpdatesEvents";

const { width, height } = Dimensions.get("window");
const CARD_WIDTH = (width - 60) / 3;
const SMALL_CARD_WIDTH = (width - 100) / 3;
const CARD_HEIGHT = width * 0.28;

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState<"updates" | "events">("updates");
  const expand = useSharedValue(0); // 0 = normal, 1 = fullscreen

  const handlePress = (label: string) => console.log(`${label} pressed`);

  // Fade-out for dashboard content (excluding logo & UpdatesEvents)
  const fadeOutStyle = useAnimatedStyle(() => ({
    opacity: expand.value === 1
      ? withTiming(0, { duration: 200 }) // fade out fast
      : withDelay(300, withTiming(1, { duration: 300 })), // fade in with slight delay
  }));

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.safeArea}>
        <Animated.View style={styles.container}>
          {/* Logo: always visible */}
          <View style={styles.header}>
            <Image
              source={require("../../assets/Student/Dashboard/logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          {/* Dashboard content: fades out */}
          <Animated.View style={fadeOutStyle}>
            {/* Glass Welcome Card */}
            <BlurView intensity={8} tint="light" style={styles.glassCard}>
              <Text style={styles.welcomeText}>
                Welcome Ananya 👋{"\n"}
                You have 5 new messages about jobs!
              </Text>
            </BlurView>

            {/* Stats Row */}
            <View style={styles.row}>
              <TouchableOpacity onPress={() => handlePress("Applications Sent")}>
                <BlurView intensity={8} tint="light" style={styles.statCard}>
                  <Image
                    source={require("../../assets/Student/Dashboard/applications.png")}
                    style={styles.icon}
                  />
                  <Text style={styles.number}>23</Text>
                  <Text style={styles.label}>Applications Sent</Text>
                </BlurView>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handlePress("Interview Invites")}>
                <BlurView intensity={8} tint="light" style={styles.statCard}>
                  <Image
                    source={require("../../assets/Student/Dashboard/interview.png")}
                    style={styles.icon}
                  />
                  <Text style={styles.number}>5</Text>
                  <Text style={styles.label}>Interview Invites</Text>
                </BlurView>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handlePress("Saved Jobs")}>
                <BlurView intensity={8} tint="light" style={styles.statCard}>
                  <Image
                    source={require("../../assets/Student/Dashboard/saved.png")}
                    style={styles.icon}
                  />
                  <Text style={styles.number}>18</Text>
                  <Text style={styles.label}>Saved Jobs</Text>
                </BlurView>
              </TouchableOpacity>
            </View>

            {/* Resume Section */}
            <BlurView intensity={8} tint="light" style={styles.resumeCard}>
              <Text style={styles.resumeTitle}>Resume</Text>
              <View style={styles.resumeRow}>
                <TouchableOpacity onPress={() => handlePress("Update Resume")}>
                  <BlurView intensity={8} tint="light" style={styles.smallResumeCard}>
                    <Image
                      source={require("../../assets/Student/Dashboard/update.png")}
                      style={styles.resumeIcon}
                    />
                    <Text style={styles.resumeText}>Update Resume</Text>
                  </BlurView>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handlePress("Add Resume")}>
                  <BlurView intensity={8} tint="light" style={styles.smallResumeCard}>
                    <Image
                      source={require("../../assets/Student/Dashboard/add.png")}
                      style={styles.resumeIcon}
                    />
                    <Text style={styles.resumeText}>Add Resume</Text>
                  </BlurView>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handlePress("ATS Score")}>
                  <BlurView intensity={8} tint="light" style={styles.smallResumeCard}>
                    <Image
                      source={require("../../assets/Student/Dashboard/ats.png")}
                      style={styles.resumeIcon}
                    />
                    <Text style={styles.resumeText}>ATS Score</Text>
                  </BlurView>
                </TouchableOpacity>
              </View>
            </BlurView>
          </Animated.View>

          {/* Updates & Events: always visible */}
          <UpdatesEvents expand={expand} />
        </Animated.View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#213DA8" },
  container: { flex: 1, backgroundColor: "#213DA8" },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16 },
  logo: { width: width * 0.35, height: width * 0.25 },
  glassCard: {
    marginTop: -20,
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.02)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    overflow: "hidden",
  },
  welcomeText: { fontSize: width * 0.04, color: "#fff", fontWeight: "600", textAlign: "center" },
  row: { flexDirection: "row", justifyContent: "space-between", marginTop: 20, marginHorizontal: 20 },
  statCard: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    padding: 12,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.02)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    alignItems: "flex-start",
    overflow: "hidden",
  },
  icon: { width: width * 0.06, height: width * 0.06, marginBottom: 8 },
  number: { fontSize: width * 0.045, fontWeight: "700", color: "#fff" },
  label: { fontSize: width * 0.027, color: "#D6DCEC", marginTop: 3 },
  resumeCard: {
    marginTop: 30,
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.02)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    overflow: "hidden",
  },
  resumeTitle: { fontSize: width * 0.045, fontWeight: "700", color: "#fff", marginBottom: 15 },
  resumeRow: { flexDirection: "row", justifyContent: "space-between" },
  smallResumeCard: {
    width: SMALL_CARD_WIDTH,
    height: SMALL_CARD_WIDTH * 0.95,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.02)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    overflow: "hidden",
  },
  resumeIcon: { width: width * 0.07, height: width * 0.07, marginBottom: 6 },
  resumeText: { fontSize: width * 0.028, color: "#D6DCEC", fontWeight: "500", textAlign: "center", marginTop: 6 },
});
