import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { LuniaCard } from '@/components/lunia-card';
import { APP_NAME, APP_USER, EXCHANGE_RATES, SUPPORTED_CURRENCIES } from '@/constants/config';
import { Colors, LuniaColors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const RECENT_TRANSACTIONS = [
  { id: '1', label: 'Amazon.fr', amount: -45.0, date: "Aujourd'hui", icon: '🛍️', type: 'debit' },
  { id: '2', label: 'Virement reçu', amount: 200.0, date: "Aujourd'hui", icon: '💸', type: 'credit' },
  { id: '3', label: 'Envoi Sénégal', amount: -150.0, date: 'Hier', icon: '🌍', type: 'debit' },
  { id: '4', label: 'Salaire', amount: 1800.0, date: 'Hier', icon: '💼', type: 'credit' },
];

const BALANCE = 2540.0;

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const isDark = colorScheme === 'dark';
  const router = useRouter();

  const displayRates = SUPPORTED_CURRENCIES.filter((c) => c.code !== 'EUR').slice(0, 3);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.appName, { color: LuniaColors.gold }]}>{APP_NAME}</Text>
            <Text style={[styles.greeting, { color: colors.textSecondary }]}>
              Bonjour, {APP_USER.name.split(' ')[0]}
            </Text>
          </View>
          <TouchableOpacity style={[styles.avatarBtn, { backgroundColor: LuniaColors.navy, borderColor: LuniaColors.gold + '50' }]}>
            <Text style={[styles.avatarText, { color: LuniaColors.gold }]}>{APP_USER.initials}</Text>
          </TouchableOpacity>
        </View>

        {/* Carte virtuelle */}
        <LuniaCard />

        {/* Solde sous la carte */}
        <View style={[styles.balanceRow, { backgroundColor: isDark ? LuniaColors.navyCard : '#FFF', borderColor: isDark ? '#252D45' : '#E8E2D8' }]}>
          <View style={styles.balanceItem}>
            <Text style={[styles.balanceLabel, { color: colors.textSecondary }]}>Solde total</Text>
            <Text style={[styles.balanceAmount, { color: colors.text }]}>
              €{BALANCE.toLocaleString('fr-FR', { minimumFractionDigits: 2 })}
            </Text>
          </View>
          <View style={[styles.balanceDivider, { backgroundColor: isDark ? '#252D45' : '#E8E2D8' }]} />
          <View style={styles.balanceItem}>
            <Text style={[styles.balanceLabel, { color: colors.textSecondary }]}>Ce mois</Text>
            <Text style={[styles.balanceGain, { color: LuniaColors.success }]}>+€320.00</Text>
          </View>
        </View>

        {/* Actions rapides */}
        <View style={styles.actionsRow}>
          <ActionBtn icon="arrow.up.circle.fill" label="Envoyer" color={LuniaColors.gold} onPress={() => router.push('/(tabs)/pay')} isDark={isDark} />
          <ActionBtn icon="arrow.down.circle.fill" label="Recevoir" color={LuniaColors.success} onPress={() => {}} isDark={isDark} />
          <ActionBtn icon="creditcard.fill" label="Payer" color={LuniaColors.gold} onPress={() => router.push('/(tabs)/pay')} isDark={isDark} />
          <ActionBtn icon="clock.fill" label="Historique" color={LuniaColors.grayLight} onPress={() => router.push('/(tabs)/history')} isDark={isDark} />
        </View>

        {/* Taux de change */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Taux du jour</Text>
          <View style={[styles.card, { backgroundColor: isDark ? LuniaColors.navyCard : '#FFF', borderColor: isDark ? '#252D45' : '#E8E2D8' }]}>
            {displayRates.map((currency, index) => (
              <View
                key={currency.code}
                style={[styles.rateRow, index < displayRates.length - 1 && { borderBottomColor: isDark ? '#252D45' : '#EEE8DE', borderBottomWidth: 1 }]}>
                <Text style={styles.rateFlag}>{currency.flag}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.rateName, { color: colors.text }]}>{currency.code}</Text>
                  <Text style={[styles.rateSubname, { color: colors.textSecondary }]}>{currency.name}</Text>
                </View>
                <Text style={[styles.rateValue, { color: LuniaColors.gold }]}>
                  1 € = {EXCHANGE_RATES[currency.code].toLocaleString('fr-FR')} {currency.code}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Dernières transactions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Transactions</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/history')}>
              <Text style={[styles.seeAll, { color: LuniaColors.gold }]}>Voir tout</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.card, { backgroundColor: isDark ? LuniaColors.navyCard : '#FFF', borderColor: isDark ? '#252D45' : '#E8E2D8' }]}>
            {RECENT_TRANSACTIONS.map((tx, index) => (
              <View
                key={tx.id}
                style={[styles.txRow, index < RECENT_TRANSACTIONS.length - 1 && { borderBottomColor: isDark ? '#252D45' : '#EEE8DE', borderBottomWidth: 1 }]}>
                <View style={[styles.txIcon, { backgroundColor: isDark ? '#0A0F1E' : '#F5F0E8' }]}>
                  <Text style={styles.txEmoji}>{tx.icon}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.txLabel, { color: colors.text }]}>{tx.label}</Text>
                  <Text style={[styles.txDate, { color: colors.textSecondary }]}>{tx.date}</Text>
                </View>
                <Text style={[styles.txAmount, { color: tx.type === 'credit' ? LuniaColors.success : LuniaColors.danger }]}>
                  {tx.type === 'credit' ? '+' : ''}{tx.amount.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €
                </Text>
              </View>
            ))}
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

