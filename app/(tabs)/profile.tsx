import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { APP_NAME, APP_USER } from '@/constants/config';
import { Colors, LuniaColors } from '@/constants/theme';
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
  const isDark = colorScheme === 'dark';

  const cardBg = isDark ? LuniaColors.navyCard : '#FFFFFF';
  const cardBorder = isDark ? '#252D45' : '#E8E2D8';

  const MENU_SECTIONS: { title: string; items: MenuItem[] }[] = [
    {
      title: 'Compte',
      items: [
        { icon: 'person.fill', label: 'Informations personnelles', subtitle: APP_USER.email, onPress: () => Alert.alert('Bientôt disponible') },
        { icon: 'shield.fill', label: 'Sécurité', subtitle: 'Mot de passe, 2FA', onPress: () => Alert.alert('Bientôt disponible') },
        { icon: 'bell.fill', label: 'Notifications', onPress: () => Alert.alert('Bientôt disponible') },
      ],
    },
    {
      title: 'Paiements',
      items: [
        { icon: 'creditcard.fill', label: 'Méthodes de paiement', subtitle: 'SumUp connecté', onPress: () => Alert.alert('Bientôt disponible') },
        { icon: 'globe', label: 'Devises préférées', onPress: () => Alert.alert('Bientôt disponible') },
      ],
    },
    {
      title: 'Support',
      items: [
        { icon: 'questionmark.circle', label: 'Aide & FAQ', onPress: () => Alert.alert('Bientôt disponible') },
        { icon: 'info.circle', label: 'À propos', subtitle: `${APP_NAME} v1.0.0`, onPress: () => Alert.alert(APP_NAME, 'Version 1.0.0\nPowered by SumUp') },
      ],
    },
    {
      title: '',
      items: [
        {
          icon: 'xmark.circle.fill',
          label: 'Se déconnecter',
          danger: true,
          onPress: () => Alert.alert('Déconnexion', 'Êtes-vous sûr ?', [
            { text: 'Annuler', style: 'cancel' },
            { text: 'Déconnecter', style: 'destructive', onPress: () => {} },
          ]),
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        <Text style={[styles.title, { color: colors.text }]}>Profil</Text>

        {/* Carte profil */}
        <View style={[styles.profileCard, { backgroundColor: LuniaColors.navy, borderColor: LuniaColors.goldDark + '50' }]}>
          <View style={styles.profileCircleDeco} />
          <View style={styles.profileRow}>
            <View style={[styles.avatar, { borderColor: LuniaColors.gold + '60' }]}>
              <Text style={styles.avatarText}>{APP_USER.initials}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.nameRow}>
                <Text style={styles.profileName}>{APP_USER.name}</Text>
                {APP_USER.verified && (
                  <View style={styles.verifiedBadge}>
                    <IconSymbol name="checkmark.circle.fill" size={12} color={LuniaColors.gold} />
                    <Text style={styles.verifiedText}>Vérifié</Text>
                  </View>
                )}
              </View>
              <Text style={styles.profileEmail}>{APP_USER.email}</Text>
              <Text style={styles.profileCard2}>{APP_USER.cardNumber}</Text>
            </View>
          </View>
          <View style={styles.profileFooter}>
            <Text style={styles.profileFooterLabel}>MEMBRE {APP_NAME.toUpperCase()}</Text>
            <Text style={styles.profileFooterLabel}>SINCE 2024</Text>
          </View>
        </View>

        {/* Sections menu */}
        {MENU_SECTIONS.map((section, sIndex) => (
          <View key={sIndex} style={styles.section}>
            {section.title ? (
              <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>{section.title}</Text>
            ) : null}
            <View style={[styles.menuCard, { backgroundColor: cardBg, borderColor: cardBorder }]}>
              {section.items.map((item, iIndex) => (
                <TouchableOpacity
                  key={iIndex}
                  style={[styles.menuItem, iIndex < section.items.length - 1 && { borderBottomColor: cardBorder, borderBottomWidth: 1 }]}
                  onPress={item.onPress}
                  activeOpacity={0.7}>
                  <View style={[styles.menuIcon, { backgroundColor: item.danger ? LuniaColors.danger + '15' : LuniaColors.gold + '15' }]}>
                    <IconSymbol name={item.icon} size={18} color={item.danger ? LuniaColors.danger : LuniaColors.gold} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.menuLabel, { color: item.danger ? LuniaColors.danger : colors.text }]}>{item.label}</Text>
                    {item.subtitle && <Text style={[styles.menuSub, { color: colors.textSecondary }]}>{item.subtitle}</Text>}
                  </View>
                  {!item.danger && <IconSymbol name="chevron.right" size={16} color={colors.icon} />}
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
  title: { fontSize: 28, fontWeight: '900', letterSpacing: 0.5, marginBottom: 20 },
  profileCard: {
    borderRadius: 20, borderWidth: 1, padding: 20,
    marginBottom: 24, overflow: 'hidden',
    shadowColor: LuniaColors.gold, shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2, shadowRadius: 16, elevation: 8,
  },
  profileCircleDeco: {
    position: 'absolute', width: 200, height: 200, borderRadius: 100,
    backgroundColor: LuniaColors.gold + '08', top: -60, right: -60,
    borderWidth: 1, borderColor: LuniaColors.gold + '15',
  },
  profileRow: { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 16 },
  avatar: {
    width: 64, height: 64, borderRadius: 32,
    backgroundColor: LuniaColors.gold + '20', borderWidth: 1.5,
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { color: LuniaColors.gold, fontSize: 24, fontWeight: '900' },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  profileName: { color: LuniaColors.white, fontSize: 17, fontWeight: '800' },
  verifiedBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 3,
    backgroundColor: LuniaColors.gold + '20', borderRadius: 6,
    paddingHorizontal: 6, paddingVertical: 2,
  },
  verifiedText: { color: LuniaColors.gold, fontSize: 10, fontWeight: '800' },
  profileEmail: { color: LuniaColors.gray, fontSize: 12, marginBottom: 4 },
  profileCard2: { color: LuniaColors.grayLight, fontSize: 12, letterSpacing: 2 },
  profileFooter: { flexDirection: 'row', justifyContent: 'space-between', borderTopColor: LuniaColors.gold + '20', borderTopWidth: 1, paddingTop: 12 },
  profileFooterLabel: { color: LuniaColors.gray, fontSize: 10, fontWeight: '700', letterSpacing: 1.5 },
  section: { marginBottom: 16 },
  sectionTitle: { fontSize: 11, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 8, marginLeft: 4 },
  menuCard: {
    borderRadius: 16, borderWidth: 1, overflow: 'hidden',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 8, elevation: 2,
  },
  menuItem: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 12 },
  menuIcon: { width: 38, height: 38, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  menuLabel: { fontSize: 14, fontWeight: '700' },
  menuSub: { fontSize: 12, marginTop: 1 },
});
