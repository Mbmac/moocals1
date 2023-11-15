/* eslint-disable react-hooks/exhaustive-deps */
import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {TextView} from '../../../components/TextView';
import {setUserToken} from '../../../redux/slices/authSLice';
import {RootParamList} from '../../../routes/RootStackType';
import Constant from '../../../translation/Constants';
import {USER_TOKEN, readDataAsync} from '../../../utils/AsyncStorage';
import styles from './Styles';

type Props = {
  navigation: NavigationProp<RootParamList, 'Splash'> & {
    replace: (name: keyof RootParamList, params?: object) => void;
  };
};

const Splash = (props: Props) => {
  const {navigation} = props;

  const dispatch = useDispatch();

  const getToken = async () => {
    let data = await readDataAsync(USER_TOKEN);
    dispatch(setUserToken(data));
    return data;
  };
  React.useEffect(() => {
    getToken().then(data => {
      setTimeout(() => {
        if (data) {
          navigation.replace('authenticated');
        } else {
          navigation.replace('UnAuthenticatedStack');
        }
      }, 2000);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TextView text={Constant.appName} style={styles.title} />
      </View>
    </SafeAreaView>
  );
};

export default Splash;
