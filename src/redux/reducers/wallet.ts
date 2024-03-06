import { AnyAction } from 'redux';
import {
  REQUEST_ADD_EXPENSE,
  REQUEST_ADD_EXPENSE_SUCCESS,
  REQUEST_CURRENCIES,
  REQUEST_CURRENCIES_FAILED,
  REQUEST_CURRENCIES_SUCCESS,
} from '../actions';

const initialState = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case REQUEST_CURRENCIES_SUCCESS:
      return {
        ...state,
        currencies: action.payload.currencies,
      };
    case REQUEST_ADD_EXPENSE_SUCCESS:
      return {
        ...state,
        expenses: [...state.expenses, action.payload.expense],
      };
    default:
      return state;
  }
};

export default wallet;
