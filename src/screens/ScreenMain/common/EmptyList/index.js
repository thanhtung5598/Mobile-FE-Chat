import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

const EmptyList = ({ message }) => {
  return (
    <View style={{ alignItems: 'center', marginTop: 20 }}>
      <Text style={{ color: '#AAA', fontSize: 30 }}>{message}</Text>
    </View>
  );
};

export default EmptyList;

EmptyList.propTypes = {
  message: PropTypes.string
};
EmptyList.defaultProps = {
  message: ''
};
