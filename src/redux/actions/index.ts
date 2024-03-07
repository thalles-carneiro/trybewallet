import { fetchExchangeRates } from '../../services/fetchWallet';
import {
  AppDispatch,
  CurrencyCode,
  Expense,
  FormExpense,
  GlobalState,
} from '../../types';

export const LOGIN = 'LOGIN';

export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const REQUEST_CURRENCIES_SUCCESS = 'REQUEST_CURRENCIES_SUCCESS';
export const REQUEST_CURRENCIES_FAILED = 'REQUEST_CURRENCIES_FAILED';

export const REQUEST_ADD_EXPENSE = 'REQUEST_ADD_EXPENSE';
export const REQUEST_ADD_EXPENSE_SUCCESS = 'REQUEST_ADD_EXPENSE_SUCCESS';
export const REQUEST_ADD_EXPENSE_FAILED = 'REQUEST_ADD_EXPENSE_FAILED';

export const UPDATE_EXPENSES = 'UPDATE_EXPENSES';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';

export const login = (email: string) => ({
  type: LOGIN,
  payload: { email },
});

const requestCurrencies = () => ({
  type: REQUEST_CURRENCIES,
});

const requestCurrenciesSuccess = (currencies: CurrencyCode[]) => ({
  type: REQUEST_CURRENCIES_SUCCESS,
  payload: { currencies },
});

const requestCurrenciesFailed = (message: string) => ({
  type: REQUEST_CURRENCIES_FAILED,
  payload: { message },
});

export const getCurrencies = () => async (dispatch: AppDispatch) => {
  dispatch(requestCurrencies());

  try {
    const currencies = await fetchExchangeRates('currencies');
    dispatch(requestCurrenciesSuccess(currencies));
  } catch (_) {
    const message = 'Request of currencies failed';
    dispatch(requestCurrenciesFailed(message));
  }
};

const requestAddExpense = () => ({
  type: REQUEST_ADD_EXPENSE,
});

const requestAddExpenseSuccess = (expense: Expense) => ({
  type: REQUEST_ADD_EXPENSE_SUCCESS,
  payload: { expense },
});

const requestAddExpenseFailed = (message: string) => ({
  type: REQUEST_ADD_EXPENSE_FAILED,
  payload: { message },
});

type GetState = () => GlobalState;

export const addExpense = (formExpense: FormExpense) => {
  return async (dispatch: AppDispatch, getState: GetState) => {
    dispatch(requestAddExpense());

    try {
      const { length } = getState().wallet.expenses;
      const exchangeRates = await fetchExchangeRates();
      const expense = {
        id: length === 0 ? 0 : length,
        ...formExpense,
        exchangeRates,
      };
      dispatch(requestAddExpenseSuccess(expense));
    } catch (_) {
      const message = 'Request to add expense failed';
      dispatch(requestAddExpenseFailed(message));
    }
  };
};

export const updateExpenses = (expenses: Expense[]) => ({
  type: UPDATE_EXPENSES,
  payload: { expenses },
});

export const editExpense = (id: number, editor: boolean) => ({
  type: EDIT_EXPENSE,
  payload: { id, editor },
});
