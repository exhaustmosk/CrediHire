import { BlurView } from "expo-blur";
import React from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const { width } = Dimensions.get("window");

interface SocialLink {
  icon: string;
  url: string;
  label: string;
}

interface ProfileSummaryProps {
  initials: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  socialLinks: SocialLink[];
}

export default function ProfileSummary({
  initials, fullName, email, phone, location, socialLinks
}: ProfileSummaryProps) {
  const IconMail = "📧";
  const IconPhone = "📞";
  const IconMapPin = "📍";

  return (
    <View style={{ marginBottom: 20 }}>
      <BlurView intensity={8} tint="light" style={styles.card}>
        {/* Avatar */}
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
        {/* Contact Details */}
        <View style={styles.contactDetails}>
          <Text style={styles.fullName}>{fullName}</Text>
          <View style={styles.row}><Text style={styles.icon}>{IconMail}</Text><Text style={styles.text}>{email}</Text></View>
          <View style={styles.row}><Text style={styles.icon}>{IconPhone}</Text><Text style={styles.text}>{phone}</Text></View>
          <View style={styles.row}><Text style={styles.icon}>{IconMapPin}</Text><Text style={styles.text}>{location}</Text></View>
        </View>
        {/* Social Links */}
        <View style={{ paddingTop: 20 }}>
          {socialLinks.map((link, index) => (
            <TouchableOpacity key={index} onPress={() => console.log(link.url)} style={styles.socialRow}>
              <Text style={styles.socialIcon}>{link.icon}</Text>
              <Text style={styles.socialText}>{link.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 25, borderRadius: 16, backgroundColor: "rgba(255, 255, 255, 0.05)", borderWidth: 1, borderColor: "rgba(255,255,255,0.15)" },
  avatarCircle: { width: width * 0.25, height: width * 0.25, borderRadius: width * 0.125, backgroundColor: '#3B82F6', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginBottom: 20 },
  avatarText: { fontSize: width * 0.07, fontWeight: 'bold', color: '#fff' },
  contactDetails: { paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.1)' },
  fullName: { fontSize: width * 0.05, fontWeight: '700', color: '#fff', marginBottom: 10, textAlign: 'center' },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  icon: { fontSize: width * 0.04, marginRight: 10, width: width * 0.05, textAlign: 'center' },
  text: { fontSize: width * 0.038, color: '#D6DCEC' },
  socialRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  socialIcon: { fontSize: width * 0.035, marginRight: 10, color: '#93C5FD' },
  socialText: { fontSize: width * 0.035, color: '#93C5FD' },
});
