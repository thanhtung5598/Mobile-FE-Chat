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
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ListItem } from 'native-base';

const ModalCustom = props => {
  const { idMess, visible, setVisible, onHandleRemoveMess } = props;

  const handleCloseModal = () => {
    setVisible(null);
  };

  return (
    <Modal animationType="fade" transparent visible={visible}>
      <View style={styles.centeredView}>
        <TouchableWithoutFeedback onPress={handleCloseModal}>
          <BlurView
            style={{ ...StyleSheet.absoluteFill }}
            tint="dark"
            intensity={20}
          />
        </TouchableWithoutFeedback>
        <View style={styles.modalView}>
          <TouchableOpacity onPress={() => onHandleRemoveMess(idMess)}>
            <ListItem>
              <Text style={{ marginRight: 10 }}>
                <AntDesign name="delete" size={28} color="black" />
              </Text>
              <Text
                style={{
                  fontWeight: '500',
                  fontSize: 20,
                  width: 300
                }}
              >
                Remove Mess
              </Text>
            </ListItem>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

ModalCustom.propTypes = {
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
  onHandleRemoveMess: PropTypes.func,
  idMess: PropTypes.string
};
ModalCustom.defaultProps = {
  visible: false,
  setVisible: () => {},
  onHandleRemoveMess: () => {},
  idMess: ''
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
    padding: 10,
    width: '80%',
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
    marginBottom: 8,
    alignItems: 'center'
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
