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
import { Thumbnail, Button } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

const imaPrefix = 'https://api-ret.ml/api/v0/images/download/';

const ModalCustom = props => {
  const {
    visible,
    setVisible,
    info,
    setVisibleModalAction,
    positionModal
  } = props;

  const handleCloseModal = () => {
    setVisible(null);
  };
  const handleBackToActionModal = () => {
    setVisibleModalAction(positionModal);
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
          <Button
            transparent
            style={{
              position: 'absolute',
              paddingLeft: 15,
              paddingTop: 10,
              zIndex: 10
            }}
            onPress={handleBackToActionModal}
          >
            <Ionicons
              style={{
                color: '#ffa726'
              }}
              name="md-arrow-back"
              size={35}
              color="black"
            />
          </Button>
          <View style={styles.headerModal}>
            <Thumbnail
              large
              source={
                info.avatar
                  ? {
                      uri: `${imaPrefix}${info.avatar}`
                    }
                  : require('assets/avatarDefault.png')
              }
            />
            <Text style={{ fontSize: 16, fontWeight: '600' }}>{info.name}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontWeight: 'bold' }}>Phone: </Text>
            <Text>{info.phone || '...'}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontWeight: 'bold' }}>Email:&nbsp;&nbsp;&nbsp;</Text>
            <Text>{info.email || '........'}</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

ModalCustom.propTypes = {
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
  positionModal: PropTypes.number,
  setFooter: PropTypes.func,
  setVisibleModalAction: PropTypes.func,
  children: PropTypes.objectOf(PropTypes.any),
  info: PropTypes.objectOf(PropTypes.any)
};
ModalCustom.defaultProps = {
  visible: false,
  setVisible: () => {},
  positionModal: 0,
  setFooter: () => {},
  setVisibleModalAction: () => {},
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
