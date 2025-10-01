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
import AboutMe from '../student/Profile/AboutMe';
import Education from '../student/Profile/Education';
import ProfileSummary from '../student/Profile/ProfileSummary';
import Projects from '../student/Profile/Projects';
import Skills from '../student/Profile/Skills';

// Placeholder Icons
const IconMail = "📧";
const IconPhone = "📞";
const IconMapPin = "📍";
const IconLinkedin = "🔗";
const IconGithub = "💻";
const IconGlobe = "🌐";
const IconGraduationCap = "🎓";
const IconBookOpen = "📖";
const IconCode = "⚙️";
const IconPencil = "✏️";
const IconDelete = "❌";
const IconExternalLink = "↗️";

const { width } = Dimensions.get("window");

// --- Data Structures ---
interface Skill { name: string; color: string; }
interface Education { university: string; major: string; year: number; gpa: string; }
interface SocialLink { icon: string; url: string; label: string; }
interface ProjectLink { label: string; url: string; }
interface Project { title: string; description: string; skillsUsed: string[]; links: ProjectLink[]; }
interface UserProfile {
  initials: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  aboutMe: string;
  education: Education;
  socialLinks: SocialLink[];
  skills: Skill[];
  projects: Project[];
}

// --- Mock Data ---
const mockProfileData: UserProfile = {
  initials: 'SJ',
  fullName: 'Sarah Johnson',
  email: 'sarah.johnson@university.edu',
  phone: '+1 (555) 123-4567',
  location: 'Palo Alto, CA',
  aboutMe: 'Passionate computer science student with a focus on machine learning and AI. Currently working on my senior capstone project involving deep learning for computer vision.',
  education: { university: 'Stanford University', major: 'Computer Science', year: 2024, gpa: '3.8/4.0' },
  socialLinks: [
    { icon: IconLinkedin, url: '#', label: 'linkedin.com/in/sarahjohnson' },
    { icon: IconGithub, url: '#', label: 'github.com/sarahjohnson' },
    { icon: IconGlobe, url: '#', label: 'sarahjohnson.dev' },
  ],
  skills: [
    { name: 'Python', color: '#10B981' },
    { name: 'Machine Learning', color: '#F59E0B' },
    { name: 'React', color: '#0EA5E9' },
    { name: 'TypeScript', color: '#3B82F6' },
    { name: 'Node.js', color: '#059669' },
    { name: 'PostgreSQL', color: '#4F46E5' },
    { name: 'TensorFlow', color: '#F97316' },
    { name: 'AWS', color: '#64748B' },
  ],
  projects: [
    { title: 'AI-Powered Study Assistant', description: 'ML app to optimize student study schedules.', skillsUsed: ['Python', 'TensorFlow', 'React'], links: [{ label: 'github.com/sj/study-assistant', url: '#' }] },
    { title: 'Campus Event Management System', description: 'Full-stack web app for managing university events.', skillsUsed: ['React', 'Node.js', 'PostgreSQL'], links: [{ label: 'github.com/sj/campus-events', url: '#' }] },
    { title: 'Computer Vision for Medical Imaging', description: 'Deep learning model for detecting anomalies in scans.', skillsUsed: ['Python', 'PyTorch', 'OpenCV'], links: [{ label: 'github.com/sj/medical-vision', url: '#' }] },
  ],
};

// --- Reusable Components ---
const GlassCard: React.FC<{ children: React.ReactNode; style?: object }> = ({ children, style }) => (
  <BlurView intensity={8} tint="light" style={[styles.glassCard, style]}>{children}</BlurView>
);

const PrimaryButton: React.FC<{ icon: string; label: string; onPress?: () => void }> = ({ icon, label, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.primaryButton} activeOpacity={0.8}>
    <Text style={styles.primaryButtonIcon}>{icon}</Text>
    <Text style={styles.primaryButtonText}>{label}</Text>
  </TouchableOpacity>
);

const ProfileCard: React.FC<{ title: string; children: React.ReactNode; icon: string }> = ({ title, children, icon }) => (
  <View style={styles.sectionContainer}>
    <GlassCard>
      <View style={styles.cardHeader}>
        <Text style={styles.cardIcon}>{icon}</Text>
        <Text style={styles.cardTitle}>{title}</Text>
      </View>
      <View style={styles.cardContent}>{children}</View>
    </GlassCard>
  </View>
);

