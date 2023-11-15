import React from 'react';
import {
  Image,
  KeyboardTypeOptions,
  Platform,
  ReturnKeyTypeOptions,
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import Images from '../assets/images/index';
import COLORS from '../assets/Colors/colors';

interface CustomTextProps {
  value?: string | number;
  placeHolder: string;
  keyboardType?: KeyboardTypeOptions;
  icon?: boolean;
  isEditable?: boolean;
  onPress?: () => void;
  onPressIcon?: () => void;
  onChange?: (text: string | number) => void;
  inputProps?: TextInputProps;
  blur?: () => void;
  focus?: () => void;
  returnKeyType: ReturnKeyTypeOptions | undefined;
}

export const CustomTextInput = (props: CustomTextProps): JSX.Element => {
  const {
    value,
    keyboardType,
    isEditable,
    icon,
    onPress,
    onPressIcon,
    onChange,
    placeHolder,
    returnKeyType,
  } = props;
  const originRef = React.useRef<TextInput>();

  return (
    <TouchableOpacity
      disabled={!onPress}
      onPress={onPress}
      style={styles.inputParentView}>
      <TextInput
        {...props.inputProps}
        ref={originRef as never}
        placeholder={placeHolder}
        placeholderTextColor={'grey'}
        value={value as string}
        style={styles.input}
        keyboardType={keyboardType || 'default'}
        editable={isEditable}
        onChangeText={onChange}
        returnKeyType={returnKeyType}
      />

      {icon && (
        <TouchableOpacity onPress={onPressIcon}>
          <Image
            source={Images.eye_icon}
            style={styles.iconStyle}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  style: {
    fontWeight: '400',
    fontSize: 20,
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
    backgroundColor: '#F4F4F4',
    color: '#F4F4F4',
    paddingVertical: Platform.OS === 'ios' ? 15 : 3,
    padding: 15,
    borderRadius: 26,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconStyle: {height: 17, width: 17, marginRight: 8},
});
