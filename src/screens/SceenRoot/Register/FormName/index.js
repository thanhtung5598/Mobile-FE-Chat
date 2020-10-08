import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'native-base';
import { StyledInput } from 'components/common/ComponentsCommon/StyledInput';
import ErrorInput from 'components/common/ComponentsCommon/ErrorInput';

const FormName = props => {
  const { formikProps, touched, errors, styles } = props;
  return (
    <>
      <View style={styles.rect5}>
        <StyledInput
          formikProps={formikProps}
          formikKey="name"
          placeholder="Your name..."
          value={formikProps.values.name}
        />
      </View>
      {touched.name && errors.name ? <ErrorInput text={errors.name} /> : null}
    </>
  );
};

export default FormName;

FormName.propTypes = {
  formikProps: PropTypes.objectOf(PropTypes.any),
  styles: PropTypes.objectOf(PropTypes.any),
  touched: PropTypes.objectOf(PropTypes.any),
  errors: PropTypes.objectOf(PropTypes.any)
};
FormName.defaultProps = {
  formikProps: {},
  styles: {},
  touched: {},
  errors: {}
};
