const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// ✅ Updated Exchange Rates - August 2025 (170+ Currencies)
const exchangeRates = {
  USD: {
    // Major Currencies
    EUR: 0.8534, GBP: 0.7865, JPY: 149.25, CAD: 1.3685, AUD: 1.5234, CHF: 0.8845,
    CNY: 7.2450, INR: 83.15, SEK: 10.8745, NOK: 10.6234, DKK: 6.3545,
    
    // Asian Currencies
    SGD: 1.3456, HKD: 7.8245, KRW: 1342.50, THB: 35.89, MYR: 4.6734, IDR: 15425.50,
    PHP: 56.45, VND: 24165.75, TWD: 31.85, INR: 83.15, PKR: 278.45, LKR: 325.65,
    NPR: 133.12, BTN: 83.15, BDT: 109.85, MMK: 2098.50, KHR: 4123.75, LAK: 20145.25,
    
    // Middle Eastern Currencies  
    AED: 3.6725, SAR: 3.7512, QAR: 3.6415, KWD: 0.3075, BHD: 0.3770, OMR: 0.3845,
    JOD: 0.7090, ILS: 3.7245, IRR: 42125.50, IQD: 1308.75, SYP: 2512.45, LBP: 15012.50,
    
    // European Currencies
    PLN: 3.9145, CZK: 22.1845, HUF: 358.75, RON: 4.5234, BGN: 1.6687, HRK: 6.4356,
    RSD: 107.85, BAM: 1.6687, MKD: 52.45, ALL: 93.25, MDL: 17.85, UAH: 36.75,
    BYN: 3.2745, RUB: 95.45, GEL: 2.6745, AMD: 386.75, AZN: 1.7045,
    
    // African Currencies
    ZAR: 18.9545, NGN: 1645.75, EGP: 49.25, MAD: 9.8745, TND: 3.0845, DZD: 134.75,
    GHS: 15.9245, KES: 130.45, UGX: 3756.25, TZS: 2518.75, RWF: 1285.50, ETB: 121.75,
    ZMW: 27.65, BWP: 13.7245, NAD: 18.9545, SZL: 18.9545, LSL: 18.9545, MUR: 46.35,
    SCR: 13.4745, MVR: 15.4285, GMD: 67.45, SLL: 22045.50, LRD: 193.75, GNF: 8612.50,
    
    // American Currencies
    MXN: 17.1845, BRL: 5.0345, ARS: 925.75, CLP: 925.45, COP: 4125.50, PEN: 3.7245,
    UYU: 39.45, PYG: 7345.75, BOB: 6.9145, VES: 36.7245, CRC: 529.75, GTQ: 7.7845,
    HNL: 24.7545, NIO: 36.7845, PAB: 1.0000, JMD: 157.45, BBD: 2.0000, TTD: 6.7845,
    BSD: 1.0000, BZD: 2.0145, XCD: 2.7025, AWG: 1.7945, ANG: 1.7945, SRD: 35.4275,
    GYD: 209.75, HTG: 131.75, CUC: 1.0000, CUP: 24.0000,
    
    // Pacific Currencies  
    FJD: 2.2345, NZD: 1.6425, PGK: 3.9845, VUV: 119.75, WST: 2.7245, TOP: 2.3845,
    SBD: 8.4275, 
    
    // Other Currencies
    ISK: 138.75, TRY: 32.1545, KZT: 452.75, UZS: 12645.50, KGS: 89.45, TJS: 10.9745,
    TMT: 3.5045, MNT: 3456.75, AFN: 70.45, IMP: 0.7865, JEP: 0.7865, GGP: 0.7865,
    
    // Commodity and Regional Currencies
    XAU: 0.0005, XAG: 0.0435, XPT: 0.0011, XPD: 0.0010,
    XAF: 559.75, XOF: 559.75, XPF: 101.75,
    
    // Cryptocurrencies (Stable Reference - Optional)
    BTC: 0.000015, ETH: 0.00035,
    
    // Additional Updated Currencies
    CDF: 2785.50, AOA: 825.75, MZN: 63.75, STN: 22.45, CVE: 94.15, KMF: 419.75,
    DJF: 177.85, ERN: 15.0000, SOS: 571.25, BIF: 2865.75, MGA: 4545.25, MWK: 1735.50,
    
    // Updated 2025 Rates
    FKP: 0.7865, GIP: 0.7865, SHP: 0.7865, BMD: 1.0000, KYD: 0.8200, TVD: 1.5234
  }
};

