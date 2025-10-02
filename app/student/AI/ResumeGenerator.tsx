import { useNavigation } from "@react-navigation/native"; // ✅ Import hook
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Linking,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ResumeGenerator() {
  const navigation = useNavigation<any>(); // ✅ Hook for safe navigation

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    education: "",
    skills: "",
    experience: "",
    achievements: "",
    objective: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerate = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://192.168.1.11:5000/api/generate-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to generate resume");

      const data = await response.json();
      Alert.alert("Success 🎉", "Resume generated!", [
        {
          text: "View Resume",
          onPress: () => {
            if (data.pdfUrl) Linking.openURL(data.pdfUrl);
            else Alert.alert("Error", "No PDF URL returned.");
          },
        },
        {
          text: "Back to AI Hub",
          onPress: () => navigation.navigate("AIScreen"), // fallback navigation
        },
      ]);
    } catch (error) {
      Alert.alert("Error ❌", "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={["#213DA8", "#213DA8"]} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }} keyboardShouldPersistTaps="handled">
            <Text style={{ fontSize: 28, fontWeight: "700", color: "#fff", textAlign: "center", marginBottom: 20 }}>
              AI Resume Builder
            </Text>

            {(Object.keys(formData) as Array<keyof typeof formData>).map(field => (
              <TextInput
                key={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                placeholderTextColor="#bbb"
                value={formData[field]}
                onChangeText={text => handleChange(field, text)}
                multiline={field === "objective" || field === "skills"}
                style={{
                  backgroundColor: "rgba(255,255,255,0.15)",
                  borderRadius: 14,
                  padding: 14,
                  marginBottom: 14,
                  fontSize: 16,
                  borderWidth: 1,
                  borderColor: "#fff",
                  minHeight: field === "objective" || field === "skills" ? 80 : undefined,
                  textAlignVertical: "top",
                  color: "#fff",
                }}
              />
            ))}

            <TouchableOpacity
              onPress={handleGenerate}
              disabled={loading}
              style={{
                backgroundColor: "#2563eb",
                padding: 16,
                borderRadius: 14,
                alignItems: "center",
                marginTop: 10,
                opacity: loading ? 0.6 : 1,
              }}
            >
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}>Generate Resume</Text>}
            </TouchableOpacity>

            {/* SIMPLE BACK BUTTON */}
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ marginTop: 15, alignItems: "center" }}
            >
              <Text style={{ color: "#FFD700", fontSize: 16 }}>← Back</Text>
            </TouchableOpacity>

          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}