function ActionBtn({ icon, label, color, onPress, isDark }: { icon: any; label: string; color: string; onPress: () => void; isDark: boolean }) {
  return (
    <TouchableOpacity style={styles.actionBtn} onPress={onPress} activeOpacity={0.75}>
      <View style={[styles.actionIcon, { backgroundColor: isDark ? LuniaColors.navyCard : '#FFF', borderColor: color + '40', borderWidth: 1 }]}>
        <IconSymbol name={icon} size={22} color={color} />
      </View>
      <Text style={[styles.actionLabel, { color: isDark ? LuniaColors.grayLight : LuniaColors.gray }]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  scroll: { padding: 20, paddingBottom: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  appName: { fontSize: 26, fontWeight: '900', letterSpacing: 2 },
  greeting: { fontSize: 13, marginTop: 2 },
  avatarBtn: {
    width: 44, height: 44, borderRadius: 22,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1,
  },
  avatarText: { fontSize: 15, fontWeight: '800' },
  balanceRow: {
    flexDirection: 'row',
    borderRadius: 16,
    borderWidth: 1,
    marginTop: 16,
    marginBottom: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  balanceItem: { flex: 1, alignItems: 'center' },
  balanceDivider: { width: 1, marginVertical: 4 },
  balanceLabel: { fontSize: 11, marginBottom: 4, fontWeight: '600', letterSpacing: 0.5 },
  balanceAmount: { fontSize: 20, fontWeight: '800' },
  balanceGain: { fontSize: 20, fontWeight: '800' },
  actionsRow: { flexDirection: 'row', marginBottom: 28 },
  actionBtn: { flex: 1, alignItems: 'center', gap: 8 },
  actionIcon: {
    width: 52, height: 52, borderRadius: 16,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08, shadowRadius: 6, elevation: 2,
  },
  actionLabel: { fontSize: 11, fontWeight: '600' },
  section: { marginBottom: 24 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '800', marginBottom: 12 },
  seeAll: { fontSize: 13, fontWeight: '600' },
  card: {
    borderRadius: 16, borderWidth: 1, overflow: 'hidden',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 8, elevation: 2,
  },
  rateRow: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 12 },
  rateFlag: { fontSize: 24 },
  rateName: { fontSize: 14, fontWeight: '600' },
  rateSubname: { fontSize: 11, marginTop: 1 },
  rateValue: { fontSize: 13, fontWeight: '700' },
  txRow: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 12 },
  txIcon: { width: 42, height: 42, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  txEmoji: { fontSize: 20 },
  txLabel: { fontSize: 14, fontWeight: '600' },
  txDate: { fontSize: 11, marginTop: 2 },
  txAmount: { fontSize: 14, fontWeight: '800' },
});
