import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type TransactionType = 'all' | 'sent' | 'received';

interface Transaction {
  id: string;
  label: string;
  amount: number;
  currency: string;
  date: string;
  icon: string;
  type: 'debit' | 'credit';
  status: 'completed' | 'pending' | 'failed';
}

const ALL_TRANSACTIONS: Transaction[] = [
  { id: '1', label: 'Amazon.fr', amount: -45.0, currency: 'EUR', date: "Aujourd'hui, 14:32", icon: '🛍️', type: 'debit', status: 'completed' },
  { id: '2', label: 'Virement reçu', amount: 200.0, currency: 'EUR', date: "Aujourd'hui, 09:15", icon: '💸', type: 'credit', status: 'completed' },
  { id: '3', label: 'Envoi Sénégal', amount: -150.0, currency: 'EUR', date: 'Hier, 18:45', icon: '🌍', type: 'debit', status: 'completed' },
  { id: '4', label: 'Salaire', amount: 1800.0, currency: 'EUR', date: 'Hier, 08:00', icon: '💼', type: 'credit', status: 'completed' },
  { id: '5', label: 'Netflix', amount: -17.99, currency: 'EUR', date: '05 Avr, 12:00', icon: '🎬', type: 'debit', status: 'completed' },
  { id: '6', label: 'Envoi Maroc', amount: -200.0, currency: 'EUR', date: '04 Avr, 16:20', icon: '🇲🇦', type: 'debit', status: 'completed' },
  { id: '7', label: 'Remboursement', amount: 50.0, currency: 'EUR', date: '03 Avr, 11:00', icon: '↩️', type: 'credit', status: 'completed' },
  { id: '8', label: 'SumUp Paiement', amount: -320.0, currency: 'EUR', date: '02 Avr, 09:30', icon: '💳', type: 'debit', status: 'completed' },
  { id: '9', label: 'Freelance', amount: 750.0, currency: 'EUR', date: '01 Avr, 15:00', icon: '💻', type: 'credit', status: 'completed' },
  { id: '10', label: 'Envoi Algérie', amount: -100.0, currency: 'EUR', date: '31 Mar, 10:00', icon: '🇩🇿', type: 'debit', status: 'pending' },
];

const FILTERS: { label: string; value: TransactionType }[] = [
  { label: 'Tout', value: 'all' },
  { label: 'Envoyé', value: 'sent' },
  { label: 'Reçu', value: 'received' },
];

const STATUS_LABELS: Record<string, string> = {
  completed: 'Complété',
  pending: 'En cours',
  failed: 'Échoué',
};

const STATUS_COLORS: Record<string, string> = {
  completed: '#10B981',
  pending: '#F59E0B',
  failed: '#EF4444',
};

export default function HistoryScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [filter, setFilter] = useState<TransactionType>('all');

  const filtered = ALL_TRANSACTIONS.filter((tx) => {
    if (filter === 'sent') return tx.type === 'debit';
    if (filter === 'received') return tx.type === 'credit';
    return true;
  });

  const totalSent = ALL_TRANSACTIONS.filter((t) => t.type === 'debit').reduce((s, t) => s + Math.abs(t.amount), 0);
  const totalReceived = ALL_TRANSACTIONS.filter((t) => t.type === 'credit').reduce((s, t) => s + t.amount, 0);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Header */}
        <Text style={[styles.title, { color: colors.text }]}>Historique</Text>

        {/* Summary Cards */}
        <View style={styles.summaryRow}>
          <View style={[styles.summaryCard, { backgroundColor: '#EF444415', borderColor: '#EF444430' }]}>
            <Text style={[styles.summaryLabel, { color: '#EF4444' }]}>Total envoyé</Text>
            <Text style={[styles.summaryAmount, { color: '#EF4444' }]}>
              -{totalSent.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €
            </Text>
          </View>
          <View style={[styles.summaryCard, { backgroundColor: '#10B98115', borderColor: '#10B98130' }]}>
            <Text style={[styles.summaryLabel, { color: '#10B981' }]}>Total reçu</Text>
            <Text style={[styles.summaryAmount, { color: '#10B981' }]}>
              +{totalReceived.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €
            </Text>
          </View>
        </View>

        {/* Filter Tabs */}
        <View style={[styles.filterRow, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
          {FILTERS.map((f) => (
            <TouchableOpacity
              key={f.value}
              style={[
                styles.filterBtn,
                filter === f.value && { backgroundColor: colors.primary },
              ]}
              onPress={() => setFilter(f.value)}>
              <Text
                style={[
                  styles.filterLabel,
                  { color: filter === f.value ? '#FFFFFF' : colors.textSecondary },
                ]}>
                {f.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Transactions List */}
        <View style={[styles.listCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
          {filtered.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyEmoji}>📭</Text>
              <Text style={[styles.emptyText, { color: colors.textSecondary }]}>Aucune transaction</Text>
            </View>
          ) : (
            filtered.map((tx, index) => (
              <View
                key={tx.id}
                style={[
                  styles.txRow,
                  index < filtered.length - 1 && { borderBottomColor: colors.cardBorder, borderBottomWidth: 1 },
                ]}>
                <View style={[styles.txIconWrap, { backgroundColor: colorScheme === 'dark' ? '#334155' : '#F1F5F9' }]}>
                  <Text style={styles.txEmoji}>{tx.icon}</Text>
                </View>
                <View style={styles.txInfo}>
                  <Text style={[styles.txLabel, { color: colors.text }]}>{tx.label}</Text>
                  <View style={styles.txMeta}>
                    <Text style={[styles.txDate, { color: colors.textSecondary }]}>{tx.date}</Text>
                    {tx.status !== 'completed' && (
                      <View style={[styles.statusDot, { backgroundColor: STATUS_COLORS[tx.status] + '30' }]}>
                        <Text style={[styles.statusText, { color: STATUS_COLORS[tx.status] }]}>
                          {STATUS_LABELS[tx.status]}
                        </Text>
                      </View>
                    )}
                  </View>
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
  title: { fontSize: 24, fontWeight: '800', marginBottom: 20 },
  summaryRow: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  summaryCard: {
    flex: 1,
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
  },
  summaryLabel: { fontSize: 11, fontWeight: '600', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.5 },
  summaryAmount: { fontSize: 16, fontWeight: '800' },
  filterRow: {
    flexDirection: 'row',
    borderRadius: 12,
    borderWidth: 1,
    padding: 4,
    marginBottom: 16,
    gap: 4,
  },
  filterBtn: { flex: 1, paddingVertical: 8, borderRadius: 8, alignItems: 'center' },
  filterLabel: { fontSize: 13, fontWeight: '600' },
  listCard: {
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
  txIconWrap: { width: 42, height: 42, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  txEmoji: { fontSize: 20 },
  txInfo: { flex: 1 },
  txLabel: { fontSize: 14, fontWeight: '600' },
  txMeta: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 2 },
  txDate: { fontSize: 11 },
  statusDot: { borderRadius: 6, paddingHorizontal: 6, paddingVertical: 2 },
  statusText: { fontSize: 10, fontWeight: '700' },
  txAmount: { fontSize: 14, fontWeight: '700' },
  emptyState: { alignItems: 'center', paddingVertical: 40 },
  emptyEmoji: { fontSize: 40, marginBottom: 10 },
  emptyText: { fontSize: 14 },
});
