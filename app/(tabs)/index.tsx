import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { APP_USER, EXCHANGE_RATES, SUPPORTED_CURRENCIES } from '@/constants/config';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const RECENT_TRANSACTIONS = [
  { id: '1', label: 'Amazon.fr', amount: -45.0, currency: 'EUR', date: "Aujourd'hui", icon: '🛍️', type: 'debit' },
  { id: '2', label: 'Virement reçu', amount: 200.0, currency: 'EUR', date: "Aujourd'hui", icon: '💸', type: 'credit' },
  { id: '3', label: 'Envoi Sénégal', amount: -150.0, currency: 'EUR', date: 'Hier', icon: '🌍', type: 'debit' },
  { id: '4', label: 'Salaire', amount: 1800.0, currency: 'EUR', date: 'Hier', icon: '💼', type: 'credit' },
];

const BALANCE = 2540.0;

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();

  const displayRates = SUPPORTED_CURRENCIES.filter((c) => c.code !== 'EUR').slice(0, 4);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, { color: colors.textSecondary }]}>Bonjour 👋</Text>
            <Text style={[styles.userName, { color: colors.text }]}>{APP_USER.name}</Text>
          </View>
          <TouchableOpacity style={[styles.bellBtn, { backgroundColor: colors.card }]}>
            <IconSymbol name="bell.fill" size={20} color={colors.icon} />
          </TouchableOpacity>
        </View>

        {/* Balance Card */}
        <View style={[styles.balanceCard, { backgroundColor: colors.primary }]}>
          <Text style={styles.balanceLabel}>Solde total</Text>
          <Text style={styles.balanceAmount}>
            €{BALANCE.toLocaleString('fr-FR', { minimumFractionDigits: 2 })}
          </Text>
          <View style={styles.balanceBadge}>
            <Text style={styles.balanceBadgeText}>+2.3% ce mois</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={[styles.actionsCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
          <QuickAction
            icon="arrow.up.circle.fill"
            label="Envoyer"
            color="#EF4444"
            colors={colors}
            onPress={() => router.push('/(tabs)/pay')}
          />
          <QuickAction
            icon="arrow.down.circle.fill"
            label="Recevoir"
            color="#10B981"
            colors={colors}
            onPress={() => {}}
          />
          <QuickAction
            icon="creditcard.fill"
            label="Payer"
            color={colors.primary}
            colors={colors}
            onPress={() => router.push('/(tabs)/pay')}
          />
          <QuickAction
            icon="clock.fill"
            label="Historique"
            color="#F59E0B"
            colors={colors}
            onPress={() => router.push('/(tabs)/history')}
          />
        </View>

        {/* Exchange Rates */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Taux de change</Text>
          <View style={[styles.ratesCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
            {displayRates.map((currency, index) => (
              <View
                key={currency.code}
                style={[
                  styles.rateRow,
                  index < displayRates.length - 1 && { borderBottomColor: colors.cardBorder, borderBottomWidth: 1 },
                ]}>
                <View style={styles.rateLeft}>
                  <Text style={styles.rateFlag}>{currency.flag}</Text>
                  <View>
                    <Text style={[styles.rateName, { color: colors.text }]}>{currency.code}</Text>
                    <Text style={[styles.rateSubname, { color: colors.textSecondary }]}>{currency.name}</Text>
                  </View>
                </View>
                <Text style={[styles.rateValue, { color: colors.primary }]}>
                  1 € = {EXCHANGE_RATES[currency.code].toLocaleString('fr-FR')} {currency.code}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Recent Transactions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Dernières transactions</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/history')}>
              <Text style={[styles.seeAll, { color: colors.primary }]}>Voir tout</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.transactionsCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
            {RECENT_TRANSACTIONS.map((tx, index) => (
              <View
                key={tx.id}
                style={[
                  styles.txRow,
                  index < RECENT_TRANSACTIONS.length - 1 && {
                    borderBottomColor: colors.cardBorder,
                    borderBottomWidth: 1,
                  },
                ]}>
                <View style={styles.txIcon}>
                  <Text style={styles.txEmoji}>{tx.icon}</Text>
                </View>
                <View style={styles.txInfo}>
                  <Text style={[styles.txLabel, { color: colors.text }]}>{tx.label}</Text>
                  <Text style={[styles.txDate, { color: colors.textSecondary }]}>{tx.date}</Text>
                </View>
                <Text
                  style={[
                    styles.txAmount,
                    { color: tx.type === 'credit' ? colors.success : colors.danger },
                  ]}>
                  {tx.type === 'credit' ? '+' : ''}
                  {tx.amount.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function QuickAction({
  icon,
  label,
  color,
  colors,
  onPress,
}: {
  icon: any;
  label: string;
  color: string;
  colors: any;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.quickAction} onPress={onPress}>
      <View style={[styles.quickActionIcon, { backgroundColor: color + '20' }]}>
        <IconSymbol name={icon} size={22} color={color} />
      </View>
      <Text style={[styles.quickActionLabel, { color: colors.textSecondary }]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  scroll: { padding: 20, paddingBottom: 40 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: { fontSize: 13, marginBottom: 2 },
  userName: { fontSize: 20, fontWeight: '700' },
  bellBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  balanceCard: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  balanceLabel: { color: 'rgba(255,255,255,0.75)', fontSize: 13, marginBottom: 6 },
  balanceAmount: { color: '#FFFFFF', fontSize: 36, fontWeight: '800', letterSpacing: -1 },
  balanceBadge: {
    marginTop: 10,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  balanceBadgeText: { color: '#FFFFFF', fontSize: 12, fontWeight: '600' },
  actionsCard: {
    flexDirection: 'row',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  quickAction: { flex: 1, alignItems: 'center', gap: 8 },
  quickActionIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionLabel: { fontSize: 11, fontWeight: '600' },
  section: { marginBottom: 24 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 10 },
  seeAll: { fontSize: 13, fontWeight: '600' },
  ratesCard: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  rateRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 14 },
  rateLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  rateFlag: { fontSize: 24 },
  rateName: { fontSize: 14, fontWeight: '600' },
  rateSubname: { fontSize: 11, marginTop: 1 },
  rateValue: { fontSize: 13, fontWeight: '600' },
  transactionsCard: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  txRow: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 12 },
  txIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txEmoji: { fontSize: 18 },
  txInfo: { flex: 1 },
  txLabel: { fontSize: 14, fontWeight: '600' },
  txDate: { fontSize: 11, marginTop: 2 },
  txAmount: { fontSize: 14, fontWeight: '700' },
});
