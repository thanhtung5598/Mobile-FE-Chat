import jwtDecode from 'jwt-decode';
import axiosServices from 'services/axiosServices';
import asyncStorage from 'services/asyncStorage';
import { AUTHENTICATION_TYPE } from 'constTypes';

const prefix = 'accounts/';

export const accountLogin = data => dispatch => {
  dispatch({
    type: AUTHENTICATION_TYPE.LOGIN_REQUEST
  });
  return axiosServices
    .post(`${prefix}signin`, data)
    .then(res => {
      const { data } = res;
      asyncStorage.setToken(data);
      dispatch({
        type: AUTHENTICATION_TYPE.LOGIN_SUCCESS,
        payload: data
      });
    })
    .catch(err => {
      const error = err.response?.data;
      dispatch({
        type: AUTHENTICATION_TYPE.LOGIN_FAILURE,
        payload: {
          error
        }
      });
      return { error };
    });
};

export const accountRegister = (data, token) => dispatch => {
  dispatch({
    type: AUTHENTICATION_TYPE.REGISTER_REQUEST
  });
  axiosServices.defaults.headers.post['x-access-token'] = token.accessToken;
  return axiosServices
    .post(`${prefix}signup`, data)
    .then(res => {
      const { data } = res;
      asyncStorage.setToken(data);
      dispatch({
        type: AUTHENTICATION_TYPE.REGISTER_SUCCESS,
        payload: {
          data
        }
      });
      return { error: false };
    })
    .catch(err => {
      const error = err.response?.data;
      dispatch({
        type: AUTHENTICATION_TYPE.REGISTER_FAILURE,
        payload: {
          error
        }
      });
      return { error: true };
    });
};

export const accountChangePassword = (data, token) => dispatch => {
  dispatch({
    type: AUTHENTICATION_TYPE.CHANGE_PASSWORD_REQUEST
  });
  axiosServices.defaults.headers.put['x-access-token'] = token.accessToken;
  return axiosServices
    .put(`${prefix}passwords/change`, data)
    .then(res => {
      const { data } = res;
      if (!data) {
        setTimeout(() => {
          dispatch({
            type: AUTHENTICATION_TYPE.CHANGE_PASSWORD_SUCCESS,
            payload: {
              token
            }
          });
        }, 3000);
      }
      return { error: false, data };
    })
    .catch(err => {
      const data = err.response?.data;
      dispatch({
        type: AUTHENTICATION_TYPE.CHANGE_PASSWORD_FAILURE,
        payload: {
          data
        }
      });
      return { error: true, data };
    });
};

export const accountSendOTPSignUp = (type = 'phone', value) => dispatch => {
  dispatch({
    type: AUTHENTICATION_TYPE.SEND_OTP_REGISTER_REQUEST
  });
  return axiosServices
    .get(`${prefix}active/send?${type}=${value}`)
    .then(res => {
      const { data } = res;
      console.log(data);
      dispatch({
        type: AUTHENTICATION_TYPE.SEND_OTP_REGISTER_SUCCESS
      });
      return { error: false, data };
    })
    .catch(err => {
      const data = err.response?.data;
      dispatch({
        type: AUTHENTICATION_TYPE.SEND_OTP_REGISTER_FAILURE,
        payload: {
          data
        }
      });
      return { error: true, data };
    });
};

export const accountSendForgotPassword = (
  type = 'phone',
  value
) => dispatch => {
  dispatch({
    type: AUTHENTICATION_TYPE.SEND_OTP_FORGOT_REQUEST
  });
  return axiosServices
    .get(`${prefix}passwords/forgot?${type}=${value}`)
    .then(res => {
      const { data } = res;
      dispatch({
        type: AUTHENTICATION_TYPE.SEND_OTP_FORGOT_SUCCESS
      });
      return { error: false, data };
    })
    .catch(err => {
      const { data } = err.response?.data;
      dispatch({
        type: AUTHENTICATION_TYPE.SEND_OTP_FORGOT_FAILURE,
        payload: {
          data
        }
      });
      return { error: true, data };
    });
};

export const accountVerifyCodeForgot = data => dispatch => {
  dispatch({
    type: AUTHENTICATION_TYPE.VERIFY_FORGOT_REQUEST
  });
  return axiosServices
    .post(`${prefix}code/password/verify`, data)
    .then(res => {
      console.log('succ', res);
      const { data } = res;
      dispatch({
        type: AUTHENTICATION_TYPE.VERIFY_FORGOT_SUCCESS
      });
      return { error: false, data };
    })
    .catch(err => {
      const data = err.response?.data;
      console.log('failed', data);
      dispatch({
        type: AUTHENTICATION_TYPE.VERIFY_FORGOT_FAILURE
      });
      return { error: true, data };
    });
};

export const accountVerifyCodeSignUp = data => dispatch => {
  dispatch({
    type: AUTHENTICATION_TYPE.VERIFY_SIGUP_REQUEST
  });
  return axiosServices
    .post(`${prefix}code/verify`, data)
    .then(res => {
      const { data } = res;
      dispatch({
        type: AUTHENTICATION_TYPE.VERIFY_SIGUP_SUCCESS
      });
      return { error: false, data };
    })
    .catch(err => {
      const data = err.response?.data;
      dispatch({
        type: AUTHENTICATION_TYPE.VERIFY_SIGUP_FAILURE
      });
      return { error: true, data };
    });
};

export const accountLogout = () => dispatch => {
  asyncStorage.clearToken();
  dispatch({
    type: AUTHENTICATION_TYPE.LOGOUT_REQUEST
  });
};

export const refreshError = () => dispatch => {
  dispatch({
    type: AUTHENTICATION_TYPE.REFRESH_REQUEST
  });
};

export const isTokenExpired = () => async dispatch => {
  try {
    const token = await asyncStorage.getAccessToken();
    const todayTime = Math.round((new Date().getTime() + 1) / 1000);
    if (token) {
      const isExpired = jwtDecode(token)?.exp - todayTime;
      if (isExpired > 0) {
        dispatch({
          type: AUTHENTICATION_TYPE.IS_LOGIN_REQUEST,
          payload: { accessToken: token }
        });
      }
    }
  } catch (error) {
    console.log('error authen action', error);
  }
};
