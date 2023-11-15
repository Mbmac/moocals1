import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, ScrollView, TouchableOpacity, View} from 'react-native';
import {CustomBottomButton} from '../../../components/CustomBottomButton';
import {CustomTextInput} from '../../../components/CustomInputText';
import {TextView} from '../../../components/TextView';

import {RootParamList} from '../../../routes/RootStackType';
import Constant from '../../../translation/Constants';
import styles from './Styles';
import {
  IRegisterFormValidationErrors,
  validateRegisterForm,
} from './Validation';
import {showErrorToast, showSuccessToast} from '../../../utils/Toasts';
import {IRegister, IRegisterResponse} from '../../../redux/query/Register/type';
import {useRegisterMutation} from '../../../redux/query/Register/RegisterApi';
import CountryCodeInput from '../../../components/CustomCountryCodeInput';
import CountryPicker, {CountryCode} from 'react-native-country-picker-modal';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

type Props = {
  navigation: NavigationProp<RootParamList, 'Register'> & {
    replace: (name: keyof RootParamList, params?: object) => void;
  };
};

export default function RegisterScreen(props: Props) {
  const {navigation} = props;
  const [registerForm, setRegisterForm] = React.useState<IRegister>({
    gender: '1',
    country_code: '91',
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [showCountryModal, setShowCountryModal] = React.useState(false);
  const [formValidationError, setFormValidationError] =
    React.useState<IRegisterFormValidationErrors | null>(null);
  const [register, {isLoading}] = useRegisterMutation();
  const [countryCode, setCountryCode] = React.useState<CountryCode>('US');
  const handleRegisterPress = async () => {
    const validationResponse: IRegisterFormValidationErrors =
      validateRegisterForm(registerForm);
    if (Object.keys(validationResponse).length === 0) {
      register(registerForm)
        .unwrap()
        .then((res: IRegisterResponse) => {
          if (res.status) {
            navigation.replace('Login' as never);
            showSuccessToast(res.message);
          }
        })
        .catch(error => {
          showErrorToast(error?.data?.message);
        });
    }
    setFormValidationError(validationResponse);
  };

  const handleIconPress = (field: string) => {
    switch (field) {
      case 'password':
        setShowPassword(!showPassword);
        break;
      case 'confirmPassword':
        setShowConfirmPassword(!showConfirmPassword);
        break;
      default:
        break;
    }
  };

  const handleFirstNameChange = (text: string | number) => {
    if (typeof text === 'string') {
      const formattedText = text.charAt(0).toUpperCase() + text.slice(1);
      setRegisterForm({...registerForm, first_name: formattedText});
    }
  };

  const handleLastNameChange = (text: string | number) => {
    if (typeof text === 'string') {
      const formattedText = text.charAt(0).toUpperCase() + text.slice(1);
      setRegisterForm({...registerForm, last_name: formattedText});
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={styles.outerContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <View style={styles.titleViewStyle}>
              <TextView text={Constant.register} style={styles.headerText} />
            </View>
            <View style={styles.header}>
              <CustomTextInput
                placeHolder={Constant.firstName}
                returnKeyType="next"
                value={registerForm?.first_name as string}
                onChange={handleFirstNameChange}
                error={formValidationError?.firstName}
                maxLength={45}
              />
              <CustomTextInput
                placeHolder={Constant.lastName}
                value={registerForm?.last_name as string}
                onChange={handleLastNameChange}
                returnKeyType="next"
                error={formValidationError?.lastName}
                maxLength={45}
              />
              <CustomTextInput
                value={registerForm?.email as string}
                placeHolder={Constant.emailAddress}
                onChange={e => {
                  setRegisterForm({...registerForm, email: e as string});
                }}
                returnKeyType="next"
                error={formValidationError?.email}
              />

              <CountryCodeInput
                error={formValidationError?.mobileNumber as string}
                keyBoardOptions="phone-pad"
                placeHolder={Constant.mobileNumber}
                leftText={'+' + registerForm?.country_code}
                onchange={(e: string) => {
                  setRegisterForm({...registerForm, phone_number: e as string});
                }}
                onPress={() => {
                  setShowCountryModal(true);
                }}
              />

              <View style={styles.autoMobileContainer}>
                <View style={styles.autoMobileView} />
                <TextView
                  text={'Automobile Information'}
                  style={styles.autoMobileText}
                />
                <View style={styles.indicator} />
              </View>

              <CustomTextInput
                placeHolder={Constant.make}
                value={registerForm?.make}
                onChange={e => {
                  setRegisterForm({...registerForm, make: e as string});
                }}
                returnKeyType="next"
                error={formValidationError?.make}
              />
              <CustomTextInput
                placeHolder={Constant.model}
                value={registerForm?.model}
                onChange={e => {
                  setRegisterForm({...registerForm, model: e as string});
                }}
                returnKeyType="next"
                error={formValidationError?.model}
              />
              <CustomTextInput
                placeHolder={Constant.year}
                value={registerForm?.year}
                onChange={e => {
                  setRegisterForm({...registerForm, year: e as number});
                }}
                keyboardType="number-pad"
                returnKeyType="next"
                error={formValidationError?.year?.toString()}
              />

              <CustomTextInput
                placeHolder={Constant.color}
                value={registerForm?.color}
                onChange={e => {
                  setRegisterForm({...registerForm, color: e as string});
                }}
                returnKeyType="next"
                error={formValidationError?.color}
              />
              <CustomTextInput
                placeHolder={Constant.condition}
                value={registerForm?.condition}
                onChange={e => {
                  setRegisterForm({...registerForm, condition: e as string});
                }}
                returnKeyType="next"
                error={formValidationError?.condition}
              />
              <CustomTextInput
                placeHolder={Constant.rideshareDriver}
                value={registerForm?.ride_share}
                onChange={e => {
                  setRegisterForm({...registerForm, ride_share: e as string});
                }}
                returnKeyType="next"
                error={formValidationError?.rideshareDriver}
              />
              <CustomTextInput
                placeHolder={Constant.drivingActivity}
                value={registerForm?.driver_activity}
                onChange={e => {
                  setRegisterForm({
                    ...registerForm,
                    driver_activity: e as string,
                  });
                }}
                returnKeyType="next"
                error={formValidationError?.describeDrivingActivity}
              />
              <CustomTextInput
                placeHolder={Constant.address}
                value={registerForm?.address}
                onChange={e => {
                  setRegisterForm({...registerForm, address: e as string});
                }}
                returnKeyType="next"
                error={formValidationError?.address}
              />

              <CustomTextInput
                placeHolder={Constant.password}
                value={registerForm?.password as string}
                secureTextEntry={!showPassword}
                onChange={e => {
                  setRegisterForm({...registerForm, password: e as string});
                }}
                icon
                returnKeyType="next"
                error={formValidationError?.password}
                onPressIcon={() => handleIconPress('password')}
                showPassword={showPassword}
              />
              <CustomTextInput
                placeHolder={Constant.confirmPassword}
                secureTextEntry={!showConfirmPassword}
                showPassword={showConfirmPassword}
                onPressIcon={() => handleIconPress('confirmPassword')}
                value={registerForm?.confirmPassword as string}
                onChange={e => {
                  setRegisterForm({
                    ...registerForm,
                    confirmPassword: e as string,
                  });
                }}
                icon
                returnKeyType="next"
                error={formValidationError?.confirmPassword}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
      <View style={styles.footer}>
        <CustomBottomButton
          onPress={handleRegisterPress}
          text={Constant.signUP}
          style={styles.submitButtonText}
          displayLoading={isLoading}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Login' as never);
          }}
          style={styles.sigUpView}>
          <TextView
            text={Constant.registerQuestion}
            style={styles.signUpTextOne}
          />
          <TextView text={Constant.logiN} style={styles.signUpTextTwo} />
        </TouchableOpacity>
      </View>
      <CountryPicker
        countryCode={countryCode}
        visible={showCountryModal}
        withCallingCode={true}
        withFlag={true}
        withFlagButton={false}
        onSelect={country => {
          setShowCountryModal(false);
          setRegisterForm({
            ...registerForm,
            country_code: country.callingCode[0],
          });
          setCountryCode(country.cca2);
        }}
      />
    </SafeAreaView>
  );
}
