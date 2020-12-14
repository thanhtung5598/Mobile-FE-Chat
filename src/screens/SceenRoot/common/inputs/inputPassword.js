import React from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { StyledInput } from 'components/common/ComponentsCommon/StyledInput';
import ErrorInput from 'components/common/ComponentsCommon/ErrorInput';
import PropTypes from 'prop-types';
import { View } from 'native-base';
import { refreshError } from 'actions/authenActions';

const InputPassword = props => {
  const dispatch = useDispatch();
  const { formikProps, touched, errors } = props;

  return (
    <>
      <View style={styles.rect}>
        <StyledInput
          onFocus={() => dispatch(refreshError())}
          formikProps={formikProps}
          formikKey="password"
          placeholder="Password..."
          secureTextEntry={true}
        />
      </View>
      {touched.password && errors.password ? (
        <ErrorInput text={errors.password} />
      ) : null}
    </>
  );
};

export default InputPassword;

InputPassword.propTypes = {
  formikProps: PropTypes.objectOf(PropTypes.any),
  styles: PropTypes.objectOf(PropTypes.any),
  touched: PropTypes.objectOf(PropTypes.any),
  errors: PropTypes.objectOf(PropTypes.any)
};
InputPassword.defaultProps = {
  formikProps: {},
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
    marginTop: 20,
    paddingLeft: 15,
    alignSelf: 'center'
  }
});
