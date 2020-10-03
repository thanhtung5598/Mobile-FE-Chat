import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Text, View } from 'native-base';

const ErrorInput = props => {
  return (
    <View style={styles.errorClass}>
      <Text style={styles.errorText}>{props.text}</Text>
    </View>
  );
};

export default ErrorInput;

const styles = StyleSheet.create({
  errorClass: {
    width: '85%',
    alignSelf: 'center',
    marginLeft: 45,
    marginTop: 1
  },
  errorText: {
    color: 'red'
  }
});

ErrorInput.propTypes = {
  text: PropTypes.string
};
ErrorInput.defaultProps = {
  text: ''
};
