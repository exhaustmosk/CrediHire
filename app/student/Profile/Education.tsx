import { BlurView } from "expo-blur";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

const { width } = Dimensions.get("window");

interface EducationProps {
  university: string;
  major: string;
  year: number;
  gpa: string;
}

export default function Education({ university, major, year, gpa }: EducationProps) {
  return (
    <View style={{ marginBottom: 20 }}>
      <BlurView intensity={8} tint="light" style={styles.card}>
        <View style={styles.row}>
          <View style={styles.item}>
            <Text style={styles.label}>University</Text>
            <Text style={styles.value}>{university}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>Major</Text>
            <Text style={styles.value}>{major}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.item}>
            <Text style={styles.label}>Graduation Year</Text>
            <Text style={styles.value}>{year}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>GPA</Text>
            <Text style={styles.value}>{gpa}</Text>
          </View>
        </View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  item: { width: "48%" },
  label: { fontSize: width * 0.033, color: "#D6DCEC", marginBottom: 2, fontWeight: "500" },
  value: { fontSize: width * 0.038, color: "#fff", fontWeight: "500" },
});
