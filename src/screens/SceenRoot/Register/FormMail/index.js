import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { View } from 'native-base';
import { StyledInput } from 'components/common/ComponentsCommon/StyledInput';
import ErrorInput from 'components/common/ComponentsCommon/ErrorInput';
import { refreshError } from 'actions/authenActions';

const FormEmail = props => {
  const dispatch = useDispatch();
  const { formikProps, touched, errors, styles } = props;

  return (
    <>
      <View style={{ ...styles.rect5 }}>
        <StyledInput
          formikProps={formikProps}
          formikKey="email"
          onFocus={() => dispatch(refreshError())}
          placeholder="Your email..."
          value={formikProps.values.email}
          keyboardType="numeric"
        />
      </View>
      {touched.email && errors.email ? (
        <ErrorInput text={errors.email} />
      ) : null}
    </>
  );
};

export default FormEmail;

FormEmail.propTypes = {
  formikProps: PropTypes.objectOf(PropTypes.any),
  styles: PropTypes.objectOf(PropTypes.any),
  touched: PropTypes.objectOf(PropTypes.any),
  errors: PropTypes.objectOf(PropTypes.any)
};
FormEmail.defaultProps = {
  formikProps: {},
  styles: {},
  touched: {},
  errors: {}
};
