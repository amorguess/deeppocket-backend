export const SUMUP_PAYMENT_LINK = 'https://pay.sumup.com/b2c/QPIX4CVQ';

export const APP_NAME = 'Lunia';

export const APP_USER = {
  name: 'Amor Guesmi',
  initials: 'AG',
  email: 'amor@lunia.app',
  cardNumber: '**** **** **** 4821',
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

export const EXCHANGE_RATES: Record<string, number> = {
  EUR: 1,
  USD: 1.09,
  GBP: 0.86,
  XOF: 655.96,
  MAD: 10.85,
  DZD: 146.82,
  TND: 3.38,
};
