import React from 'react';
import {
  ImageSourcePropType,
  ImageStyle,
  KeyboardTypeOptions,
  TextInput as ReactTextInput,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {TextView} from './TextView';
import COLORS from '../assets/Colors/colors';

type ITextInput = {
  placeHolder?: string;
  value?: string;
  style?: StyleProp<TextStyle>;
  leftIcon?: ImageSourcePropType;
  rightIcon?: ImageSourcePropType;
  iconStyle?: StyleProp<ImageStyle>;
  keyBoardOptions?: KeyboardTypeOptions;
  onchange?: (e: string) => void;
  error?: string;
  viewStyle?: StyleProp<ViewStyle>;
  leftText?: string;
  onPress?: () => void;
  isEditable?: boolean;
  countryCodeText?: StyleProp<TextStyle>;
};
export default function CountryCodeInput(props: ITextInput) {
  function customStyleTextInput() {
    if (!props.leftIcon || !props.rightIcon) {
      return {flex: 1, paddingLeft: 10, paddingRight: 10};
    }
  }

  return (
    <View style={styles.outerContainer}>
      <View style={[styles.container]}>
        <TouchableOpacity style={styles.button} onPress={props.onPress}>
          <TextView
            text={props.leftText}
            style={[styles.leftText, props.countryCodeText]}
          />
        </TouchableOpacity>
        <ReactTextInput
          editable={props.isEditable}
          keyboardType={props.keyBoardOptions}
          placeholder={props?.placeHolder}
          value={props?.value}
          style={[styles.textInput, customStyleTextInput(), props.style]}
          placeholderTextColor={'grey'}
          onChangeText={props.onchange}
        />
      </View>
      {props.error && (
        <TextView text={props.error} style={styles.errorMessage} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: COLORS.whiteColor,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F8FA',
    borderRadius: 26,
    paddingHorizontal: 7,
    justifyContent: 'center',
    height: 52,
    margin: 5,
  },
  icon: {height: 20, width: 20, alignSelf: 'center'},
  textInput: {
    flex: 0.8,
    color: COLORS.blackColor,
    paddingVertical: 0,
    paddingHorizontal: 0,
    textAlign: 'left',
    paddingTop: 3.5,
    left: 5,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  errorMessage: {
    marginLeft: 20,
    paddingRight: 20,
    marginTop: 8,
    color: '#cc0000',
    fontSize: 13,
  },
  leftText: {
    fontSize: 13,
    color: 'grey',
    paddingVertical: 0,
    paddingHorizontal: 0,
    textAlign: 'left',
    left: 6,
    marginTop: 3,
  },
  button: {
    justifyContent: 'center',
  },
  arrowIcon: {height: 9.5, width: 12.1, left: 13, top: 2},
});
