import React, { useState, useImperativeHandle, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { BlurView } from 'expo-blur';
import { Modal, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { View, Text, ListItem, Spinner } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

const ModalCustom = (props, ref) => {
  const { isLoadingExit } = useSelector(state => state.groups);
  const [visible, setVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    toggleModal: () => {
      setVisible(!visible);
    }
  }));
  const handleCloseModal = () => setVisible(false);

  return (
    <Modal animationType="slide" transparent visible={visible}>
      <View style={styles.centeredView}>
        <TouchableWithoutFeedback onPress={handleCloseModal}>
          <BlurView
            style={{ ...StyleSheet.absoluteFill }}
            tint="dark"
            intensity={20}
          />
        </TouchableWithoutFeedback>
        <View style={styles.modalView}>
          <TouchableOpacity
            disabled={isLoadingExit}
            onPress={props.handleExitRoom}
          >
            <ListItem>
              <Text style={{ marginRight: 10 }}>
                <Ionicons name="md-exit" size={28} color="black" />
              </Text>
              <Text
                style={{
                  fontWeight: '500',
                  fontSize: 20,
                  width: 100
                }}
              >
                Exit Room
              </Text>
            </ListItem>
          </TouchableOpacity>
          {isLoadingExit && <Spinner size="small" />}
        </View>
      </View>
    </Modal>
  );
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
    width: '70%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  inputTextNew: {
    height: 60,
    borderBottomWidth: 0.5,
    borderBottomColor: '#AAA',
    marginBottom: 10
  }
});

export default forwardRef(ModalCustom);
ModalCustom.propTypes = {
  handleExitRoom: PropTypes.func
};
ModalCustom.defaultProps = {
  handleExitRoom: () => {}
};
