import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import AnimateVerify from './../AnumateVerify';
import { Container, Content, Text, View } from 'native-base';

const FormVerify = ({ onHandleVerifyCode }) => {
  return (
    <Container>
      <Content>
        <View style={styles.rect3}>
          <Text style={styles.SendMessageSMS}>
            Please do not share the verification code to avoid losing your
            account
          </Text>
        </View>
        <AnimateVerify onHandleVerifyCode={onHandleVerifyCode} />
        <View>
          <Text style={styles.ResendCode}>Resend code</Text>
        </View>
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
    marginTop: 15,
    color: '#ffcc80',
    textDecorationLine: 'underline'
  }
});

FormVerify.propTypes = {
  onHandleVerifyCode: PropTypes.func,
  styles: PropTypes.objectOf(PropTypes.any),
  navigation: PropTypes.objectOf(PropTypes.any)
};
FormVerify.defaultProps = {
  onHandleVerifyCode: () => {},
  styles: {},
  navigation: {}
};
