import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

export type ChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLSelectElement>;
export type SubmitEvent = React.FormEvent<HTMLFormElement>;

export type Rate = {
  code: string,
  codein: string,
  name: string,
  high: string,
  low: string,
  varBid: string,
  pctChange: string,
  bid: string,
  ask: string,
  timestamp: string,
  create_date: string,
};

export type CurrencyCode = 'USD' | 'USDT' | 'CAD' | 'GBP' | 'ARS' | 'BTC' | 'LTC' |
'EUR' | 'JPY' | 'AUD' | 'CNY' | 'ILS' | 'ETH' | 'XRP' | 'DOGE';

export type ExchangeRates = {
  [key in CurrencyCode]: Rate;
};

export type Expense = {
  id: number,
  value: string,
  currency: CurrencyCode,
  method: string,
  tag: string,
  description: string,
  exchangeRates: ExchangeRates,
};

export type FormExpense = Omit<Expense, 'id' | 'exchangeRates'>;

export type GlobalState = {
  user: {
    email: string,
  },
  wallet: {
    currencies: CurrencyCode[],
    expenses: Expense[],
    editor: boolean,
    idToEdit: number,
  },
};

export type AppDispatch = ThunkDispatch<GlobalState, null, AnyAction>;
