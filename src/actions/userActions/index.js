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
      const { data } = res;
      dispatch({
        type: PROFILE_TYPE.FETCH_PROFILE_SUCCESS,
        payload: data
      });
      return { error, data };
    })
    .catch(err => {
      const { error } = err.response?.data;
      dispatch({
        type: PROFILE_TYPE.FETCH_PROFILE_FAILURE
      });
      return { error };
    });
};

export const searchUserByPhoneEmailName = dataSearch => dispatch => {
  dispatch({
    type: PROFILE_TYPE.SEARCH_USER_REQUEST
  });
  const data = dataSearch.split('').length === 0 ? null : dataSearch;
  return axiosServices
    .get(`${prefix}textSearch?value=${data}`)
    .then(res => {
      const { data } = res;
      dispatch({
        type: PROFILE_TYPE.SEARCH_USER_SUCCESS,
        payload: data
      });
      return { data };
    })
    .catch(err => {
      const error = err.response?.data;
      dispatch({
        type: PROFILE_TYPE.SEARCH_USER_FAILURE
      });
      return { error };
    });
};

export const clearSearch = () => dispatch => {
  dispatch({
    type: PROFILE_TYPE.SEARCH_USER_SUCCESS,
    payload: null
  });
};

export const fetchFriendsWait = () => dispatch => {
  dispatch({
    type: PROFILE_TYPE.FETCH_FRIEND_WAIT_REQUEST
  });
  return axiosServices
    .get(`${prefix}request/sent`)
    .then(res => {
      const { data } = res;
      dispatch({
        type: PROFILE_TYPE.FETCH_FRIEND_WAIT_SUCCESS,
        payload: data.length === 0 ? null : data
      });
      return { data };
    })
    .catch(err => {
      const error = err.response?.data;
      dispatch({
        type: PROFILE_TYPE.FETCH_FRIEND_WAIT_FAILURE
      });
      return error;
    });
};

export const fetchPhonebookSync = () => dispatch => {
  dispatch({
    type: PROFILE_TYPE.FETCH_PHONEBOOK_SYNC_REQUEST
  });
  return axiosServices
    .get(`${prefix}getListPhoneBookById`)
    .then(res => {
      const { data } = res;
      dispatch({
        type: PROFILE_TYPE.FETCH_PHONEBOOK_SYNC_SUCCESS,
        payload: data
      });
      return { data };
    })
    .catch(err => {
      const error = err.response?.data;
      dispatch({
        type: PROFILE_TYPE.FETCH_PHONEBOOK_SYNC_FAILURE
      });
      return { error };
    });
};

export const syncDataPhonebook = dataSync => dispatch => {
  dispatch({
    type: PROFILE_TYPE.SYNC_DATA_PHONEBOOK_REQUEST
  });
  return axiosServices
    .post(`${prefix}syncPhoneBook`, dataSync)
    .then(res => {
      const { data } = res;
      dispatch({
        type: PROFILE_TYPE.SYNC_DATA_PHONEBOOK_SUCCESS
      });
      dispatch(fetchPhonebookSync());
      return { data };
    })
    .catch(err => {
      const error = err.response?.data;
      dispatch({
        type: PROFILE_TYPE.SYNC_DATA_PHONEBOOK_FAILURE
      });
      return error;
    });
};

export const fetchRequestFriends = () => dispatch => {
  dispatch({
    type: PROFILE_TYPE.FETCH_REQUEST_FRIENDS_REQUEST
  });
  return axiosServices
    .get(`${prefix}getListRequestId`)
    .then(res => {
      const { data } = res;
      dispatch({
        type: PROFILE_TYPE.FETCH_REQUEST_FRIENDS_SUCCESS,
        payload: data
      });
      return { data };
    })
    .catch(err => {
      const error = err.response?.data;
      dispatch({
        type: PROFILE_TYPE.FETCH_REQUEST_FRIENDS_FAILURE
      });
      return { error };
    });
};
export const fetchListFriends = () => dispatch => {
  dispatch({
    type: PROFILE_TYPE.FETCH_LIST_FRIENDS_REQUEST
  });
  return axiosServices
    .get(`${prefix}getListContactId`)
    .then(res => {
      const { data } = res;
      dispatch({
        type: PROFILE_TYPE.FETCH_LIST_FRIENDS_SUCCESS,
        payload: data
      });
      return { data };
    })
    .catch(err => {
      const { error, data } = err.response?.data;
      dispatch({
        type: PROFILE_TYPE.FETCH_LIST_FRIENDS_FAILURE
      });
      return { error, data };
    });
};

