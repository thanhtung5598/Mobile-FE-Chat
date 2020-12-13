import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Text, Icon, View, Badge } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';

const Header = props => {
  const { onHandleTurnBack, step } = props;

  return (
    <>
      <LinearGradient
        start={{ x: -1, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={['#2962ff', '#0cb3ff']}
      >
        <TouchableOpacity style={styles.headerRect} onPress={onHandleTurnBack}>
          <Icon name="arrow-back" style={styles.icon}></Icon>
          <Text style={styles.textHeader}>Register</Text>
        </TouchableOpacity>
      </LinearGradient>
      {step !== 1 && (
        <View style={styles.referText}>
          <Text style={styles.loremIpsum}>
            {step === 0 && 'Please input your required field'}
            {step === 2 && 'Please input your name'}
            {step === 3 && 'Please input your password to completed'}
          </Text>
          <Badge
            style={{
              backgroundColor: 'white',
              alignSelf: 'center',
              position: 'absolute',
              right: 15,
              marginTop: 15
            }}
          >
            <Text
              style={{ color: '#2962ff', fontWeight: 'bold', fontSize: 16 }}
            >
              {step + 1} / 4
            </Text>
          </Badge>
        </View>
      )}
    </>
  );
};

export default Header;

Header.propTypes = {
  step: PropTypes.number,
  onHandleTurnBack: PropTypes.func
};
Header.defaultProps = {
  step: 0,
  onHandleTurnBack: {}
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerRect: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  textHeader: {
    color: 'rgba(255,255,255,1)',
    fontSize: 20,
    fontWeight: '700'
  },
  referText: {
    width: '100%',
    height: 42,
    backgroundColor: '#E6E6E6',
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    color: 'rgba(255,255,255,1)',
    fontSize: 25,
    width: 34,
    height: 37,
    marginTop: 13,
    marginLeft: 10
  },
  loremIpsum: {
    color: '#121212',
    width: '100%',
    fontSize: 15,
    marginLeft: 15
  }
});
