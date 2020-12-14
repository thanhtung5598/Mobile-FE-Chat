import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { REX } from 'utils';
import { StyleSheet } from 'react-native';
import { Container, Content, View } from 'native-base';
import { accountLogin, refreshError } from 'actions/authenActions';

// Component
import {
  Header,
  InputTextCustom,
  InputSecureCustom,
  ButtonStyle
} from 'screens/SceenRoot/common';
import InputTabs from 'screens/SceenRoot/common/tabs/inputTabs';

const defaultSchemaValid = {
  phone: Yup.string()
    .trim()
    .matches(REX.PHONE_REX, {
      message: 'Your phone invalid'
    })
    .required('Phone is required')
};

const Login = ({ navigation }) => {
  const [typeTab, setTypeTab] = useState('Phone');
  const { isLoading, error, message } = useSelector(state => state.authen);
  const [defaultSchema, setDefaultSchema] = useState(defaultSchemaValid);

  useEffect(() => {
    typeTab === 'Phone' && setDefaultSchema({ ...defaultSchemaValid });
    typeTab === 'Email' &&
      setDefaultSchema({
        email: Yup.string()
          .trim()
          .matches(REX.EMAIL_RGX, {
            message: 'Email invalid'
          })
          .required('Email is required')
      });
  }, [typeTab]);

  const dispatch = useDispatch();

  const onHandleLogin = values => {
    let dataLogin = {};
    if (typeTab === 'Phone') {
      dataLogin = {
        phone: values.phone.trim(),
        password: values.password
      };
    }
    if (typeTab === 'Email') {
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
                <InputTabs
                  error={error} // error from redux
                  formikProps={formikProps} // support change tab
                  setTypeTab={setTypeTab} // support change tab
                  message={message}
                  tabPhone={
                    <InputTextCustom
                      touched={touched}
                      errors={errors}
                      formikProps={formikProps}
                      type={{ key: 'phone', placeholder: 'Your phone...' }}
                    />
                  }
                  tabEmail={
                    <InputTextCustom
                      touched={touched}
                      errors={errors}
                      formikProps={formikProps}
                      type={{ key: 'email', placeholder: 'Your email...' }}
                    />
                  }
                />
                <InputSecureCustom
                  touched={touched}
                  errors={errors}
                  formikProps={formikProps}
                  type={{ key: 'password', placeholder: 'Password...' }}
                />
                <ButtonStyle
                  isLoading={isLoading}
                  handleSubmit={formikProps.handleSubmit}
                  navigation={navigation}
                  hint={{
                    text: "Don't have an account?",
                    navigateTo: 'Register',
                    typeText: 'Sign up'
                  }}
                />
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
  }
});
