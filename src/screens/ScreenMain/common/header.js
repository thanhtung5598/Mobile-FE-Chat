import React from 'react';
import { StyleSheet } from 'react-native';
import { Header, Item, Icon } from 'native-base';
import { Formik } from 'formik';
import { StyledInput } from 'components/common/ComponentsCommon/StyledInput';
import ErrorInput from 'components/common/ComponentsCommon/ErrorInput';
import { TouchableOpacity } from 'react-native-gesture-handler';

const HeaderSearch = () => {
  return (
    <Header style={styles.headerStyle}>
      <Item style={styles.itemStyle}>
        <Formik initialValues={{ textSearch: '' }}>
          {({ touched, errors, ...formikProps }) => (
            <>
              <Icon name="ios-search" />
              <StyledInput
                formikProps={formikProps}
                formikKey="search"
                placeholder="Looking your friends..."
              />
              {touched.password && errors.password ? (
                <ErrorInput text={errors.password} />
              ) : null}
              <TouchableOpacity>
                <Icon name="ios-people" />
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </Item>
    </Header>
  );
};

export default HeaderSearch;

const styles = StyleSheet.create({
  headerStyle: {
    width: '100%',
    paddingRight: 20,
    paddingLeft: 20,
    backgroundColor: 'white',
    marginBottom: 10
  },
  itemStyle: {
    width: '100%',
    borderBottomWidth: 0
  },
  viewStyle: {
    width: '100%',
    borderBottomWidth: 0,
    shadowOpacity: 0.25
  }
});