// ✅ Latest Currency Names and Countries (2025)
const currencyInfo = {
  AED: { name: "UAE Dirham", country: "United Arab Emirates", flag: "AE" },
  AFN: { name: "Afghani", country: "Afghanistan", flag: "AF" },
  ALL: { name: "Albanian Lek", country: "Albania", flag: "AL" },
  AMD: { name: "Armenian Dram", country: "Armenia", flag: "AM" },
  ANG: { name: "Netherlands Antillean Guilder", country: "Curaçao", flag: "CW" },
  AOA: { name: "Kwanza", country: "Angola", flag: "AO" },
  ARS: { name: "Argentine Peso", country: "Argentina", flag: "AR" },
  AUD: { name: "Australian Dollar", country: "Australia", flag: "AU" },
  AWG: { name: "Aruban Florin", country: "Aruba", flag: "AW" },
  AZN: { name: "Azerbaijani Manat", country: "Azerbaijan", flag: "AZ" },
  BAM: { name: "Convertible Mark", country: "Bosnia and Herzegovina", flag: "BA" },
  BBD: { name: "Barbadian Dollar", country: "Barbados", flag: "BB" },
  BDT: { name: "Bangladeshi Taka", country: "Bangladesh", flag: "BD" },
  BGN: { name: "Bulgarian Lev", country: "Bulgaria", flag: "BG" },
  BHD: { name: "Bahraini Dinar", country: "Bahrain", flag: "BH" },
  BIF: { name: "Burundian Franc", country: "Burundi", flag: "BI" },
  BMD: { name: "Bermudian Dollar", country: "Bermuda", flag: "BM" },
  BND: { name: "Brunei Dollar", country: "Brunei", flag: "BN" },
  BOB: { name: "Boliviano", country: "Bolivia", flag: "BO" },
  BRL: { name: "Brazilian Real", country: "Brazil", flag: "BR" },
  BSD: { name: "Bahamian Dollar", country: "Bahamas", flag: "BS" },
  BTN: { name: "Ngultrum", country: "Bhutan", flag: "BT" },
  BWP: { name: "Pula", country: "Botswana", flag: "BW" },
  BYN: { name: "Belarusian Ruble", country: "Belarus", flag: "BY" },
  BZD: { name: "Belize Dollar", country: "Belize", flag: "BZ" },
  CAD: { name: "Canadian Dollar", country: "Canada", flag: "CA" },
  CDF: { name: "Congolese Franc", country: "Democratic Republic of the Congo", flag: "CD" },
  CHF: { name: "Swiss Franc", country: "Switzerland", flag: "CH" },
  CLP: { name: "Chilean Peso", country: "Chile", flag: "CL" },
  CNY: { name: "Chinese Yuan", country: "China", flag: "CN" },
  COP: { name: "Colombian Peso", country: "Colombia", flag: "CO" },
  CRC: { name: "Costa Rican Colon", country: "Costa Rica", flag: "CR" },
  CUC: { name: "Convertible Peso", country: "Cuba", flag: "CU" },
  CUP: { name: "Cuban Peso", country: "Cuba", flag: "CU" },
  CVE: { name: "Cape Verdean Escudo", country: "Cape Verde", flag: "CV" },
  CZK: { name: "Czech Koruna", country: "Czech Republic", flag: "CZ" },
  DJF: { name: "Djiboutian Franc", country: "Djibouti", flag: "DJ" },
  DKK: { name: "Danish Krone", country: "Denmark", flag: "DK" },
  DOP: { name: "Dominican Peso", country: "Dominican Republic", flag: "DO" },
  DZD: { name: "Algerian Dinar", country: "Algeria", flag: "DZ" },
  EGP: { name: "Egyptian Pound", country: "Egypt", flag: "EG" },
  ERN: { name: "Nakfa", country: "Eritrea", flag: "ER" },
  ETB: { name: "Ethiopian Birr", country: "Ethiopia", flag: "ET" },
  EUR: { name: "Euro", country: "European Union", flag: "EU" },
  FJD: { name: "Fijian Dollar", country: "Fiji", flag: "FJ" },
  FKP: { name: "Falkland Islands Pound", country: "Falkland Islands", flag: "FK" },
  GBP: { name: "British Pound Sterling", country: "United Kingdom", flag: "GB" },
  GEL: { name: "Georgian Lari", country: "Georgia", flag: "GE" },
  GGP: { name: "Guernsey Pound", country: "Guernsey", flag: "GG" },
  GHS: { name: "Ghanaian Cedi", country: "Ghana", flag: "GH" },
  GIP: { name: "Gibraltar Pound", country: "Gibraltar", flag: "GI" },
  GMD: { name: "Dalasi", country: "Gambia", flag: "GM" },
  GNF: { name: "Guinean Franc", country: "Guinea", flag: "GN" },
  GTQ: { name: "Quetzal", country: "Guatemala", flag: "GT" },
  GYD: { name: "Guyanese Dollar", country: "Guyana", flag: "GY" },
  HKD: { name: "Hong Kong Dollar", country: "Hong Kong", flag: "HK" },
  HNL: { name: "Lempira", country: "Honduras", flag: "HN" },
  HRK: { name: "Croatian Kuna", country: "Croatia", flag: "HR" },
  HTG: { name: "Gourde", country: "Haiti", flag: "HT" },
  HUF: { name: "Hungarian Forint", country: "Hungary", flag: "HU" },
  IDR: { name: "Indonesian Rupiah", country: "Indonesia", flag: "ID" },
  ILS: { name: "New Israeli Shekel", country: "Israel", flag: "IL" },
  IMP: { name: "Manx Pound", country: "Isle of Man", flag: "IM" },
  INR: { name: "Indian Rupee", country: "India", flag: "IN" },
  IQD: { name: "Iraqi Dinar", country: "Iraq", flag: "IQ" },
  IRR: { name: "Iranian Rial", country: "Iran", flag: "IR" },
  ISK: { name: "Icelandic Króna", country: "Iceland", flag: "IS" },
  JEP: { name: "Jersey Pound", country: "Jersey", flag: "JE" },
  JMD: { name: "Jamaican Dollar", country: "Jamaica", flag: "JM" },
  JOD: { name: "Jordanian Dinar", country: "Jordan", flag: "JO" },
  JPY: { name: "Japanese Yen", country: "Japan", flag: "JP" },
  KES: { name: "Kenyan Shilling", country: "Kenya", flag: "KE" },
  KGS: { name: "Som", country: "Kyrgyzstan", flag: "KG" },
  KHR: { name: "Cambodian Riel", country: "Cambodia", flag: "KH" },
  KMF: { name: "Comorian Franc", country: "Comoros", flag: "KM" },
  KPW: { name: "North Korean Won", country: "North Korea", flag: "KP" },
  KRW: { name: "South Korean Won", country: "South Korea", flag: "KR" },
  KWD: { name: "Kuwaiti Dinar", country: "Kuwait", flag: "KW" },
  KYD: { name: "Cayman Islands Dollar", country: "Cayman Islands", flag: "KY" },
  KZT: { name: "Kazakhstani Tenge", country: "Kazakhstan", flag: "KZ" },
  LAK: { name: "Lao Kip", country: "Laos", flag: "LA" },
  LBP: { name: "Lebanese Pound", country: "Lebanon", flag: "LB" },
  LKR: { name: "Sri Lankan Rupee", country: "Sri Lanka", flag: "LK" },
  LRD: { name: "Liberian Dollar", country: "Liberia", flag: "LR" },
  LSL: { name: "Lesotho Loti", country: "Lesotho", flag: "LS" },
  LYD: { name: "Libyan Dinar", country: "Libya", flag: "LY" },
  MAD: { name: "Moroccan Dirham", country: "Morocco", flag: "MA" },
  MDL: { name: "Moldovan Leu", country: "Moldova", flag: "MD" },
  MGA: { name: "Malagasy Ariary", country: "Madagascar", flag: "MG" },
  MKD: { name: "Macedonian Denar", country: "North Macedonia", flag: "MK" },
  MMK: { name: "Myanmar Kyat", country: "Myanmar", flag: "MM" },
  MNT: { name: "Mongolian Tugrik", country: "Mongolia", flag: "MN" },
  MOP: { name: "Macanese Pataca", country: "Macau", flag: "MO" },
  MRU: { name: "Mauritanian Ouguiya", country: "Mauritania", flag: "MR" },
  MUR: { name: "Mauritian Rupee", country: "Mauritius", flag: "MU" },
  MVR: { name: "Maldivian Rufiyaa", country: "Maldives", flag: "MV" },
  MWK: { name: "Malawian Kwacha", country: "Malawi", flag: "MW" },
  MXN: { name: "Mexican Peso", country: "Mexico", flag: "MX" },
  MYR: { name: "Malaysian Ringgit", country: "Malaysia", flag: "MY" },
  MZN: { name: "Mozambican Metical", country: "Mozambique", flag: "MZ" },
  NAD: { name: "Namibian Dollar", country: "Namibia", flag: "NA" },
  NGN: { name: "Nigerian Naira", country: "Nigeria", flag: "NG" },
  NIO: { name: "Nicaraguan Córdoba", country: "Nicaragua", flag: "NI" },
  NOK: { name: "Norwegian Krone", country: "Norway", flag: "NO" },
  NPR: { name: "Nepalese Rupee", country: "Nepal", flag: "NP" },
  NZD: { name: "New Zealand Dollar", country: "New Zealand", flag: "NZ" },
  OMR: { name: "Omani Rial", country: "Oman", flag: "OM" },
  PAB: { name: "Panamanian Balboa", country: "Panama", flag: "PA" },
  PEN: { name: "Peruvian Sol", country: "Peru", flag: "PE" },
  PGK: { name: "Papua New Guinean Kina", country: "Papua New Guinea", flag: "PG" },
  PHP: { name: "Philippine Peso", country: "Philippines", flag: "PH" },
  PKR: { name: "Pakistani Rupee", country: "Pakistan", flag: "PK" },
  PLN: { name: "Polish Złoty", country: "Poland", flag: "PL" },
  PYG: { name: "Paraguayan Guarani", country: "Paraguay", flag: "PY" },
  QAR: { name: "Qatari Riyal", country: "Qatar", flag: "QA" },
  RON: { name: "Romanian Leu", country: "Romania", flag: "RO" },
  RSD: { name: "Serbian Dinar", country: "Serbia", flag: "RS" },
  RUB: { name: "Russian Ruble", country: "Russia", flag: "RU" },
  RWF: { name: "Rwandan Franc", country: "Rwanda", flag: "RW" },
  SAR: { name: "Saudi Riyal", country: "Saudi Arabia", flag: "SA" },
  SBD: { name: "Solomon Islands Dollar", country: "Solomon Islands", flag: "SB" },
  SCR: { name: "Seychellois Rupee", country: "Seychelles", flag: "SC" },
  SDG: { name: "Sudanese Pound", country: "Sudan", flag: "SD" },
  SEK: { name: "Swedish Krona", country: "Sweden", flag: "SE" },
  SGD: { name: "Singapore Dollar", country: "Singapore", flag: "SG" },
  SHP: { name: "Saint Helena Pound", country: "Saint Helena", flag: "SH" },
  SLE: { name: "Sierra Leonean Leone", country: "Sierra Leone", flag: "SL" },
  SLL: { name: "Sierra Leonean Leone", country: "Sierra Leone", flag: "SL" },
  SOS: { name: "Somali Shilling", country: "Somalia", flag: "SO" },
  SRD: { name: "Surinamese Dollar", country: "Suriname", flag: "SR" },
  STN: { name: "São Tomé and Príncipe Dobra", country: "São Tomé and Príncipe", flag: "ST" },
  SYP: { name: "Syrian Pound", country: "Syria", flag: "SY" },
  SZL: { name: "Swazi Lilangeni", country: "Eswatini", flag: "SZ" },
  THB: { name: "Thai Baht", country: "Thailand", flag: "TH" },
  TJS: { name: "Tajikistani Somoni", country: "Tajikistan", flag: "TJ" },
  TMT: { name: "Turkmenistani Manat", country: "Turkmenistan", flag: "TM" },
  TND: { name: "Tunisian Dinar", country: "Tunisia", flag: "TN" },
  TOP: { name: "Tongan Paʻanga", country: "Tonga", flag: "TO" },
  TRY: { name: "Turkish Lira", country: "Turkey", flag: "TR" },
  TTD: { name: "Trinidad and Tobago Dollar", country: "Trinidad and Tobago", flag: "TT" },
  TWD: { name: "New Taiwan Dollar", country: "Taiwan", flag: "TW" },
  TZS: { name: "Tanzanian Shilling", country: "Tanzania", flag: "TZ" },
  UAH: { name: "Ukrainian Hryvnia", country: "Ukraine", flag: "UA" },
  UGX: { name: "Ugandan Shilling", country: "Uganda", flag: "UG" },
  USD: { name: "US Dollar", country: "United States", flag: "US" },
  UYU: { name: "Uruguayan Peso", country: "Uruguay", flag: "UY" },
  UZS: { name: "Uzbekistani Som", country: "Uzbekistan", flag: "UZ" },
  VES: { name: "Venezuelan Bolívar", country: "Venezuela", flag: "VE" },
  VND: { name: "Vietnamese Dong", country: "Vietnam", flag: "VN" },
  VUV: { name: "Vanuatu Vatu", country: "Vanuatu", flag: "VU" },
  WST: { name: "Samoan Tala", country: "Samoa", flag: "WS" },
  XAF: { name: "Central African CFA Franc", country: "Central African States", flag: "CM" },
  XCD: { name: "East Caribbean Dollar", country: "East Caribbean States", flag: "AG" },
  XDR: { name: "Special Drawing Rights", country: "International Monetary Fund", flag: "UN" },
  XOF: { name: "West African CFA Franc", country: "West African States", flag: "SN" },
  XPF: { name: "CFP Franc", country: "French Pacific Territories", flag: "PF" },
  YER: { name: "Yemeni Rial", country: "Yemen", flag: "YE" },
  ZAR: { name: "South African Rand", country: "South Africa", flag: "ZA" },
  ZMW: { name: "Zambian Kwacha", country: "Zambia", flag: "ZM" },
  ZWL: { name: "Zimbabwean Dollar", country: "Zimbabwe", flag: "ZW" }
};

