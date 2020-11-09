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
      dispatch({
        type: GROUP_TYPE.CREATE_GROUP_SUCCESS
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
