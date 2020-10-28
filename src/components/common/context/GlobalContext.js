import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

const GlobalContext = React.createContext();
const GlobalConsumer = GlobalContext.Consumer;

const defaultMeta = {
  title: 'Chat App'
};

const renderHelmet = meta => (
  <Helmet
    htmlAttributes={{ lang: 'en' }}
    title={meta.title}
    meta={[
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
      },
      {
        name: 'format-detection',
        content: 'yes'
      }
    ]}
    link={[]}
    script={[]}
  />
);

const GlobalProvider = props => {
  const [meta, setMeta] = useState(defaultMeta);
  return (
    <GlobalContext.Provider
      value={{
        meta,
        setMeta
      }}
    >
      {meta && renderHelmet(meta)}
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;

export { GlobalContext, GlobalConsumer, GlobalProvider };

GlobalProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};
GlobalProvider.defaultProps = {
  children: {}
};
