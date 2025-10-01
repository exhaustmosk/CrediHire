import { BlurView } from 'expo-blur';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

const { width } = Dimensions.get('window');

interface Skill {
  name: string;
  color: string;
}

interface SkillsProps {
  skills: Skill[];
}

const Skills: React.FC<SkillsProps> = ({ skills }) => {
  return (
    <View style={styles.sectionContainer}>
      <BlurView intensity={8} tint="light" style={styles.glassCard}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Skills</Text>
        </View>
        <View style={styles.skillsContainer}>
          {skills.map(skill => (
            <View key={skill.name} style={[styles.skillTag, { backgroundColor: skill.color + '33' }]}>
              <Text style={[styles.skillTagText, { color: skill.color }]}>{skill.name}</Text>
            </View>
          ))}
        </View>
      </BlurView>
    </View>
  );
};

export default Skills;

// --- Styles ---
const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: 20,
  },
  glassCard: {
    padding: 20,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    overflow: "hidden",
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
    paddingBottom: 10,
    marginBottom: 15,
  },
  cardIcon: {
    fontSize: width * 0.05,
    marginRight: 10,
    color: '#3B82F6',
  },
  cardTitle: {
    fontSize: width * 0.05,
    fontWeight: '600',
    color: '#fff',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillTag: {
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  skillTagText: {
    fontSize: width * 0.03,
    fontWeight: '600',
  },
});
