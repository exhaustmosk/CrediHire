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
const IconPencil = "✏️";
const IconGlobe = "🌐";

const { width } = Dimensions.get("window");

// --- Main Profile Screen ---
export default function ProfileScreen() {
  const [profile, setProfile] = useState({
    initials: 'SJ',
    fullName: 'Sarah Johnson',
    email: 'sarah.johnson@university.edu',
    phone: '+1 (555) 123-4567',
    location: 'Palo Alto, CA',
    aboutMe: 'Passionate computer science student with a focus on machine learning and AI. Currently working on my senior capstone project involving deep learning for computer vision.',
    education: { university: 'Stanford University', major: 'Computer Science', year: 2024, gpa: '3.8/4.0' },
    socialLinks: [
      { icon: "🔗", url: '#', label: 'linkedin.com/in/sarahjohnson' },
      { icon: "💻", url: '#', label: 'github.com/sarahjohnson' },
      { icon: "🌐", url: '#', label: 'sarahjohnson.dev' },
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
  });

  const handleEditProfile = () => console.log("Edit Profile clicked!");
  const handleAddProject = () => console.log("Add Project clicked!");

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.pageTitle}>My Profile</Text>
          <TouchableOpacity onPress={handleEditProfile} style={styles.primaryButton}>
            <Text style={styles.primaryButtonIcon}>{IconPencil}</Text>
            <Text style={styles.primaryButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* --- Merged Profile Card --- */}
        <View style={{ marginBottom: 20 }}>
          <BlurView intensity={8} tint="light" style={styles.mergedCard}>
            {/* Profile Summary */}
            <ProfileSummary
              initials={profile.initials}
              fullName={profile.fullName}
              email={profile.email}
              phone={profile.phone}
              location={profile.location}
              socialLinks={profile.socialLinks}
            />

            {/* Education */}
            <Education
              university={profile.education.university}
              major={profile.education.major}
              year={profile.education.year}
              gpa={profile.education.gpa}
            />

            {/* About Me */}
            <AboutMe aboutMe={profile.aboutMe} />
          </BlurView>
        </View>

        {/* Skills and Projects in separate cards */}
        <Skills skills={profile.skills} />
        <Projects projects={profile.projects} onAddProject={handleAddProject} />

        <View style={{ height: 50 }} />

      </ScrollView>
    </SafeAreaView>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#213DA8" },
  container: { flex: 1, backgroundColor: "#213DA8" },
  contentContainer: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 20 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20, marginTop: 10 },
  pageTitle: { fontSize: width * 0.07, fontWeight: "bold", color: "#fff" },
  primaryButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#3B82F6', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 8 },
  primaryButtonText: { color: '#fff', fontSize: width * 0.035, fontWeight: '600', marginLeft: 5 },
  primaryButtonIcon: { color: '#fff', fontSize: width * 0.035 },
  mergedCard: { padding: 20, borderRadius: 16, backgroundColor: "rgba(255, 255, 255, 0.05)", borderWidth: 1, borderColor: "rgba(255,255,255,0.15)" },
});
