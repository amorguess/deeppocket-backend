import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors, LuniaColors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type TxFilter = 'all' | 'sent' | 'received';

interface Transaction {
  id: string;
  label: string;
  amount: number;
  date: string;
  icon: string;
  type: 'debit' | 'credit';
  status: 'completed' | 'pending' | 'failed';
}

const ALL_TRANSACTIONS: Transaction[] = [
  { id: '1', label: 'Amazon.fr', amount: -45.0, date: "Aujourd'hui, 14:32", icon: '🛍️', type: 'debit', status: 'completed' },
  { id: '2', label: 'Virement reçu', amount: 200.0, date: "Aujourd'hui, 09:15", icon: '💸', type: 'credit', status: 'completed' },
  { id: '3', label: 'Envoi Sénégal', amount: -150.0, date: 'Hier, 18:45', icon: '🌍', type: 'debit', status: 'completed' },
  { id: '4', label: 'Salaire', amount: 1800.0, date: 'Hier, 08:00', icon: '💼', type: 'credit', status: 'completed' },
  { id: '5', label: 'Netflix', amount: -17.99, date: '05 Avr, 12:00', icon: '🎬', type: 'debit', status: 'completed' },
  { id: '6', label: 'Envoi Maroc', amount: -200.0, date: '04 Avr, 16:20', icon: '🇲🇦', type: 'debit', status: 'completed' },
  { id: '7', label: 'Remboursement', amount: 50.0, date: '03 Avr, 11:00', icon: '↩️', type: 'credit', status: 'completed' },
  { id: '8', label: 'SumUp Paiement', amount: -320.0, date: '02 Avr, 09:30', icon: '💳', type: 'debit', status: 'completed' },
  { id: '9', label: 'Freelance', amount: 750.0, date: '01 Avr, 15:00', icon: '💻', type: 'credit', status: 'completed' },
  { id: '10', label: 'Envoi Algérie', amount: -100.0, date: '31 Mar, 10:00', icon: '🇩🇿', type: 'debit', status: 'pending' },
];

const FILTERS: { label: string; value: TxFilter }[] = [
  { label: 'Tout', value: 'all' },
  { label: 'Envoyé', value: 'sent' },
  { label: 'Reçu', value: 'received' },
];

const STATUS_LABEL: Record<string, string> = { completed: 'OK', pending: 'En cours', failed: 'Échoué' };
const STATUS_COLOR: Record<string, string> = {
  completed: LuniaColors.success,
  pending: LuniaColors.warning,
  failed: LuniaColors.danger,
};

