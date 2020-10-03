import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Text, View } from 'native-base';
import Icon from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Welcome = ({ navigation }) => {
  return (
    <Container>
      <Content>
        <View style={styles.container}>
          <LinearGradient style={styles.rect} colors={['#0cb3ff', '#0068ff']}>
            <Icon name="phone-call" style={styles.icon}></Icon>
            <Text style={styles.welcome3}>Welcome</Text>
          </LinearGradient>
          <Text style={styles.zola}>Zola</Text>
          <Text style={styles.quote}>Free talk and chat with your friends</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <LinearGradient
              style={styles.rect2}
              colors={['#0cb3ff', '#0068ff']}
            >
              <Text style={styles.login}>Login</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <LinearGradient
              style={styles.rect1}
              colors={['#cfd9df', '#e2ebf0']}
            >
              <Text style={styles.register}>Register</Text>
            </LinearGradient>
          </TouchableOpacity>
          <Text
            style={styles.forgotPassword}
            onPress={() => navigation.navigate('ForgotPassword')}
          >
            Forgot password
          </Text>
        </View>
      </Content>
    </Container>
  );
};

export default Welcome;
Welcome.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any)
};
Welcome.defaultProps = {
  navigation: {}
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  rect: {
    alignSelf: 'center',
    width: 148,
    height: 148,
    backgroundColor: 'rgba(33,150,243,1)',
    borderRadius: 74,
    marginTop: '15%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    color: 'rgba(254,251,251,1)',
    fontSize: 75,
    height: 75,
    width: 75
  },
  welcome3: {
    fontWeight: '700',
    color: 'rgba(255,252,252,1)',
    fontSize: 18,
    marginTop: 12
  },
  zola: {
    fontWeight: '700',
    color: '#2979ff',
    fontSize: 45,
    marginTop: '3%',
    alignSelf: 'center'
  },
  quote: {
    color: '#2196f3',
    fontSize: 16,
    marginTop: '3%',
    alignSelf: 'center',
    marginBottom: '40%'
  },
  rect2: {
    width: 300,
    height: 45,
    backgroundColor: 'rgba(33,150,243,1)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  login: {
    color: 'rgba(255,255,255,1)',
    fontSize: 20
  },
  rect1: {
    width: 300,
    height: 45,
    backgroundColor: 'rgba(208,212,212,1)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: '5%'
  },
  register: {
    color: 'rgba(0,0,0,1)',
    fontSize: 20
  },
  forgotPassword: {
    color: 'rgba(13,71,161,1)',
    textDecorationLine: 'underline',
    alignSelf: 'center',
    marginTop: '5%'
  }
});
