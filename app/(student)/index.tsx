import { BlurView } from "expo-blur";
import { useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");
const CARD_WIDTH = (width - 60) / 3;
const SMALL_CARD_WIDTH = (width - 100) / 3;

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState<"updates" | "events">("updates");

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

  const handlePress = (label: string) => {
    console.log(`${label} pressed`);
    // TODO: navigate or perform action here
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Top Row with Logo */}
        <View style={styles.header}>
          <Image
            source={require("../../assets/Student/Dashboard/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

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

        {/* Updates & Events Section */}
        <BlurView intensity={8} tint="light" style={styles.bigContainer}>
          {/* Tabs */}
          <View style={styles.tabRow}>
            <TouchableOpacity
              style={[
                styles.tabButton,
                activeTab === "updates" && styles.activeTab,
              ]}
              onPress={() => setActiveTab("updates")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "updates" && styles.activeTabText,
                ]}
              >
                Updates
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tabButton,
                activeTab === "events" && styles.activeTab,
              ]}
              onPress={() => setActiveTab("events")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "events" && styles.activeTabText,
                ]}
              >
                Events
              </Text>
            </TouchableOpacity>
          </View>

          {/* Tab Content with independent scroll */}
          <ScrollView
            style={styles.scrollList}
            contentContainerStyle={{ paddingBottom: 10 }}
          >
            {(activeTab === "updates" ? updates : events).map((item, index) => (
              <TouchableOpacity key={index} onPress={() => handlePress(item)}>
                <BlurView intensity={8} tint="light" style={styles.itemCard}>
                  <Text style={styles.sectionContent}>{item}</Text>
                </BlurView>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </BlurView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#213DA8",
  },
  container: {
    flex: 1,
    backgroundColor: "#213DA8",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  logo: {
    width: width * 0.35,
    height: width * 0.25,
  },
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
  welcomeText: {
    fontSize: width * 0.04,
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginHorizontal: 20,
  },
  statCard: {
    width: CARD_WIDTH,
    padding: 12,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.02)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    alignItems: "flex-start",
    overflow: "hidden",
  },
  icon: {
    width: width * 0.06,
    height: width * 0.06,
    marginBottom: 8,
  },
  number: {
    fontSize: width * 0.045,
    fontWeight: "700",
    color: "#fff",
  },
  label: {
    fontSize: width * 0.027,
    color: "#D6DCEC",
    marginTop: 3,
  },
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
  resumeTitle: {
    fontSize: width * 0.045,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 15,
  },
  resumeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
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
  resumeIcon: {
    width: width * 0.07,
    height: width * 0.07,
    marginBottom: 6,
  },
  resumeText: {
    fontSize: width * 0.028,
    color: "#D6DCEC",
    fontWeight: "500",
    textAlign: "center",
    marginTop: 6,
  },
  bigContainer: {
    flex: 1,
    marginTop: 30,
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.02)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    overflow: "hidden",
  },
  tabRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
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
    maxHeight: height * 0.35,
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
