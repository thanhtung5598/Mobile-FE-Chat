import React, { useState } from 'react';
import PropTypes from 'prop-types';

const GroupContext = React.createContext();
const GroupConsumer = GroupContext.Consumer;

const GroupProvider = props => {
  const [currentGroup, setCurrentGroup] = useState(null);
  return (
    <GroupContext.Provider value={{ currentGroup, setCurrentGroup }}>
      {props.children}
    </GroupContext.Provider>
  );
};

export default GroupProvider;

export { GroupContext, GroupProvider, GroupConsumer };

GroupProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};
GroupProvider.defaultProps = {
  children: {}
};
