import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator,
  View
} from 'react-native';
import { colors } from '../constants/styles/colors';
import { theme } from '../constants/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  isLoading = false,
  disabled = false,
  icon,
}) => {
  const buttonDisabled = disabled || isLoading;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        buttonDisabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={buttonDisabled}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={colors.text} />
      ) : (
        <View style={styles.contentContainer}>
          <Text style={styles.text}>{title}</Text>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width:"100%"
    
  },
  disabled: {
    opacity: 0.5,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.text,
    fontSize: theme.typography.fontSize.md,
    fontWeight: 'bold',
  },
  iconContainer: {
    marginLeft: theme.spacing.sm,
  },
});