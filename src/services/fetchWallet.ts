import { CurrencyCode } from '../types';

export const fetchExchangeRates = async (option = 'exchangeRates') => {
  const URL = 'https://economia.awesomeapi.com.br/json/all';

  const response = await fetch(URL);
  const data = await response.json();

  delete data.USDT;

  const currencies = Object.keys(data) as CurrencyCode[];
  return option === 'currencies' ? currencies : data;
};
