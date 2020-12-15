import * as Yup from 'yup';

export const REX = {
  PHONE_REX: '^(03|07|08|09|01[2|6|8|9])([0-9]{8})$',
  EMAIL_RGX: /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i
};

export const phoneVerify = {
  phone: Yup.string()
    .trim()
    .matches(REX.PHONE_REX, {
      message: 'Your phone invalid'
    })
    .required('Phone is required')
};

export const emailVerify = {
  email: Yup.string()
    .trim()
    .matches(REX.EMAIL_RGX, {
      message: 'Email invalid'
    })
    .required('Email is required')
};

export const nameVerify = {
  name: Yup.string()
    .min(6, 'Name must be more than 6 characters')
    .max(32, 'Name must be less than 32 characters')
    .required('Name is required')
};

export const passwordVerify = {
  password: Yup.string()
    .min(6, 'Password must be more than 6 characters')
    .max(32, 'Password must be less than 32 characters')
    .required('Password is required')
};

export const passwordConfirmVerify = {
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm is required')
};

export const newPasswordVerify = {
  newPassword: Yup.string()
    .min(6, 'Password must be more than 6 characters')
    .max(32, 'Password must be less than 32 characters')
    .required('Password is required')
};

export const newPasswordConfirmVerify = {
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm is required')
};
