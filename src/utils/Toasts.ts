import Toast from 'react-native-toast-message';

export function showSuccessToast(message1: string, message2: string = '') {
  if (!message1) {
    message1 = 'Action Completed';
  }
  Toast.show({
    type: 'success',
    text1: message1,
    text2: message2,
  });
}

export function showErrorToast(message1: string, message2: string = '') {
  if (!message1) {
    message1 = 'Something went wrong.';
  }
  Toast.show({
    type: 'error',
    text1: message1,
    text2: message2,
  });
}
