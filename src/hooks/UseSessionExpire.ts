import {Alert} from 'react-native';

type UseSessionExpireProps = {
  handleOnPress: () => void;
  sessionExpire?: boolean;
};

export function useSessionExpire(props: UseSessionExpireProps) {
  const {handleOnPress, sessionExpire} = props;
  if (sessionExpire) {
    Alert.alert(
      'Session Expired',
      'Your session has expired. Please log in again.',
      [
        {
          text: 'OK',
          onPress: () => {
            handleOnPress();
          },
        },
      ],
    );
  }
}
