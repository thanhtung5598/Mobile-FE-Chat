import React, { useState } from 'react';
import PropTypes from 'prop-types';

const AuthenContext = React.createContext();
const AuthenConsumer = AuthenContext.Consumer;

const AuthenProvider = props => {
  const [userPhone, setUserPhone] = useState('0336365110');

  return (
    <AuthenContext.Provider value={{ userPhone, setUserPhone }}>
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
