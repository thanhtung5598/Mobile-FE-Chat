import React from 'react';
import { useDispatch } from 'react-redux';
import { StyledInput } from 'components/common/ComponentsCommon/StyledInput';
import ErrorInput from 'components/common/ComponentsCommon/ErrorInput';
import PropTypes from 'prop-types';
import { View } from 'native-base';
import { refreshError } from 'actions/authenActions';

const FormPhone = props => {
  const dispatch = useDispatch();
  const { formikProps, touched, errors, styles } = props;

  return (
    <>
      <View style={styles.rect5}>
        <StyledInput
          onFocus={() => dispatch(refreshError())}
          formikProps={formikProps}
          formikKey="phone"
          placeholder="Your phone..."
          value={formikProps.values.phone}
          keyboardType="numeric"
        />
      </View>
      {touched.phone && errors.phone ? (
        <ErrorInput text={errors.phone} />
      ) : null}
    </>
  );
};

export default FormPhone;

FormPhone.propTypes = {
  formikProps: PropTypes.objectOf(PropTypes.any),
  styles: PropTypes.objectOf(PropTypes.any),
  touched: PropTypes.objectOf(PropTypes.any),
  errors: PropTypes.objectOf(PropTypes.any)
};
FormPhone.defaultProps = {
  formikProps: {},
  styles: {},
  touched: {},
  errors: {}
};
