import { BlurView } from "expo-blur";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

const { width } = Dimensions.get("window");

interface AboutMeProps {
  aboutMe: string;
}

export default function AboutMe({ aboutMe }: AboutMeProps) {
  return (
    <View style={{ marginBottom: 20 }}>
      <BlurView intensity={8} tint="light" style={styles.card}>
        <Text style={styles.text}>{aboutMe}</Text>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 20, borderRadius: 16, backgroundColor: "rgba(255, 255, 255, 0.05)" },
  text: { fontSize: width * 0.038, color: "#D6DCEC", lineHeight: width * 0.055 },
});
