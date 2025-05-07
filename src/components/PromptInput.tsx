import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
} from "react-native";
import { colors } from "../constants/styles/colors";
import { theme } from "../constants/theme";

interface PromptInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onSurpriseMe?: () => void;
  maxLength?: number;

  width?: number;
  height?: number;
  gap?: number;
  paddingBottom?: number;
}

export const PromptInput: React.FC<PromptInputProps> = ({
  value,
  onChangeText,
  placeholder = 'A blue lion logo reading "HEXA" in bold letters',
  onSurpriseMe,
  maxLength = 500,
  height = 163,
  gap = 12,
  paddingBottom = 12,
}) => {
  return (
    <View style={[{ gap }]}>
      <View
        style={[
          styles.inputWrapper,
          {
            minHeight: height,
            paddingBottom,
          },
        ]}
      >
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          maxLength={maxLength}
        />
        <Text style={styles.counter}>
          {value.length}/{maxLength}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: "800",
    color: colors.textLabel,
  },
  surpriseButton: {
    paddingHorizontal: theme.spacing.sm,
  },
  surpriseText: {
    color: colors.textLabel,
    fontSize: theme.typography.fontSize.sm,
  },
  inputWrapper: {
    position: "relative",
    backgroundColor: colors.surface,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
  },
  input: {
    flex: 1,
    color: colors.text,
  },
  counter: {
    position: "absolute",
    bottom: theme.spacing.sm,
    left: theme.spacing.md,
    fontSize: theme.typography.fontSize.xs,
    color: colors.textSecondary,
  },
});