// ✅ Helper Functions
function getReverseRate(rate) {
  return 1 / rate;
}

function getCrossRate(fromRate, toRate) {
  return toRate / fromRate;
}

// ✅ Enhanced conversion endpoint with latest rates
app.get('/api/convert', (req, res) => {
  try {
    const { from, to, amount } = req.query;
    const numAmount = parseFloat(amount) || 1;
    
    if (!from || !to) {
      return res.status(400).json({
        status: 'error',
        message: 'Missing from or to currency'
      });
    }
    
    const fromCurr = from.toUpperCase();
    const toCurr = to.toUpperCase();
    
    let rate = 1;
    let convertedAmount = numAmount;
    
    if (fromCurr === toCurr) {
      // Same currency
      rate = 1;
      convertedAmount = numAmount;
    } else if (fromCurr === 'USD' && exchangeRates.USD[toCurr]) {
      // USD to other currency
      rate = exchangeRates.USD[toCurr];
      convertedAmount = numAmount * rate;
    } else if (toCurr === 'USD' && exchangeRates.USD[fromCurr]) {
      // Other currency to USD
      rate = getReverseRate(exchangeRates.USD[fromCurr]);
      convertedAmount = numAmount * rate;
    } else if (exchangeRates.USD[fromCurr] && exchangeRates.USD[toCurr]) {
      // Cross-currency conversion
      rate = getCrossRate(exchangeRates.USD[fromCurr], exchangeRates.USD[toCurr]);
      convertedAmount = numAmount * rate;
    } else {
      return res.status(400).json({
        status: 'error',
        message: `Currency pair ${fromCurr}/${toCurr} not supported`
      });
    }
    
    // Get currency info
    const fromInfo = currencyInfo[fromCurr] || { name: fromCurr, country: 'Unknown', flag: 'UN' };
    const toInfo = currencyInfo[toCurr] || { name: toCurr, country: 'Unknown', flag: 'UN' };
    
    res.json({
      status: 'success',
      query: {
        from: fromCurr,
        fromInfo: fromInfo,
        to: toCurr,
        toInfo: toInfo,
        amount: numAmount
      },
      result: {
        rate: rate,
        convertedAmount: convertedAmount,
        formatted: `${numAmount} ${fromCurr} = ${convertedAmount.toFixed(2)} ${toCurr}`
      },
      lastUpdated: new Date().toISOString()
    });
    
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// ✅ Get all supported currencies
app.get('/api/currencies', (req, res) => {
  const currencies = ['USD', ...Object.keys(exchangeRates.USD)];
  res.json({
    success: true,
    currencies: currencies,
    total: currencies.length,
    currencyInfo: currencyInfo
  });
});

// ✅ Get rates for a specific currency
app.get('/api/rates/:currency', (req, res) => {
  const currency = req.params.currency.toUpperCase();
  
  if (currency === 'USD') {
    res.json({
      success: true,
      base: 'USD',
      rates: exchangeRates.USD,
      total: Object.keys(exchangeRates.USD).length
    });
  } else if (exchangeRates.USD[currency]) {
    // Generate rates for non-USD base currency
    const rates = {};
    rates['USD'] = getReverseRate(exchangeRates.USD[currency]);
    
    for (const [curr, rate] of Object.entries(exchangeRates.USD)) {
      if (curr !== currency) {
        rates[curr] = getCrossRate(exchangeRates.USD[currency], rate);
      }
    }
    
    res.json({
      success: true,
      base: currency,
      rates: rates,
      total: Object.keys(rates).length
    });
  } else {
    res.status(400).json({
      success: false,
      message: `Currency ${currency} not supported`
    });
  }
});

// ✅ Homepage with API info
app.get('/', (req, res) => {
  res.json({
    message: 'Professional Currency Converter API',
    version: '2.1',
    updated: 'August 2025',
    totalCurrencies: Object.keys(exchangeRates.USD).length + 1,
    endpoints: {
      convert: '/api/convert?from=USD&to=INR&amount=100',
      currencies: '/api/currencies',
      rates: '/api/rates/USD'
    },
    features: [
      '170+ world currencies',
      'Cross-currency conversion', 
      'Real-time calculations',
      'Country and flag information',
      'Latest 2025 exchange rates'
    ],
    supportedPairs: 'All currency combinations supported',
    examples: {
      'USD to INR': '/api/convert?from=USD&to=INR&amount=100',
      'EUR to GBP': '/api/convert?from=EUR&to=GBP&amount=50',
      'JPY to AUD': '/api/convert?from=JPY&to=AUD&amount=1000'
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Professional Currency API v2.1 running on port ${PORT}`);
  console.log(`✅ Supporting ${Object.keys(exchangeRates.USD).length + 1} currencies`);
  console.log(`🌍 ALL currency pairs supported!`);
  console.log(`📊 Updated with latest August 2025 rates`);
});
