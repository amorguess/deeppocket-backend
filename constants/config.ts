// Remplacez cette URL par votre lien de paiement SumUp personnel
export const SUMUP_PAYMENT_LINK = 'https://pay.sumup.com/b2c/VOTRE_CODE_ICI';

export const APP_USER = {
  name: 'Mohamed Ben Ali',
  initials: 'MB',
  email: 'mohamed@exemple.com',
  verified: true,
};

export interface Currency {
  code: string;
  symbol: string;
  flag: string;
  name: string;
}

export const SUPPORTED_CURRENCIES: Currency[] = [
  { code: 'EUR', symbol: '€', flag: '🇪🇺', name: 'Euro' },
  { code: 'USD', symbol: '$', flag: '🇺🇸', name: 'Dollar US' },
  { code: 'GBP', symbol: '£', flag: '🇬🇧', name: 'Livre Sterling' },
  { code: 'XOF', symbol: 'CFA', flag: '🌍', name: 'Franc CFA' },
  { code: 'MAD', symbol: 'DH', flag: '🇲🇦', name: 'Dirham Marocain' },
  { code: 'DZD', symbol: 'DA', flag: '🇩🇿', name: 'Dinar Algérien' },
  { code: 'TND', symbol: 'DT', flag: '🇹🇳', name: 'Dinar Tunisien' },
];

// Taux de change par rapport à l'EUR — remplacer par une vraie API (ex: exchangerate-api.com)
export const EXCHANGE_RATES: Record<string, number> = {
  EUR: 1,
  USD: 1.09,
  GBP: 0.86,
  XOF: 655.96,
  MAD: 10.85,
  DZD: 146.82,
  TND: 3.38,
};
