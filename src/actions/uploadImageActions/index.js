import axiosServices from 'services/axiosServices';
import { PROFILE_TYPE } from 'constTypes';

export const uploadImgSingle = formData => dispatch => {
  dispatch({
    type: PROFILE_TYPE.UPDATE_AVATAR_REQUEST
  });
  return axiosServices
    .post('https://api-ret.ml/api/v0/images/upload-avatar', formData)
    .then(res => {
      const { data } = res.data;
      return { data };
    })
    .catch(err => {
      const { data } = err.response?.data;
      console.log('error', data);
      return { data };
    });
};
