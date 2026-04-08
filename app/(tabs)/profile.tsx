import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { APP_USER } from '@/constants/config';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface MenuItem {
  icon: any;
  label: string;
  subtitle?: string;
  onPress: () => void;
  danger?: boolean;
}

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const MENU_SECTIONS: { title: string; items: MenuItem[] }[] = [
    {
      title: 'Compte',
      items: [
        {
          icon: 'person.fill',
          label: 'Informations personnelles',
          subtitle: APP_USER.email,
          onPress: () => Alert.alert('Bientôt disponible'),
        },
        {
          icon: 'shield.fill',
          label: 'Sécurité',
          subtitle: 'Mot de passe, 2FA',
          onPress: () => Alert.alert('Bientôt disponible'),
        },
        {
          icon: 'bell.fill',
          label: 'Notifications',
          onPress: () => Alert.alert('Bientôt disponible'),
        },
      ],
    },
    {
      title: 'Paiements',
      items: [
        {
          icon: 'creditcard.fill',
          label: 'Méthodes de paiement',
          subtitle: 'SumUp connecté',
          onPress: () => Alert.alert('Bientôt disponible'),
        },
        {
          icon: 'globe',
          label: 'Devises préférées',
          onPress: () => Alert.alert('Bientôt disponible'),
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          icon: 'questionmark.circle',
          label: 'Aide & FAQ',
          onPress: () => Alert.alert('Bientôt disponible'),
        },
        {
          icon: 'info.circle',
          label: 'À propos',
          subtitle: 'Version 1.0.0',
          onPress: () => Alert.alert('MonApp Paiement', 'Version 1.0.0\nDéveloppé avec Expo & SumUp'),
        },
      ],
    },
    {
      title: '',
      items: [
        {
          icon: 'xmark.circle.fill',
          label: 'Se déconnecter',
          onPress: () => Alert.alert('Déconnexion', 'Êtes-vous sûr ?', [
            { text: 'Annuler', style: 'cancel' },
            { text: 'Déconnecter', style: 'destructive', onPress: () => {} },
          ]),
          danger: true,
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Header */}
        <Text style={[styles.title, { color: colors.text }]}>Profil</Text>

        {/* Avatar Card */}
        <View style={[styles.avatarCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
          <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
            <Text style={styles.avatarText}>{APP_USER.initials}</Text>
          </View>
          <View style={styles.userInfo}>
            <View style={styles.nameRow}>
              <Text style={[styles.userName, { color: colors.text }]}>{APP_USER.name}</Text>
              {APP_USER.verified && (
                <View style={[styles.verifiedBadge, { backgroundColor: colors.success + '20' }]}>
                  <IconSymbol name="checkmark.circle.fill" size={12} color={colors.success} />
                  <Text style={[styles.verifiedText, { color: colors.success }]}>Vérifié</Text>
                </View>
              )}
            </View>
            <Text style={[styles.userEmail, { color: colors.textSecondary }]}>{APP_USER.email}</Text>
          </View>
        </View>

        {/* Menu Sections */}
        {MENU_SECTIONS.map((section, sIndex) => (
          <View key={sIndex} style={styles.section}>
            {section.title ? (
              <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>{section.title}</Text>
            ) : null}
            <View style={[styles.menuCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
              {section.items.map((item, iIndex) => (
                <TouchableOpacity
                  key={iIndex}
                  style={[
                    styles.menuItem,
                    iIndex < section.items.length - 1 && {
                      borderBottomColor: colors.cardBorder,
                      borderBottomWidth: 1,
                    },
                  ]}
                  onPress={item.onPress}
                  activeOpacity={0.7}>
                  <View
                    style={[
                      styles.menuIcon,
                      {
                        backgroundColor: item.danger
                          ? colors.danger + '15'
                          : colors.primary + '15',
                      },
                    ]}>
                    <IconSymbol
                      name={item.icon}
                      size={18}
                      color={item.danger ? colors.danger : colors.primary}
                    />
                  </View>
                  <View style={styles.menuText}>
                    <Text
                      style={[
                        styles.menuLabel,
                        { color: item.danger ? colors.danger : colors.text },
                      ]}>
                      {item.label}
                    </Text>
                    {item.subtitle && (
                      <Text style={[styles.menuSubtitle, { color: colors.textSecondary }]}>
                        {item.subtitle}
                      </Text>
                    )}
                  </View>
                  {!item.danger && (
                    <IconSymbol name="chevron.right" size={16} color={colors.icon} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  scroll: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 24, fontWeight: '800', marginBottom: 20 },
  avatarCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 24,
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: '#FFFFFF', fontSize: 22, fontWeight: '800' },
  userInfo: { flex: 1 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  userName: { fontSize: 17, fontWeight: '700' },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  verifiedText: { fontSize: 10, fontWeight: '700' },
  userEmail: { fontSize: 13 },
  section: { marginBottom: 16 },
  sectionTitle: { fontSize: 12, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8, marginLeft: 4 },
  menuCard: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  menuItem: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 12 },
  menuIcon: { width: 38, height: 38, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  menuText: { flex: 1 },
  menuLabel: { fontSize: 14, fontWeight: '600' },
  menuSubtitle: { fontSize: 12, marginTop: 1 },
});
