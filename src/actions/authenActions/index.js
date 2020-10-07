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
export const accountRegister = data => dispatch => {
  dispatch({
    type: AUTHENTICATION_TYPE.REGISTER_REQUEST
  });
  return axiosServices.post(`${prefix}signup`, data).then(res => {
    const { error, data } = res.data;
    if (!error) {
      dispatch({
        type: AUTHENTICATION_TYPE.REGISTER_SUCCESS,
        payload: data
      });
    }
    if (error) {
      const { error, data } = res.data;
      dispatch({
        type: AUTHENTICATION_TYPE.REGISTER_FAILURE,
        payload: {
          error,
          data
        }
      });
      return { error, data };
    }
  });
};

export const accountActive = data => dispatch => {
  dispatch({
    type: AUTHENTICATION_TYPE.ACTIVE_REQUEST
  });
  return axiosServices
    .post(`${prefix}active`, data)
    .then(res => {
      const { error, data } = res.data;
      if (!error) {
        asyncStorage.setToken(data);
        dispatch({
          type: AUTHENTICATION_TYPE.ACTIVE_SUCCESS,
          payload: data
        });
      }
    })
    .catch(err => {
      const { error, data } = err.response?.data;
      dispatch({
        type: AUTHENTICATION_TYPE.ACTIVE_FAILURE,
        payload: {
          error
        }
      });
      return { error, data };
    });
};

export const accountActiveAgainByPhone = phone => {
  return axiosServices.get(`${prefix}active/send?phone=${phone}`);
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
