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
const GROUP_TYPE = {
  ...createRequestTypes('GROUP', 'FETCH_ALL_GROUP'),
  ...createRequestTypes('GROUP', 'CREATE_GROUP'),
  ...createRequestTypes('GROUP', 'UPDATE_GROUP_NAME'),
  ...createRequestTypes('GROUP', 'EXIT_GROUP'),
  ...createSingleRequested('GROUP', 'CURRENT_GROUP'),
  ...createSingleRequested('GROUP', 'CURRENT_SINGLE_GROUP'),
  ...createRequestTypes('GROUP', 'ADD_MEMBER'),
  ...createRequestTypes('GROUP', 'FETCH_ALL_GROUP_CHECKED')
};
export default GROUP_TYPE;
