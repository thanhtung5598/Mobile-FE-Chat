import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { StyleSheet } from 'react-native';
import { View, Text } from 'native-base';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const HeaderChat = props => {
  const { setChatOpen, setFooter } = props;
  const { currentSingleGroup } = useSelector(state => state.groups);
  const { name } = currentSingleGroup;

  const handleChatClose = () => {
    setChatOpen(false);
    setFooter(true);
  };

  return (
    <>
      <View
        style={
          Platform.OS === 'android'
            ? { ...styles.rect }
            : { ...styles.rect, paddingTop: '15%' }
        }
      >
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={handleChatClose}>
            <Ionicons name="md-arrow-back" size={24} style={styles.icon} />
          </TouchableOpacity>
          <View>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.time}>Vừa mới truy cập</Text>
          </View>
        </View>
        <View style={{ alignSelf: 'center' }}>
          <TouchableOpacity>
            <Entypo name="dots-three-horizontal" size={28} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
export default HeaderChat;

HeaderChat.propTypes = {
  setChatOpen: PropTypes.func,
  setFooter: PropTypes.func
};
HeaderChat.defaultProps = {
  setChatOpen: () => {},
  setFooter: () => {}
};

const styles = StyleSheet.create({
  rect: {
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  icon: {
    fontSize: 30,
    marginRight: 20
  },
  name: {
    fontSize: 18,
    fontWeight: '500'
  },
  time: {
    fontSize: 10
  }
});