// --- Main Profile Screen ---
export default function ProfileScreen() {
  const [profile, setProfile] = useState(mockProfileData);

  const handleEditProfile = () => console.log("Edit Profile clicked!");
  const handleAddProject = () => console.log("Add Project clicked!");

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.pageTitle}>My Profile</Text>
          <PrimaryButton icon={IconPencil} label="Edit Profile" onPress={handleEditProfile} />
        </View>

        {/* Profile Summary */}
        <ProfileSummary {...profile} />

        {/* Detail Sections */}
        <View style={styles.detailsColumn}>
          {/* Education */}
          <Education {...profile.education} />

          {/* About Me */}
          <AboutMe aboutMe={profile.aboutMe} />

          {/* Skills */}
          <Skills skills={profile.skills} />

          {/* Projects */}
          <Projects projects={profile.projects} onAddProject={handleAddProject} />

        </View>

        <View style={{ height: 50 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#213DA8" },
  container: { flex: 1, backgroundColor: "#213DA8", paddingHorizontal: 20 },
  contentContainer: { paddingTop: 10, paddingBottom: 20 },
  glassCard: { padding: 20, borderRadius: 16, backgroundColor: "rgba(255, 255, 255, 0.05)", borderWidth: 1, borderColor: "rgba(255,255,255,0.15)", overflow: "hidden" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20, marginTop: 10 },
  pageTitle: { fontSize: width * 0.07, fontWeight: "bold", color: "#fff" },
  primaryButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#3B82F6', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 8 },
  primaryButtonText: { color: '#fff', fontSize: width * 0.035, fontWeight: '600', marginLeft: 5 },
  primaryButtonIcon: { color: '#fff', fontSize: width * 0.035 },
  summaryContainer: { marginBottom: 20 },
  summaryCard: { padding: 25 },
  avatarCircle: { width: width * 0.25, height: width * 0.25, borderRadius: width * 0.125, backgroundColor: '#3B82F6', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginBottom: 20 },
  avatarText: { fontSize: width * 0.07, fontWeight: 'bold', color: '#fff' },
  contactDetails: { paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.1)' },
  fullName: { fontSize: width * 0.05, fontWeight: '700', color: '#fff', marginBottom: 10, textAlign: 'center' },
  detailRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  detailIcon: { fontSize: width * 0.04, marginRight: 10, width: width * 0.05, textAlign: 'center' },
  detailText: { fontSize: width * 0.038, color: '#D6DCEC' },
  socialLinksSection: { paddingTop: 20 },
  socialTitle: { fontSize: width * 0.045, fontWeight: '600', color: '#fff', marginBottom: 10 },
  socialLinkRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  socialLinkIcon: { fontSize: width * 0.035, marginRight: 10, color: '#93C5FD' },
  socialLinkText: { fontSize: width * 0.035, color: '#93C5FD' },
  detailsColumn: {},
  sectionContainer: { marginBottom: 20 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.1)', paddingBottom: 10, marginBottom: 15 },
  cardIcon: { fontSize: width * 0.05, marginRight: 10, color: '#3B82F6' },
  cardTitle: { fontSize: width * 0.05, fontWeight: '600', color: '#fff' },
  cardContent: {},
  educationSection: { marginBottom: -10 },
  educationRow: { flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: 10 },
  eduItem: { width: '48%', marginBottom: 10 },
  eduLabel: { fontSize: width * 0.033, fontWeight: '500', color: '#D6DCEC', marginBottom: 2 },
  eduValue: { fontSize: width * 0.038, color: '#fff', fontWeight: '500' },
  aboutMeText: { fontSize: width * 0.038, color: '#D6DCEC', lineHeight: width * 0.055 },
  skillsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  skillTag: { borderRadius: 6, paddingHorizontal: 10, paddingVertical: 5 },
  skillTagText: { fontSize: width * 0.03, fontWeight: '600' },
  projectItemCard: { padding: 15, borderRadius: 10, marginBottom: 15, backgroundColor: 'rgba(255, 255, 255, 0.03)' },
});
