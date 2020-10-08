import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import AnimateVerify from './../AnumateVerify';
import { Container, Content, Text, View } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import useCountDown from 'components/common/hook/useCountDown';

const FormVerify = ({
  typeRegister,
  onHandleVerifyCode,
  onHandleResendCode,
  userData
}) => {
  const { countDown, setCountDown } = useCountDown();

  const onHandleResendAndCountDown = useCallback(() => {
    setCountDown(10);
    onHandleResendCode();
  }, [onHandleResendCode, setCountDown]);

  return (
    <Container>
      <Content>
        <View style={styles.rect3}>
          <Text style={styles.SendMessageSMS}>
            Please do not share the verification code to avoid losing your
            account
          </Text>
        </View>
        <AnimateVerify
          typeRegister={typeRegister}
          userData={userData}
          onHandleVerifyCode={onHandleVerifyCode}
        />
        <TouchableOpacity
          disabled={countDown > 0 && true}
          onPress={onHandleResendAndCountDown}
        >
          <View style={styles.viewResend}>
            <Text
              style={
                countDown === null ? styles.ResendCode : styles.ResendCodeDiff
              }
            >
              Resend code
            </Text>
            <Text style={styles.countColor}>{countDown}</Text>
          </View>
        </TouchableOpacity>
      </Content>
    </Container>
  );
};

export default FormVerify;

const styles = StyleSheet.create({
  rect3: {
    width: '100%',
    height: 42,
    backgroundColor: '#E6E6E6',
    alignItems: 'center',
    justifyContent: 'center'
  },
  SendMessageSMS: {
    fontSize: 15,
    textAlign: 'center'
  },
  ResendCode: {
    fontWeight: '700',
    textAlign: 'center',
    color: '#ffcc80',
    textDecorationLine: 'underline'
  },
  ResendCodeDiff: {
    fontWeight: '700',
    textAlign: 'center',
    color: '#A2A2A2',
    textDecorationLine: 'underline'
  },
  viewResend: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  countColor: {
    color: 'red',
    fontWeight: '700',
    marginLeft: 5
  }
});

FormVerify.propTypes = {
  typeRegister: PropTypes.string,
  userData: PropTypes.objectOf(PropTypes.any),
  countDown: PropTypes.number,
  onHandleVerifyCode: PropTypes.func,
  setCountDown: PropTypes.func,
  onHandleResendCode: PropTypes.func,
  styles: PropTypes.objectOf(PropTypes.any),
  navigation: PropTypes.objectOf(PropTypes.any)
};
FormVerify.defaultProps = {
  typeRegister: '',
  userData: {},
  countDown: 0,
  onHandleVerifyCode: () => {},
  setCountDown: () => {},
  onHandleResendCode: () => {},
  styles: {},
  navigation: {}
};
