import { BlurView } from "expo-blur";
import React, { useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

// --- Emoji Icons as Components to prevent Text errors ---
// Removed emojis for a cleaner look. These components now render empty views.
const IconCompass: React.FC = () => <View />; 
const IconPlus: React.FC = () => <Text style={{ fontSize: width * 0.05 }}>➕</Text>;
const IconSparkle: React.FC = () => <View />; 

// --- Data Structures & Mock Data ---

interface SkillGap {
  name: string;
  currentLevel: number; // 0-100
  targetLevel: number; // 0-100
  isUrgent: boolean;
  isHighDemand: boolean;
}

const mockSkillGaps: SkillGap[] = [
  { name: 'React Native', currentLevel: 60, targetLevel: 90, isUrgent: true, isHighDemand: true },
  { name: 'Machine Learning (PyTorch)', currentLevel: 45, targetLevel: 80, isUrgent: false, isHighDemand: true },
  { name: 'AWS Cloud Services', currentLevel: 25, targetLevel: 70, isUrgent: true, isHighDemand: false },
  { name: 'System Design', currentLevel: 75, targetLevel: 95, isUrgent: false, isHighDemand: true },
  /*{ name: 'TypeScript', currentLevel: 55, targetLevel: 85, isUrgent: false, isHighDemand: false },
  { name: 'Database Management (SQL)', currentLevel: 85, targetLevel: 90, isUrgent: false, isHighDemand: true },
  { name: 'Mobile UI/UX Design', currentLevel: 30, targetLevel: 75, isUrgent: true, isHighDemand: false },*/
];

// --- Reusable Components ---

const GlassCard: React.FC<{ children: React.ReactNode, style?: object }> = ({ children, style }) => (
  <BlurView intensity={8} tint="light" style={[styles.glassCard, style]}>
    {children}
  </BlurView>
);

const SectionHeader: React.FC<{ icon: React.ReactNode, title: string, subtitle: string }> = ({ icon, title, subtitle }) => (
  <View style={styles.sectionHeader}>
    <View style={styles.titleRow}>
      {icon}
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
    <Text style={styles.headerSubtitle}>{subtitle}</Text>
  </View>
);

/**
 * Component for the "AI Career Compass" skill gap visualization.
 */
const CareerCompassItem: React.FC<{ skill: SkillGap }> = ({ skill }) => {
  const gap = skill.targetLevel - skill.currentLevel;

  // Convert percentages to pixel widths
  const contentWidth = width - 40; // Total screen width - horizontal padding
  const progressBarMaxWidth = contentWidth - (styles.compassCard.padding * 2);

  const currentWidth = (skill.currentLevel / 100) * progressBarMaxWidth;
  const targetBarWidth = (skill.targetLevel / 100) * progressBarMaxWidth;

  const PrimaryColor = '#3B82F6';
  const DangerColor = '#EF4444';

  return (
    <GlassCard style={styles.compassCard}>
      <Text style={styles.skillName}>{skill.name}</Text>

      <View style={styles.tagRow}>
        {skill.isUrgent && (
          <View style={[styles.tag, { backgroundColor: DangerColor + '33', borderColor: DangerColor + '55' }]}>
            <Text style={[styles.tagText, { color: DangerColor }]}>Urgent Focus</Text>
          </View>
        )}
        {skill.isHighDemand && (
          <View style={[styles.tag, { backgroundColor: PrimaryColor + '33', borderColor: PrimaryColor + '55' }]}>
            <Text style={[styles.tagText, { color: PrimaryColor }]}>Market Demand</Text>
          </View>
        )}
      </View>

      <View style={styles.levelRow}>
        <Text style={styles.levelText}>Current: {skill.currentLevel}%</Text>
        <Text style={styles.levelText}>Target: {skill.targetLevel}%</Text>
      </View>

      {/* Progress Bar Container */}
      <View style={[styles.progressBarContainer, { width: progressBarMaxWidth }]}>
        <View style={[styles.targetBar, { width: targetBarWidth }]}>
          <View style={styles.targetMarker} />
        </View>
        <View style={[styles.currentBar, { width: currentWidth }]} />
      </View>

      <Text style={styles.gapText}>Skill Gap: {gap} points</Text>
    </GlassCard>
  );
};

// --- Main Screen ---

export default function AIScreen() {
  const [skillGaps] = useState(mockSkillGaps);

  const handleAction = (action: string) => {
    console.log(`${action} button pressed.`);
    // TODO: Implement navigation or modal launch logic here
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

        {/* --- AI Career Compass Section (Vertical List) --- */}
        <View style={styles.section}>
          <SectionHeader
            icon={<IconCompass />}
            title="AI Career Compass"
            subtitle="Analyzes market demand against your current skills and highlights development areas."
          />

          {skillGaps.map((skill, index) => (
            <CareerCompassItem key={index} skill={skill} />
          ))}

          {/* CTA Button */}
          <TouchableOpacity onPress={() => handleAction('Manage Skills')} activeOpacity={0.8} style={styles.ctaButtonContainer}>
            <View style={styles.ctaCard}>
              <IconPlus />
              <Text style={styles.ctaText}>Manage & Explore All Skill Gaps</Text>
            </View>
          </TouchableOpacity>
        </View>

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
            
            <TouchableOpacity onPress={() => handleAction('Generate Resume')} activeOpacity={0.8} style={styles.generateButtonContainer}>
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
  safeArea: {
    flex: 1,
    backgroundColor: "#213DA8",
  },
  container: {
    flex: 1,
    backgroundColor: "#213DA8",
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  // --- Header ---
  titleHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 25,
    marginTop: 10,
  },
  pageTitle: {
    fontSize: width * 0.07,
    fontWeight: "bold",
    color: "#fff",
  },
  aiBadge: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  aiBadgeText: {
    color: '#fff',
    fontSize: width * 0.03,
    fontWeight: '600',
  },
  // --- Glass Card Styles ---
  glassCard: {
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    overflow: "hidden",
  },
  // --- Section Styling ---
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    marginBottom: 20,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  // Removed icon dependency from header titles/subtitles for clean alignment
  headerTitle: {
    fontSize: width * 0.055,
    fontWeight: '700',
    color: '#fff',
    marginLeft: 0, 
  },
  headerSubtitle: {
    fontSize: width * 0.035,
    color: '#D6DCEC',
    marginLeft: 0, // Aligns subtitle directly under the title
  },
  // --- Career Compass Item ---
  compassCard: {
    width: '100%',
    marginBottom: 15,
    padding: 18,
    justifyContent: 'space-between',
  },
  skillName: {
    fontSize: width * 0.045,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 5,
  },
  tagRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  tag: {
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 10,
    borderWidth: 1,
  },
  tagText: {
    fontSize: width * 0.03,
    fontWeight: '600',
  },
  levelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  levelText: {
    fontSize: width * 0.035,
    color: '#D6DCEC',
  },
  progressBarContainer: {
    height: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 5,
    position: 'relative',
    // Width set dynamically in component to account for card padding
  },
  targetBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    backgroundColor: 'transparent',
  },
  targetMarker: {
    position: 'absolute',
    right: 0,
    width: 3,
    height: '100%',
    backgroundColor: '#FFD700',
  },
  currentBar: {
    height: '100%',
    backgroundColor: '#3B82F6',
    borderRadius: 6,
  },
  gapText: {
    fontSize: width * 0.038,
    fontWeight: '500',
    color: '#FFD700',
    marginTop: 8,
  },
  // --- CTA Button (Manage Skills) ---
  ctaButtonContainer: {
    marginTop: 20,
    alignSelf: 'center',
    width: '100%',
  },
  ctaCard: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  ctaIcon: {
    fontSize: width * 0.05,
    color: '#fff',
    marginRight: 10,
  },
  ctaText: {
    fontSize: width * 0.042,
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center',
    marginLeft: 10,
  },
  // --- New Resume Generator Styles ---
  resumeCard: {
    padding: 20,
    alignItems: 'center',
  },
  resumeFeatureText: {
    fontSize: width * 0.038,
    color: '#D6DCEC',
    textAlign: 'center',
    lineHeight: width * 0.055,
    marginBottom: 20,
  },
  generateButtonContainer: {
    width: '90%', // Slightly smaller button inside card
    alignSelf: 'center',
  },
  generateCard: {
    backgroundColor: '#3B82F6', // Blue color to match theme
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
  },
  generateIcon: {
    fontSize: width * 0.05,
    color: '#fff',
    marginRight: 10,
  },
  generateText: {
    fontSize: width * 0.04,
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center',
  },
});
