import { Platform } from 'react-native';

// Lunia — AmEx inspired: deep navy + gold
export const LuniaColors = {
  navy: '#0A0F1E',
  navyLight: '#141A2E',
  navyCard: '#1A2138',
  gold: '#C9A84C',
  goldLight: '#E2C47A',
  goldDark: '#A07830',
  white: '#F5F0E8',
  whiteOff: '#D4CFC6',
  gray: '#7A8099',
  grayLight: '#A0A8BF',
  success: '#2ECC71',
  danger: '#E74C3C',
  warning: '#F39C12',
};

export const Colors = {
  light: {
    text: '#0A0F1E',
    background: '#F2EFE8',
    tint: LuniaColors.gold,
    icon: '#5A6070',
    tabIconDefault: '#A0A8BF',
    tabIconSelected: LuniaColors.gold,
    card: '#FFFFFF',
    cardBorder: '#E0DBD0',
    textSecondary: '#7A8099',
    success: LuniaColors.success,
    danger: LuniaColors.danger,
    warning: LuniaColors.warning,
    primary: LuniaColors.gold,
    primaryDark: LuniaColors.goldDark,
    navy: LuniaColors.navy,
  },
  dark: {
    text: LuniaColors.white,
    background: LuniaColors.navy,
    tint: LuniaColors.gold,
    icon: LuniaColors.grayLight,
    tabIconDefault: '#3A4055',
    tabIconSelected: LuniaColors.gold,
    card: LuniaColors.navyCard,
    cardBorder: '#252D45',
    textSecondary: LuniaColors.gray,
    success: LuniaColors.success,
    danger: LuniaColors.danger,
    warning: LuniaColors.warning,
    primary: LuniaColors.gold,
    primaryDark: LuniaColors.goldDark,
    navy: LuniaColors.navy,
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
