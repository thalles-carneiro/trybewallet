import { AnyAction } from 'redux';
import {
  REQUEST_ADD_EXPENSE_SUCCESS,
  REQUEST_CURRENCIES_SUCCESS,
  EDIT_EXPENSE,
  UPDATE_EXPENSES,
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
    case UPDATE_EXPENSES:
      return {
        ...state,
        expenses: action.payload.expenses,
        editor: false,
        idToEdit: 0,
      };
    case EDIT_EXPENSE:
      return {
        ...state,
        editor: action.payload.editor,
        idToEdit: action.payload.id,
      };
    default:
      return state;
  }
};

export default wallet;
