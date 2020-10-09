const createRequestTypes = (base, act) =>
  ['REQUEST', 'SUCCESS', 'FAILURE'].reduce((acc, type) => {
    const key = `${act}_${type}`;
    acc[key] = `${base}_${act}_${type}`;
    return acc;
  }, {});
const createSingleRequested = (base, act) =>
  ['REQUEST'].reduce((acc, type) => {
    const key = `${act}_${type}`;
    acc[key] = `${base}_${act}_${type}`;
    return acc;
  }, {});

const AUTHENTICATION_TYPE = {
  ...createRequestTypes('AUTHENTICATION', 'LOGIN'),
  ...createRequestTypes('AUTHENTICATION', 'LOGOUT'),
  ...createRequestTypes('AUTHENTICATION', 'REFRESH'),
  ...createRequestTypes('AUTHENTICATION', 'REGISTER'),
  ...createRequestTypes('AUTHENTICATION', 'VERIFY'),
  ...createRequestTypes('AUTHENTICATION', 'CHANGE_PASSWORD'),
  ...createSingleRequested('AUTHENTICATION', 'IS_LOGIN')
};
export default AUTHENTICATION_TYPE;
