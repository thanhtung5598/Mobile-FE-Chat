import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';
import { Container, Content, Text, Icon, View } from 'native-base';
import { AuthenContext } from '../../../components/common/context/AuthenContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FormVerify from '../../../components/common/ComponentsCommon/FormVerify';

import ForgotForm from './ForgotForm';

const Login = ({ navigation }) => {
  const [step, setStep] = useState(0);
  const { signUp } = useContext(AuthenContext);

  const onHandleSubmited = () => {
    setStep(1);
  };
  const onHandleVerifyCode = () => {
    signUp();
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
          {step === 0 && (
            <ForgotForm onHandleSubmited={onHandleSubmited} styles={styles} />
          )}
          {step === 1 && <FormVerify onHandleVerifyCode={onHandleVerifyCode} />}
        </View>
      </Content>
    </Container>
  );
};

export default Login;

Login.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any)
};
Login.defaultProps = {
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
    marginTop: 20,
    paddingLeft: 15,
    alignSelf: 'center'
  },
  rect7: {
    width: '85%',
    height: 50,
    backgroundColor: 'rgba(33,150,243,1)',
    borderRadius: 25,
    marginTop: 23,
    alignSelf: 'center'
  },
  loginButton: {
    color: 'rgba(255,255,255,1)',
    fontSize: 22,
    textAlign: 'center',
    height: 27,
    marginTop: 12
  },
  SendMessageSMS: {
    fontSize: 15,
    textAlign: 'center'
  }
});
