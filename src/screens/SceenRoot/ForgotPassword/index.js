/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';
import { Container, Content, Text, Icon, View } from 'native-base';
import { AuthenContext } from 'components/common/context/AuthenContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FormVerify from 'components/common/ComponentsCommon/FormVerify';
import * as Yup from 'yup';
import { REX } from 'utils';
import ForgotForm from './FormForgot';
import {
  accountSendForgotPassword,
  accountVerifyCodeForgot,
  accountChangePassword,
  refreshError
} from 'actions/authenActions';

const initialValues = {
  email: '',
  phone: ''
};

const defaultSchemaValid = {
  phone: Yup.string()
    .trim()
    .matches(REX.PHONE_REX, {
      message: 'Your phone invalid'
    })
    .required('Phone is required')
};

const Forgot = ({ navigation }) => {
  const dispatch = useDispatch();
  const [typeForgot, setTypeForgot] = useState('Phone');
  const { userData, setUserData } = useContext(AuthenContext);
  const [defaultSchema, setDefaultSchema] = useState(defaultSchemaValid);
  const [step, setStep] = useState(0);

  useEffect(() => {
    step === 0 &&
      typeForgot === 'Phone' &&
      setDefaultSchema({ ...defaultSchemaValid });
    step === 0 &&
      typeForgot === 'Email' &&
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
        newPassword: Yup.string()
          .min(6, 'Password must be more than 6 characters')
          .max(32, 'Password must be less than 32 characters')
          .required('Password is required'),
        confirmNewPassword: Yup.string()
          .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
          .required('Confirm is required')
      });
  }, [step, typeForgot]);

  const onHandleSubmited = values => {
    if (step === 0) {
      const { phone, email } = values;
      setUserData({
        ...userData,
        phone: phone.trim(),
        email: email.trim()
      });
      if (typeForgot === 'Phone') {
        accountSendForgotPassword('phone', phone.trim());
      }
      if (typeForgot === 'Email') {
        accountSendForgotPassword('email', email.trim());
      }
      setStep(step + 1);
      return;
    }
    if (step === 2) {
      const { newPassword, confirmNewPassword } = values;
      const passwordChange = {
        newPassword,
        confirmNewPassword
      };
      dispatch(accountChangePassword(passwordChange, userData.userToken));
    }
  };
  const onHandleVerifyCode = code => {
    let values = null;
    if (typeForgot === 'Phone') {
      values = {
        phone: userData.phone,
        code
      };
    }
    if (typeForgot === 'Email') {
      values = {
        email: userData.email,
        code
      };
    }
    dispatch(accountVerifyCodeForgot(values)).then(res => {
      const { error } = res;
      if (!error) {
        setUserData({
          ...userData,
          userToken: res.data
        });
        setStep(step + 1);
      }
    });
  };

  const onHandleResendCode = () => {
    if (typeForgot === 'Phone') {
      accountSendForgotPassword('phone', userData.phone);
    }
    if (typeForgot === 'Email') {
      accountSendForgotPassword('email', userData.email);
    }
    dispatch(refreshError());
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
            <TouchableOpacity
              style={styles.rect}
              onPress={() => navigation.navigate('Welcome')}
            >
              <Icon name="arrow-back" style={styles.icon}></Icon>
              <Text style={styles.login}>Forgot Password</Text>
            </TouchableOpacity>
          </LinearGradient>
          {step !== 1 && (
            <ForgotForm
              initialValues={initialValues}
              defaultSchema={defaultSchema}
              setTypeForgot={setTypeForgot}
              onHandleSubmited={onHandleSubmited}
              styles={styles}
              step={step}
            />
          )}
          {step === 1 && (
            <FormVerify
              typeRegister={typeForgot}
              userData={userData}
              onHandleVerifyCode={onHandleVerifyCode}
              onHandleResendCode={onHandleResendCode}
              onHandleTurnBack={onHandleTurnBack}
            />
          )}
        </View>
      </Content>
    </Container>
  );
};

export default Forgot;

Forgot.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any)
};
Forgot.defaultProps = {
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
  eyeSlash: {
    alignSelf: 'center',
    marginRight: 15,
    fontSize: 20,
    color: '#616161'
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
  SendMessageSMS: {
    fontSize: 15,
    textAlign: 'center'
  }
});
