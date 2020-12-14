import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Tabs, Tab } from 'native-base';

// Component
import { InputError } from 'screens/SceenRoot/common';

const InputTabs = props => {
  const {
    tabPhone,
    tabEmail,
    error,
    formikProps,
    setTypeRegister,
    message
  } = props;

  const handleChangeType = (e, _formikProp) => {
    const type = e.ref.props.name;
    _formikProp.setErrors({});
    setTypeRegister(type);
  };

  return (
    <>
      <Tabs
        onChangeTab={e => handleChangeType(e, formikProps)}
        tabBarUnderlineStyle={styles.tabBarLineStyle}
      >
        <Tab
          tabStyle={styles.tabBackground}
          textStyle={styles.tabText}
          activeTabStyle={styles.tabBackground}
          activeTextStyle={styles.tabActiveText}
          heading="Phone"
          name="Phone"
        >
          {error && <InputError message={message} />}
          {tabPhone}
        </Tab>
        <Tab
          tabStyle={styles.tabBackground}
          textStyle={styles.tabText}
          activeTabStyle={styles.tabBackground}
          activeTextStyle={styles.tabActiveText}
          heading="Email"
          name="Email"
        >
          {error && <InputError message={message} />}
          {tabEmail}
        </Tab>
      </Tabs>
    </>
  );
};

export default InputTabs;

InputTabs.propTypes = {
  setTypeRegister: PropTypes.func,
  tabPhone: PropTypes.objectOf(PropTypes.any),
  message: PropTypes.objectOf(PropTypes.any),
  tabEmail: PropTypes.objectOf(PropTypes.any),
  error: PropTypes.bool,
  formikProps: PropTypes.objectOf(PropTypes.any)
};
InputTabs.defaultProps = {
  setTypeRegister: () => {},
  tabPhone: {},
  message: {},
  tabEmail: {},
  error: false,
  formikProps: {}
};

const styles = StyleSheet.create({
  tabBackground: { backgroundColor: '#F8F8F8' },
  tabBarLineStyle: {
    backgroundColor: '#2196f3',
    height: 1
  },
  tabText: { color: '#AAA' },
  tabActiveText: { color: '#2196f3', fontWeight: '700' }
});
