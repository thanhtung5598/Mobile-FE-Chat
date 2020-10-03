import React, { useState } from 'react';
import PropTypes from 'prop-types';

const AuthenContext = React.createContext();
const AuthenConsumer = AuthenContext.Consumer;

const AuthenProvider = props => {
  const [userToken, setUserToken] = useState(null);

  const signIn = () => {
    setUserToken('ABC');
  };
  const signOut = () => {
    setUserToken(null);
  };
  const signUp = () => {
    setUserToken('ABC');
  };

  return (
    <AuthenContext.Provider value={{ userToken, signIn, signOut, signUp }}>
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
