import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import {TextView} from './TextView';
import COLORS from '../assets/Colors/colors';
type imageSelectorProps = {
  modalVisible?: boolean;
  onPressCameraButton?: () => void;
  onPressGalleryButton?: () => void;
  onPressModalClose?: () => void;
};
const ImageSelector = (props: imageSelectorProps) => {
  return (
    <Modal
      isVisible={props.modalVisible}
      onBackdropPress={props.onPressModalClose}
      backdropColor={'rgba(0, 0, 0, 0.8)'}
      backdropOpacity={0.5}>
      <View style={[style.modalOuterView, style.modalOuterViewCSS]}>
        <TextView
          text={'Please Select Your Profile Image'}
          style={style.selectImageText}
        />
        <View style={style.imageSelectionView}>
          <TouchableOpacity
            onPress={props.onPressCameraButton}
            style={style.cameraButton}>
            <TextView text={' Camera'} style={[style.optionText]} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={props.onPressGalleryButton}
            style={style.galleryButton}>
            <TextView text={'Gallery'} style={[style.optionText]} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const style = StyleSheet.create({
  modalOuterView: {
    borderRadius: 10,
    justifyContent: 'flex-end',
    width: '95%',
    alignSelf: 'center',
    padding: 20,
  },
  modalOuterViewCSS: {backgroundColor: COLORS.whiteColor, elevation: 3},
  selectImageText: {
    fontSize: 18,
    color: COLORS.blackColor,
    textAlign: 'center',
    marginBottom: 20,
  },
  imageSelectionView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  cameraButton: {
    backgroundColor: COLORS.whiteColor,
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    borderRadius: 10,
    width: '30%',
    borderRightColor: COLORS.parentColor,
    borderWidth: 2,
  },
  optionText: {fontSize: 14, color: COLORS.parentColor},
  galleryButton: {
    backgroundColor: COLORS.whiteColor,
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    borderRadius: 10,
    width: '30%',
    borderRightColor: COLORS.parentColor,
    borderWidth: 2,
  },
});

export default ImageSelector;
