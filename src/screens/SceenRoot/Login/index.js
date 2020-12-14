import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { REX } from 'utils';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';
import {
  Container,
  Content,
  Text,
  View,
  Spinner,
  Tabs,
  Tab
} from 'native-base';
import { StyledInput } from 'components/common/ComponentsCommon/StyledInput';
import ErrorInput from 'components/common/ComponentsCommon/ErrorInput';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { accountLogin, refreshError } from 'actions/authenActions';
import { MaterialIcons } from '@expo/vector-icons';

import { Header } from 'screens/SceenRoot/common';

// Component
import FormPhone from './FormPhone';
import FormEmail from './FormEmail';

const defaultSchemaValid = {
  phone: Yup.string()
    .trim()
    .matches(REX.PHONE_REX, {
      message: 'Your phone invalid'
    })
    .required('Phone is required')
};

const Login = ({ navigation }) => {
  const [typeRegister, setTypeRegister] = useState('Phone');
  const { isLoading, error, message } = useSelector(state => state.authen);
  const [defaultSchema, setDefaultSchema] = useState(defaultSchemaValid);

  useEffect(() => {
    typeRegister === 'Phone' && setDefaultSchema({ ...defaultSchemaValid });
    typeRegister === 'Email' &&
      setDefaultSchema({
        email: Yup.string()
          .trim()
          .matches(REX.EMAIL_RGX, {
            message: 'Email invalid'
          })
          .required('Email is required')
      });
  }, [typeRegister]);

  const dispatch = useDispatch();

  const onHandleLogin = values => {
    let dataLogin = {};
    if (typeRegister === 'Phone') {
      dataLogin = {
        phone: values.phone.trim(),
        password: values.password
      };
    }
    if (typeRegister === 'Email') {
      dataLogin = {
        email: values.email.trim(),
        password: values.password
      };
    }
    dispatch(accountLogin(dataLogin));
  };

  const onHandleTurnBack = () => {
    navigation.navigate('Welcome');
    dispatch(refreshError());
  };

  const handleChangeType = (e, formikProps) => {
    const type = e.ref.props.name;
    formikProps.setErrors({});
    setTypeRegister(type);
  };

  return (
    <Container>
      <Content>
        <View style={styles.container}>
          <Header onHandleTurnBack={onHandleTurnBack} title="Login" />
          <Formik
            initialValues={{ phone: '', password: '' }}
            validationSchema={Yup.object(defaultSchema)}
            onSubmit={onHandleLogin}
          >
            {({ touched, errors, ...formikProps }) => (
              <>
                <Tabs
                  onChangeTab={e => handleChangeType(e, formikProps)}
                  tabBarUnderlineStyle={{
                    backgroundColor: '#2196f3',
                    height: 1
                  }}
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
                    <FormEmail
                      styles={styles}
                      touched={touched}
                      errors={errors}
                      formikProps={formikProps}
                    />
                  </Tab>
                </Tabs>
                <View style={styles.rect6}>
                  <StyledInput
                    onFocus={() => dispatch(refreshError())}
                    formikProps={formikProps}
                    formikKey="password"
                    placeholder="Password..."
                    secureTextEntry={true}
                  />
                </View>
                {touched.password && errors.password ? (
                  <ErrorInput text={errors.password} />
                ) : null}
                <TouchableOpacity
                  disabled={isLoading}
                  onPress={formikProps.handleSubmit}
                >
                  <LinearGradient
                    style={styles.rect7}
                    colors={['#0cb3ff', '#0068ff']}
                  >
                    {isLoading && <Spinner size="small" color="#ff9800" />}
                    {!isLoading && (
                      <Text style={styles.loginButton}>Sign In</Text>
                    )}
                  </LinearGradient>
                </TouchableOpacity>
                <View style={styles.bottomHint}>
                  <Text>Don&#39;t have an account?</Text>
                  <Text
                    style={styles.bottomHintSig}
                    onPress={() => navigation.navigate('Register')}
                  >
                    Sign up
                  </Text>
                </View>
              </>
            )}
          </Formik>
        </View>
      </Content>
    </Container>
  );
};

export default Login;

Login.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any)
};
Login.defaultProps = {
  navigation: {}
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rect: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    color: 'rgba(255,255,255,1)',
    fontSize: 25,
    width: 34,
    height: 37,
    marginTop: 13,
    marginLeft: 10
  },
  login: {
    color: 'rgba(255,255,255,1)',
    fontSize: 20,
    fontWeight: '700'
  },
  rect3: {
    width: '100%',
    height: 42,
    backgroundColor: '#E6E6E6',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loremIpsum: {
    color: '#121212',
    width: '100%',
    fontSize: 15,
    marginLeft: 15
  },
  rect5: {
    width: '85%',
    height: 50,
    backgroundColor: 'rgba(255,255,255,1)',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#2196f3',
    marginTop: 20,
    paddingLeft: 15,
    alignSelf: 'center'
  },
  rect6: {
    width: '85%',
    height: 50,
    backgroundColor: 'rgba(255,255,255,1)',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#2196f3',
    marginTop: 20,
    paddingLeft: 15,
    alignSelf: 'center'
  },
  userName: {
    color: '#121212',
    width: 142,
    height: 17,
    marginTop: 15
  },
  password: {
    color: '#121212',
    width: 154,
    height: 23,
    marginTop: 16
  },
  rect7: {
    width: '85%',
    height: 50,
    backgroundColor: 'rgba(33,150,243,1)',
    borderRadius: 25,
    marginTop: 23,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  loginButton: {
    color: 'rgba(255,255,255,1)',
    fontSize: 22,
    textAlign: 'center',
    height: 27
  },
  loremIpsum2: {
    color: 'rgba(113,111,111,1)',
    marginTop: 16
  },
  signUp: {
    color: 'rgba(173,20,87,1)'
  },
  bottomHint: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 16
  },
  bottomHintSig: { color: '#ff9800', fontWeight: 'bold', marginLeft: 3 },
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
