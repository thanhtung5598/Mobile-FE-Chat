import React, { useState, useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';
import { Container, Content, Text, Icon, View } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FormRegister from './FormRegister';
import { AuthenContext } from 'components/common/context/AuthenContext';
import FormVerify from 'components/common/ComponentsCommon/FormVerify';
import {
  accountRegister,
  accountActive,
  accountActiveAgainByPhone,
  refreshError
} from 'actions/authenActions';

const Register = ({ navigation }) => {
  const dispatch = useDispatch();
  const { userPhone, setUserPhone } = useContext(AuthenContext);
  const [step, setStep] = useState(0);

  useEffect(() => {
    dispatch(refreshError());
  }, [dispatch]);

  const onHandleSubmitted = values => {
    dispatch(accountRegister(values)).then(res => {
      if (!res) {
        setStep(1);
        setUserPhone(values.phone);
      }
    });
  };

  const onHandleResendCode = () => {
    accountActiveAgainByPhone(userPhone);
  };

  const onHandleVerifyCode = code => {
    const values = {
      phone: userPhone,
      code
    };
    dispatch(accountActive(values));
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
          {step === 0 && (
            <FormRegister
              navigation={navigation}
              onHandleSubmitted={onHandleSubmitted}
              styles={styles}
            />
          )}
          {step === 1 && (
            <FormVerify
              userPhone={userPhone}
              onHandleVerifyCode={onHandleVerifyCode}
              onHandleResendCode={onHandleResendCode}
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
    justifyContent: 'center'
  },
  loginButton: {
    color: 'rgba(255,255,255,1)',
    fontSize: 22,
    textAlign: 'center',
    height: 27
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
