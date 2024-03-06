import { AnyAction } from 'redux';
import { LOGIN } from '../actions';

const initialState = {
  email: '',
};

const user = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        email: action.payload.email,
      };
    default:
      return state;
  }
};

export default user;
