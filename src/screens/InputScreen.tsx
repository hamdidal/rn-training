import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList, LogoStyle } from "../types";
import { colors } from "../constants/styles/colors";
import { theme } from "../constants/theme";
import { PromptInput } from "../components/PromptInput";
import { LogoStyleOption } from "../components/LogoStyleOption";
import { Button } from "../components/Button";
import { StatusChip } from "../components/StatusChip";
import { useLogoGeneration } from "../hooks/useLogoGeneration";
import Vector from "../assets/pngs/Vector.png";
import { logoStyleOptions } from "../utils";

type InputScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Input"
>;

const SAMPLE_PROMPTS = [
  'A blue lion logo reading "HEXA" in bold letters',
  "A minimalist logo for a coffee shop with a cup icon",
  "A professional logo for Harrison & Co. Law Firm, using balanced serif fonts",
  "A tech startup logo with abstract geometric shapes in blue and purple",
  "A vintage bakery logo with a wheat symbol and rustic typography",
];

export default function InputScreen() {
  const navigation = useNavigation<InputScreenNavigationProp>();
  const {
    prompt,
    setPrompt,
    selectedStyle,
    setSelectedStyle,
    status,
    timeRemaining,
    logoId,
    generateLogo,
    isGenerating,
    logoUrl,
  } = useLogoGeneration();

  const handleSurpriseMe = () => {
    const idx = Math.floor(Math.random() * SAMPLE_PROMPTS.length);
    setPrompt(SAMPLE_PROMPTS[idx]);
  };
  const handleStyleSelect = (style: LogoStyle) => setSelectedStyle(style);
  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    await generateLogo();
  };
  const handleStatusPress = () => {
    if (status === "done" && logoId) {
      navigation.navigate("Output", { logoId });
    }
  };

  return (
    <SafeAreaView style={styles.flex}>
      <ImageBackground
        source={Vector}
        resizeMode="cover"
        style={styles.flex}
        imageStyle={styles.imageStyle}
      >
        <SafeAreaView style={styles.safeArea}>
          <KeyboardAvoidingView
            style={styles.flex}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
          >
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.header}>
                {status === "idle" ? (
                  <View style={styles.labelWrapper}>
                    <Text style={styles.label}>Enter Your Prompt</Text>
                    <TouchableOpacity
                      style={styles.label}
                      onPress={handleSurpriseMe}
                    >
                      <Text style={styles.surpriseText}>🎲 Surprise me</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={styles.statusContainer}>
                    <StatusChip
                      status={status}
                      timeRemaining={timeRemaining}
                      onPress={handleStatusPress}
                      logoUrl={logoUrl ?? undefined}
                    />
                  </View>
                )}

                <PromptInput
                  value={prompt}
                  onChangeText={setPrompt}
                  onSurpriseMe={handleSurpriseMe}
                />
                <Text style={styles.sectionTitle}>Logo Styles</Text>
                <FlatList
                  data={logoStyleOptions}
                  keyExtractor={(item) => item.value}
                  renderItem={({ item }) => (
                    <LogoStyleOption
                      style={item.value}
                      label={item.label}
                      isSelected={selectedStyle === item.value}
                      onSelect={handleStyleSelect}
                    />
                  )}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.stylesList}
                />
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  title="Create"
                  onPress={handleGenerate}
                  isLoading={isGenerating}
                  disabled={!prompt.trim()}
                  icon={<Text style={styles.buttonIcon}>✨</Text>}
                />
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  imageStyle: { flex: 1 },
  safeArea: { flex: 1 },
  header: {
    display: "flex",
    alignItems: "flex-start",
  },
  scrollContent: {
    padding: theme.spacing.lg,
    justifyContent: "space-between",
    height: "100%",
  },

  statusContainer: {
    alignItems: "center",
  },

  label: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: "800",
    color: colors.textLabel,
    marginBottom: theme.spacing.md,
  },

  surpriseButton: {
    padding: theme.spacing.sm,
  },

  surpriseText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: "400",
    color: colors.textLabel,
  },

  sectionTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: "800",
    color: colors.textLabel,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  stylesList: {
    paddingVertical: theme.spacing.sm,
  },

  buttonContainer: {
    alignItems: "center",
    width: "100%",
  },
  buttonIcon: {
    fontSize: 16,
  },
  labelWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
});
