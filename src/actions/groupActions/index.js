import axiosServices from 'services/axiosServices';
import { GROUP_TYPE } from 'constTypes';

const prefix = 'rooms/';

export const fetchAllGroupsForChecked = () => dispatch => {
  return axiosServices
    .get(`https://api-chat.ga/api/v0/rooms?currentPage=1&perPage=1000`)
    .then(res => {
      const {
        data: { itemsList }
      } = res.data;
      const singleGroups = itemsList.filter(item => item.group === false);
      dispatch({
        type: GROUP_TYPE.FETCH_ALL_GROUP_CHECKED_REQUEST,
        payload: singleGroups
      });
      return { itemsList };
    })
    .catch(err => {
      const { error, data } = err.response?.data;
      return { error, data };
    });
};

export const createSingleRoom = (friend_id, data) => {
  return axiosServices
    .post(`${prefix}single?friend_id=${friend_id}`, data)
    .then(res => {
      const { error, data } = res.data;
      return { error, data };
    })
    .catch(err => {
      const { error, data } = err.response?.data;
      return { error, data };
    });
};

export const findRoomDetail = idRoom => {
  return axiosServices
    .get(`${prefix}detail?id=${idRoom}`)
    .then(res => {
      const { error, data } = res.data;
      return { error, data };
    })
    .catch(err => {
      const { error, data } = err.response?.data;
      return { error, data };
    });
};

export const createGroupChat = data => dispatch => {
  dispatch({
    type: GROUP_TYPE.CREATE_GROUP_REQUEST
  });
  return axiosServices
    .post(`${prefix}group`, data)
    .then(res => {
      const { error, data } = res.data;
      const { _id: idRoom } = data;
      findRoomDetail(idRoom).then(res => {
        const { data: roomNew } = res;
        dispatch({
          type: GROUP_TYPE.CREATE_GROUP_SUCCESS
        });
        dispatch(updateCurrentGroup(roomNew));
      });
      return { error, data };
    })
    .catch(err => {
      const { error, data } = err.response?.data;
      dispatch({
        type: GROUP_TYPE.CREATE_GROUP_FAILURE
      });
      return { error, data };
    });
};

export const addMemberGroup = (valueAdd, idRoom) => dispatch => {
  dispatch({
    type: GROUP_TYPE.ADD_MEMBER_REQUEST
  });
  return axiosServices
    .put(`${prefix}members?id=${idRoom}`, valueAdd)
    .then(res => {
      const { error, data } = res.data;
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
      const { error, data } = err.response?.data;
      dispatch({
        type: GROUP_TYPE.ADD_MEMBER_FAILURE
      });
      return { error, data };
    });
};

export const updateRoomName = (dataUpdate, idRoom) => dispatch => {
  dispatch({
    type: GROUP_TYPE.UPDATE_GROUP_NAME_REQUEST
  });
  return axiosServices
    .put(`${prefix}?id=${idRoom}`, dataUpdate)
    .then(res => {
      const { error, data } = res.data;
      dispatch({
        type: GROUP_TYPE.UPDATE_GROUP_NAME_SUCCESS,
        payload: dataUpdate
      });
      return { error, data };
    })
    .catch(err => {
      const { error, data } = err.response?.data;
      dispatch({
        type: GROUP_TYPE.UPDATE_GROUP_NAME_FAILURE
      });
      return { error, data };
    });
};

export const updateCurrentGroup = currentGroup => dispatch => {
  dispatch({
    type: GROUP_TYPE.CURRENT_GROUP_REQUEST,
    payload: currentGroup
  });
};

export const exitRoom = idRoom => dispatch => {
  dispatch({
    type: GROUP_TYPE.EXIT_GROUP_REQUEST
  });
  return axiosServices
    .put(`${prefix}exit?id=${idRoom}`)
    .then(res => {
      const { error, data } = res.data;
      dispatch({
        type: GROUP_TYPE.EXIT_GROUP_SUCCESS
      });
      return { error, data };
    })
    .catch(err => {
      const { error, data } = err.response?.data;
      dispatch({
        type: GROUP_TYPE.EXIT_GROUP_FAILURE
      });
      return { error, data };
    });
};
