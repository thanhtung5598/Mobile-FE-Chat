import React from 'react';
import { Header, Item, Icon } from 'native-base';
import { Formik } from 'formik';
import { StyledInput } from 'components/common/ComponentsCommon/StyledInput';
import ErrorInput from 'components/common/ComponentsCommon/ErrorInput';
import { TouchableOpacity } from 'react-native-gesture-handler';

const HeaderSearch = () => {
  return (
    <Header
      searchBar
      rounded
      style={{
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: 'white',
        borderBottomColor: 'white'
      }}
    >
      <Item style={{ backgroundColor: '#EEE', height: 40, borderRadius: 45 }}>
        <Formik initialValues={{ textSearch: '' }}>
          {({ touched, errors, ...formikProps }) => (
            <>
              <Icon name="ios-search" style={{ marginLeft: 4 }} />
              <StyledInput
                formikProps={formikProps}
                formikKey="search"
                placeholder="Looking your friends..."
                style={{ fontSize: 15 }}
              />
              {touched.password && errors.password ? (
                <ErrorInput text={errors.password} />
              ) : null}
              <TouchableOpacity>
                <Icon name="ios-people" style={{ marginRight: 8 }} />
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </Item>
    </Header>
  );
};

export default HeaderSearch;
