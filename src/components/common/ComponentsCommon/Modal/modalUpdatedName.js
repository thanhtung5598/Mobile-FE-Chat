import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { BlurView } from 'expo-blur';
import {
  Modal,
  View,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Formik } from 'formik';
import ErrorInput from 'components/common/ComponentsCommon/ErrorInput';
import { StyledInput } from 'components/common/ComponentsCommon/StyledInput';
import { Button, Text, Spinner } from 'native-base';

const defaultSchema = {
  name: Yup.string()
    .min(6, 'Characters >= 6')
    .max(32, 'Characters < 32')
    .required('Name is required')
};

const ModalCustom = (props, ref) => {
  const { isLoadingChangeName } = useSelector(state => state.dataUser);
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
          <Formik
            initialValues={{ name: '' }}
            validationSchema={Yup.object(defaultSchema)}
            {...props}
          >
            {({ touched, errors, ...formikProps }) => (
              <>
                <View style={styles.inputTextNew}>
                  {touched.name && errors.name ? (
                    <ErrorInput text={errors.name} />
                  ) : null}
                  <StyledInput
                    formikProps={formikProps}
                    formikKey="name"
                    placeholder="New name..."
                    value={formikProps.values.name}
                  />
                </View>
                <Button block onPress={formikProps.handleSubmit}>
                  {isLoadingChangeName && (
                    <Spinner color="white" size="small" />
                  )}
                  {!isLoadingChangeName && <Text>Save</Text>}
                </Button>
              </>
            )}
          </Formik>
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
    padding: 20,
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
