import * as WebBrowser from 'expo-web-browser';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { Currency, EXCHANGE_RATES, SUMUP_PAYMENT_LINK, SUPPORTED_CURRENCIES } from '@/constants/config';
import { Colors, LuniaColors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function PayScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const isDark = colorScheme === 'dark';

  const [amount, setAmount] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(SUPPORTED_CURRENCIES[0]);
  const [showPicker, setShowPicker] = useState(false);

  const numericAmount = parseFloat(amount.replace(',', '.')) || 0;

  const convertedAmounts = SUPPORTED_CURRENCIES.filter(
    (c) => c.code !== selectedCurrency.code
  ).map((c) => {
    const inEur = numericAmount / EXCHANGE_RATES[selectedCurrency.code];
    return { ...c, converted: inEur * EXCHANGE_RATES[c.code] };
  });

  async function handlePayWithSumUp() {
    if (numericAmount <= 0) {
      Alert.alert('Montant invalide', 'Veuillez saisir un montant valide.');
      return;
    }
    await WebBrowser.openBrowserAsync(SUMUP_PAYMENT_LINK);
  }

  const cardBg = isDark ? LuniaColors.navyCard : '#FFFFFF';
  const cardBorder = isDark ? '#252D45' : '#E8E2D8';

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

          {/* Header */}
          <Text style={[styles.title, { color: colors.text }]}>Paiement</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Saisissez le montant et payez via SumUp
          </Text>

          {/* Montant */}
          <View style={[styles.card, { backgroundColor: cardBg, borderColor: cardBorder }]}>
            <Text style={[styles.cardLabel, { color: colors.textSecondary }]}>Montant</Text>
            <View style={styles.amountRow}>
              <TextInput
                style={[styles.amountInput, { color: colors.text }]}
                value={amount}
                onChangeText={setAmount}
                placeholder="0.00"
                placeholderTextColor={colors.textSecondary}
                keyboardType="decimal-pad"
                maxLength={10}
              />
              <TouchableOpacity
                style={[styles.currencyBtn, { backgroundColor: LuniaColors.gold + '15', borderColor: LuniaColors.gold + '50' }]}
                onPress={() => setShowPicker(!showPicker)}>
                <Text style={styles.currencyFlag}>{selectedCurrency.flag}</Text>
                <Text style={[styles.currencyCode, { color: LuniaColors.gold }]}>{selectedCurrency.code}</Text>
                <IconSymbol name="chevron.down" size={14} color={LuniaColors.gold} />
              </TouchableOpacity>
            </View>

            {showPicker && (
              <View style={[styles.picker, { backgroundColor: isDark ? LuniaColors.navy : '#FAF7F2', borderColor: cardBorder }]}>
                {SUPPORTED_CURRENCIES.map((currency) => (
                  <TouchableOpacity
                    key={currency.code}
                    style={[
                      styles.pickerItem,
                      { borderBottomColor: cardBorder },
                      selectedCurrency.code === currency.code && { backgroundColor: LuniaColors.gold + '15' },
                    ]}
                    onPress={() => { setSelectedCurrency(currency); setShowPicker(false); }}>
                    <Text style={styles.pickerFlag}>{currency.flag}</Text>
                    <Text style={[styles.pickerCode, { color: colors.text }]}>{currency.code}</Text>
                    <Text style={[styles.pickerName, { color: colors.textSecondary }]}>{currency.name}</Text>
                    {selectedCurrency.code === currency.code && (
                      <IconSymbol name="checkmark.circle.fill" size={16} color={LuniaColors.gold} />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Conversions */}
          {numericAmount > 0 && (
            <View style={[styles.card, { backgroundColor: cardBg, borderColor: cardBorder }]}>
              <Text style={[styles.cardLabel, { color: colors.textSecondary }]}>
                Équivalents — {selectedCurrency.symbol}{amount} {selectedCurrency.code}
              </Text>
              {convertedAmounts.slice(0, 4).map((c, index) => (
                <View key={c.code} style={[styles.convRow, index < 3 && { borderBottomColor: cardBorder, borderBottomWidth: 1 }]}>
                  <Text style={styles.convFlag}>{c.flag}</Text>
                  <Text style={[styles.convCode, { color: colors.textSecondary }]}>{c.code}</Text>
                  <Text style={[styles.convValue, { color: colors.text }]}>
                    {c.converted.toLocaleString('fr-FR', {
                      minimumFractionDigits: ['XOF', 'DZD'].includes(c.code) ? 0 : 2,
                      maximumFractionDigits: ['XOF', 'DZD'].includes(c.code) ? 0 : 2,
                    })} {c.symbol}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {/* Info */}
          <View style={[styles.infoBanner, { backgroundColor: LuniaColors.gold + '10', borderColor: LuniaColors.gold + '30' }]}>
            <IconSymbol name="info.circle" size={16} color={LuniaColors.gold} />
            <Text style={[styles.infoText, { color: LuniaColors.gold }]}>
              Paiement sécurisé via votre lien SumUp Lunia.
            </Text>
          </View>

          {/* Bouton payer */}
          <TouchableOpacity
            style={[styles.payBtn, { backgroundColor: LuniaColors.gold }, numericAmount <= 0 && { opacity: 0.45 }]}
            onPress={handlePayWithSumUp}
            activeOpacity={0.85}>
            <IconSymbol name="creditcard.fill" size={20} color={LuniaColors.navy} />
            <Text style={[styles.payBtnText, { color: LuniaColors.navy }]}>Payer avec SumUp</Text>
          </TouchableOpacity>

          {/* Partager */}
          <TouchableOpacity
            style={[styles.shareBtn, { borderColor: isDark ? '#252D45' : '#E8E2D8' }]}
            onPress={() => Alert.alert('Partager', 'Bientôt disponible.')}
            activeOpacity={0.8}>
            <IconSymbol name="square.and.arrow.up" size={18} color={colors.textSecondary} />
            <Text style={[styles.shareBtnText, { color: colors.textSecondary }]}>Partager le lien</Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  scroll: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 28, fontWeight: '900', letterSpacing: 0.5, marginBottom: 4 },
  subtitle: { fontSize: 13, marginBottom: 24 },
  card: {
    borderRadius: 16, borderWidth: 1, padding: 16, marginBottom: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 8, elevation: 2,
  },
  cardLabel: { fontSize: 11, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 },
  amountRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  amountInput: { flex: 1, fontSize: 40, fontWeight: '900', letterSpacing: -1 },
  currencyBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12, borderWidth: 1,
  },
  currencyFlag: { fontSize: 18 },
  currencyCode: { fontSize: 14, fontWeight: '800' },
  picker: { marginTop: 12, borderRadius: 12, borderWidth: 1, overflow: 'hidden' },
  pickerItem: {
    flexDirection: 'row', alignItems: 'center',
    padding: 12, gap: 10, borderBottomWidth: 1,
  },
  pickerFlag: { fontSize: 20 },
  pickerCode: { fontSize: 14, fontWeight: '700', width: 44 },
  pickerName: { flex: 1, fontSize: 13 },
  convRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, gap: 10 },
  convFlag: { fontSize: 20 },
  convCode: { width: 44, fontSize: 13, fontWeight: '600' },
  convValue: { flex: 1, textAlign: 'right', fontSize: 15, fontWeight: '800' },
  infoBanner: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    borderRadius: 12, borderWidth: 1, padding: 12, marginBottom: 20,
  },
  infoText: { flex: 1, fontSize: 12, fontWeight: '600' },
  payBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 10, borderRadius: 16, paddingVertical: 18, marginBottom: 12,
    shadowColor: LuniaColors.gold, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35, shadowRadius: 12, elevation: 5,
  },
  payBtnText: { fontSize: 17, fontWeight: '900', letterSpacing: 0.5 },
  shareBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, borderRadius: 16, paddingVertical: 14, borderWidth: 1,
  },
  shareBtnText: { fontSize: 14, fontWeight: '600' },
});
