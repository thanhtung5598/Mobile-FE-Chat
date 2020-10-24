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
  const data = dataSearch.split('').length === 0 ? null : dataSearch;
  return axiosServices
    .get(`${prefix}textSearch?value=${data}`)
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
export const fetchFriendsWait = () => dispatch => {
  dispatch({
    type: PROFILE_TYPE.FETCH_FRIEND_WAIT_REQUEST
  });
  return axiosServices
    .get(`${prefix}request/sent`)
    .then(res => {
      const { error, data } = res.data;
      dispatch({
        type: PROFILE_TYPE.FETCH_FRIEND_WAIT_SUCCESS,
        payload: data.length === 0 ? null : data
      });
      return { error, data };
    })
    .catch(err => {
      const { error, data } = err.response?.data;
      dispatch({
        type: PROFILE_TYPE.FETCH_FRIEND_WAIT_FAILURE
      });
      return { error, data };
    });
};

export const fetchPhonebookSync = () => dispatch => {
  dispatch({
    type: PROFILE_TYPE.FETCH_PHONEBOOK_SYNC_REQUEST
  });
  return axiosServices
    .get(`${prefix}getListPhoneBookById`)
    .then(res => {
      const { error, data } = res.data;
      dispatch({
        type: PROFILE_TYPE.FETCH_PHONEBOOK_SYNC_SUCCESS,
        payload: data
      });
      return { error, data };
    })
    .catch(err => {
      const { error, data } = err.response?.data;
      dispatch({
        type: PROFILE_TYPE.FETCH_PHONEBOOK_SYNC_FAILURE
      });
      return { error, data };
    });
};

export const syncDataPhonebook = dataSync => dispatch => {
  dispatch({
    type: PROFILE_TYPE.SYNC_DATA_PHONEBOOK_REQUEST
  });
  return axiosServices
    .post(`${prefix}syncPhoneBook`, dataSync)
    .then(res => {
      const { error, data } = res.data;
      dispatch({
        type: PROFILE_TYPE.SYNC_DATA_PHONEBOOK_SUCCESS
      });
      dispatch(fetchPhonebookSync());
      return { error, data };
    })
    .catch(err => {
      const { error, data } = err.response?.data;
      dispatch({
        type: PROFILE_TYPE.SYNC_DATA_PHONEBOOK_FAILURE
      });
      return { error, data };
    });
};

export const fetchRequestFriends = () => dispatch => {
  dispatch({
    type: PROFILE_TYPE.FETCH_REQUEST_FRIENDS_REQUEST
  });
  return axiosServices
    .get(`${prefix}getListRequestId`)
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
export const fetchListFriends = () => dispatch => {
  dispatch({
    type: PROFILE_TYPE.FETCH_LIST_FRIENDS_REQUEST
  });
  return axiosServices
    .get(`${prefix}getListContactId`)
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

export const addFriend = dataAdd => dispatch => {
  dispatch({
    type: PROFILE_TYPE.ADD_FRIEND_REQUEST
  });
  return axiosServices
    .post(`${prefix}addFriend`, dataAdd)
    .then(res => {
      const { error, data } = res.data;
      dispatch({
        type: PROFILE_TYPE.ADD_FRIEND_SUCCESS,
        payload: data
      });
      dispatch(fetchFriendsWait());
      dispatch(fetchPhonebookSync());
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
export const deleteFriend = dataDelete => dispatch => {
  dispatch({
    type: PROFILE_TYPE.DELETE_FRIEND_REQUEST
  });
  return axiosServices
    .post(`${prefix}deletePhoneByIdContact`, dataDelete)
    .then(res => {
      const { error, data } = res.data;
      dispatch({
        type: PROFILE_TYPE.DELETE_FRIEND_SUCCESS,
        payload: data
      });
      dispatch(fetchListFriends());
      dispatch(fetchPhonebookSync());
      return { error, data };
    })
    .catch(err => {
      const { error, data } = err.response?.data;
      console.log('err', data);
      dispatch({
        type: PROFILE_TYPE.DELETE_FRIEND_FAILURE
      });
      return { error, data };
    });
};

export const acceptFriend = dataAccept => dispatch => {
  dispatch({
    type: PROFILE_TYPE.ACCEPT_FRIEND_REQUEST
  });
  return axiosServices
    .post(`${prefix}accepFriend`, dataAccept)
    .then(res => {
      const { error, data } = res.data;
      dispatch({
        type: PROFILE_TYPE.ACCEPT_FRIEND_SUCCESS,
        payload: data
      });
      dispatch(fetchListFriends());
      dispatch(fetchRequestFriends());
      dispatch(fetchPhonebookSync());
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
    .post(`${prefix}declineFriend`, dataDecline)
    .then(res => {
      const { error, data } = res.data;
      dispatch({
        type: PROFILE_TYPE.DECLINE_FRIEND_SUCCESS,
        payload: data
      });
      dispatch(fetchRequestFriends());
      dispatch(fetchListFriends());
      dispatch(fetchPhonebookSync());
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

export const uploadAvatarAction = dataUpdate => dispatch => {
  dispatch({
    type: PROFILE_TYPE.UPLOAD_AVATAR_REQUEST
  });
  return axiosServices
    .put(`${prefix}profile/update`, dataUpdate)
    .then(res => {
      const { error, data } = res.data;
      if (!error) {
        dispatch({
          type: PROFILE_TYPE.UPLOAD_AVATAR_SUCCESS,
          payload: dataUpdate.avatar
        });
      }
      return { error, data };
    })
    .catch(err => {
      const { error, data } = err.response?.data;
      dispatch({
        type: PROFILE_TYPE.UPLOAD_AVATAR_FAILURE
      });
      return { error, data };
    });
};