export default function HistoryScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const isDark = colorScheme === 'dark';
  const [filter, setFilter] = useState<TxFilter>('all');

  const cardBg = isDark ? LuniaColors.navyCard : '#FFFFFF';
  const cardBorder = isDark ? '#252D45' : '#E8E2D8';

  const filtered = ALL_TRANSACTIONS.filter((tx) => {
    if (filter === 'sent') return tx.type === 'debit';
    if (filter === 'received') return tx.type === 'credit';
    return true;
  });

  const totalSent = ALL_TRANSACTIONS.filter(t => t.type === 'debit').reduce((s, t) => s + Math.abs(t.amount), 0);
  const totalReceived = ALL_TRANSACTIONS.filter(t => t.type === 'credit').reduce((s, t) => s + t.amount, 0);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        <Text style={[styles.title, { color: colors.text }]}>Historique</Text>

        {/* Résumé */}
        <View style={styles.summaryRow}>
          <View style={[styles.summaryCard, { backgroundColor: LuniaColors.danger + '12', borderColor: LuniaColors.danger + '30' }]}>
            <Text style={[styles.summaryLabel, { color: LuniaColors.danger }]}>Envoyé</Text>
            <Text style={[styles.summaryAmount, { color: LuniaColors.danger }]}>
              -{totalSent.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €
            </Text>
          </View>
          <View style={[styles.summaryCard, { backgroundColor: LuniaColors.success + '12', borderColor: LuniaColors.success + '30' }]}>
            <Text style={[styles.summaryLabel, { color: LuniaColors.success }]}>Reçu</Text>
            <Text style={[styles.summaryAmount, { color: LuniaColors.success }]}>
              +{totalReceived.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €
            </Text>
          </View>
        </View>

        {/* Filtres */}
        <View style={[styles.filterRow, { backgroundColor: cardBg, borderColor: cardBorder }]}>
          {FILTERS.map((f) => (
            <TouchableOpacity
              key={f.value}
              style={[styles.filterBtn, filter === f.value && { backgroundColor: LuniaColors.gold }]}
              onPress={() => setFilter(f.value)}>
              <Text style={[styles.filterLabel, { color: filter === f.value ? LuniaColors.navy : colors.textSecondary }]}>
                {f.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Liste */}
        <View style={[styles.listCard, { backgroundColor: cardBg, borderColor: cardBorder }]}>
          {filtered.length === 0 ? (
            <View style={styles.empty}>
              <Text style={styles.emptyEmoji}>📭</Text>
              <Text style={[styles.emptyText, { color: colors.textSecondary }]}>Aucune transaction</Text>
            </View>
          ) : (
            filtered.map((tx, index) => (
              <View
                key={tx.id}
                style={[styles.txRow, index < filtered.length - 1 && { borderBottomColor: cardBorder, borderBottomWidth: 1 }]}>
                <View style={[styles.txIcon, { backgroundColor: isDark ? LuniaColors.navy : '#F5F0E8' }]}>
                  <Text style={styles.txEmoji}>{tx.icon}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.txLabel, { color: colors.text }]}>{tx.label}</Text>
                  <View style={styles.txMeta}>
                    <Text style={[styles.txDate, { color: colors.textSecondary }]}>{tx.date}</Text>
                    {tx.status !== 'completed' && (
                      <View style={[styles.statusPill, { backgroundColor: STATUS_COLOR[tx.status] + '25' }]}>
                        <Text style={[styles.statusText, { color: STATUS_COLOR[tx.status] }]}>
                          {STATUS_LABEL[tx.status]}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
                <Text style={[styles.txAmount, { color: tx.type === 'credit' ? LuniaColors.success : LuniaColors.danger }]}>
                  {tx.type === 'credit' ? '+' : ''}
                  {tx.amount.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €
                </Text>
              </View>
            ))
          )}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  scroll: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 28, fontWeight: '900', letterSpacing: 0.5, marginBottom: 20 },
  summaryRow: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  summaryCard: { flex: 1, borderRadius: 14, borderWidth: 1, padding: 14 },
  summaryLabel: { fontSize: 11, fontWeight: '700', letterSpacing: 0.8, marginBottom: 4, textTransform: 'uppercase' },
  summaryAmount: { fontSize: 17, fontWeight: '900' },
  filterRow: {
    flexDirection: 'row', borderRadius: 12, borderWidth: 1,
    padding: 4, marginBottom: 16, gap: 4,
  },
  filterBtn: { flex: 1, paddingVertical: 9, borderRadius: 8, alignItems: 'center' },
  filterLabel: { fontSize: 13, fontWeight: '700' },
  listCard: {
    borderRadius: 16, borderWidth: 1, overflow: 'hidden',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 8, elevation: 2,
  },
  txRow: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 12 },
  txIcon: { width: 42, height: 42, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  txEmoji: { fontSize: 20 },
  txLabel: { fontSize: 14, fontWeight: '700' },
  txMeta: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 2 },
  txDate: { fontSize: 11 },
  statusPill: { borderRadius: 6, paddingHorizontal: 6, paddingVertical: 2 },
  statusText: { fontSize: 10, fontWeight: '800' },
  txAmount: { fontSize: 14, fontWeight: '900' },
  empty: { alignItems: 'center', paddingVertical: 40 },
  emptyEmoji: { fontSize: 40, marginBottom: 10 },
  emptyText: { fontSize: 14 },
});
