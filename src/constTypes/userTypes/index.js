const createRequestTypes = (base, act) =>
  ['REQUEST', 'SUCCESS', 'FAILURE'].reduce((acc, type) => {
    const key = `${act}_${type}`;
    acc[key] = `${base}_${act}_${type}`;
    return acc;
  }, {});
const PROFILE_TYPE = {
  ...createRequestTypes('USER', 'FETCH_PROFILE'),
  ...createRequestTypes('USER', 'FETCH_LIST_FRIENDS'),
  ...createRequestTypes('USER', 'FETCH_REQUEST_FRIENDS'),
  ...createRequestTypes('USER', 'SEARCH_USER'),
  ...createRequestTypes('USER', 'ADD_FRIEND')
};
export default PROFILE_TYPE;
