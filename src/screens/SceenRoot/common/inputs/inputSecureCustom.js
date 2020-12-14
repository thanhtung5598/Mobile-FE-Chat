import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { StyledInput } from 'components/common/ComponentsCommon/StyledInput';
import ErrorInput from 'components/common/ComponentsCommon/ErrorInput';
import PropTypes from 'prop-types';
import { View } from 'native-base';
import { refreshError } from 'actions/authenActions';
import { Entypo } from '@expo/vector-icons';

const InputPassword = props => {
  const dispatch = useDispatch();
  const { formikProps, touched, errors, type } = props;
  const [isEyeOpen, setIsEyeOpen] = useState([false, false]);

  const handleOpenEyes = eye => {
    const tempEye = [...isEyeOpen];
    tempEye[eye] = !tempEye[eye];
    setIsEyeOpen(tempEye);
  };

  return (
    <>
      <View style={styles.rect}>
        <StyledInput
          onFocus={() => dispatch(refreshError())}
          formikProps={formikProps}
          formikKey={type.key}
          placeholder={type.placeholder}
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
      {touched[type.key] && errors[type.key] ? (
        <ErrorInput text={errors[type.key]} />
      ) : null}
    </>
  );
};

export default InputPassword;

InputPassword.propTypes = {
  formikProps: PropTypes.objectOf(PropTypes.any),
  type: PropTypes.objectOf(PropTypes.any),
  styles: PropTypes.objectOf(PropTypes.any),
  touched: PropTypes.objectOf(PropTypes.any),
  errors: PropTypes.objectOf(PropTypes.any)
};
InputPassword.defaultProps = {
  formikProps: {},
  type: {},
  styles: {},
  touched: {},
  errors: {}
};

const styles = StyleSheet.create({
  rect: {
    width: '85%',
    height: 50,
    backgroundColor: 'rgba(255,255,255,1)',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#2196f3',
    marginTop: 18,
    paddingLeft: 15,
    alignSelf: 'center',
    flexDirection: 'row'
  },
  eyeSlash: {
    alignSelf: 'center',
    marginRight: 15,
    fontSize: 20,
    color: '#616161'
  }
});
