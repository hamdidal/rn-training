import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Circle } from "react-native-progress";
import { ProcessingStatus } from "../types";
import { colors } from "../constants/styles/colors";
import { theme } from "../constants/theme";
import errorIcon from "../assets/pngs/ErrorIcon.png";

interface StatusChipProps {
  status: ProcessingStatus;
  timeRemaining?: number;
  logoUrl?: string;
  onPress?: () => void;
}

export const StatusChip: React.FC<StatusChipProps> = ({
  status,
  timeRemaining,
  logoUrl,
  onPress,
}) => {
  const chipHeight = 70;
  const isDone = status === "done";
  const isError = status === "error";
  const isProcessing = status === "processing";

  const Container: React.FC<{ children: React.ReactNode }> = ({ children }) =>
    isDone ? (
      <LinearGradient
        colors={["#3F4CE8", "#9B2DE2"]}
        start={[0, 0]}
        end={[1, 0]}
        style={[
          styles.container,
          {
            width: "100%",
            height: chipHeight,
            borderRadius: 16,
          },
        ]}
      >
        {children}
      </LinearGradient>
    ) : (
      <View
        style={[
          styles.container,
          {
            width: "100%",
            height: chipHeight,
            borderRadius: 16,
            backgroundColor: isError ? colors.error : colors.surfaceLight,
          },
        ]}
      >
        {children}
      </View>
    );

  return (
    <TouchableOpacity
      onPress={isDone || isError ? onPress : undefined}
      disabled={!(isDone || isError)}
      activeOpacity={0.8}
    >
      <Container>
        <View
          style={[
            styles.left,
            isProcessing
              ? { backgroundColor: "#18181B" }
              : isError
              ? { backgroundColor: colors.errorLight }
              : undefined,
          ]}
        >
          {isDone && logoUrl ? (
            <Image source={{ uri: logoUrl }} style={styles.logoPreview} />
          ) : isProcessing ? (
            <Circle
              size={24}
              progress={0}
              indeterminate
              thickness={2}
              color={colors.text}
            />
          ) : (
            <Image source={errorIcon} style={styles.errorIcon} />
          )}
        </View>

        <View style={styles.right}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[styles.title, { color: isDone ? "#FFF" : colors.text }]}
          >
            {isProcessing
              ? "Creating Your Design..."
              : isDone
              ? "Your Design is Ready!"
              : "Oops, something went wrong!"}
          </Text>
          <Text
            style={[
              styles.subtitle,
              { color: isDone || isError ? "#EEE" : colors.subtitle },
            ]}
          >
            {isProcessing
              ? `Ready in ${timeRemaining ?? 0}s`
              : isDone
              ? "Tap to see it."
              : "Click to try again."}
          </Text>
        </View>
      </Container>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    overflow: "hidden",
    marginVertical: theme.spacing.md,
    marginTop: 0,
  },
  left: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  right: {
    flex: 3,
    justifyContent: "center",
    paddingHorizontal: theme.spacing.md,
  },
  logoPreview: {
    width: "100%",
    height: "100%",
  },
  errorIcon: {
    width: 32,
    height: 32,
    resizeMode: "contain",
  },
  title: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: "700",
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: theme.typography.fontSize.xs,
    marginTop: theme.spacing.xs,
    fontWeight: "500",
    color: colors.subtitle,
  },
});
