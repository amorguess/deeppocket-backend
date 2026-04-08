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
import {
  Currency,
  EXCHANGE_RATES,
  SUMUP_PAYMENT_LINK,
  SUPPORTED_CURRENCIES,
} from '@/constants/config';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function PayScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const [amount, setAmount] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(SUPPORTED_CURRENCIES[0]);
  const [showPicker, setShowPicker] = useState(false);

  const numericAmount = parseFloat(amount.replace(',', '.')) || 0;

  const convertedAmounts = SUPPORTED_CURRENCIES.filter(
    (c) => c.code !== selectedCurrency.code
  ).map((c) => {
    const inEur = numericAmount / EXCHANGE_RATES[selectedCurrency.code];
    const converted = inEur * EXCHANGE_RATES[c.code];
    return { ...c, converted };
  });

  async function handlePayWithSumUp() {
    if (numericAmount <= 0) {
      Alert.alert('Montant invalide', 'Veuillez saisir un montant valide.');
      return;
    }
    await WebBrowser.openBrowserAsync(SUMUP_PAYMENT_LINK);
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text }]}>Effectuer un paiement</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Saisissez le montant et payez avec SumUp
            </Text>
          </View>

          {/* Amount Input */}
          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
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
              {/* Currency Picker Button */}
              <TouchableOpacity
                style={[styles.currencyBtn, { backgroundColor: colors.primary + '15', borderColor: colors.primary + '40' }]}
                onPress={() => setShowPicker(!showPicker)}>
                <Text style={styles.currencyFlag}>{selectedCurrency.flag}</Text>
                <Text style={[styles.currencyCode, { color: colors.primary }]}>{selectedCurrency.code}</Text>
                <IconSymbol name="chevron.down" size={14} color={colors.primary} />
              </TouchableOpacity>
            </View>

            {/* Currency Picker Dropdown */}
            {showPicker && (
              <View style={[styles.picker, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
                {SUPPORTED_CURRENCIES.map((currency) => (
                  <TouchableOpacity
                    key={currency.code}
                    style={[
                      styles.pickerItem,
                      { borderBottomColor: colors.cardBorder },
                      selectedCurrency.code === currency.code && {
                        backgroundColor: colors.primary + '15',
                      },
                    ]}
                    onPress={() => {
                      setSelectedCurrency(currency);
                      setShowPicker(false);
                    }}>
                    <Text style={styles.pickerFlag}>{currency.flag}</Text>
                    <Text style={[styles.pickerCode, { color: colors.text }]}>
                      {currency.code}
                    </Text>
                    <Text style={[styles.pickerName, { color: colors.textSecondary }]}>
                      {currency.name}
                    </Text>
                    {selectedCurrency.code === currency.code && (
                      <IconSymbol name="checkmark.circle.fill" size={16} color={colors.primary} />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Conversion Preview */}
          {numericAmount > 0 && (
            <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
              <Text style={[styles.cardLabel, { color: colors.textSecondary }]}>
                Équivalents ({selectedCurrency.symbol}{amount} {selectedCurrency.code})
              </Text>
              {convertedAmounts.slice(0, 4).map((c, index) => (
                <View
                  key={c.code}
                  style={[
                    styles.conversionRow,
                    index < 3 && { borderBottomColor: colors.cardBorder, borderBottomWidth: 1 },
                  ]}>
                  <Text style={styles.conversionFlag}>{c.flag}</Text>
                  <Text style={[styles.conversionCode, { color: colors.textSecondary }]}>{c.code}</Text>
                  <Text style={[styles.conversionValue, { color: colors.text }]}>
                    {c.converted.toLocaleString('fr-FR', {
                      minimumFractionDigits: c.code === 'XOF' || c.code === 'DZD' ? 0 : 2,
                      maximumFractionDigits: c.code === 'XOF' || c.code === 'DZD' ? 0 : 2,
                    })}{' '}
                    {c.symbol}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {/* Info Banner */}
          <View style={[styles.infoBanner, { backgroundColor: colors.primary + '12', borderColor: colors.primary + '30' }]}>
            <IconSymbol name="info.circle" size={16} color={colors.primary} />
            <Text style={[styles.infoText, { color: colors.primary }]}>
              Le paiement sera traité via votre lien SumUp sécurisé.
            </Text>
          </View>

          {/* Pay Button */}
          <TouchableOpacity
            style={[
              styles.payBtn,
              { backgroundColor: colors.primary },
              numericAmount <= 0 && { opacity: 0.5 },
            ]}
            onPress={handlePayWithSumUp}
            activeOpacity={0.85}>
            <IconSymbol name="creditcard.fill" size={20} color="#FFFFFF" />
            <Text style={styles.payBtnText}>Payer avec SumUp</Text>
          </TouchableOpacity>

          {/* Share Link */}
          <TouchableOpacity
            style={[styles.shareBtn, { borderColor: colors.cardBorder }]}
            onPress={() => Alert.alert('Partager', 'Fonctionnalité de partage bientôt disponible.')}
            activeOpacity={0.8}>
            <IconSymbol name="square.and.arrow.up" size={18} color={colors.textSecondary} />
            <Text style={[styles.shareBtnText, { color: colors.textSecondary }]}>
              Partager le lien de paiement
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  scroll: { padding: 20, paddingBottom: 40 },
  header: { marginBottom: 24 },
  title: { fontSize: 24, fontWeight: '800', marginBottom: 4 },
  subtitle: { fontSize: 13 },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  cardLabel: { fontSize: 12, fontWeight: '600', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.5 },
  amountRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  amountInput: { flex: 1, fontSize: 36, fontWeight: '800', letterSpacing: -1 },
  currencyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
  },
  currencyFlag: { fontSize: 18 },
  currencyCode: { fontSize: 14, fontWeight: '700' },
  picker: {
    marginTop: 12,
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  pickerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 10,
    borderBottomWidth: 1,
  },
  pickerFlag: { fontSize: 20 },
  pickerCode: { fontSize: 14, fontWeight: '600', width: 44 },
  pickerName: { flex: 1, fontSize: 13 },
  conversionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 10,
  },
  conversionFlag: { fontSize: 20 },
  conversionCode: { width: 44, fontSize: 13, fontWeight: '600' },
  conversionValue: { flex: 1, textAlign: 'right', fontSize: 15, fontWeight: '700' },
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    marginBottom: 20,
  },
  infoText: { flex: 1, fontSize: 12, fontWeight: '500' },
  payBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    borderRadius: 16,
    paddingVertical: 18,
    marginBottom: 12,
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  payBtnText: { color: '#FFFFFF', fontSize: 17, fontWeight: '700' },
  shareBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 16,
    paddingVertical: 14,
    borderWidth: 1,
  },
  shareBtnText: { fontSize: 14, fontWeight: '600' },
});
