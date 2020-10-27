import axiosServices from 'services/axiosServices';

export const uploadImgSingle = formData => {
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
