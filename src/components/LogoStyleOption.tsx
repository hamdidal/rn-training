import Monogram from "../assets/pngs/Monogram.png";
import Mascot from "../assets/pngs/Mascot.png";
import Abstract from "../assets/pngs/Abstract.png";
import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ImageBackground,
} from "react-native";
import { LogoStyle } from "../types";
import { colors } from "../constants/styles/colors";
import { theme } from "../constants/theme";
import Svg, { Path } from "react-native-svg";

interface LogoStyleOptionProps {
  style: LogoStyle;
  isSelected: boolean;
  label: string;
  onSelect: (style: LogoStyle) => void;
}

const getStyleIcon = (style: LogoStyle): React.ReactNode => {
  switch (style) {
    case "NoStyle":
      return (
        <Svg width={40} height={40} viewBox="0 0 40 40">
          <Path
            d="M20 36.6666C29.2 36.6666 36.6667 29.1999 36.6667 19.9999C36.6667 10.7999 29.2 3.33325 20 3.33325C10.8 3.33325 3.33337 10.7999 3.33337 19.9999C3.33337 29.1999 10.8 36.6666 20 36.6666Z"
            stroke="#FAFAFA"
            strokeWidth={2.7}
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M31.5001 8.33337L8.16675 31.6667"
            stroke="#FAFAFA"
            strokeWidth={2.7}
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      );
    case "Monogram":
      return (
        <ImageBackground
          source={Monogram}
          resizeMode="cover"
          style={StyleSheet.absoluteFill}
        />
      );
    case "Abstract":
      return (
        <ImageBackground
          source={Abstract}
          resizeMode="cover"
          style={StyleSheet.absoluteFill}
        />
      );
    case "Mascot":
      return (
        <ImageBackground
          source={Mascot}
          resizeMode="cover"
          style={StyleSheet.absoluteFill}
        />
      );
    default:
      return null;
  }
};

export const LogoStyleOption: React.FC<LogoStyleOptionProps> = ({
  style,
  isSelected,
  onSelect,
  label,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onSelect(style)}>
      <View
        style={[
          styles.iconContainer,
          isSelected && styles.iconSelected,
        ]}
      >
        {getStyleIcon(style)}
      </View>
      <Text style={[styles.text, isSelected && styles.textSelected]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginRight: 12,
    flexShrink: 0,
  },
  iconContainer: {
    width: 90,
    height: 90,
    borderRadius: theme.borderRadius.md,
    backgroundColor: colors.surface,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing.xs,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
  },
  iconSelected: {
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  text: {
    color: colors.textSecondary,
    fontSize: theme.typography.fontSize.xs,
  },
  textSelected: {
    color: "#FFFFFF",
  },
});