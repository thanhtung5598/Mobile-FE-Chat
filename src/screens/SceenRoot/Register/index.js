import React, { useState, useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { StyleSheet, Alert } from 'react-native';
import { Container, Content, View } from 'native-base';
import FormRegister from './FormRegister';
import { AuthenContext } from 'components/common/context/AuthenContext';
import FormVerify from 'screens/SceenRoot/common/FormVerify';
import {
  accountVerifyCodeSignUp,
  accountSendOTPSignUp,
  refreshError,
  accountRegister
} from 'actions/authenActions';

// REX
import {
  phoneVerify,
  emailVerify,
  nameVerify,
  passwordVerify,
  passwordConfirmVerify
} from 'utils';

// Component
import { Header } from 'screens/SceenRoot/common';

const initialValues = {
  email: '',
  name: '',
  phone: '',
  password: '',
  passwordConfirm: ''
};

const Register = ({ navigation }) => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(0);
  const [typeTab, setTypeTab] = useState('phone');
  const { userData, setUserData } = useContext(AuthenContext);
  const [defaultSchema, setDefaultSchema] = useState(phoneVerify);

  useEffect(() => {
    step === 0 && typeTab === 'phone' && setDefaultSchema(phoneVerify);
    step === 0 && typeTab === 'email' && setDefaultSchema(emailVerify);
    step === 2 && setDefaultSchema(nameVerify);
    step === 3 &&
      setDefaultSchema({
        ...passwordVerify,
        ...passwordConfirmVerify
      });
  }, [step, typeTab]);

  useEffect(() => {
    dispatch(refreshError());
  }, [dispatch]);

  const onHandleSubmitted = values => {
    if (step === 0) {
      setUserData({
        ...userData,
        [typeTab]: values[typeTab].trim()
      });
      dispatch(accountSendOTPSignUp(typeTab, values[typeTab].trim())).then(
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
      dispatch(accountRegister(dataRegister, userData.userToken)).then(res => {
        const { error } = res;
        if (error) {
          Alert.alert('Register Failed', [
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
    let values = {
      [typeTab]: userData[typeTab],
      code
    };
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
    dispatch(accountSendOTPSignUp([typeTab], userData[typeTab]));
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
              typeTab={typeTab}
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
