/* eslint-disable react-native/no-inline-styles */
import {NavigationProp, useFocusEffect} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {CustomBottomButton} from '../../../components/CustomBottomButton';
import {CustomTextInput} from '../../../components/CustomInputText';
import {TextView} from '../../../components/TextView';
import {useLoginMutation} from '../../../redux/query/login/LoginApi';
import {ILogin, ILoginResponse} from '../../../redux/query/login/type';
import {setUserToken} from '../../../redux/slices/authSLice';
import {RootParamList} from '../../../routes/RootStackType';
import Constant from '../../../translation/Constants';
import {USER_TOKEN, storeDataAsync} from '../../../utils/AsyncStorage';
import {showErrorToast, showSuccessToast} from '../../../utils/Toasts';
import styles from './Styles';
import {ILoginFormValidationErrors, validateLoginForm} from './Validation';

type Props = {
  navigation: NavigationProp<RootParamList, 'Login'> & {
    replace: (name: keyof RootParamList, params?: object) => void;
  };
};

const LoginScreen = (props: Props) => {
  const {navigation} = props;
  const dispatch = useDispatch();
  const [loginForm, setLoginForm] = React.useState<ILogin>({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = React.useState(false);
  const [formValidationError, setFormValidationError] =
    React.useState<ILoginFormValidationErrors | null>(null);

  const [login, {isLoading}] = useLoginMutation();

  const handleSignUp = () => {
    navigation.navigate('Register');
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword' as never);
  };

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setLoginForm({email: '', password: ''});
      };
    }, []),
  );

  const handleLoginPress = async () => {
    const validationResponse: ILoginFormValidationErrors =
      validateLoginForm(loginForm);
    if (Object.keys(validationResponse).length === 0) {
      login({email: loginForm?.email, password: loginForm?.password})
        .unwrap()
        .then((res: ILoginResponse) => {
          console.log(res);
          if (res.status) {
            storeDataAsync(USER_TOKEN, res?.data.token, isStored => {
              if (isStored) {
                dispatch(setUserToken(res?.data.token));
                navigation.replace('authenticated' as never);
              }
            });
          }
          showSuccessToast('Login Successfully !!!');
        })
        .catch(error => {
          console.log(JSON.stringify(error));
          showErrorToast(error?.data?.message);
        });
    }

    setFormValidationError(validationResponse);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.titleViewStyle}>
          <TextView text={Constant.login} style={styles.headerText} />
        </View>
        <View style={{flex: 0.5}}>
          <CustomTextInput
            placeHolder={Constant.emailAddress}
            value={loginForm?.email}
            isEditable={true}
            keyboardType="email-address"
            returnKeyType={'next'}
            onChange={text => {
              setLoginForm({...loginForm, email: text as string});
            }}
            error={formValidationError?.email}
          />
          <CustomTextInput
            placeHolder={Constant.password}
            value={loginForm?.password}
            isEditable={true}
            secureTextEntry={!showPassword}
            showPassword={showPassword}
            icon
            onChange={text => {
              setLoginForm({...loginForm, password: text as string});
            }}
            returnKeyType={'done'}
            error={formValidationError?.password}
            onPressIcon={handleShowPassword}
          />
          <View style={styles.forgotView}>
            <TouchableOpacity onPress={handleForgotPassword}>
              <TextView
                text={Constant.forgotPassword}
                style={styles.forgotPassText}
              />
            </TouchableOpacity>
          </View>
          <CustomBottomButton
            onPress={handleLoginPress}
            text={Constant.login}
            style={styles.submitButtonText}
            displayLoading={isLoading}
          />
          <TouchableOpacity onPress={handleSignUp} style={styles.sigupView}>
            <TextView
              text={Constant.loginQuestion}
              style={styles.signupTextOne}
            />
            <TextView text={Constant.signUp} style={styles.signupTextTwo} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
