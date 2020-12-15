import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Image, SafeAreaView, Text, View, Animated } from 'react-native';
import { Spinner } from 'native-base';
import PropTypes from 'prop-types';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell
} from 'react-native-confirmation-code-field';

import styles from './AnimateStyles';

const { Text: AnimatedText } = Animated;

const source = {
  uri:
    'https://user-images.githubusercontent.com/4661784/56352614-4631a680-61d8-11e9-880d-86ecb053413d.png'
};

const AnimatedVerify = ({
  onHandleVerifyCode,
  typeTab,
  userData: { phone, email }
}) => {
  const CELL_COUNT = 6;
  const { isLoadingVerify } = useSelector(state => state.authVerify);
  const { error } = useSelector(state => state.authen);
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue
  });

  useEffect(() => {
    value.split('').length === 6 && onHandleVerifyCode(value);
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
      <Text style={styles.subTitle1}>
        {typeTab === 'phone' && `we sent to (+84) ${phone && phone}`}
        {typeTab === 'email' && `we sent to ${email && email}`}
      </Text>
      <Text style={styles.subTitle2}>
        {typeTab === 'phone' && `Please check SMS \n`}
        {typeTab === 'email' && `Please check your mail \n`}
        and fill in the confirmation code below
      </Text>
      <View style={{ alignItems: 'center' }}>
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
        {isLoadingVerify && (
          <View style={{ position: 'absolute', marginTop: 18 }}>
            <Spinner size="large" color="blue" />
          </View>
        )}
      </View>
      {error && (
        <View style={styles.errorCode}>
          <Text style={styles.errorCodeText}>
            Your code is invalid.{'\n'} Please get your new code
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default AnimatedVerify;

AnimatedVerify.propTypes = {
  userData: PropTypes.objectOf(PropTypes.any),
  typeTab: PropTypes.string,
  onHandleVerifyCode: PropTypes.func
};
AnimatedVerify.defaultProps = {
  userData: {},
  typeTab: 'Phone',
  onHandleVerifyCode: () => {}
};
