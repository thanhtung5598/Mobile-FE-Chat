/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { StyleSheet, Alert } from 'react-native';
import { Container, Content, View } from 'native-base';
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

// Component
import { Header } from 'screens/SceenRoot/common';

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
  const [typeTab, setTypeTab] = useState('Phone');
  const { userData, setUserData } = useContext(AuthenContext);
  const [defaultSchema, setDefaultSchema] = useState(defaultSchemaValid);

  useEffect(() => {
    step === 0 &&
      typeTab === 'Phone' &&
      setDefaultSchema({ ...defaultSchemaValid });
    step === 0 &&
      typeTab === 'Email' &&
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
  }, [step, typeTab]);

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
      if (typeTab === 'Phone') {
        dispatch(accountSendOTPSignUp('phone', phone.trim())).then(res => {
          const { error } = res;
          if (!error) {
            setStep(step + 1);
          }
        });
      }
      if (typeTab === 'Email') {
        dispatch(accountSendOTPSignUp('email', email.trim())).then(res => {
          const { error } = res;
          if (!error) {
            setStep(step + 1);
          }
        });
      }
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
      if (typeTab === 'Phone') {
        dataRegister = {
          ...dataRegister,
          phone: userData.phone
        };
      }
      if (typeTab === 'Email') {
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
    if (typeTab === 'Phone') {
      values = {
        phone: userData.phone,
        code
      };
    }
    if (typeTab === 'Email') {
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
        setStep(step + 1);
      }
    });
  };

  const onHandleResendCode = () => {
    if (typeTab === 'Phone') {
      dispatch(accountSendOTPSignUp('phone', userData.phone));
    }
    if (typeTab === 'Email') {
      dispatch(accountSendOTPSignUp('email', userData.email));
    }
  };

  const onHandleTurnBack = () => {
    navigation.navigate('Welcome');
    dispatch(refreshError());
  };

  return (
    <Container>
      <Content>
        <Header
          onHandleTurnBack={onHandleTurnBack}
          step={step}
          isBadge={true}
          title="Register"
          allStep={4}
        />
        <View style={styles.container}>
          {step !== 1 && (
            <FormRegister
              setTypeTab={setTypeTab}
              initialValues={initialValues}
              defaultSchema={defaultSchema}
              navigation={navigation}
              onHandleSubmitted={onHandleSubmitted}
              step={step}
            />
          )}
          {step === 1 && (
            <FormVerify
              setTypeTab={setTypeTab}
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
  }
});
