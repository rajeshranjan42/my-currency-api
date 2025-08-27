const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Complete exchange rates for all major currencies
const exchangeRates = {
  USD: {
    // Major currencies
    EUR: 0.8588, GBP: 0.7419, JPY: 147.42, AUD: 1.5402, CAD: 1.3839, CHF: 0.8041,
    CNY: 7.1573, INR: 87.6692, KRW: 1394.38, MXN: 18.6629, BRL: 5.4086, RUB: 80.3687,
    // European currencies
    NOK: 10.1321, SEK: 9.5632, DKK: 6.4087, PLN: 3.6568, CZK: 21.0602, HUF: 340.42,
    RON: 4.3401, BGN: 1.6794, HRK: 6.4704, ISK: 122.93,
    // Asian currencies
    SGD: 1.2852, HKD: 7.7967, TWD: 30.5248, THB: 32.4445, MYR: 4.2159, PHP: 56.9779,
    IDR: 16302.90, VND: 26244.09, KZT: 535.30, UZS: 12337.53,
    // Middle Eastern currencies
    AED: 3.6725, SAR: 3.7500, QAR: 3.6400, KWD: 0.3056, OMR: 0.3845, BHD: 0.3760,
    JOD: 0.7090, ILS: 3.3572, TRY: 41.0536, IRR: 42451.10,
    // African currencies
    ZAR: 17.6326, EGP: 48.5991, NGN: 1534.39, KES: 129.13, GHS: 11.5241, TZS: 2493.14,
    UGX: 3543.86, ZMW: 23.3782, BWP: 13.8152, MAD: 9.0288,
    // Latin American currencies
    ARS: 1352.33, CLP: 961.40, COP: 4022.35, PEN: 3.5207, UYU: 40.1207, BOB: 6.9348,
    PYG: 7262.31, VES: 144.37, CRC: 504.04, GTQ: 7.6675,
    // Other currencies
    NZD: 1.7068, PKR: 283.64, BDT: 121.88, LKR: 302.13, NPR: 140.26, AFN: 68.5760,
    lastUpdated: "2025-08-28T00:00:00Z"
  }
};

// Generate reverse rates automatically
const generateReverseRates = () => {
  Object.keys(exchangeRates).forEach(baseCurrency => {
    Object.keys(exchangeRates[baseCurrency]).forEach(targetCurrency => {
      if (targetCurrency !== 'lastUpdated') {
        // Create reverse conversion
        if (!exchangeRates[targetCurrency]) {
          exchangeRates[targetCurrency] = { lastUpdated: "2025-08-28T00:00:00Z" };
        }
        if (!exchangeRates[targetCurrency][baseCurrency]) {
          exchangeRates[targetCurrency][baseCurrency] = 
            parseFloat((1 / exchangeRates[baseCurrency][targetCurrency]).toFixed(6));
        }
      }
    });
  });
};

// Generate all reverse rates
generateReverseRates();

