import React from 'react';
import PropTypes from 'prop-types';

const SocketContext = React.createContext();
const SocketConsumer = SocketContext.Consumer;

const SocketProvider = props => {
  return (
    <SocketContext.Provider value={{}}>{props.children}</SocketContext.Provider>
  );
};

export default SocketProvider;

export { SocketContext, SocketProvider, SocketConsumer };

SocketProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};
SocketProvider.defaultProps = {
  children: {}
};
