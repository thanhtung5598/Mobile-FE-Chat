import axiosServices from 'services/axiosServices';
import { GROUP_TYPE } from 'constTypes';

const prefix = 'rooms/';

export const createSingleRoom = (friend_id, data) => {
  return axiosServices
    .post(`${prefix}single?friend_id=${friend_id}`, data)
    .then(res => {
      const { data } = res;
      return { error, data };
    })
    .catch(err => {
      const error = err.response?.data;
      return error;
    });
};

export const findRoomDetail = idRoom => {
  return axiosServices
    .get(`${prefix}${idRoom}`)
    .then(res => {
      const { data } = res;
      return { data };
    })
    .catch(err => {
      const error = err.response?.data;
      return error;
    });
};

export const createGroupChat = data => async dispatch => {
  dispatch({
    type: GROUP_TYPE.CREATE_GROUP_REQUEST
  });
  return axiosServices
    .post(`${prefix}group`, data)
    .then(async res => {
      const { data } = res;
      const { _id: idRoom } = data;
      const resRoomDetails = await findRoomDetail(idRoom);
      const { data: roomNew } = resRoomDetails;
      dispatch({
        type: GROUP_TYPE.CREATE_GROUP_SUCCESS
      });
      return { error: false, roomNew };
    })
    .catch(err => {
      const error = err.response?.data;
      dispatch({
        type: GROUP_TYPE.CREATE_GROUP_FAILURE,
        payload: error
      });
      return { error: true };
    });
};

export const addMemberGroup = (valueAdd, idRoom) => dispatch => {
  dispatch({
    type: GROUP_TYPE.ADD_MEMBER_REQUEST
  });
  return axiosServices
    .put(`${prefix}members?id=${idRoom}`, valueAdd)
    .then(res => {
      const { data } = res;
      findRoomDetail(idRoom).then(res => {
        const { data: roomNew } = res;
        dispatch({
          type: GROUP_TYPE.ADD_MEMBER_SUCCESS
        });
        dispatch(updateCurrentGroup(roomNew));
      });
      return { error, data };
    })
    .catch(err => {
      const error = err.response?.data;
      dispatch({
        type: GROUP_TYPE.ADD_MEMBER_FAILURE
      });
      return { error };
    });
};

export const updateRoomName = (dataUpdate, idRoom) => dispatch => {
  dispatch({
    type: GROUP_TYPE.UPDATE_GROUP_NAME_REQUEST
  });
  return axiosServices
    .put(`${prefix}${idRoom}`, dataUpdate)
    .then(res => {
      const { data } = res;
      dispatch({
        type: GROUP_TYPE.UPDATE_GROUP_NAME_SUCCESS,
        payload: dataUpdate
      });
      return data;
    })
    .catch(err => {
      const error = err.response?.data;
      dispatch({
        type: GROUP_TYPE.UPDATE_GROUP_NAME_FAILURE
      });
      return error;
    });
};

export const updateCurrentGroup = currentGroup => dispatch => {
  let error = false;
  dispatch({
    type: GROUP_TYPE.CURRENT_GROUP_REQUEST,
    payload: currentGroup
  });
  return { error };
};

export const exitRoom = idRoom => dispatch => {
  dispatch({
    type: GROUP_TYPE.EXIT_GROUP_REQUEST
  });
  return axiosServices
    .put(`${prefix}exit?id=${idRoom}`)
    .then(res => {
      const { data } = res;
      dispatch({
        type: GROUP_TYPE.EXIT_GROUP_SUCCESS
      });
      return { data };
    })
    .catch(err => {
      const error = err.response?.data;
      dispatch({
        type: GROUP_TYPE.EXIT_GROUP_FAILURE
      });
      return error;
    });
};

export const deleteRoom = idRoom => dispatch => {
  dispatch({
    type: GROUP_TYPE.DELETE_GROUP_REQUEST
  });
  return axiosServices
    .delete(`${prefix}${idRoom}`)
    .then(res => {
      const { data } = res;
      dispatch({
        type: GROUP_TYPE.DELETE_GROUP_SUCCESS
      });
      return { data };
    })
    .catch(err => {
      const { data } = err.response?.data;
      dispatch({
        type: GROUP_TYPE.DELETE_GROUP_FAILURE
      });
      return { data };
    });
};
