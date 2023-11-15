import React from 'react';
import {
  ActivityIndicator,
  Platform,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import {TextView} from './TextView';
import COLORS from '../assets/Colors/colors';

interface CustomTextProps {
  text: string;
  style: StyleProp<TextStyle>;
  onPress?: () => void;
  displayLoading?: boolean;
  loadingIndicatorSize?: number;
  startTrip?: boolean;
}

export const CustomBottomButton = (props: CustomTextProps): JSX.Element => {
  const {
    text,
    style,
    startTrip,
    onPress,
    displayLoading = false,
    loadingIndicatorSize = 30,
  } = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={startTrip ? styles.inputParentView : styles.inputActiveParentView}>
      {displayLoading ? (
        <ActivityIndicator
          size={loadingIndicatorSize}
          color={COLORS.whiteColor}
        />
      ) : (
        <TextView text={text} style={style} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  style: {
    fontWeight: '400',
    fontSize: 16,
    color: COLORS.blackColor,
  },

  input: {
    color: COLORS.blackColor,
    fontSize: 18,
    fontWeight: '500',
    textAlignVertical: 'center',
  },
  inputParentView: {
    flexDirection: 'row',
    backgroundColor: 'red',
    paddingVertical: Platform.OS === 'ios' ? 20 : 15,
    padding: 15,
    borderRadius: 26,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  inputActiveParentView: {
    flexDirection: 'row',
    backgroundColor: COLORS.parentColor,
    paddingVertical: Platform.OS === 'ios' ? 20 : 15,
    padding: 15,
    borderRadius: 26,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});
