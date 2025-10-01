import { BlurView } from "expo-blur";
import { useState } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { SharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

interface UpdatesEventsProps {
  expand: SharedValue<number>;
}

const updates = [
  "🔹 Company XYZ opened internship applications",
  "🔹 Your resume has been viewed 15 times",
  "🔹 New job recommendations available",
  "🔹 Company ABC is hiring Data Analysts",
  "🔹 Career tips newsletter released",
  "🔹 Your ATS Score improved by 12%",
  "🔹 Recommended skill: React Native",
  "🔹 New recruiter followed you",
];

const events = [
  "🎉 Career Fair on Oct 5th",
  "🎤 Webinar: Cracking Interviews – Oct 7th",
  "📌 Hackathon registrations open",
  "🏆 Coding Challenge Finals – Oct 12th",
  "📚 Resume Workshop – Oct 15th",
  "🤝 Networking Meetup – Oct 18th",
  "🚀 Startup Pitch Event – Oct 20th",
  "🎓 Alumni Talk: Careers Abroad – Oct 22nd",
];

export default function UpdatesEvents({ expand }: UpdatesEventsProps) {
  const [activeTab, setActiveTab] = useState<"updates" | "events">("updates");

  const handlePress = (label: string) => console.log(`${label} pressed`);

  const panGesture = Gesture.Pan().onEnd((e) => {
    if (e.translationY < -50) expand.value = 1;
    else if (e.translationY > 50) expand.value = 0;
  });

  const animatedStyle = useAnimatedStyle(() => {
    // Reduced bounce by increasing damping and lowering stiffness
    const springConfig = { damping: 35, stiffness: 100 };

    const top = withSpring(expand.value ? 0 : height * 0.55, springConfig);
    const borderRadius = withSpring(expand.value ? 0 : 20, springConfig);
    const marginHorizontal = withSpring(expand.value ? 0 : 20, springConfig);
    const containerHeight = withSpring(expand.value ? height : height * 0.45, springConfig);

    return {
      position: "absolute",
      top,
      left: marginHorizontal,
      right: marginHorizontal,
      height: containerHeight,
      borderRadius,
      zIndex: 100,
      overflow: "hidden",
    };
  });

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.bigContainer, animatedStyle]}>
        <BlurView intensity={8} tint="light" style={StyleSheet.absoluteFill} />

        {/* Tabs */}
        <View style={styles.tabRow}>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === "updates" && styles.activeTab]}
            onPress={() => setActiveTab("updates")}
          >
            <Text style={[styles.tabText, activeTab === "updates" && styles.activeTabText]}>Updates</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === "events" && styles.activeTab]}
            onPress={() => setActiveTab("events")}
          >
            <Text style={[styles.tabText, activeTab === "events" && styles.activeTabText]}>Events</Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <Animated.ScrollView
          style={styles.scrollList}
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          {(activeTab === "updates" ? updates : events).map((item, index) => (
            <TouchableOpacity key={index} onPress={() => handlePress(item)}>
              <BlurView intensity={8} tint="light" style={styles.itemCard}>
                <Text style={styles.sectionContent}>{item}</Text>
              </BlurView>
            </TouchableOpacity>
          ))}
        </Animated.ScrollView>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  bigContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.02)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    overflow: "hidden",
    marginTop: 80,
  },
  tabRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 10,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    overflow: "hidden",
  },
  activeTab: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
  tabText: {
    fontSize: width * 0.035,
    color: "#D6DCEC",
    fontWeight: "500",
  },
  activeTabText: {
    color: "#fff",
    fontWeight: "700",
  },
  scrollList: {
    marginTop: 15,
  },
  itemCard: {
    marginBottom: 10,
    padding: 12,
    borderRadius: 14,
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    overflow: "hidden",
  },
  sectionContent: {
    fontSize: width * 0.034,
    color: "#fff",
    lineHeight: 22,
  },
});
