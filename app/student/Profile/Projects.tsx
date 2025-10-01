  import { BlurView } from "expo-blur";
import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";

  const { width } = Dimensions.get("window");

  // Icons (same as in profile.tsx)
  const IconPlus = "+";
  const IconMenu = "⋮"; // Vertical ellipsis for menu
  const IconExternalLink = "↗️"; // Kept the external link emoji as it's standard navigation iconography
  // IconBackArrow removed as requested.

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

  // New interface for ProjectItem props after state lifting
  interface ProjectItemProps {
    project: Project;
    openMenuId: string | null; // ID of the project whose menu is currently open
    setOpenMenuId: React.Dispatch<React.SetStateAction<string | null>>; // Function to set the open ID
  }

  // --- New Menu Component ---
  const ProjectMenu: React.FC<{ onClose: () => void, onSelect: (action: string) => void, projectTitle: string }> = ({ onClose, onSelect, projectTitle }) => {
    
    // Actions map for display and logging
    const actions = [
      { label: 'Edit', key: 'edit', color: '#fff' },
      { label: 'Reorder', key: 'reorder', color: '#fff' },
      { label: 'Delete', key: 'delete', color: '#EF4444' }, // Red for delete
    ];

    return (
      // Menu Container positioned absolutely relative to the ProjectItem View.
      <View style={styles.menuOverlay}>
        <BlurView intensity={20} tint="dark" style={styles.menuContainer}>
          
          {/* Action Items */}
          {actions.map((action) => (
            <TouchableOpacity 
              key={action.key} 
              style={styles.menuItem} 
              onPress={() => { onSelect(action.key); onClose(); }}
            >
              <Text style={[styles.menuItemText, { color: action.color }]}>{action.label}</Text>
            </TouchableOpacity>
          ))}
          
          {/* Separator between action items and the close button */}
          <View style={styles.menuDivider} />
          
          {/* Close Options Button (Last Position) */}
          <TouchableOpacity 
            onPress={onClose} 
            style={styles.menuItem}
          >
            {/* Removed IconBackArrow here */}
            <Text style={[styles.menuItemText, styles.menuBackText]}>Close Options</Text>
          </TouchableOpacity>
        </BlurView>
      </View>
    );
  };
  // --- End New Menu Component ---

  // Individual Project Item
  const ProjectItem: React.FC<ProjectItemProps> = ({ project, openMenuId, setOpenMenuId }) => {
    // Determine if *this* specific project's menu should be open
    const isMenuOpen = openMenuId === project.title; // Using title as a unique ID key

    const handleMenuAction = (action: string) => {
      // In a full app, this would trigger specific modals or data mutations
      console.log(`Action: ${action} selected for project: ${project.title}`);
    };

    const handleOpenMenu = () => {
      // Set this project's title as the currently open ID
      setOpenMenuId(project.title); 
    };

    const handleCloseMenu = () => {
      // Close the menu by setting the open ID to null
      setOpenMenuId(null);
    };

    return (
      // The zIndex ensures the open menu appears above other elements
      <View style={[styles.projectItemWrapper, { zIndex: isMenuOpen ? 10 : 1 }]}>
        <BlurView intensity={8} tint="light" style={styles.projectItemCard}>
          <View style={styles.projectHeader}>
            <Text style={styles.projectTitle}>{project.title}</Text>
            <View style={styles.projectActions}>
              {/* Menu Button (3 vertical dots) */}
              <TouchableOpacity onPress={handleOpenMenu} style={styles.menuButton}>
                <Text style={styles.menuIcon}>{IconMenu}</Text>
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

        {/* Render Menu if state is true */}
        {isMenuOpen && (
          <ProjectMenu 
            onClose={handleCloseMenu} 
            onSelect={handleMenuAction} 
            projectTitle={project.title}
          />
        )}
      </View>
    );
  };

  // Projects Component
  const Projects: React.FC<ProjectsProps> = ({ projects, onAddProject }) => {
    // State is lifted here to manage which ProjectItem menu is open globally
    const [openMenuProjectId, setOpenMenuProjectId] = useState<string | null>(null);

    return (
      // Outermost container now acts as the main card, handling the global rounding/clipping
      <View style={styles.mainProjectCardContainer}>
        <BlurView 
          intensity={8} 
          tint="light" 
          style={styles.projectsInnerBlur} // This style only handles padding
        >
          <View style={styles.projectsHeader}>
            <Text style={styles.cardTitle}>Projects</Text>
            {onAddProject && (
              <TouchableOpacity onPress={onAddProject} style={styles.addButton}>
                <Text style={styles.addButtonText}>{IconPlus} Add Project</Text>
              </TouchableOpacity>
            )}
          </View>

          {projects.map((project, index) => (
            <ProjectItem 
                key={index} 
                project={project} 
                openMenuId={openMenuProjectId} 
                setOpenMenuId={setOpenMenuProjectId} 
            />
          ))}
        </BlurView>
      </View>
    );
  };

  export default Projects;

  // --- Styles ---
  const styles = StyleSheet.create({
    // New outermost style for the main section card (View)
    mainProjectCardContainer: { 
      marginBottom: 20, 
      borderRadius: 16, 
      overflow: 'hidden', // Forces clipping for the entire component
    },
    // Style for the BlurView layer (only needs padding)
    projectsInnerBlur: {
      padding: 15,
    },
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

    // Wrapper for ProjectItem to ensure it respects the parent's overflow:hidden
    projectItemWrapper: {
      borderRadius: 16,
      overflow: 'hidden',
    },
    
    // Project Item Card style (BlurView)
    projectItemCard: {
      padding: 15,
      borderRadius: 16, 
      marginBottom: 15, 
      backgroundColor: 'rgba(255, 255, 255, 0.03)',
      overflow: 'hidden', 
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
    
    // Menu Button Styles
    menuButton: { 
      paddingHorizontal: 8, 
      paddingVertical: 5,
    },
    menuIcon: { 
      fontSize: width * 0.06, 
      color: '#A0AEC0', 
      fontWeight: 'bold',
      lineHeight: width * 0.06, 
    },

    // Context Menu Styles
    menuOverlay: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },
    menuContainer: {
        position: 'absolute',
        top: 40, 
        right: 10,
        width: 200, 
        borderRadius: 16, 
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
        paddingVertical: 0, 
        backgroundColor: 'rgba(0,0,0,0.8)',
        overflow: 'hidden', 
    },
    // Styles for the close menu item text
    menuBackText: {
        fontWeight: 'bold', 
        color: '#A0AEC0', 
    },
    menuDivider: {
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.1)',
        marginVertical: 5,
        marginHorizontal: 15,
    },
    menuItem: {
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    menuItemText: {
        fontSize: width * 0.035,
        fontWeight: '500',
    },
    
    projectDescription: { fontSize: width * 0.035, color: '#D6DCEC', marginBottom: 10 },
    skillTagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 5, marginBottom: 10 },
    skillTag: { borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4, backgroundColor: 'rgba(255,255,255,0.1)', marginRight: 5, marginBottom: 5 },
    skillTagText: { fontSize: width * 0.03, color: '#fff', fontWeight: '500' },
    projectLinksContainer: { marginTop: 5 },
    projectLink: { flexDirection: 'row', alignItems: 'center', marginBottom: 3 },
    linkIcon: { fontSize: width * 0.03, marginRight: 5, color: '#63B3ED' },
    linkLabel: { fontSize: width * 0.033, color: '#63B3ED', textDecorationLine: 'underline' },
  });
