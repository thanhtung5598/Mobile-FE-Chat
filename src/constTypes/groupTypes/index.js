const createRequestTypes = (base, act) =>
  ['REQUEST', 'SUCCESS', 'FAILURE'].reduce((acc, type) => {
    const key = `${act}_${type}`;
    acc[key] = `${base}_${act}_${type}`;
    return acc;
  }, {});
const GROUP_TYPE = {
  ...createRequestTypes('USER', 'FETCH_ALL_GROUP')
};
export default GROUP_TYPE;
