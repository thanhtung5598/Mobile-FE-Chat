import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';

// Component
import {
  InputTextCustom,
  InputSecureCustom,
  ButtonStep
} from 'screens/SceenRoot/common';
import InputTabs from 'screens/SceenRoot/common/tabs/inputTabs';

const ForgotForm = props => {
  const { isLoadingChangePass, error, message } = useSelector(
    state => state.authen
  );
  const {
    initialValues,
    navigation,
    defaultSchema,
    setTypeTab,
    onHandleSubmited,
    step
  } = props;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object(defaultSchema)}
      onSubmit={onHandleSubmited}
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
            <>
              <InputSecureCustom
                touched={touched}
                errors={errors}
                formikProps={formikProps}
                type={{ key: 'newPassword', placeholder: 'New Password...' }}
              />
              <InputSecureCustom
                touched={touched}
                errors={errors}
                formikProps={formikProps}
                type={{
                  key: 'confirmNewPassword',
                  placeholder: 'Confirm new password'
                }}
              />
            </>
          )}
          <ButtonStep
            isLoading={isLoadingChangePass}
            handleSubmit={formikProps.handleSubmit}
            navigation={navigation}
            hint={{
              text: 'Already have an account?',
              navigateTo: 'Login',
              typeText: 'Sign in'
            }}
            isNext={2}
          />
        </>
      )}
    </Formik>
  );
};

export default ForgotForm;

ForgotForm.propTypes = {
  step: PropTypes.number,
  styles: PropTypes.objectOf(PropTypes.any),
  navigation: PropTypes.objectOf(PropTypes.any),
  initialValues: PropTypes.objectOf(PropTypes.any),
  defaultSchema: PropTypes.objectOf(PropTypes.any),
  setTypeTab: PropTypes.func,
  onHandleSubmited: PropTypes.func
};
ForgotForm.defaultProps = {
  step: 0,
  styles: {},
  navigation: {},
  initialValues: {},
  defaultSchema: {},
  setTypeTab: () => {},
  onHandleSubmited: () => {}
};
