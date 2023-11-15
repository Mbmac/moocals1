import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, SafeAreaView, TouchableOpacity, View} from 'react-native';
import {CustomBottomButton} from '../../../components/CustomBottomButton';
import {CustomTextInput} from '../../../components/CustomInputText';
import {TextView} from '../../../components/TextView';
import Constant from '../../../translation/Constants';
import styles from './Styles';
import {IForgotFormValidationErrors, validateForgotForm} from './Validation';
import {showErrorToast, showSuccessToast} from '../../../utils/Toasts';
import {useForgotMutation} from '../../../redux/query/ForgotPassword/Forgot';
import {
  IForgot,
  IForgotResponse,
} from '../../../redux/query/ForgotPassword/type';
import IMAGES from '../../../assets/images';

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  // const handleSignUp = () => {
  //   navigation.navigate('Register' as never);
  // };

  const [forgotFrom, setForgotForm] = React.useState<IForgot>({
    email: '',
  });
  const [formValidationError, setFormValidationError] =
    React.useState<IForgotFormValidationErrors | null>(null);

  const [forgot, {isLoading}] = useForgotMutation();

  const handleForgotPress = async () => {
    const validationResponse: IForgotFormValidationErrors =
      validateForgotForm(forgotFrom);
    forgot({email: forgotFrom?.email})
      .unwrap()
      .then((res: IForgotResponse) => {
        if (res.message === 'mail sent') {
          navigation.navigate('Login' as never);
          showSuccessToast(res?.message);
        }
      })
      .catch(error => {
        showErrorToast(error?.data?.message);
      });
    setFormValidationError(validationResponse);
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Image source={IMAGES.icon_back} resizeMode="contain" />
        </TouchableOpacity>
        <View style={styles.titleViewStyle}>
          <TextView text={Constant.ForgotPassword} style={styles.headerText} />
        </View>
        <View style={styles.header}>
          <CustomTextInput
            placeHolder={Constant.emailAddress}
            value={forgotFrom?.email}
            isEditable={true}
            keyboardType="email-address"
            returnKeyType={'next'}
            onChange={text => {
              setForgotForm({...forgotFrom, email: text as string});
            }}
            error={formValidationError?.email}
          />
          <CustomBottomButton
            displayLoading={isLoading}
            onPress={handleForgotPress}
            text={Constant.continue}
            style={styles.submitButtonText}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;
