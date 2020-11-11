import axiosServices from 'services/axiosServices';
import { GROUP_TYPE } from 'constTypes';

const prefix = 'rooms/';

export const fetchAllGroup = (currentPage = 1, dataOld = null) => dispatch => {
  dispatch({
    type: GROUP_TYPE.FETCH_ALL_GROUP_REQUEST
  });
  return axiosServices
    .get(`${prefix}?currentPage=${currentPage}&perPage=8`)
    .then(res => {
      const {
        data: { itemsList, paginator }
      } = res.data;
      const listDataGroup = dataOld ? [...dataOld, ...itemsList] : itemsList;
      dispatch({
        type: GROUP_TYPE.FETCH_ALL_GROUP_SUCCESS,
        payload: {
          listGroups: listDataGroup,
          paginator: paginator
        }
      });
      return { listDataGroup };
    })
    .catch(err => {
      const { error, data } = err.response?.data;
      dispatch({
        type: GROUP_TYPE.FETCH_ALL_GROUP_FAILURE
      });
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

      dispatch(fetchAllGroup()).then(res => {
        const { listDataGroup } = res;
        const { _id } = data;
        const groupNew = listDataGroup.filter(item => item._id === _id);
        dispatch({
          type: GROUP_TYPE.CREATE_GROUP_SUCCESS,
          payload: groupNew[0]
        });
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

export const addMemberGroup = (valueAdd, idRoom) => dispatch => {
  dispatch({
    type: GROUP_TYPE.ADD_MEMBER_REQUEST
  });
  return axiosServices
    .put(`${prefix}members?id=${idRoom}`, valueAdd)
    .then(res => {
      const { error, data } = res.data;
      dispatch({
        type: GROUP_TYPE.ADD_MEMBER_SUCCESS
      });
      dispatch(fetchAllGroup()).then(res => {
        const { listDataGroup } = res;
        const groupNew = listDataGroup.filter(item => item._id === idRoom);
        dispatch(updateCurrentGroup(groupNew[0]));
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
