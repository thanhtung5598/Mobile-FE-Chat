import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { Text, View, Spinner, Tab, Tabs } from 'native-base';
import * as Yup from 'yup';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';

// Component
import FormPhone from '../FormPhone';
import FormMail from '../FormMail';
import FormName from '../FormName';
import FormPassword from '../FormPassword';

const FormRegister = props => {
  const { isLoading, error, message } = useSelector(state => state.authen);
  const {
    initialValues,
    setTypeRegister,
    defaultSchema,
    onHandleSubmitted,
    styles,
    navigation,
    step
  } = props;

  const handleChangeType = (e, formikProps) => {
    const type = e.ref.props.name;
    formikProps.setErrors({});
    setTypeRegister(type);
  };

  return (
    <SafeAreaView>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object(defaultSchema)}
        onSubmit={onHandleSubmitted}
      >
        {({ touched, errors, ...formikProps }) => (
          <React.Fragment>
            {step === 0 && (
              <Tabs
                onChangeTab={e => handleChangeType(e, formikProps)}
                tabBarUnderlineStyle={{ backgroundColor: '#2196f3', height: 1 }}
              >
                <Tab
                  tabStyle={{ backgroundColor: '#F8F8F8' }}
                  textStyle={{ color: '#AAA' }}
                  activeTabStyle={{ backgroundColor: '#F8F8F8' }}
                  activeTextStyle={{ color: '#2196f3', fontWeight: '700' }}
                  heading="Phone"
                  name="Phone"
                >
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
                <Tab
                  tabStyle={{ backgroundColor: '#F8F8F8' }}
                  textStyle={{ color: '#AAA' }}
                  activeTabStyle={{ backgroundColor: '#F8F8F8' }}
                  activeTextStyle={{ color: '#2196f3', fontWeight: '700' }}
                  heading="Email"
                  name="Email"
                >
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
                  <FormMail
                    styles={styles}
                    touched={touched}
                    errors={errors}
                    formikProps={formikProps}
                  />
                </Tab>
              </Tabs>
            )}
            {step === 2 && (
              <FormName
                styles={styles}
                touched={touched}
                errors={errors}
                formikProps={formikProps}
              />
            )}
            {step === 3 && (
              <FormPassword
                styles={styles}
                touched={touched}
                errors={errors}
                formikProps={formikProps}
              />
            )}
            <TouchableOpacity
              disabled={isLoading}
              onPress={formikProps.handleSubmit}
            >
              <LinearGradient
                style={styles.rect7}
                colors={['#0cb3ff', '#0068ff']}
              >
                <Text style={styles.loginButton}>
                  {step !== 3 ? 'Next' : 'Completed'}
                </Text>
                {isLoading && step !== 2 && (
                  <Spinner
                    style={{ position: 'absolute' }}
                    size="large"
                    color="white"
                  />
                )}
                {step !== 3 && (
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
              <Text>Already have an account?</Text>
              <Text
                style={styles.bottomHintSig}
                onPress={() => navigation.navigate('Login')}
              >
                Sign in
              </Text>
            </View>
          </React.Fragment>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default FormRegister;

FormRegister.propTypes = {
  step: PropTypes.number,
  setTypeRegister: PropTypes.func,
  initialValues: PropTypes.objectOf(PropTypes.any),
  defaultSchema: PropTypes.objectOf(PropTypes.any),
  navigation: PropTypes.objectOf(PropTypes.any),
  styles: PropTypes.objectOf(PropTypes.any),
  onHandleSubmitted: PropTypes.func
};
FormRegister.defaultProps = {
  step: 0,
  setTypeRegister: () => {},
  initialValues: {},
  defaultSchema: {},
  navigation: {},
  styles: {},
  onHandleSubmitted: () => {}
};
