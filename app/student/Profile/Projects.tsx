// app/student/profile/Projects.tsx

import { BlurView } from "expo-blur";
import React from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const { width } = Dimensions.get("window");

// Icons (same as in profile.tsx)
const IconPlus = "+";
const IconPencil = "✏️";
const IconDelete = "❌";
const IconExternalLink = "↗️";

// TypeScript types
interface ProjectLink {
  label: string;
  url: string;
}

interface Project {
  title: string;
  description: string;
  skillsUsed: string[];
  links: ProjectLink[];
}

interface ProjectsProps {
  projects: Project[];
  onAddProject?: () => void;
}

// Individual Project Item
const ProjectItem: React.FC<{ project: Project }> = ({ project }) => {
  const handleAction = (action: string) => {
    console.log(`${action} ${project.title}`);
  };

  return (
    <BlurView intensity={8} tint="light" style={styles.projectItemCard}>
      <View style={styles.projectHeader}>
        <Text style={styles.projectTitle}>{project.title}</Text>
        <View style={styles.projectActions}>
          <TouchableOpacity onPress={() => handleAction('Edit')}>
            <Text style={styles.actionIcon}>{IconPencil}</Text>
          </TouchableOpacity>
          <View style={styles.actionDivider} />
          <TouchableOpacity onPress={() => handleAction('Delete')}>
            <Text style={styles.actionIcon}>{IconDelete}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.projectDescription}>{project.description}</Text>

      <View style={styles.skillTagsContainer}>
        {project.skillsUsed.map(skill => (
          <View key={skill} style={styles.skillTag}>
            <Text style={styles.skillTagText}>{skill}</Text>
          </View>
        ))}
      </View>

      <View style={styles.projectLinksContainer}>
        {project.links.map(link => (
          <TouchableOpacity 
            key={link.url} 
            onPress={() => console.log('Open link:', link.url)}
            style={styles.projectLink}
          >
            <Text style={styles.linkIcon}>{IconExternalLink}</Text>
            <Text style={styles.linkLabel}>{link.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </BlurView>
  );
};

// Projects Component
const Projects: React.FC<ProjectsProps> = ({ projects, onAddProject }) => {
  return (
    <View style={styles.sectionContainer}>
      <BlurView intensity={8} tint="light" style={{ padding: 15, borderRadius: 16 }}>
        <View style={styles.projectsHeader}>
          <Text style={styles.cardTitle}>Projects</Text>
          {onAddProject && (
            <TouchableOpacity onPress={onAddProject} style={styles.addButton}>
              <Text style={styles.addButtonText}>{IconPlus} Add Project</Text>
            </TouchableOpacity>
          )}
        </View>

        {projects.map((project, index) => (
          <ProjectItem key={index} project={project} />
        ))}
      </BlurView>
    </View>
  );
};

export default Projects;

// --- Styles ---
const styles = StyleSheet.create({
  sectionContainer: { marginBottom: 20 },
  projectsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: width * 0.05,
    fontWeight: '600',
    color: '#fff',
  },
  addButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  addButtonText: { color: '#fff', fontWeight: '600' },

  projectItemCard: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  projectTitle: {
    fontSize: width * 0.045,
    fontWeight: '600',
    color: '#fff',
    flexShrink: 1,
  },
  projectActions: { flexDirection: 'row', alignItems: 'center' },
  actionIcon: { fontSize: width * 0.04, color: '#A0AEC0', paddingHorizontal: 5 },
  actionDivider: {
    width: 1,
    height: '70%',
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginHorizontal: 5,
  },
  projectDescription: { fontSize: width * 0.035, color: '#D6DCEC', marginBottom: 10 },
  skillTagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 5, marginBottom: 10 },
  skillTag: { borderRadius: 6, paddingHorizontal: 8, paddingVertical: 4, backgroundColor: 'rgba(255,255,255,0.1)', marginRight: 5, marginBottom: 5 },
  skillTagText: { fontSize: width * 0.03, color: '#fff', fontWeight: '500' },
  projectLinksContainer: { marginTop: 5 },
  projectLink: { flexDirection: 'row', alignItems: 'center', marginBottom: 3 },
  linkIcon: { fontSize: width * 0.03, marginRight: 5, color: '#63B3ED' },
  linkLabel: { fontSize: width * 0.033, color: '#63B3ED', textDecorationLine: 'underline' },
});
