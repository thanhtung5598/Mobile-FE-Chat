import React, { useState } from 'react';
import PropTypes from 'prop-types';

const AuthenContext = React.createContext();
const AuthenConsumer = AuthenContext.Consumer;

const AuthenProvider = props => {
  const [userData, setUserData] = useState({
    phone: '',
    userToken: {}
  });

  return (
    <AuthenContext.Provider value={{ userData, setUserData }}>
      {props.children}
    </AuthenContext.Provider>
  );
};

export default AuthenProvider;

export { AuthenContext, AuthenConsumer, AuthenProvider };

AuthenProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};
AuthenProvider.defaultProps = {
  children: {}
};
