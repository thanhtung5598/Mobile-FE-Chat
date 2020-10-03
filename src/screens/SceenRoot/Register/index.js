import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { REX } from '../../../utils';
import { Entypo } from '@expo/vector-icons';
import ErrorInput from '../../../components/common/ComponentsCommon/ErrorInput';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';
import { Container, Content, Text, Input, Icon, View } from 'native-base';
import { AuthenContext } from '../../../components/common/context/AuthenContext';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Register = ({ navigation }) => {
  const [isEyeOpen, setIsEyeOpen] = useState([false, false]);
  const { signUp } = useContext(AuthenContext);

  const onHandleSubmitted = values => {
    console.log(values);
    signUp(values);
  };

  const handleOpenEyes = eye => {
    const tempEye = [...isEyeOpen];
    tempEye[eye] = !tempEye[eye];
    setIsEyeOpen(tempEye);
  };

  return (
    <Container>
      <Content>
        <View style={styles.container}>
          <LinearGradient colors={['#2962ff', '#0cb3ff']}>
            <TouchableOpacity
              style={styles.rect}
              onPress={() => navigation.navigate('Welcome')}
            >
              <Icon name="arrow-back" style={styles.icon}></Icon>
              <Text style={styles.login}>Register</Text>
            </TouchableOpacity>
          </LinearGradient>
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
            validationSchema={Yup.object({
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
            })}
            onSubmit={onHandleSubmitted}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              touched,
              errors
            }) => (
              <>
                <View style={styles.rect5}>
                  <Input
                    id="name"
                    name="name"
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    value={values.name}
                    placeholder="Your name..."
                  />
                </View>
                {touched.name && errors.name ? (
                  <ErrorInput text={errors.name} />
                ) : null}
                <View style={styles.rect5}>
                  <Input
                    id="phone"
                    name="phone"
                    onChangeText={handleChange('phone')}
                    onBlur={handleBlur('phone')}
                    value={values.phone}
                    placeholder="Phone number..."
                    keyboardType="numeric"
                  />
                </View>
                {touched.phone && errors.phone ? (
                  <ErrorInput text={errors.phone} />
                ) : null}
                <View style={styles.rect5}>
                  <Input
                    id="password"
                    name="password"
                    secureTextEntry={isEyeOpen[0] ? false : true}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    placeholder="Password..."
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
                  <Input
                    id="passwordConfirm"
                    name="passwordConfirm"
                    secureTextEntry={isEyeOpen[1] ? false : true}
                    onChangeText={handleChange('passwordConfirm')}
                    onBlur={handleBlur('passwordConfirm')}
                    value={values.passwordConfirm}
                    placeholder="Confirm your password..."
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
                <TouchableOpacity onPress={handleSubmit}>
                  <LinearGradient
                    style={styles.rect7}
                    colors={['#0cb3ff', '#0068ff']}
                  >
                    <Text style={styles.loginButton}>Sign Up</Text>
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
              </>
            )}
          </Formik>
        </View>
      </Content>
    </Container>
  );
};

export default Register;

Register.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any)
};
Register.defaultProps = {
  navigation: {}
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rect: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    color: 'rgba(255,255,255,1)',
    fontSize: 25,
    width: 34,
    height: 37,
    marginTop: 13,
    marginLeft: 10
  },
  login: {
    color: 'rgba(255,255,255,1)',
    fontSize: 20,
    fontWeight: '700'
  },
  rect3: {
    width: '100%',
    height: 42,
    backgroundColor: '#E6E6E6',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loremIpsum: {
    color: '#121212',
    width: '100%',
    fontSize: 15,
    marginLeft: 15
  },
  rect5: {
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
  userName: {
    color: '#121212',
    width: 142,
    height: 17,
    marginTop: 15
  },
  rect6: {
    width: '85%',
    height: 50,
    backgroundColor: 'rgba(255,255,255,1)',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#2196f3',
    marginTop: 24,
    paddingLeft: 15,
    alignSelf: 'center'
  },
  password: {
    color: '#121212',
    width: 154,
    height: 23,
    marginTop: 16
  },
  rect7: {
    width: '85%',
    height: 50,
    backgroundColor: 'rgba(33,150,243,1)',
    borderRadius: 25,
    marginTop: 18,
    alignSelf: 'center'
  },
  loginButton: {
    color: 'rgba(255,255,255,1)',
    fontSize: 22,
    textAlign: 'center',
    height: 27,
    marginTop: 12
  },
  loremIpsum2: {
    color: 'rgba(113,111,111,1)',
    marginTop: 16
  },
  signUp: {
    color: 'rgba(173,20,87,1)'
  },
  bottomHint: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 16
  },
  bottomHintSig: { color: '#ff9800', fontWeight: 'bold', marginLeft: 3 },
  eyeSlash: { alignSelf: 'center', marginRight: 15 }
});
