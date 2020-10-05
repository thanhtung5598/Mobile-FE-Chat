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
      return error;
    });
};

export const accountLogout = () => dispatch => {
  asyncStorage.clearToken();
  dispatch({
    type: AUTHENTICATION_TYPE.LOGOUT_REQUEST
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
