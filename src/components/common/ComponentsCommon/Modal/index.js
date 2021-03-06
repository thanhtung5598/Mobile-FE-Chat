import React from 'react';
import PropTypes from 'prop-types';
import { BlurView } from 'expo-blur';
import {
  Modal,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Text
} from 'react-native';
import { Button } from 'native-base';

const ModalCustom = props => {
  const {
    visible,
    setVisible,
    info,
    handleDeletedFriend,
    handleToggleModalInfo,
    positionModal
  } = props;

  const handleCloseModal = () => {
    setVisible(null);
  };

  return (
    <Modal animationType="none" transparent visible={visible}>
      <View style={styles.centeredView}>
        <TouchableWithoutFeedback onPress={handleCloseModal}>
          <BlurView
            style={{ ...StyleSheet.absoluteFill }}
            tint="dark"
            intensity={20}
          />
        </TouchableWithoutFeedback>
        <View style={styles.modalView}>
          <View style={styles.headerModal}>
            <Text style={styles.headerModalText}>{info.name}</Text>
          </View>
          <Button
            block
            success
            style={{ marginBottom: 10 }}
            onPress={() => handleToggleModalInfo(positionModal)}
          >
            <Text>View Info</Text>
          </Button>
          <Button block warning onPress={() => handleDeletedFriend(info.id)}>
            <Text>Remove friend</Text>
          </Button>
        </View>
      </View>
    </Modal>
  );
};

ModalCustom.propTypes = {
  visible: PropTypes.bool,
  positionModal: PropTypes.number,
  setVisible: PropTypes.func,
  handleDeletedFriend: PropTypes.func,
  handleToggleModalInfo: PropTypes.func,
  setFooter: PropTypes.func,
  children: PropTypes.objectOf(PropTypes.any),
  info: PropTypes.objectOf(PropTypes.any)
};
ModalCustom.defaultProps = {
  visible: false,
  positionModal: 0,
  setVisible: () => {},
  handleDeletedFriend: () => {},
  handleToggleModalInfo: () => {},
  setFooter: () => {},
  children: {},
  info: {}
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '60%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  headerModal: {
    borderBottomColor: '#BBB',
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 8
  },
  headerModalText: {
    fontSize: 25,
    fontWeight: '500',
    paddingBottom: 8
  },
  viewProfile: {
    fontSize: 18,
    marginBottom: 8
  },
  actionFriend: {
    fontSize: 18,
    marginBottom: 8
  }
});

export default ModalCustom;
