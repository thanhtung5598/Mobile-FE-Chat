import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { Spinner, Text, View } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

const ButtonStep = props => {
  const { isLoading, handleSubmit, navigation, step, hint, isNext } = props;

  return (
    <>
      <TouchableOpacity disabled={isLoading} onPress={handleSubmit}>
        <LinearGradient style={styles.rect} colors={['#0cb3ff', '#0068ff']}>
          <Text style={styles.loginButton}>
            {step !== isNext ? 'Next' : 'Completed'}
          </Text>
          {isLoading && step !== isNext && (
            <Spinner
              style={{ position: 'absolute' }}
              size="large"
              color="white"
            />
          )}
          {step !== isNext && (
            <MaterialIcons
              style={styles.iconNext}
              name="navigate-next"
              size={28}
              color="white"
            />
          )}
        </LinearGradient>
      </TouchableOpacity>
      <View style={styles.bottomHint}>
        <Text>{hint.text}</Text>
        <Text
          style={styles.bottomHintSig}
          onPress={() => navigation.navigate(hint.navigateTo)}
        >
          {hint.typeText}
        </Text>
      </View>
    </>
  );
};

export default ButtonStep;

ButtonStep.propTypes = {
  isLoading: PropTypes.bool,
  step: PropTypes.number,
  isNext: PropTypes.number,
  handleSubmit: PropTypes.func,
  navigation: PropTypes.objectOf(PropTypes.any),
  hint: PropTypes.objectOf(PropTypes.any)
};
ButtonStep.defaultProps = {
  isLoading: false,
  step: 0,
  isNext: 0,
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
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  loginButton: {
    color: 'rgba(255,255,255,1)',
    fontSize: 22,
    textAlign: 'center',
    height: 27
  },
  iconNext: {
    marginTop: 2
  },
  bottomHint: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 16
  },
  bottomHintSig: { color: '#ff9800', fontWeight: 'bold', marginLeft: 3 }
});
