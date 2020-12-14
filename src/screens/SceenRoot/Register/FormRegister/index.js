import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { SafeAreaView } from 'react-native';

// Component
import {
  InputTextCustom,
  InputSecureCustom,
  ButtonStep
} from 'screens/SceenRoot/common';
import InputTabs from 'screens/SceenRoot/common/tabs/inputTabs';

const FormRegister = props => {
  const { isLoading, error, message } = useSelector(state => state.authen);
  const {
    initialValues,
    setTypeTab,
    defaultSchema,
    navigation,
    onHandleSubmitted,
    step
  } = props;

  return (
    <SafeAreaView>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object(defaultSchema)}
        onSubmit={onHandleSubmitted}
      >
        {({ touched, errors, ...formikProps }) => (
          <>
            {step === 0 && (
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
            )}
            {step === 2 && (
              <InputTextCustom
                touched={touched}
                errors={errors}
                formikProps={formikProps}
                type={{ key: 'name', placeholder: 'Your name...' }}
              />
            )}
            {step === 3 && (
              <>
                <InputSecureCustom
                  touched={touched}
                  errors={errors}
                  formikProps={formikProps}
                  type={{ key: 'password', placeholder: 'Password...' }}
                />
                <InputSecureCustom
                  touched={touched}
                  errors={errors}
                  formikProps={formikProps}
                  type={{
                    key: 'passwordConfirm',
                    placeholder: 'Confirm password'
                  }}
                />
              </>
            )}
            <ButtonStep
              isLoading={isLoading}
              handleSubmit={formikProps.handleSubmit}
              navigation={navigation}
              hint={{
                text: 'Already have an account?',
                navigateTo: 'Login',
                typeText: 'Sign in'
              }}
              isNext={3}
            />
          </>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default FormRegister;

FormRegister.propTypes = {
  step: PropTypes.number,
  setTypeTab: PropTypes.func,
  initialValues: PropTypes.objectOf(PropTypes.any),
  defaultSchema: PropTypes.objectOf(PropTypes.any),
  navigation: PropTypes.objectOf(PropTypes.any),
  styles: PropTypes.objectOf(PropTypes.any),
  onHandleSubmitted: PropTypes.func
};
FormRegister.defaultProps = {
  step: 0,
  setTypeTab: () => {},
  initialValues: {},
  defaultSchema: {},
  navigation: {},
  styles: {},
  onHandleSubmitted: () => {}
};
