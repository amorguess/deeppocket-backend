import { StyleSheet, Text, View } from 'react-native';

import { APP_NAME, APP_USER } from '@/constants/config';
import { LuniaColors } from '@/constants/theme';

export function LuniaCard() {
  return (
    <View style={styles.card}>
      {/* Background circles décoratifs */}
      <View style={styles.circleTopRight} />
      <View style={styles.circleBottomLeft} />

      {/* Header carte */}
      <View style={styles.cardHeader}>
        <Text style={styles.cardAppName}>{APP_NAME}</Text>
        <View style={styles.cardTypeBadge}>
          <Text style={styles.cardTypeText}>WORLD</Text>
        </View>
      </View>

      {/* Puce */}
      <View style={styles.chip}>
        <View style={styles.chipInner} />
        <View style={styles.chipLine} />
        <View style={styles.chipLine} />
      </View>

      {/* Numéro de carte */}
      <Text style={styles.cardNumber}>{APP_USER.cardNumber}</Text>

      {/* Footer carte */}
      <View style={styles.cardFooter}>
        <View>
          <Text style={styles.cardLabel}>TITULAIRE</Text>
          <Text style={styles.cardName}>{APP_USER.name.toUpperCase()}</Text>
        </View>
        <View style={styles.cardRight}>
          <Text style={styles.cardLabel}>EXPIRE</Text>
          <Text style={styles.cardExpiry}>12/28</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 200,
    borderRadius: 20,
    backgroundColor: LuniaColors.navy,
    padding: 24,
    justifyContent: 'space-between',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: LuniaColors.goldDark + '60',
    shadowColor: LuniaColors.gold,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  circleTopRight: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: LuniaColors.gold + '10',
    top: -60,
    right: -40,
    borderWidth: 1,
    borderColor: LuniaColors.gold + '20',
  },
  circleBottomLeft: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: LuniaColors.gold + '08',
    bottom: -50,
    left: -30,
    borderWidth: 1,
    borderColor: LuniaColors.gold + '15',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardAppName: {
    color: LuniaColors.gold,
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 2,
  },
  cardTypeBadge: {
    borderWidth: 1,
    borderColor: LuniaColors.gold + '60',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  cardTypeText: {
    color: LuniaColors.gold,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  chip: {
    width: 36,
    height: 28,
    borderRadius: 5,
    backgroundColor: LuniaColors.gold,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  chipInner: {
    position: 'absolute',
    width: 22,
    height: 18,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: LuniaColors.goldDark,
    backgroundColor: LuniaColors.goldLight,
  },
  chipLine: {
    width: 36,
    height: 1,
    backgroundColor: LuniaColors.goldDark + '80',
    marginVertical: 3,
  },
  cardNumber: {
    color: LuniaColors.white,
    fontSize: 16,
    letterSpacing: 3,
    fontWeight: '500',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  cardLabel: {
    color: LuniaColors.gray,
    fontSize: 9,
    letterSpacing: 1.5,
    marginBottom: 2,
  },
  cardName: {
    color: LuniaColors.white,
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 1,
  },
  cardRight: { alignItems: 'flex-end' },
  cardExpiry: {
    color: LuniaColors.white,
    fontSize: 13,
    fontWeight: '600',
  },
});
