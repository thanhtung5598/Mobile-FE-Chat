import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Text, View, Badge, Tabs, Tab, Spinner } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

// Component
import FormPhone from '../FormPhone';
import FormEmail from '../FormEmail';
import FormPassword from '../FormPassword';

const ForgotForm = props => {
  const { isLoadingChangePass, error, message } = useSelector(
    state => state.authen
  );
  const {
    initialValues,
    defaultSchema,
    setTypeForgot,
    onHandleSubmited,
    styles,
    step
  } = props;

  const handleChangeType = (e, formikProps) => {
    const type = e.ref.props.heading;
    formikProps.setErrors({});
    setTypeForgot(type);
  };

  return (
    <>
      <View style={styles.rect3}>
        <Text style={styles.loremIpsum}>
          {step === 0 && 'Please input your required field'}
          {step === 2 && 'Please input your new password'}
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
          <Text style={{ color: '#2962ff', fontWeight: 'bold', fontSize: 16 }}>
            {step + 1} / 3
          </Text>
        </Badge>
      </View>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object(defaultSchema)}
        onSubmit={onHandleSubmited}
      >
        {({ touched, errors, ...formikProps }) => (
          <>
            {step === 0 && (
              <Tabs
                onChangeTab={e => handleChangeType(e, formikProps)}
                tabBarUnderlineStyle={{
                  backgroundColor: '#2196f3',
                  height: 1
                }}
              >
                <Tab heading="Phone" activeTextStyle={{ color: '#2196f3' }}>
                  {error && (
                    <View style={styles.errorBE}>
                      <MaterialIcons
                        style={styles.errorBEIcon}
                        name="error"
                        size={20}
                        color="red"
                      />
                      <Text style={styles.errorBEText}>{message.msg}</Text>
                    </View>
                  )}
                  <FormPhone
                    styles={styles}
                    touched={touched}
                    errors={errors}
                    formikProps={formikProps}
                  />
                </Tab>
                <Tab heading="Email" activeTextStyle={{ color: '#2196f3' }}>
                  {error && (
                    <View style={styles.errorBE}>
                      <MaterialIcons
                        style={styles.errorBEIcon}
                        name="error"
                        size={20}
                        color="red"
                      />
                      <Text style={styles.errorBEText}>{message.msg}</Text>
                    </View>
                  )}
                  <FormEmail
                    styles={styles}
                    touched={touched}
                    errors={errors}
                    formikProps={formikProps}
                  />
                </Tab>
              </Tabs>
            )}
            {step === 2 && (
              <FormPassword
                styles={styles}
                touched={touched}
                errors={errors}
                formikProps={formikProps}
              />
            )}
            <TouchableOpacity onPress={formikProps.handleSubmit}>
              <LinearGradient
                style={styles.rect7}
                colors={['#0cb3ff', '#0068ff']}
              >
                <Text style={styles.loginButton}>
                  {step !== 2 ? 'Next' : 'Completed'}
                </Text>
                {isLoadingChangePass && step !== 2 && (
                  <Spinner
                    style={{ position: 'absolute' }}
                    size="large"
                    color="white"
                  />
                )}
                {step !== 2 && (
                  <MaterialIcons
                    style={styles.iconNext}
                    name="navigate-next"
                    size={28}
                    color="white"
                  />
                )}
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
  step: PropTypes.number,
  styles: PropTypes.objectOf(PropTypes.any),
  initialValues: PropTypes.objectOf(PropTypes.any),
  defaultSchema: PropTypes.objectOf(PropTypes.any),
  setTypeForgot: PropTypes.func,
  onHandleSubmited: PropTypes.func
};
ForgotForm.defaultProps = {
  step: 0,
  styles: {},
  initialValues: {},
  defaultSchema: {},
  setTypeForgot: () => {},
  onHandleSubmited: () => {}
};
