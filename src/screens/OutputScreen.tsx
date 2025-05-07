import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  Text,
  ActivityIndicator,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList, LogoResult, LogoRequest } from "../types";
import { colors } from "../constants/styles/colors";
import { theme } from "../constants/theme";
import {
  getLogoRequest,
  getLogoResultByRequestId,
} from "../services/logoService";
import Vector from "../assets/pngs/Vector.png";
import Icon from "@expo/vector-icons/Feather";
import * as Clipboard from "expo-clipboard";
import { Button } from "../components/Button";

type OutputScreenRouteProp = RouteProp<RootStackParamList, "Output">;
type OutputScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Output"
>;

const OutputScreen = () => {
  const route = useRoute<OutputScreenRouteProp>();
  const navigation = useNavigation<OutputScreenNavigationProp>();
  const { logoId } = route.params;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [logoRequest, setLogoRequest] = useState<LogoRequest | null>(null);
  const [logoResult, setLogoResult] = useState<LogoResult | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);

        const req = await getLogoRequest(logoId);
        if (!req) throw new Error("Logo request not found");
        setLogoRequest(req);

        const res = await getLogoResultByRequestId(logoId);
        if (!res) throw new Error("Logo result not found");
        setLogoResult(res);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    })();
  }, [logoId]);

  const handleClose = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Input" }],
    });
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading your design...</Text>
      </SafeAreaView>
    );
  }

  if (error || !logoResult) {
    return (
      <SafeAreaView style={[styles.container, styles.center]}>
        <Text style={styles.errorTitle}>Oops, something went wrong!</Text>
        <Text style={styles.errorMessage}>{error || "Unable to load."}</Text>
        <Button title="Try Again" onPress={() => navigation.goBack()} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={Vector}
        resizeMode="cover"
        style={styles.flex}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Your Design</Text>
          <TouchableOpacity
            onPress={handleClose}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Icon name="x" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.logoCard}>
            <Image
              source={{ uri: logoResult.imageUrl }}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>

          <View style={styles.promptCard}>
            <View style={styles.promptRow}>
              <Text style={styles.promptLabel}>Prompt</Text>
              <TouchableOpacity
                onPress={async () => {
                  if (logoRequest?.prompt) {
                    await Clipboard.setStringAsync(logoRequest.prompt);
                    Alert.alert("Copied", "Prompt copied to clipboard.");
                  }
                }}
              >
                <View style={styles.copyContainer}>
                  <Icon name="copy" size={18} color={colors.copyLabel} />
                  <Text style={styles.copyText}>Copy</Text>
                </View>
              </TouchableOpacity>
            </View>
            {logoRequest && (
              <>
                <Text style={styles.promptText}>{logoRequest.prompt}</Text>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>{logoRequest.style}</Text>
                </View>
              </>
            )}
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get("window");
const logoSize = width - theme.spacing.lg * 2;
const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    flex: 1,
    padding: 0,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  imageStyle: { flex: 1 },

  header: {
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: theme.spacing.lg,
  },
  headerTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: "800",
    color: colors.textLabel,
  },

  loadingText: {
    marginTop: theme.spacing.md,
    color: colors.text,
    fontSize: theme.typography.fontSize.md,
  },
  errorTitle: {
    color: colors.error,
    fontSize: theme.typography.fontSize.lg,
    fontWeight: "bold",
    marginBottom: theme.spacing.md,
  },
  errorMessage: {
    color: colors.textSecondary,
    fontSize: theme.typography.fontSize.md,
    textAlign: "center",
    marginBottom: theme.spacing.xl,
  },

  content: {
    flex: 1,
    width: "100%",
    paddingHorizontal: theme.spacing.lg,
  },
  logoCard: {
    width: "100%",
    height: logoSize,
    backgroundColor: colors.surface,
    borderRadius: theme.borderRadius.xl,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
  },
  logoImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },

  promptCard: {
    width: "100%",
    backgroundColor: "#27272A",
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.ms,
    gap: theme.spacing.ms,
  },
  promptRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  promptLabel: {
    fontSize: theme.typography.fontSize.sm,
    color: colors.text,
  },
  promptText: {
    fontSize: theme.typography.fontSize.md,
    color: colors.text,
    marginBottom: theme.spacing.md,
    fontWeight: "700",
  },
  tag: {
    alignSelf: "flex-start",
    backgroundColor: "#FAFAFA1A",
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs / 2,
    borderRadius: theme.borderRadius.md,
  },
  tagText: {
    color: "#fff",
    fontSize: theme.typography.fontSize.xs,
  },
  copyContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
  },
  copyText: {
    color: colors.copyLabel,
    fontSize: theme.typography.fontSize.xs,
  },
});

export default OutputScreen;
