import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { StyleSheet } from 'react-native';
import { Container, Content, View, Alert } from 'native-base';
import { AuthenContext } from 'components/common/context/AuthenContext';
import FormVerify from 'screens/SceenRoot/common/FormVerify';
import ForgotForm from './FormForgot';
import {
  accountSendForgotPassword,
  accountVerifyCodeForgot,
  accountChangePassword,
  refreshError
} from 'actions/authenActions';

import { Header } from 'screens/SceenRoot/common';

// REX
import {
  phoneVerify,
  emailVerify,
  newPasswordVerify,
  newPasswordConfirmVerify
} from 'utils';

const initialValues = {
  email: '',
  phone: ''
};

const Forgot = ({ navigation }) => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(0);
  const [typeTab, setTypeTab] = useState('phone');
  const { userData, setUserData } = useContext(AuthenContext);
  const [defaultSchema, setDefaultSchema] = useState(phoneVerify);

  useEffect(() => {
    step === 0 && typeTab === 'phone' && setDefaultSchema(phoneVerify);
    step === 0 && typeTab === 'email' && setDefaultSchema(emailVerify);
    step === 2 &&
      setDefaultSchema({
        ...newPasswordVerify,
        ...newPasswordConfirmVerify
      });
  }, [step, typeTab]);

  const onHandleSubmited = values => {
    if (step === 0) {
      setUserData({
        ...userData,
        [typeTab]: values[typeTab].trim()
      });
      dispatch(accountSendForgotPassword(typeTab, values[typeTab].trim())).then(
        res => {
          const { error } = res;
          if (!error) {
            setStep(step + 1);
          }
        }
      );
      return;
    }
    if (step === 2) {
      const { newPassword, confirmNewPassword } = values;
      const passwordChange = {
        newPassword,
        confirmNewPassword
      };
      dispatch(accountChangePassword(passwordChange, userData.userToken)).then(
        res => {
          const { error } = res;
          if (error) {
            Alert.alert('Change Pass Failed', [
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
        }
      );
    }
  };

  const onHandleVerifyCode = code => {
    let values = {
      [typeTab]: userData[typeTab],
      code
    };
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
    dispatch(accountSendForgotPassword(typeTab, userData[typeTab]));
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
          <Header
            onHandleTurnBack={onHandleTurnBack}
            step={step}
            isBadge={true}
            title="Forgot Password"
            allStep={3}
          />
          {step !== 1 && (
            <ForgotForm
              initialValues={initialValues}
              defaultSchema={defaultSchema}
              setTypeTab={setTypeTab}
              onHandleSubmited={onHandleSubmited}
              step={step}
            />
          )}
          {step === 1 && (
            <FormVerify
              typeTab={typeTab}
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
  }
});
