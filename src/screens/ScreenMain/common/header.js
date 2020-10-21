import React from 'react';
import { StyleSheet } from 'react-native';
import { Header, Item, Icon, Input } from 'native-base';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

const HeaderSearch = props => {
  const {
    find,
    handleTurnBack,
    handleFind,
    handleChangeValue,
    userQuery
  } = props;

  return (
    <Header style={styles.headerStyle}>
      <Item style={styles.itemStyle}>
        {find ? (
          <TouchableOpacity onPress={handleTurnBack}>
            <Ionicons
              name="md-arrow-back"
              size={30}
              style={{ marginRight: 10, marginTop: 3 }}
            />
          </TouchableOpacity>
        ) : (
          <Icon name="ios-search" size={30} />
        )}
        <Input
          onFocus={handleFind}
          autoFocus={find}
          value={userQuery}
          onChangeText={handleChangeValue}
          formikKey="search"
          placeholder="Looking your friends..."
        />
        <TouchableOpacity>
          <Icon name="ios-people" />
        </TouchableOpacity>
      </Item>
    </Header>
  );
};

export default HeaderSearch;

HeaderSearch.propTypes = {
  find: PropTypes.bool,
  userQuery: PropTypes.string,
  setUserQuery: PropTypes.func,
  handleTurnBack: PropTypes.func,
  handleChangeValue: PropTypes.func,
  handleFind: PropTypes.func
};
HeaderSearch.defaultProps = {
  find: false,
  userQuery: '',
  setUserQuery: () => {},
  handleTurnBack: () => {},
  handleChangeValue: () => {},
  handleFind: () => {}
};

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
