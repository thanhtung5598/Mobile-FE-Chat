const createRequestTypes = (base, act) =>
  ['REQUEST', 'SUCCESS', 'FAILURE'].reduce((acc, type) => {
    const key = `${act}_${type}`;
    acc[key] = `${base}_${act}_${type}`;
    return acc;
  }, {});
const createSingleRequest = (base, act) =>
  ['REQUEST'].reduce((acc, type) => {
    const key = `${act}_${type}`;
    acc[key] = `${base}_${act}_${type}`;
    return acc;
  }, {});
const PROFILE_TYPE = {
  ...createRequestTypes('USER', 'FETCH_PROFILE'),
  ...createRequestTypes('USER', 'FETCH_LIST_FRIENDS'),
  ...createRequestTypes('USER', 'FETCH_REQUEST_FRIENDS'),
  ...createRequestTypes('USER', 'FETCH_PHONEBOOK_SYNC'),
  ...createRequestTypes('USER', 'FETCH_FRIEND_WAIT'),
  ...createRequestTypes('USER', 'SYNC_DATA_PHONEBOOK'),
  ...createRequestTypes('USER', 'SEARCH_USER'),
  ...createRequestTypes('USER', 'ADD_FRIEND'),
  ...createRequestTypes('USER', 'DELETE_FRIEND'),
  ...createRequestTypes('USER', 'ACCEPT_FRIEND'),
  ...createRequestTypes('USER', 'DECLINE_FRIEND'),
  ...createRequestTypes('USER', 'UPDATE_PROFILE'),
  ...createSingleRequest('USER', 'UPDATE_AVATAR')
};
export default PROFILE_TYPE;
