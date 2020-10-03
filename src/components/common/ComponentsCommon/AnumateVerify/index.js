import React, { useState, useEffect } from 'react';
import { Image, SafeAreaView, Text, Animated } from 'react-native';
import PropTypes from 'prop-types';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell
} from 'react-native-confirmation-code-field';

import styles from './AnimateStyles';

const { Text: AnimatedText } = Animated;

const CELL_COUNT = 4;
const source = {
  uri:
    'https://user-images.githubusercontent.com/4661784/56352614-4631a680-61d8-11e9-880d-86ecb053413d.png'
};

const AnimatedVerify = ({ onHandleVerifyCode }) => {
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue
  });

  useEffect(() => {
    value.split('').length === 4 && onHandleVerifyCode();
  }, [onHandleVerifyCode, value]);

  const renderCell = ({ index, symbol, isFocused }) => {
    return (
      <AnimatedText
        key={index}
        style={[styles.cell]}
        onLayout={getCellOnLayoutHandler(index)}
      >
        {symbol || (isFocused ? <Cursor /> : null)}
      </AnimatedText>
    );
  };

  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.title}>Verification</Text>
      <Image style={styles.icon} source={source} />
      <Text style={styles.subTitle1}>we sent to (+84) 0336365110</Text>
      <Text style={styles.subTitle2}>
        Please check SMS {'\n'} and fill in the confirmation code below
      </Text>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        rootStyle={styles.codeFiledRoot}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={renderCell}
      />
    </SafeAreaView>
  );
};

export default AnimatedVerify;

AnimatedVerify.propTypes = {
  onHandleVerifyCode: PropTypes.func
};
AnimatedVerify.defaultProps = {
  onHandleVerifyCode: () => {}
};
