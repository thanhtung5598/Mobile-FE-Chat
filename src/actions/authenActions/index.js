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
      const { error, data } = res.data;
      if (!error) {
        asyncStorage.setToken(data);
        dispatch({
          type: AUTHENTICATION_TYPE.LOGIN_SUCCESS,
          payload: data
        });
      }
    })
    .catch(err => {
      const { error, data } = err.response?.data;
      dispatch({
        type: AUTHENTICATION_TYPE.LOGIN_FAILURE,
        payload: {
          error,
          data
        }
      });
      return { error, data };
    });
};

export const accountRegister = (data, token) => dispatch => {
  dispatch({
    type: AUTHENTICATION_TYPE.REGISTER_REQUEST
  });
  axiosServices.defaults.headers.post['x-access-token'] = token.accessToken;
  return axiosServices.post(`${prefix}signup`, data).then(res => {
    const { error, data } = res.data;
    if (!error) {
      asyncStorage.setToken(token);
      dispatch({
        type: AUTHENTICATION_TYPE.REGISTER_SUCCESS,
        payload: {
          error,
          data
        }
      });
    }
    if (error) {
      dispatch({
        type: AUTHENTICATION_TYPE.REGISTER_FAILURE,
        payload: {
          error,
          data
        }
      });
    }
    return { error, data };
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
      const { error } = res.data;
      if (!error) {
        asyncStorage.setToken(token);
        setTimeout(() => {
          dispatch({
            type: AUTHENTICATION_TYPE.CHANGE_PASSWORD_SUCCESS,
            payload: {
              token
            }
          });
        }, 3000);
      }
    })
    .catch(err => {
      console.log(err);
      const { error, data } = err.response?.data;
      if (error) {
        dispatch({
          type: AUTHENTICATION_TYPE.CHANGE_PASSWORD_FAILURE,
          payload: {
            error
          }
        });
      }
      return { error, data };
    });
};

export const accountSendOTPSignUp = (type = 'phone', value) => {
  return axiosServices.get(`${prefix}active/send?${type}=${value}`);
};

export const accountSendForgotPassword = (type = 'phone', value) => {
  return axiosServices.get(`${prefix}passwords/forgot?${type}=${value}`);
};

export const accountVerifyCodeForgot = data => dispatch => {
  dispatch({
    type: AUTHENTICATION_TYPE.VERIFY_REQUEST
  });
  return axiosServices
    .post(`${prefix}code/password/verify`, data)
    .then(res => {
      const { error, data } = res.data;
      if (!error) {
        dispatch({
          type: AUTHENTICATION_TYPE.VERIFY_SUCCESS
        });
      }
      return { error, data };
    })
    .catch(err => {
      const { error, data } = err.response?.data;
      dispatch({
        type: AUTHENTICATION_TYPE.VERIFY_FAILURE,
        payload: {
          error
        }
      });
      return { error, data };
    });
};

export const accountVerifyCodeSignUp = data => dispatch => {
  dispatch({
    type: AUTHENTICATION_TYPE.VERIFY_REQUEST
  });
  return axiosServices
    .post(`${prefix}code/verify`, data)
    .then(res => {
      const { error, data } = res.data;
      if (!error) {
        dispatch({
          type: AUTHENTICATION_TYPE.VERIFY_SUCCESS
        });
      }
      return { error, data };
    })
    .catch(err => {
      const { error, data } = err.response?.data;
      dispatch({
        type: AUTHENTICATION_TYPE.VERIFY_FAILURE,
        payload: {
          error
        }
      });
      return { error, data };
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
    if (token) {
      const isExpired = jwtDecode(token)?.exp - jwtDecode(token)?.iat;
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
