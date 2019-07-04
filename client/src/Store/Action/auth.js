import axios from "axios";
import fingerprintjs from "fingerprintjs2";
import { ERROR_REGISTER, LOGIN, LOGOUT, UPLOAD_AVATAR } from "../Constant";
import jwtDecode from "jwt-decode";
export const register = (data, history) => {
  return dispatch => {
    axios
      .post("/api/user/register", data)
      .then(res => {
        console.log(res);
        dispatch({ type: ERROR_REGISTER, payload: undefined });
        history.push("/");
      })
      .catch(err => {
        dispatch({ type: ERROR_REGISTER, payload: err.response.data });
      });
  };
};

export const login = (data, history) => {
  return dispatch => {
    fingerprintjs.getV18({}, (fingerprint, component) => {
      axios
        .post("/api/user/login", { ...data, fingerprint })
        .then(res => {
          console.log(res);
          localStorage.setItem("token", res.data.token);
          const profile = jwtDecode(res.data.token);
          dispatch({ type: LOGIN, payload: profile });
          history.push("/");
        })
        .catch(err => {
          console.log(err);
        });
    });
  };
};

export const logout = () => {
  return {
    type: LOGOUT
  };
};

export const uploadAvatar = (token, data) => {
  return dispatch => {
    fingerprintjs.getV18({}, (fingerprint, component) => {
      axios({
        method: "POST",
        url: "api/user/upload-avatar",
        headers: { Authorization: token, fingerprint },
        data
      })
        .then(res => {
          console.log(res);
          dispatch({ type: UPLOAD_AVATAR, payload: res.data });
        })
        .catch(console.log);
    });
  };
};
