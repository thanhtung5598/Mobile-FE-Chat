import axiosServices from 'services/axiosServices';
import { GROUP_TYPE } from 'constTypes';

const prefix = 'rooms/';

export const fetchAllGroup = () => dispatch => {
  dispatch({
    type: GROUP_TYPE.FETCH_ALL_GROUP_REQUEST
  });
  return axiosServices
    .get(`${prefix}?currentPage=1&perPage=10`)
    .then(res => {
      const { data } = res.data;
      dispatch({
        type: GROUP_TYPE.FETCH_ALL_GROUP_SUCCESS,
        payload: {
          listGroups: data.itemsList,
          paginator: data.paginator
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
