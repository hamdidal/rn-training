import React, {
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from "react-native";
import { colors } from "../constants/styles/colors";
import { theme } from "../constants/theme";
import { LinearGradient } from "expo-linear-gradient";

export interface PromptInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  maxLength?: number;
  height?: number;
  gap?: number;
  paddingBottom?: number;
  onSubmit?: () => void;
  setPrompt: (prompt: string) => void;
}

export interface PromptInputHandle {
  blur: () => void;
}

export const PromptInput = forwardRef<PromptInputHandle, PromptInputProps>(
  (
    {
      value,
      onChangeText,
      placeholder = 'A blue lion logo reading "HEXA" in bold letters',
      maxLength = 500,
      height = 163,
      gap = 12,
      paddingBottom = 12,
      onSubmit,
      setPrompt,
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<TextInput>(null);

    useImperativeHandle(ref, () => ({
      blur: () => inputRef.current?.blur(),
    }));

    useEffect(() => {
      if (value === "") {
        setIsFocused(false);
      }
    }, [value]);

    const handleFocus = (_: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(true);
    };
    const handleBlur = (_: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(false);
    };

    const handleSubmit = () => {
      setIsFocused(false);
      inputRef.current?.blur();
      onSubmit?.();
      setPrompt("");
    };

    return (
      <View style={[{ gap }]}>
        <View
          style={[
            styles.inputWrapper,
            {
              width: "100%",
              minHeight: height,
              paddingBottom,
              borderColor: isFocused ? "#FFFFFF" : colors.border,
              borderWidth: 1,
            },
          ]}
        >
          <LinearGradient
            colors={["#27272A", "#27272A"]}
            style={StyleSheet.absoluteFill}
          />
          <LinearGradient
            colors={["rgba(148, 61, 255, 0.05)", "rgba(41, 56, 220, 0.05)"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={StyleSheet.absoluteFill}
          />
          <TextInput
            ref={inputRef}
            style={[styles.input, { width: "100%" }]}
            value={value}
            onChangeText={onChangeText}
            placeholder={!isFocused && value.length === 0 ? placeholder : ""}
            placeholderTextColor={colors.textSecondary}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            maxLength={maxLength}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onSubmitEditing={handleSubmit}
          />
          <Text style={styles.counter}>
            {value.length}/{maxLength}
          </Text>
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  inputWrapper: {
    position: "relative",
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
    width: "100%",
    maxWidth: "100%",
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    color: colors.text,
    width: "100%",
    minWidth: "100%",
    paddingBottom: 24,
    textAlignVertical: "top",
    flexWrap: "wrap",
    maxWidth: "100%",
  },
  counter: {
    position: "absolute",
    bottom: theme.spacing.sm,
    left: theme.spacing.md,
    fontSize: theme.typography.fontSize.xs,
    color: colors.textSecondary,
  },
});
