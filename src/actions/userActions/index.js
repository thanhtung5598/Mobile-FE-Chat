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

export const searchUserByPhoneEmailName = dataSearch => dispatch => {
  dispatch({
    type: PROFILE_TYPE.SEARCH_USER_REQUEST
  });
  return axiosServices
    .get(`${prefix}textSearch?value=${dataSearch}`)
    .then(res => {
      const { error, data } = res.data;
      dispatch({
        type: PROFILE_TYPE.SEARCH_USER_SUCCESS,
        payload: data
      });
      return { error, data };
    })
    .catch(err => {
      const { error, data } = err.response?.data;
      dispatch({
        type: PROFILE_TYPE.SEARCH_USER_FAILURE
      });
      return { error, data };
    });
};

export const clearSearch = () => dispatch => {
  dispatch({
    type: PROFILE_TYPE.SEARCH_USER_SUCCESS,
    payload: null
  });
};

export const addFriend = dataAdd => dispatch => {
  dispatch({
    type: PROFILE_TYPE.ADD_FRIEND_REQUEST
  });
  return axiosServices
    .get(`${prefix}addFriend`, dataAdd)
    .then(res => {
      const { error, data } = res.data;
      dispatch({
        type: PROFILE_TYPE.ADD_FRIEND_SUCCESS,
        payload: data
      });
      return { error, data };
    })
    .catch(err => {
      const { error, data } = err.response?.data;
      dispatch({
        type: PROFILE_TYPE.ADD_FRIEND_FAILURE
      });
      return { error, data };
    });
};

export const acceptFriend = dataAccept => dispatch => {
  dispatch({
    type: PROFILE_TYPE.ACCEPT_FRIEND_REQUEST
  });
  return axiosServices
    .get(`${prefix}accepFriend`, dataAccept)
    .then(res => {
      const { error, data } = res.data;
      dispatch({
        type: PROFILE_TYPE.ACCEPT_FRIEND_SUCCESS,
        payload: data
      });
      return { error, data };
    })
    .catch(err => {
      const { error, data } = err.response?.data;
      dispatch({
        type: PROFILE_TYPE.ACCEPT_FRIEND_FAILURE
      });
      return { error, data };
    });
};

export const declineFriend = dataDecline => dispatch => {
  dispatch({
    type: PROFILE_TYPE.DECLINE_FRIEND_REQUEST
  });
  return axiosServices
    .get(`${prefix}declineFriend`, dataDecline)
    .then(res => {
      const { error, data } = res.data;
      dispatch({
        type: PROFILE_TYPE.DECLINE_FRIEND_SUCCESS,
        payload: data
      });
      return { error, data };
    })
    .catch(err => {
      const { error, data } = err.response?.data;
      dispatch({
        type: PROFILE_TYPE.DECLINE_FRIEND_FAILURE
      });
      return { error, data };
    });
};

export const fetchListFriends = id_user => dispatch => {
  dispatch({
    type: PROFILE_TYPE.FETCH_LIST_FRIENDS_REQUEST
  });
  return axiosServices
    .get(`${prefix}getListContactId?userId=${id_user}`)
    .then(res => {
      const { error, data } = res.data;
      dispatch({
        type: PROFILE_TYPE.FETCH_LIST_FRIENDS_SUCCESS,
        payload: data
      });
      return { error, data };
    })
    .catch(err => {
      const { error, data } = err.response?.data;
      dispatch({
        type: PROFILE_TYPE.FETCH_LIST_FRIENDS_FAILURE
      });
      return { error, data };
    });
};

export const fetchRequestFriends = id_user => dispatch => {
  dispatch({
    type: PROFILE_TYPE.FETCH_REQUEST_FRIENDS_REQUEST
  });
  return axiosServices
    .get(`${prefix}getListRequestId?userId=${id_user}`)
    .then(res => {
      const { error, data } = res.data;
      dispatch({
        type: PROFILE_TYPE.FETCH_REQUEST_FRIENDS_SUCCESS,
        payload: data
      });
      return { error, data };
    })
    .catch(err => {
      const { error, data } = err.response?.data;
      dispatch({
        type: PROFILE_TYPE.FETCH_REQUEST_FRIENDS_FAILURE
      });
      return { error, data };
    });
};
