import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'native-base';

export const StyledInput = ({ formikProps, formikKey, ...rest }) => {
  return (
    <Input
      id={formikKey}
      onChangeText={formikProps.handleChange(formikKey)}
      onBlur={formikProps.handleBlur(formikKey)}
      value={formikProps.values.Password}
      {...rest}
    />
  );
};

StyledInput.propTypes = {
  formikProps: PropTypes.objectOf(PropTypes.any),
  formikKey: PropTypes.string
};
StyledInput.defaultProps = {
  navigation: {},
  formikKey: ''
};
