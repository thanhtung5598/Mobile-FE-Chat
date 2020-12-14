import React from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { StyledInput } from 'components/common/ComponentsCommon/StyledInput';
import ErrorInput from 'components/common/ComponentsCommon/ErrorInput';
import PropTypes from 'prop-types';
import { View } from 'native-base';
import { refreshError } from 'actions/authenActions';

const InputTextCustom = props => {
  const dispatch = useDispatch();
  const { formikProps, touched, errors, type } = props;

  return (
    <>
      <View style={styles.rect}>
        <StyledInput
          onFocus={() => dispatch(refreshError())}
          formikProps={formikProps}
          formikKey={type.key}
          placeholder={type.placeholder}
          value={formikProps.values.email}
        />
      </View>
      {touched[type.key] && errors[type.key] ? (
        <ErrorInput text={errors[type.key]} />
      ) : null}
    </>
  );
};

export default InputTextCustom;

InputTextCustom.propTypes = {
  formikProps: PropTypes.objectOf(PropTypes.any),
  type: PropTypes.objectOf(PropTypes.any),
  styles: PropTypes.objectOf(PropTypes.any),
  touched: PropTypes.objectOf(PropTypes.any),
  errors: PropTypes.objectOf(PropTypes.any)
};
InputTextCustom.defaultProps = {
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
    marginTop: 20,
    paddingLeft: 15,
    alignSelf: 'center'
  }
});
