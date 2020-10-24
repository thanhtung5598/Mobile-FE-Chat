import axiosServices from 'services/axiosServices';

export const uploadImgSingle = formData => {
  return axiosServices
    .request({
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      url: `https://api-ret.ml/api/v0/images/upload-avatar`,
      data: formData
    })
    .then(res => console.log(res));
};
