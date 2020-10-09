import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View } from 'native-base';
import { StyledInput } from 'components/common/ComponentsCommon/StyledInput';
import ErrorInput from 'components/common/ComponentsCommon/ErrorInput';
import { Entypo } from '@expo/vector-icons';

const FormPassword = props => {
  const { formikProps, styles, touched, errors } = props;
  const [isEyeOpen, setIsEyeOpen] = useState([false, false]);

  const handleOpenEyes = eye => {
    const tempEye = [...isEyeOpen];
    tempEye[eye] = !tempEye[eye];
    setIsEyeOpen(tempEye);
  };

  return (
    <>
      <View style={styles.rect5}>
        <StyledInput
          formikProps={formikProps}
          formikKey="newPassword"
          placeholder="New Password"
          secureTextEntry={isEyeOpen[0] ? false : true}
        />
        <Entypo
          onPress={() => handleOpenEyes(0)}
          style={styles.eyeSlash}
          name={`${isEyeOpen[0] ? 'eye' : 'eye-with-line'}`}
          size={24}
          color="black"
        />
      </View>
      {touched.newPassword && errors.newPassword ? (
        <ErrorInput text={errors.newPassword} />
      ) : null}
      <View style={styles.rect5}>
        <StyledInput
          formikProps={formikProps}
          formikKey="confirmNewPassword"
          placeholder="Confirm new password"
          secureTextEntry={isEyeOpen[1] ? false : true}
        />
        <Entypo
          onPress={() => handleOpenEyes(1)}
          style={styles.eyeSlash}
          name={`${isEyeOpen[1] ? 'eye' : 'eye-with-line'}`}
          size={24}
          color="black"
        />
      </View>
      {touched.confirmNewPassword && errors.confirmNewPassword ? (
        <ErrorInput text={errors.confirmNewPassword} />
      ) : null}
    </>
  );
};

export default FormPassword;

FormPassword.propTypes = {
  formikProps: PropTypes.objectOf(PropTypes.any),
  styles: PropTypes.objectOf(PropTypes.any),
  touched: PropTypes.objectOf(PropTypes.any),
  errors: PropTypes.objectOf(PropTypes.any)
};
FormPassword.defaultProps = {
  formikProps: {},
  styles: {},
  touched: {},
  errors: {}
};