export const addFriend = dataAdd => dispatch => {
  dispatch({
    type: PROFILE_TYPE.ADD_FRIEND_REQUEST
  });
  return axiosServices
    .post(`${prefix}addFriend`, dataAdd)
    .then(res => {
      const { data } = res;
      dispatch({
        type: PROFILE_TYPE.ADD_FRIEND_SUCCESS,
        payload: data
      });
      dispatch(fetchFriendsWait());
      dispatch(fetchPhonebookSync());
      return { data };
    })
    .catch(err => {
      const error = err.response?.data;
      dispatch({
        type: PROFILE_TYPE.ADD_FRIEND_FAILURE
      });
      return { error };
    });
};
export const deleteFriend = dataDelete => dispatch => {
  dispatch({
    type: PROFILE_TYPE.DELETE_FRIEND_REQUEST
  });
  return axiosServices
    .delete(`${prefix}contacts/deletePhone?user_id_want_delete=${dataDelete}`)
    .then(res => {
      const { data } = res;
      dispatch({
        type: PROFILE_TYPE.DELETE_FRIEND_SUCCESS,
        payload: data
      });
      dispatch(fetchListFriends());
      dispatch(fetchPhonebookSync());
      return { data };
    })
    .catch(err => {
      const error = err.response?.data;
      dispatch({
        type: PROFILE_TYPE.DELETE_FRIEND_FAILURE
      });
      return { error };
    });
};

export const acceptFriend = dataAccept => dispatch => {
  dispatch({
    type: PROFILE_TYPE.ACCEPT_FRIEND_REQUEST
  });
  return axiosServices
    .post(`${prefix}accepFriend`, dataAccept)
    .then(res => {
      const { data } = res;
      dispatch({
        type: PROFILE_TYPE.ACCEPT_FRIEND_SUCCESS,
        payload: data
      });
      dispatch(fetchListFriends());
      dispatch(fetchRequestFriends());
      dispatch(fetchPhonebookSync());
      return { data };
    })
    .catch(err => {
      const error = err.response?.data;
      dispatch({
        type: PROFILE_TYPE.ACCEPT_FRIEND_FAILURE
      });
      return { error };
    });
};

export const declineFriend = dataDecline => dispatch => {
  dispatch({
    type: PROFILE_TYPE.DECLINE_FRIEND_REQUEST
  });
  return axiosServices
    .post(`${prefix}declineFriend`, dataDecline)
    .then(res => {
      const { data } = res;
      dispatch({
        type: PROFILE_TYPE.DECLINE_FRIEND_SUCCESS,
        payload: data
      });
      dispatch(fetchRequestFriends());
      dispatch(fetchListFriends());
      dispatch(fetchPhonebookSync());
      return { data };
    })
    .catch(err => {
      const error = err.response?.data;
      dispatch({
        type: PROFILE_TYPE.DECLINE_FRIEND_FAILURE
      });
      return error;
    });
};

export const updateProfile = (dataUpdate, type = 1) => dispatch => {
  if (type === 1) {
    dispatch({
      type: PROFILE_TYPE.UPDATE_PROFILE_REQUEST
    });
  }
  return axiosServices
    .put(`${prefix}profiles`, dataUpdate)
    .then(res => {
      const { data } = res;
      dispatch({
        type: PROFILE_TYPE.UPDATE_PROFILE_SUCCESS,
        payload: dataUpdate
      });
      return { data };
    })
    .catch(err => {
      const error = err.response?.data;
      dispatch({
        type: PROFILE_TYPE.UPDATE_PROFILE_FAILURE
      });
      return error;
    });
};
