import React from 'react';
import PropTypes from 'prop-types';

import { Formik } from 'formik';
import * as Yup from 'yup';
import { REX } from '../../../../utils';
import { Text, View } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StyledInput } from '../../../../components/common/ComponentsCommon/StyledInput';
import ErrorInput from '../../../../components/common/ComponentsCommon/ErrorInput';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const ForgotForm = props => {
  const { onHandleSubmited, styles } = props;

  return (
    <>
      <View style={styles.rect3}>
        <Text style={styles.loremIpsum}>
          Enter the phone number to receive the verify code
        </Text>
      </View>
      <Formik
        initialValues={{ phone: '' }}
        validationSchema={Yup.object({
          phone: Yup.string()
            .trim()
            .matches(REX.PHONE_REX, {
              message: 'Your phone invalid'
            })
            .required('Phone is required')
        })}
        onSubmit={onHandleSubmited}
      >
        {({ touched, errors, ...formikProps }) => (
          <>
            <View style={styles.rect5}>
              <StyledInput
                formikProps={formikProps}
                formikKey="phone"
                placeholder="Phone number..."
                value={formikProps.values.phone}
                keyboardType="numeric"
              />
            </View>
            {touched.phone && errors.phone ? (
              <ErrorInput text={errors.phone} />
            ) : null}
            <TouchableOpacity onPress={formikProps.handleSubmit}>
              <LinearGradient
                style={styles.rect7}
                colors={['#0cb3ff', '#0068ff']}
              >
                <Text style={styles.loginButton}>
                  Continues <AntDesign name="arrowright" size={24} />
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </>
  );
};

export default ForgotForm;

ForgotForm.propTypes = {
  styles: PropTypes.objectOf(PropTypes.any),
  onHandleSubmited: PropTypes.func
};
ForgotForm.defaultProps = {
  styles: {},
  onHandleSubmited: () => {}
};
