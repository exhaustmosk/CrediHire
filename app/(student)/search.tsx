import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All jobs");

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
  };

  const tabs = ["All jobs", "Recommended", "Bookmarked", "Applied"];
  const tabCounts = tabs.map(() => Math.floor(Math.random() * 99) + 1);

  return (
    <View style={styles.container}>
      {/* First Glass Box: Search Row */}
      <BlurView intensity={20} tint="light" style={styles.backgroundBox}>
        <View style={styles.row}>
          <View style={[styles.glassBox, { flex: 1, backgroundColor: "transparent" }]}>
            <View style={styles.overlayOutline}>
              <Ionicons name="search" size={18} color="rgba(255,255,255,1)" style={styles.icon} />
              <TextInput
                style={styles.searchBar}
                placeholder="Search..."
                placeholderTextColor="rgba(255,255,255,0.6)"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </View>

          <View style={[styles.glassBox, styles.filterBox, { backgroundColor: "transparent" }]}>
            <TouchableOpacity style={styles.center}>
              <Ionicons name="options-outline" size={20} color="rgba(255,255,255,0.9)" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>
      </BlurView>

      {/* Second Glass Box: Tabs */}
      <BlurView intensity={20} tint="light" style={styles.backgroundBox2}>
        <View style={styles.tabsRow}>
          {tabs.map((tab, index) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tabContainer, activeTab === tab && styles.activeTabContainer]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                {tab}
              </Text>
              <Text style={[styles.countText, activeTab === tab && styles.activeTabText]}>
                ({tabCounts[index]})
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </BlurView>

      {/* Third Glass Box: Results + Filters */}
<BlurView intensity={20} tint="light" style={styles.backgroundBox3}>
  <View style={styles.resultsRow}>
    {/* Left: Showing results */}
    <Text style={styles.resultsText}>
      Showing {tabCounts[tabs.indexOf(activeTab)]} results
    </Text>

    {/* Right: Filter info */}
    <View style={styles.filterInfo}>
      <Ionicons name="filter" size={16} color="#fff" style={{ marginRight: 4 }} />
      <Text style={styles.filterText}>Filters applied: Location, Skills</Text>
    </View>
  </View>
</BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, backgroundColor: "#1E3A8E" },
  backgroundBox: {
    marginHorizontal: 15,
    marginTop: 10,
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 12,
    overflow: "hidden",
  },
  backgroundBox2: {
    marginHorizontal: 15,
    marginTop: 10,
    borderRadius: 18,
    paddingVertical: 15,
    paddingHorizontal: 12,
    overflow: "hidden",
  },
  backgroundBox3: {  // new third box
    marginHorizontal: 15,
    marginTop: 10,
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 12,
    overflow: "hidden",
  },
  row: { flexDirection: "row", alignItems: "center" },
  glassBox: {
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1.2,
    borderColor: "rgba(255,255,255,1)",
  },
  resultsRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
},
resultsText: {
  color: "#d1ceceff",
  fontSize: 12,
  fontWeight: "500",
},
filterInfo: {
  flexDirection: "row",
  alignItems: "center",
},
filterText: {
  color: "#d1ceceff",
  fontSize: 12,
  fontWeight: "500",
},
  overlayOutline: { flexDirection: "row", alignItems: "center", paddingHorizontal: 10, height: 30 },
  filterBox: { width: 30, height: 30, marginLeft: 8 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  icon: { marginRight: 6 },
  searchBar: { flex: 1, color: "#fff", fontSize: 15, paddingVertical: 6, includeFontPadding: false, textAlignVertical: "center" },
  searchButton: { marginLeft: 8, backgroundColor: "#2563EB", height: 30, paddingHorizontal: 16, borderRadius: 12, justifyContent: "center", alignItems: "center" },
  searchButtonText: { color: "#fff", fontSize: 15, fontWeight: "600" },
  tabsRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  tabContainer: { paddingVertical: 6, paddingHorizontal: 10, borderRadius: 12, alignItems: "center" },
  tabText: { color: "#d1ceceff", fontSize: 12, fontWeight: "600" },
  countText: { color: "#d1ceceff", fontSize: 10, marginTop: 2 },
  activeTabContainer: { backgroundColor: "#2563EB" },
  activeTabText: { color: "#fff" },
  boxText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
