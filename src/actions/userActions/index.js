import jwtDecode from 'jwt-decode';
import axiosServices from 'services/axiosServices';
import asyncStorage from 'services/asyncStorage';
import { PROFILE_TYPE } from 'constTypes';

const prefix = 'users/';

export const getProfileUser = () => async dispatch => {
  const token = await asyncStorage.getAccessToken();
  const dataUser = jwtDecode(token);
  const { email, phone } = dataUser.data;
  const type = phone ? 'phone' : 'email';
  const typeValue = phone || email;
  dispatch({
    type: PROFILE_TYPE.FETCH_PROFILE_REQUEST
  });
  return axiosServices
    .get(`${prefix}detail?${type}=${typeValue}`)
    .then(res => {
      const { error, data } = res.data;
      if (!error) {
        dispatch({
          type: PROFILE_TYPE.FETCH_PROFILE_SUCCESS,
          payload: data
        });
      }
      return { error, data };
    })
    .catch(err => {
      const { error, data } = err.response?.data;
      dispatch({
        type: PROFILE_TYPE.FETCH_PROFILE_FAILURE
      });
      return { error, data };
    });
};
