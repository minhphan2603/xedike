import { ERROR_LOGIN, ERROR_REGISTER } from "../Constant";

const innitialState = {
  login: undefined,
  register: undefined
};

export const errorReducer = (state = innitialState, action) => {
  switch (action.type) {
    case ERROR_LOGIN:
      return { ...state, login: action.payload };
    case ERROR_REGISTER:
      return { ...state, register: action.payload };
    default:
      return state;
  }
};
