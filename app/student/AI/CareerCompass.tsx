import { BlurView } from "expo-blur";
import React, { useState } from "react";
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

// --- Mock Icons (replace with actual icons if needed) ---
const IconCompass: React.FC = () => <View />;

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
];

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

const CareerCompassItem: React.FC<{ skill: SkillGap }> = ({ skill }) => {
  const gap = skill.targetLevel - skill.currentLevel;
  const contentWidth = width - 40;
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

// --- Main Career Compass Screen ---
export default function CareerCompass() {
  const [skillGaps] = useState(mockSkillGaps);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <SectionHeader
          icon={<IconCompass />}
          title="AI Career Compass"
          subtitle="Analyzes market demand against your current skills and highlights development areas."
        />

        {skillGaps.map((skill, index) => (
          <CareerCompassItem key={index} skill={skill} />
        ))}

        <View style={{ height: 50 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// --- Styles ---
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
  glassCard: {
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    overflow: "hidden",
  },
  sectionHeader: {
    marginBottom: 20,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  headerTitle: {
    fontSize: width * 0.055,
    fontWeight: '700',
    color: '#fff',
    marginLeft: 0,
  },
  headerSubtitle: {
    fontSize: width * 0.035,
    color: '#D6DCEC',
    marginLeft: 0,
  },
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
});
