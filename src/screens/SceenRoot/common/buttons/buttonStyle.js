import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { Spinner, Text, View } from 'native-base';

const ButtonStyle = props => {
  const { isLoading, handleSubmit, isHint, navigation, hint } = props;

  return (
    <>
      <TouchableOpacity disabled={isLoading} onPress={handleSubmit}>
        <LinearGradient style={styles.rect} colors={['#0cb3ff', '#0068ff']}>
          {isLoading && <Spinner size="small" color="#ff9800" />}
          {!isLoading && <Text style={styles.loginButton}>Sign In</Text>}
        </LinearGradient>
      </TouchableOpacity>
      {isHint && (
        <View style={styles.bottomHint}>
          <Text>{hint.text}</Text>
          <Text
            style={styles.bottomHintSig}
            onPress={() => navigation.navigate(hint.navigateTo)}
          >
            {hint.typeText}
          </Text>
        </View>
      )}
    </>
  );
};

export default ButtonStyle;

ButtonStyle.propTypes = {
  isLoading: PropTypes.bool,
  isHint: PropTypes.bool,
  handleSubmit: PropTypes.func,
  navigation: PropTypes.objectOf(PropTypes.any),
  hint: PropTypes.objectOf(PropTypes.any)
};
ButtonStyle.defaultProps = {
  isLoading: false,
  isHint: true,
  handleSubmit: () => {},
  navigation: {},
  hint: {}
};

const styles = StyleSheet.create({
  rect: {
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
  bottomHint: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 16
  },
  bottomHintSig: { color: '#ff9800', fontWeight: 'bold', marginLeft: 3 }
});
