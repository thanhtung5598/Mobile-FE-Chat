import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { Text, View, Spinner } from 'native-base';
import { REX } from '../../../../utils';
import * as Yup from 'yup';
import { LinearGradient } from 'expo-linear-gradient';
import { Entypo } from '@expo/vector-icons';
import { StyledInput } from '../../../../components/common/ComponentsCommon/StyledInput';
import ErrorInput from '../../../../components/common/ComponentsCommon/ErrorInput';
import { SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import { refreshError } from 'actions/authenActions';

const FormRegister = props => {
  const dispatch = useDispatch();
  const { isLoading, error, message } = useSelector(state => state.authen);
  const { onHandleSubmitted, styles, navigation } = props;

  const [isEyeOpen, setIsEyeOpen] = useState([false, false]);

  const handleOpenEyes = eye => {
    const tempEye = [...isEyeOpen];
    tempEye[eye] = !tempEye[eye];
    setIsEyeOpen(tempEye);
  };

  const validatedSchema = Yup.object({
    name: Yup.string()
      .min(6, 'Name must be more than 6 characters')
      .max(32, 'Name must be less than 32 characters')
      .required('Name is required'),
    phone: Yup.string()
      .trim()
      .matches(REX.PHONE_REX, {
        message: 'Your phone invalid'
      })
      .required('Phone is required'),
    password: Yup.string()
      .min(6, 'Password must be more than 6 characters')
      .max(32, 'Password must be less than 32 characters')
      .required('Password is required'),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm is required')
  });

  return (
    <SafeAreaView>
      <View style={styles.rect3}>
        <Text style={styles.loremIpsum}>
          Please compleated this form to sign up
        </Text>
      </View>
      <Formik
        initialValues={{
          name: '',
          phone: '',
          password: '',
          passwordConfirm: ''
        }}
        validationSchema={validatedSchema}
        onSubmit={onHandleSubmitted}
      >
        {({ touched, errors, ...formikProps }) => (
          <React.Fragment>
            {error && (
              <View style={styles.errorBE}>
                <MaterialIcons
                  style={styles.errorBEIcon}
                  name="error"
                  size={20}
                  color="red"
                />
                <Text style={styles.errorBEText}>{message.msg}</Text>
              </View>
            )}
            <View style={styles.rect5}>
              <StyledInput
                formikProps={formikProps}
                formikKey="password"
                placeholder="Password"
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
            {touched.password && errors.password ? (
              <ErrorInput text={errors.password} />
            ) : null}
            <View style={styles.rect5}>
              <StyledInput
                formikProps={formikProps}
                formikKey="passwordConfirm"
                placeholder="Confirm password"
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
            {touched.passwordConfirm && errors.passwordConfirm ? (
              <ErrorInput text={errors.passwordConfirm} />
            ) : null}
            <View style={styles.rect5}>
              <StyledInput
                formikProps={formikProps}
                formikKey="phone"
                onFocus={() => dispatch(refreshError())}
                placeholder="Phone number..."
                value={formikProps.values.phone}
                keyboardType="numeric"
              />
            </View>
            {touched.phone && errors.phone ? (
              <ErrorInput text={errors.phone} />
            ) : null}

            <View style={styles.rect5}>
              <StyledInput
                formikProps={formikProps}
                formikKey="name"
                placeholder="Your name..."
                value={formikProps.values.name}
              />
            </View>
            {touched.name && errors.name ? (
              <ErrorInput text={errors.name} />
            ) : null}

            <TouchableOpacity
              disabled={isLoading}
              onPress={formikProps.handleSubmit}
            >
              <LinearGradient
                style={styles.rect7}
                colors={['#0cb3ff', '#0068ff']}
              >
                {isLoading && <Spinner size="small" color="#ff9800" />}
                {!isLoading && <Text style={styles.loginButton}>Sign In</Text>}
              </LinearGradient>
            </TouchableOpacity>
            <View style={styles.bottomHint}>
              <Text>Already have an account?</Text>
              <Text
                style={styles.bottomHintSig}
                onPress={() => navigation.navigate('Login')}
              >
                Sign in
              </Text>
            </View>
          </React.Fragment>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default FormRegister;
FormRegister.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any),
  styles: PropTypes.objectOf(PropTypes.any),
  onHandleSubmitted: PropTypes.func
};
FormRegister.defaultProps = {
  navigation: {},
  styles: {},
  onHandleSubmitted: () => {}
};
