import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { View, Text } from 'native-base';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GroupContext } from 'components/common/context/GroupContext';

const HeaderChat = props => {
  const { currentGroup } = useContext(GroupContext);
  const { setChatOpen, setFooter, setAddMember } = props;
  const { users, name } = currentGroup;

  const handleChatClose = () => {
    setChatOpen(false);
    setFooter(true);
  };

  return (
    <View style={styles.rect}>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={handleChatClose}>
          <Ionicons name="md-arrow-back" size={24} style={styles.icon} />
        </TouchableOpacity>
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.time}>{users.length} members</Text>
        </View>
      </View>
      <View style={{ alignSelf: 'center', flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => setAddMember(true)}>
          <MaterialIcons name="group-add" size={32} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default HeaderChat;

HeaderChat.propTypes = {
  setChatOpen: PropTypes.func,
  setAddMember: PropTypes.func,
  currentGroup: PropTypes.objectOf(PropTypes.any),
  setFooter: PropTypes.func
};
HeaderChat.defaultProps = {
  setAddMember: () => {},
  setChatOpen: () => {},
  currentGroup: {},
  setFooter: () => {}
};

const styles = StyleSheet.create({
  rect: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: '15%',
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
