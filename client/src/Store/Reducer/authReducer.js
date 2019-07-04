import { LOGIN, LOGOUT, UPLOAD_AVATAR } from "../Constant";

const innitialState = {
  isAuthenticated: false,
  profile: {}
};

export const authReducer = (state = innitialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { isAuthenticated: true, profile: action.payload };
    case LOGOUT:
      return { isAuthenticated: false, profile: {} };
    case UPLOAD_AVATAR:
      return { isAuthenticated: true, profile: action.payload };
    default:
      return state;
  }
};