// Complete currency information with country codes
const currencyInfo = {
  AED: { name: "UAE Dirham", country: "United Arab Emirates", flag: "AE" },
  AFN: { name: "Afghan Afghani", country: "Afghanistan", flag: "AF" },
  ALL: { name: "Albanian Lek", country: "Albania", flag: "AL" },
  AMD: { name: "Armenian Dram", country: "Armenia", flag: "AM" },
  ANG: { name: "Netherlands Antillean Guilder", country: "Netherlands Antilles", flag: "AN" },
  AOA: { name: "Angolan Kwanza", country: "Angola", flag: "AO" },
  ARS: { name: "Argentine Peso", country: "Argentina", flag: "AR" },
  AUD: { name: "Australian Dollar", country: "Australia", flag: "AU" },
  AWG: { name: "Aruban Florin", country: "Aruba", flag: "AW" },
  AZN: { name: "Azerbaijani Manat", country: "Azerbaijan", flag: "AZ" },
  BAM: { name: "Bosnia and Herzegovina Convertible Mark", country: "Bosnia and Herzegovina", flag: "BA" },
  BBD: { name: "Barbadian Dollar", country: "Barbados", flag: "BB" },
  BDT: { name: "Bangladeshi Taka", country: "Bangladesh", flag: "BD" },
  BGN: { name: "Bulgarian Lev", country: "Bulgaria", flag: "BG" },
  BHD: { name: "Bahraini Dinar", country: "Bahrain", flag: "BH" },
  BIF: { name: "Burundian Franc", country: "Burundi", flag: "BI" },
  BMD: { name: "Bermudian Dollar", country: "Bermuda", flag: "BM" },
  BND: { name: "Brunei Dollar", country: "Brunei", flag: "BN" },
  BOB: { name: "Bolivian Boliviano", country: "Bolivia", flag: "BO" },
  BRL: { name: "Brazilian Real", country: "Brazil", flag: "BR" },
  BSD: { name: "Bahamian Dollar", country: "Bahamas", flag: "BS" },
  BWP: { name: "Botswana Pula", country: "Botswana", flag: "BW" },
  BYN: { name: "Belarusian Ruble", country: "Belarus", flag: "BY" },
  BZD: { name: "Belize Dollar", country: "Belize", flag: "BZ" },
  CAD: { name: "Canadian Dollar", country: "Canada", flag: "CA" },
  CDF: { name: "Congolese Franc", country: "Democratic Republic of the Congo", flag: "CD" },
  CHF: { name: "Swiss Franc", country: "Switzerland", flag: "CH" },
  CLP: { name: "Chilean Peso", country: "Chile", flag: "CL" },
  CNY: { name: "Chinese Yuan", country: "China", flag: "CN" },
  COP: { name: "Colombian Peso", country: "Colombia", flag: "CO" },
  CRC: { name: "Costa Rican Colón", country: "Costa Rica", flag: "CR" },
  CUP: { name: "Cuban Peso", country: "Cuba", flag: "CU" },
  CVE: { name: "Cape Verdean Escudo", country: "Cape Verde", flag: "CV" },
  CZK: { name: "Czech Koruna", country: "Czech Republic", flag: "CZ" },
  DJF: { name: "Djiboutian Franc", country: "Djibouti", flag: "DJ" },
  DKK: { name: "Danish Krone", country: "Denmark", flag: "DK" },
  DOP: { name: "Dominican Peso", country: "Dominican Republic", flag: "DO" },
  DZD: { name: "Algerian Dinar", country: "Algeria", flag: "DZ" },
  EGP: { name: "Egyptian Pound", country: "Egypt", flag: "EG" },
  ERN: { name: "Eritrean Nakfa", country: "Eritrea", flag: "ER" },
  ETB: { name: "Ethiopian Birr", country: "Ethiopia", flag: "ET" },
  EUR: { name: "Euro", country: "Eurozone", flag: "EU" },
  FJD: { name: "Fijian Dollar", country: "Fiji", flag: "FJ" },
  FKP: { name: "Falkland Islands Pound", country: "Falkland Islands", flag: "FK" },
  GBP: { name: "British Pound Sterling", country: "United Kingdom", flag: "GB" },
  GEL: { name: "Georgian Lari", country: "Georgia", flag: "GE" },
  GHS: { name: "Ghanaian Cedi", country: "Ghana", flag: "GH" },
  GIP: { name: "Gibraltar Pound", country: "Gibraltar", flag: "GI" },
  GMD: { name: "Gambian Dalasi", country: "Gambia", flag: "GM" },
  GNF: { name: "Guinean Franc", country: "Guinea", flag: "GN" },
  GTQ: { name: "Guatemalan Quetzal", country: "Guatemala", flag: "GT" },
  GYD: { name: "Guyanaese Dollar", country: "Guyana", flag: "GY" },
  HKD: { name: "Hong Kong Dollar", country: "Hong Kong", flag: "HK" },
  HNL: { name: "Honduran Lempira", country: "Honduras", flag: "HN" },
  HRK: { name: "Croatian Kuna", country: "Croatia", flag: "HR" },
  HTG: { name: "Haitian Gourde", country: "Haiti", flag: "HT" },
  HUF: { name: "Hungarian Forint", country: "Hungary", flag: "HU" },
  IDR: { name: "Indonesian Rupiah", country: "Indonesia", flag: "ID" },
  ILS: { name: "Israeli New Sheqel", country: "Israel", flag: "IL" },
  INR: { name: "Indian Rupee", country: "India", flag: "IN" },
  IQD: { name: "Iraqi Dinar", country: "Iraq", flag: "IQ" },
  IRR: { name: "Iranian Rial", country: "Iran", flag: "IR" },
  ISK: { name: "Icelandic Króna", country: "Iceland", flag: "IS" },
  JMD: { name: "Jamaican Dollar", country: "Jamaica", flag: "JM" },
  JOD: { name: "Jordanian Dinar", country: "Jordan", flag: "JO" },
  JPY: { name: "Japanese Yen", country: "Japan", flag: "JP" },
  KES: { name: "Kenyan Shilling", country: "Kenya", flag: "KE" },
  KGS: { name: "Kyrgystani Som", country: "Kyrgyzstan", flag: "KG" },
  KHR: { name: "Cambodian Riel", country: "Cambodia", flag: "KH" },
  KMF: { name: "Comorian Franc", country: "Comoros", flag: "KM" },
  KPW: { name: "North Korean Won", country: "North Korea", flag: "KP" },
  KRW: { name: "South Korean Won", country: "South Korea", flag: "KR" },
  KWD: { name: "Kuwaiti Dinar", country: "Kuwait", flag: "KW" },
  KYD: { name: "Cayman Islands Dollar", country: "Cayman Islands", flag: "KY" },
  KZT: { name: "Kazakhstani Tenge", country: "Kazakhstan", flag: "KZ" },
  LAK: { name: "Laotian Kip", country: "Laos", flag: "LA" },
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
  MOP: { name: "Macanese Pataca", country: "Macao", flag: "MO" },
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
  PEN: { name: "Peruvian Nuevo Sol", country: "Peru", flag: "PE" },
  PGK: { name: "Papua New Guinean Kina", country: "Papua New Guinea", flag: "PG" },
  PHP: { name: "Philippine Peso", country: "Philippines", flag: "PH" },
  PKR: { name: "Pakistani Rupee", country: "Pakistan", flag: "PK" },
  PLN: { name: "Polish Zloty", country: "Poland", flag: "PL" },
  PYG: { name: "Paraguayan Guarani", country: "Paraguay", flag: "PY" },
  QAR: { name: "Qatari Rial", country: "Qatar", flag: "QA" },
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
  SOS: { name: "Somali Shilling", country: "Somalia", flag: "SO" },
  SRD: { name: "Surinamese Dollar", country: "Suriname", flag: "SR" },
  STN: { name: "São Tomé and Príncipe Dobra", country: "São Tomé and Príncipe", flag: "ST" },
  SYP: { name: "Syrian Pound", country: "Syria", flag: "SY" },
  SZL: { name: "Swazi Lilangeni", country: "Eswatini", flag: "SZ" },
  THB: { name: "Thai Baht", country: "Thailand", flag: "TH" },
  TJS: { name: "Tajikistani Somoni", country: "Tajikistan", flag: "TJ" },
  TMT: { name: "Turkmenistani Manat", country: "Turkmenistan", flag: "TM" },
  TND: { name: "Tunisian Dinar", country: "Tunisia", flag: "TN" },
  TOP: { name: "Tongan Pa'anga", country: "Tonga", flag: "TO" },
  TRY: { name: "Turkish Lira", country: "Turkey", flag: "TR" },
  TTD: { name: "Trinidad and Tobago Dollar", country: "Trinidad and Tobago", flag: "TT" },
  TWD: { name: "New Taiwan Dollar", country: "Taiwan", flag: "TW" },
  TZS: { name: "Tanzanian Shilling", country: "Tanzania", flag: "TZ" },
  UAH: { name: "Ukrainian Hryvnia", country: "Ukraine", flag: "UA" },
  UGX: { name: "Ugandan Shilling", country: "Uganda", flag: "UG" },
  USD: { name: "US Dollar", country: "United States", flag: "US" },
  UYU: { name: "Uruguayan Peso", country: "Uruguay", flag: "UY" },
  UZS: { name: "Uzbekistan Som", country: "Uzbekistan", flag: "UZ" },
  VES: { name: "Venezuelan Bolívar", country: "Venezuela", flag: "VE" },
  VND: { name: "Vietnamese Dong", country: "Vietnam", flag: "VN" },
  VUV: { name: "Vanuatu Vatu", country: "Vanuatu", flag: "VU" },
  WST: { name: "Samoan Tala", country: "Samoa", flag: "WS" },
  XCD: { name: "East Caribbean Dollar", country: "Eastern Caribbean", flag: "AG" },
  YER: { name: "Yemeni Rial", country: "Yemen", flag: "YE" },
  ZAR: { name: "South African Rand", country: "South Africa", flag: "ZA" },
  ZMW: { name: "Zambian Kwacha", country: "Zambia", flag: "ZM" },
  ZWL: { name: "Zimbabwean Dollar", country: "Zimbabwe", flag: "ZW" }
};

