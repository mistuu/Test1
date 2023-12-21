import {StyleSheet} from 'react-native';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import AppColors from './AppColor';

const BaseTheme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: AppColors.primary,
    accent: AppColors.accent,
    text: AppColors.textSecondary,
  },
};

const Parent = {
  backgroundColor: AppColors.colorGhostWhite,
  flex: 1,
};

const TextStyle = StyleSheet.create({
  titleExtraLarge: {
    fontSize: 20,
    fontWeight: '700',
    color: AppColors.textPrimary,
  },
  titleLarge: {
    fontSize: 15,
    fontWeight: '700',
    color: AppColors.textPrimary,
  },
  titleNormal: {
    fontSize: 14,
    fontWeight: '700',
    color: AppColors.textPrimary,
  },
  titleSmall: {
    fontSize: 12,
    fontWeight: '700',
    color: AppColors.textPrimary,
  },
  descNormalPrimary: {
    fontSize: 14,
    color: AppColors.textPrimary,
  },
  descNormal: {
    fontSize: 14,
    color: AppColors.textSecondary,
  },
  descSmallPrimary: {
    fontSize: 12,
    color: AppColors.textPrimary,
  },
  descSmall: {
    fontSize: 12,
    color: AppColors.textSecondary,
  },
  optionMenuTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: AppColors.textPrimary,
    textAlign: 'center',
    textAlignVertical: 'center',
  }
});

export default {
  BaseTheme,
  Parent,
  TextStyle,
};
