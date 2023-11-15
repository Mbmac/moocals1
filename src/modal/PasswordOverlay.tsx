import React from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';
import {TextView} from '../components/TextView';
import {CustomTextInput} from '../components/CustomInputText';
import {CustomBottomButton} from '../components/CustomBottomButton';
import Constant from '../translation/Constants';
import {
  IChangePassword,
  IChangePasswordResponse,
} from '../redux/query/changePassword/type';
import {RootState} from '../redux/store';
import {useDispatch, useSelector} from 'react-redux';
import {setIsChangePasswordModal} from '../redux/slices/modalSlice';
import {useChangePasswordMutation} from '../redux/query/changePassword/ChangePasswordApi';
import {showErrorToast, showSuccessToast} from '../utils/Toasts';
import COLORS from '../assets/Colors/colors';

const PasswordOverlay = () => {
  const dispatch = useDispatch();

  const [changePasswordForm, setChangePasswordForm] =
    React.useState<IChangePassword>();
  const {isChangePasswordModal} = useSelector(
    (state: RootState) => state.modal,
  );
  const [showCurrentPassword, setShowCurrentPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleIconPress = (field: string) => {
    switch (field) {
      case 'currentPassword':
        setShowCurrentPassword(!showCurrentPassword);
        break;
      case 'newPassword':
        setShowNewPassword(!showNewPassword);
        break;
      case 'confirmPassword':
        setShowConfirmPassword(!showConfirmPassword);
        break;
      default:
        break;
    }
  };

  const [changePassword] = useChangePasswordMutation();

  const handleUpdatePress = () => {
    changePassword({
      old_password: changePasswordForm?.old_password,
      password: changePasswordForm?.password,
      password_confirmation: changePasswordForm?.password_confirmation,
    })
      .unwrap()
      .then((res: IChangePasswordResponse) => {
        console.log(res);

        if (res.status) {
          dispatch(setIsChangePasswordModal(!isChangePasswordModal));
          showSuccessToast(res.message);
        }
      })
      .catch(error => {
        showErrorToast(error?.data?.message);
      });
  };

  return (
    <Modal
      isVisible={isChangePasswordModal}
      onBackdropPress={() =>
        dispatch(setIsChangePasswordModal(!isChangePasswordModal))
      }
      onSwipeComplete={() =>
        dispatch(setIsChangePasswordModal(!isChangePasswordModal))
      }
      swipeDirection={['down']}
      style={styles.modal}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.modalContent}>
          <View style={styles.container}>
            <View style={styles.indicator} />
            <TextView text={Constant.changePassword} style={styles.title} />
            <View>
              <CustomTextInput
                placeHolder={Constant.currentPassword}
                returnKeyType="next"
                value={changePasswordForm?.old_password}
                secureTextEntry={!showCurrentPassword}
                onChange={text => {
                  setChangePasswordForm({
                    ...changePasswordForm,
                    old_password: text.toString(),
                  });
                }}
                icon
                showPassword={showCurrentPassword}
                onPressIcon={() => handleIconPress('currentPassword')}
              />
              <CustomTextInput
                placeHolder={Constant.newPassword}
                value={changePasswordForm?.password}
                secureTextEntry={!showNewPassword}
                returnKeyType="next"
                onChange={text => {
                  setChangePasswordForm({
                    ...changePasswordForm,
                    password: text.toString(),
                  });
                }}
                showPassword={showNewPassword}
                onPressIcon={() => handleIconPress('newPassword')}
                icon
              />
              <CustomTextInput
                placeHolder={Constant.confirmCurrentPassword}
                secureTextEntry={!showConfirmPassword}
                showPassword={showConfirmPassword}
                onPressIcon={() => handleIconPress('confirmPassword')}
                value={changePasswordForm?.password_confirmation}
                onChange={text => {
                  setChangePasswordForm({
                    ...changePasswordForm,
                    password_confirmation: text.toString(),
                  });
                }}
                returnKeyType="next"
                icon
              />
            </View>
            <View style={styles.footer}>
              <CustomBottomButton
                onPress={handleUpdatePress}
                text={Constant.save}
                style={styles.saveText}
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default PasswordOverlay;

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: COLORS.whiteColor,
    padding: 10,
    paddingHorizontal: 20,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  container: {backgroundColor: COLORS.whiteColor, gap: 10},
  indicator: {
    height: 6,
    width: '30%',
    alignSelf: 'center',
    backgroundColor: '#CBCBCB',
    borderRadius: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: 10,
  },
  saveText: {color: '#fff', fontFamily: 'Poppins-SemiBold', fontSize: 16},
  footer: {marginVertical: 20, marginTop: 30},
});
