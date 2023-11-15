import AsyncStorage from '@react-native-async-storage/async-storage';

export const USER_TOKEN = 'USER_TOKEN';

export const storeDataAsync = async (
  key: string,
  value: any,
  callBack: (isStored: boolean) => void,
) => {
  try {
    await AsyncStorage.setItem(key, value);
    callBack(true);
  } catch (e) {
    callBack(false);
  }
};

export const readDataAsync = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value) {
      return value;
    }
    return null;
  } catch (e) {
    return null;
  }
};

export const clearDataAsync = async (
  key: string,
  callBack: (isCleared: boolean) => void,
) => {
  try {
    await AsyncStorage.removeItem(key);
    callBack(true);
  } catch (e) {
    callBack(false);
  }
};