// API Endpoints
app.get('/api/rates', (req, res) => {
  res.json({
    status: 'success',
    data: exchangeRates,
    totalCurrencies: Object.keys(exchangeRates).length,
    message: 'Exchange rates fetched successfully'
  });
});

app.get('/api/currencies', (req, res) => {
  res.json({
    status: 'success',
    data: currencyInfo,
    totalCurrencies: Object.keys(currencyInfo).length,
    message: 'Currency information fetched successfully'
  });
});

app.get('/api/rates/:base', (req, res) => {
  const baseCurrency = req.params.base.toUpperCase();
  
  if (!exchangeRates[baseCurrency]) {
    return res.status(404).json({
      status: 'error',
      message: `Currency ${baseCurrency} not supported`,
      supportedCurrencies: Object.keys(exchangeRates)
    });
  }
  
  res.json({
    status: 'success',
    base: baseCurrency,
    baseCurrencyInfo: currencyInfo[baseCurrency],
    rates: exchangeRates[baseCurrency],
    totalRates: Object.keys(exchangeRates[baseCurrency]).length - 1,
    lastUpdated: exchangeRates[baseCurrency].lastUpdated
  });
});

app.get('/api/convert', (req, res) => {
  const { from, to, amount } = req.query;
  
  if (!from || !to || !amount) {
    return res.status(400).json({
      status: 'error',
      message: 'Missing required parameters: from, to, amount',
      example: '/api/convert?from=USD&to=INR&amount=100'
    });
  }
  
  const fromCurrency = from.toUpperCase();
  const toCurrency = to.toUpperCase();
  const convertAmount = parseFloat(amount);
  
  if (isNaN(convertAmount) || convertAmount <= 0) {
    return res.status(400).json({
      status: 'error',
      message: 'Amount must be a positive number'
    });
  }
  
  if (!exchangeRates[fromCurrency]) {
    return res.status(404).json({
      status: 'error',
      message: `Base currency ${fromCurrency} not supported`
    });
  }
  
  if (!exchangeRates[fromCurrency][toCurrency]) {
    return res.status(404).json({
      status: 'error',
      message: `Conversion from ${fromCurrency} to ${toCurrency} not available`
    });
  }
  
  const rate = exchangeRates[fromCurrency][toCurrency];
  const convertedAmount = convertAmount * rate;
  
  res.json({
    status: 'success',
    query: {
      from: fromCurrency,
      fromInfo: currencyInfo[fromCurrency],
      to: toCurrency,
      toInfo: currencyInfo[toCurrency],
      amount: convertAmount
    },
    result: {
      rate: rate,
      convertedAmount: parseFloat(convertedAmount.toFixed(2)),
      formatted: `${convertAmount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`
    },
    lastUpdated: exchangeRates[fromCurrency].lastUpdated
  });
});

