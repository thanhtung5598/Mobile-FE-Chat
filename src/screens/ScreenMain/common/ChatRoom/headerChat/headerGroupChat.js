import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet } from 'react-native';
import { View, Text } from 'native-base';
import { Ionicons, MaterialIcons, Entypo, AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ModalOptionGroup from 'components/common/ComponentsCommon/Modal/modalOptionGroup';
import ModalUpdateRoomName from 'components/common/ComponentsCommon/Modal/modalUpdateRoomName';
import { updateRoomName, exitRoom } from 'actions/groupActions';

const HeaderChat = props => {
  const modalRef = useRef(null);
  const modalRefName = useRef(null);
  const dispatch = useDispatch();
  const { setChatOpen, setFooter, setAddMember } = props;
  const { currentGroup } = useSelector(state => state.groups);

  const handleChatClose = () => {
    setChatOpen(false);
    setFooter(true);
  };

  const onHandleSubmitAdd = value => {
    dispatch(updateRoomName(value, _id)).then(() => {
      modalRefName.current.toggleModal();
    });
  };

  const handleExitRoom = () => {
    currentGroup &&
      dispatch(exitRoom(currentGroup._id)).then(() => {
        handleChatClose();
      });
  };

  return (
    <View style={styles.rect}>
      <ModalOptionGroup ref={modalRef} handleExitRoom={handleExitRoom} />
      <ModalUpdateRoomName onSubmit={onHandleSubmitAdd} ref={modalRefName} />
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={handleChatClose}>
          <Ionicons name="md-arrow-back" size={24} style={styles.icon} />
        </TouchableOpacity>
        <View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.name}>{currentGroup && currentGroup.name}</Text>
            <TouchableOpacity
              onPress={() => modalRefName.current.toggleModal()}
            >
              <AntDesign
                style={{ marginLeft: 10 }}
                name="edit"
                size={20}
                color="black"
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.time}>
            {currentGroup && currentGroup.users.length} members
          </Text>
        </View>
      </View>
      <View style={{ alignSelf: 'center', flexDirection: 'row' }}>
        <View>
          <TouchableOpacity onPress={() => setAddMember(true)}>
            <MaterialIcons name="group-add" size={32} color="black" />
          </TouchableOpacity>
        </View>
        <View style={{ marginLeft: 15 }}>
          <TouchableOpacity onPress={() => modalRef.current.toggleModal()}>
            <Entypo name="dots-three-horizontal" size={28} color="black" />
          </TouchableOpacity>
        </View>
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
