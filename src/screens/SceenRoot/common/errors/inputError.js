import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Text, View } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

const InputError = props => {
  const { message } = props;

  return (
    <View style={styles.errorBE}>
      <MaterialIcons
        style={styles.errorBEIcon}
        name="error"
        size={20}
        color="red"
      />
      <Text style={styles.errorBEText}>{message.msg}</Text>
    </View>
  );
};

export default InputError;

InputError.propTypes = {
  message: PropTypes.objectOf(PropTypes.any)
};
InputError.defaultProps = {
  message: {}
};

const styles = StyleSheet.create({
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
