import { Platform } from 'react-native';

const tintColorLight = '#4F46E5';
const tintColorDark = '#818CF8';

export const Colors = {
  light: {
    text: '#0F172A',
    background: '#F1F5F9',
    tint: tintColorLight,
    icon: '#64748B',
    tabIconDefault: '#94A3B8',
    tabIconSelected: tintColorLight,
    card: '#FFFFFF',
    cardBorder: '#E2E8F0',
    textSecondary: '#64748B',
    success: '#10B981',
    danger: '#EF4444',
    warning: '#F59E0B',
    primary: '#4F46E5',
    primaryDark: '#3730A3',
  },
  dark: {
    text: '#F8FAFC',
    background: '#0F172A',
    tint: tintColorDark,
    icon: '#94A3B8',
    tabIconDefault: '#475569',
    tabIconSelected: tintColorDark,
    card: '#1E293B',
    cardBorder: '#334155',
    textSecondary: '#94A3B8',
    success: '#10B981',
    danger: '#EF4444',
    warning: '#F59E0B',
    primary: '#818CF8',
    primaryDark: '#6366F1',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
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
