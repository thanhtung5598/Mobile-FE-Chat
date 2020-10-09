/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Alert } from 'react-native';
import { Container, Content, Text, Icon, View } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FormRegister from './FormRegister';
import { AuthenContext } from 'components/common/context/AuthenContext';
import FormVerify from 'components/common/ComponentsCommon/FormVerify';
import * as Yup from 'yup';
import { REX } from 'utils';
import {
  accountVerifyCodeSignUp,
  accountSendOTPSignUp,
  refreshError,
  accountRegister
} from 'actions/authenActions';

const initialValues = {
  email: '',
  name: '',
  phone: '',
  password: '',
  passwordConfirm: ''
};

const defaultSchemaValid = {
  phone: Yup.string()
    .trim()
    .matches(REX.PHONE_REX, {
      message: 'Your phone invalid'
    })
    .required('Phone is required')
};

const Register = ({ navigation }) => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(0);
  const [typeRegister, setTypeRegister] = useState('Phone');
  const { userData, setUserData } = useContext(AuthenContext);
  const [defaultSchema, setDefaultSchema] = useState(defaultSchemaValid);

  useEffect(() => {
    step === 0 &&
      typeRegister === 'Phone' &&
      setDefaultSchema({ ...defaultSchemaValid });
    step === 0 &&
      typeRegister === 'Email' &&
      setDefaultSchema({
        email: Yup.string()
          .trim()
          .matches(REX.EMAIL_RGX, {
            message: 'Email invalid'
          })
          .required('Email is required')
      });

    step === 2 &&
      setDefaultSchema({
        name: Yup.string()
          .min(6, 'Name must be more than 6 characters')
          .max(32, 'Name must be less than 32 characters')
          .required('Name is required')
      });
    step === 3 &&
      setDefaultSchema({
        password: Yup.string()
          .min(6, 'Password must be more than 6 characters')
          .max(32, 'Password must be less than 32 characters')
          .required('Password is required'),
        passwordConfirm: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('Confirm is required')
      });
  }, [step, typeRegister]);

  useEffect(() => {
    dispatch(refreshError());
  }, [dispatch]);

  const onHandleSubmitted = values => {
    if (step === 0) {
      const { phone, email } = values;
      setUserData({
        ...userData,
        phone: phone.trim(),
        email: email.trim()
      });
      if (typeRegister === 'Phone') {
        accountSendOTPSignUp('phone', phone.trim());
      }
      if (typeRegister === 'Email') {
        accountSendOTPSignUp('email', email.trim());
      }
      setStep(step + 1);
      return;
    }
    if (step === 2) {
      setStep(step + 1);
      return;
    }
    if (step === 3) {
      const { name, password, passwordConfirm } = values;
      let dataRegister = {
        name,
        password,
        passwordConfirm
      };
      if (typeRegister === 'Phone') {
        dataRegister = {
          ...dataRegister,
          phone: userData.phone
        };
      }
      if (typeRegister === 'Email') {
        dataRegister = {
          ...dataRegister,
          email: userData.email
        };
      }
      dispatch(accountRegister(dataRegister, userData.userToken)).then(res => {
        const { error, data } = res.data;
        if (error) {
          Alert.alert('Register Failed', data[0].msg, [
            {
              text: 'Login with phone',
              onPress: () => navigation.navigate('Login')
            },
            {
              text: 'Register with another',
              onPress: () => navigation.navigate('Register')
            }
          ]);
        }
      });
    }
  };

  const onHandleVerifyCodeSignUp = code => {
    let values = null;
    if (typeRegister === 'Phone') {
      values = {
        phone: userData.phone,
        code
      };
    }
    if (typeRegister === 'Email') {
      values = {
        email: userData.email,
        code
      };
    }
    dispatch(accountVerifyCodeSignUp(values)).then(res => {
      const { error } = res;
      if (!error) {
        setUserData({
          ...userData,
          userToken: res.data
        });
        console.log(res);
        setStep(step + 1);
      }
    });
  };

  const onHandleResendCode = () => {
    if (typeRegister === 'Phone') {
      accountSendOTPSignUp('phone', userData.phone);
    }
    if (typeRegister === 'Email') {
      accountSendOTPSignUp('email', userData.email);
    }
  };

  const onHandleTurnBack = () => {
    navigation.navigate('Welcome');
    dispatch(refreshError());
  };

  return (
    <Container>
      <Content>
        <View style={styles.container}>
          <LinearGradient colors={['#2962ff', '#0cb3ff']}>
            <TouchableOpacity style={styles.rect} onPress={onHandleTurnBack}>
              <Icon name="arrow-back" style={styles.icon}></Icon>
              <Text style={styles.login}>Register</Text>
            </TouchableOpacity>
          </LinearGradient>
          {step !== 1 && (
            <FormRegister
              setTypeRegister={setTypeRegister}
              initialValues={initialValues}
              defaultSchema={defaultSchema}
              navigation={navigation}
              onHandleSubmitted={onHandleSubmitted}
              styles={styles}
              step={step}
            />
          )}
          {step === 1 && (
            <FormVerify
              typeRegister={typeRegister}
              userData={userData}
              onHandleVerifyCode={onHandleVerifyCodeSignUp}
              onHandleResendCode={onHandleResendCode}
              onHandleTurnBack={onHandleTurnBack}
            />
          )}
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
    marginTop: 23,
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  loginButton: {
    color: 'rgba(255,255,255,1)',
    fontSize: 22,
    textAlign: 'center'
  },
  iconNext: {
    marginTop: 2
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
  eyeSlash: {
    alignSelf: 'center',
    marginRight: 15,
    fontSize: 20,
    color: '#616161'
  },
  formVerify: {
    flexDirection: 'row',
    width: '50%',
    alignSelf: 'center'
  },
  errorBE: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10
  },
  errorBEIcon: {
    marginRight: 3
  },
  errorBEText: {
    color: 'red'
  }
});
