import { BlurView } from "expo-blur";
import { useRouter } from "expo-router"; // ✅ Import router
import React from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CareerCompass from "../student/AI/CareerCompass";

const { width } = Dimensions.get("window");

// --- Icons ---
const IconSparkle: React.FC = () => <View />;

// --- Reusable Components ---
const GlassCard: React.FC<{ children: React.ReactNode; style?: object }> = ({ children, style }) => (
  <BlurView intensity={8} tint="light" style={[styles.glassCard, style]}>
    {children}
  </BlurView>
);

const SectionHeader: React.FC<{ icon: React.ReactNode; title: string; subtitle: string }> = ({ icon, title, subtitle }) => (
  <View style={styles.sectionHeader}>
    <View style={styles.titleRow}>
      {icon}
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
    <Text style={styles.headerSubtitle}>{subtitle}</Text>
  </View>
);

// --- Main AI Screen ---
export default function AIScreen() {
  const router = useRouter(); // ✅ Use router

  const handleAction = (action: string) => {
    if (action === "Generate Resume") {
      router.push("/student/AI/ResumeGenerator"); // ✅ Navigate to ResumeGenerator
      return;
    }
    console.log(`${action} button pressed.`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Page Title */}
        <View style={styles.titleHeader}>
          <Text style={styles.pageTitle}>AI Career Hub</Text>
          <View style={styles.aiBadge}>
            <Text style={styles.aiBadgeText}>Powered by AI</Text>
          </View>
        </View>

        {/* --- AI Career Compass Section --- */}
        <CareerCompass />

        {/* --- AI Resume Generator Section --- */}
        <View style={styles.section}>
          <SectionHeader
            icon={<IconSparkle />}
            title="AI Resume Generator"
            subtitle="Instantly generate and optimize your resume for specific job descriptions."
          />

          <GlassCard style={styles.resumeCard}>
            <Text style={styles.resumeFeatureText}>
              Leverage AI to tailor your career summary, project descriptions, and skill endorsements, ensuring maximum ATS compatibility and recruiter appeal.
            </Text>

            <TouchableOpacity
              onPress={() => handleAction("Generate Resume")}
              activeOpacity={0.8}
              style={styles.generateButtonContainer}
            >
              <View style={styles.generateCard}>
                <Text style={styles.generateIcon}>📄</Text>
                <Text style={styles.generateText}>Generate AI Resume</Text>
              </View>
            </TouchableOpacity>
          </GlassCard>
        </View>

        <View style={{ height: 50 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// --- Stylesheet ---
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#213DA8" },
  container: { flex: 1, backgroundColor: "#213DA8" },
  contentContainer: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 20 },
  glassCard: { borderRadius: 16, backgroundColor: "rgba(255, 255, 255, 0.05)", borderWidth: 1, borderColor: "rgba(255,255,255,0.15)", overflow: "hidden" },
  titleHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 25, marginTop: 10 },
  pageTitle: { fontSize: width * 0.07, fontWeight: "bold", color: "#fff" },
  aiBadge: { backgroundColor: '#3B82F6', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  aiBadgeText: { color: '#fff', fontSize: width * 0.03, fontWeight: '600' },
  section: { marginBottom: 30 },
  sectionHeader: { marginBottom: 20 },
  titleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  headerTitle: { fontSize: width * 0.055, fontWeight: '700', color: '#fff', marginLeft: 0 },
  headerSubtitle: { fontSize: width * 0.035, color: '#D6DCEC', marginLeft: 0 },
  resumeCard: { padding: 20, alignItems: 'center' },
  resumeFeatureText: { fontSize: width * 0.038, color: '#D6DCEC', textAlign: 'center', lineHeight: width * 0.055, marginBottom: 20 },
  generateButtonContainer: { width: '90%', alignSelf: 'center' },
  generateCard: { backgroundColor: '#3B82F6', borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 14 },
  generateIcon: { fontSize: width * 0.05, color: '#fff', marginRight: 10 },
  generateText: { fontSize: width * 0.04, color: '#fff', fontWeight: '700', textAlign: 'center' },
});