// Get supported currencies
app.get('/api/supported', (req, res) => {
  const currencies = Object.keys(currencyInfo).map(code => ({
    code: code,
    name: currencyInfo[code].name,
    country: currencyInfo[code].country,
    flag: currencyInfo[code].flag
  }));
  
  res.json({
    status: 'success',
    totalCurrencies: currencies.length,
    currencies: currencies.sort((a, b) => a.code.localeCompare(b.code))
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '2.0.0',
    totalCurrencies: Object.keys(currencyInfo).length,
    totalExchangeRates: Object.keys(exchangeRates).length
  });
});

// Root endpoint with documentation
app.get('/', (req, res) => {
  res.json({
    name: "Currency Converter API",
    version: "2.0.0",
    description: "Complete currency conversion API with 150+ currencies",
    totalCurrencies: Object.keys(currencyInfo).length,
    endpoints: {
      "GET /api/rates": "Get all exchange rates",
      "GET /api/rates/:base": "Get rates for specific base currency",
      "GET /api/convert?from=USD&to=INR&amount=100": "Convert currency",
      "GET /api/currencies": "Get all currency information",
      "GET /api/supported": "Get supported currencies list",
      "GET /health": "API health check"
    },
    examples: {
      convertUSDtoINR: `${req.protocol}://${req.get('host')}/api/convert?from=USD&to=INR&amount=100`,
      getUSDRates: `${req.protocol}://${req.get('host')}/api/rates/USD`,
      getAllCurrencies: `${req.protocol}://${req.get('host')}/api/supported`
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Currency API running on port ${PORT}`);
  console.log(`🌍 Supporting ${Object.keys(currencyInfo).length} currencies`);
  console.log(`📊 API Documentation: http://localhost:${PORT}`);
});


const cron = require('node-cron');

const updateAPIs = [
  {
    name: 'Frankfurter',
    url: 'https://api.frankfurter.app/latest?from=USD',
    parseRates: (data) => data.rates
  },
  {
    name: 'ExchangeRate-API',
    url: 'https://open.er-api.com/v6/latest/USD',
    parseRates: (data) => data.rates
  }
];

// ✅ Try multiple APIs for reliability
const updateExchangeRates = async () => {
  console.log('🔄 Updating exchange rates...');
  
  for (let api of updateAPIs) {
    try {
      console.log(`Trying ${api.name}...`);
      
      const response = await fetch(api.url);
      const data = await response.json();
      const rates = api.parseRates(data);
      
      if (rates) {
        exchangeRates.USD = {
          ...rates,
          lastUpdated: new Date().toISOString()
        };
        
        generateReverseRates();
        
        console.log(`✅ Rates updated using ${api.name}`);
        console.log(`📊 ${Object.keys(rates).length} currencies updated`);
        return; // Success, exit loop
      }
      
    } catch (error) {
      console.log(`❌ ${api.name} failed: ${error.message}`);
      continue; // Try next API
    }
  }
  
  console.error('❌ All APIs failed, keeping existing rates');
};

// ✅ Schedule updates every 2 hours
cron.schedule('0 */2 * * *', updateExchangeRates);

// ✅ Update on startup
updateExchangeRates();
