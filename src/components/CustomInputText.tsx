import React from 'react';
import {
  Image,
  KeyboardTypeOptions,
  ReturnKeyTypeOptions,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import IMAGES from '../assets/images';
import {TextView} from './TextView';
import COLORS from '../assets/Colors/colors';

interface CustomTextProps {
  value?: string | number;
  placeHolder: string;
  keyboardType?: KeyboardTypeOptions;
  icon?: boolean;
  isEditable?: boolean;
  onPressIcon?: () => void;
  onChange?: (text: string | number) => void;
  inputProps?: TextInputProps;
  blur?: () => void;
  focus?: () => void;
  returnKeyType: ReturnKeyTypeOptions | undefined;
  secureTextEntry?: boolean | undefined;
  textInputStyle?: StyleProp<TextStyle>;
  error?: string;
  showPassword?: boolean;
  maxLength?: number;
  multiline?: boolean;
}

export const CustomTextInput = (props: CustomTextProps): JSX.Element => {
  const {
    value,
    keyboardType,
    isEditable,
    icon,
    onPressIcon,
    onChange,
    placeHolder,
    returnKeyType,
    secureTextEntry,
    textInputStyle,
    error,
    showPassword,
    maxLength,
    multiline,
  } = props;
  const originRef = React.useRef<TextInput>();

  return (
    <View>
      <View style={styles.inputParentView}>
        <TextInput
          ref={originRef as never}
          placeholder={placeHolder}
          placeholderTextColor={'grey'}
          value={value as string}
          style={[styles.input, textInputStyle]}
          keyboardType={keyboardType || 'default'}
          editable={isEditable}
          onChangeText={onChange}
          returnKeyType={returnKeyType}
          secureTextEntry={secureTextEntry}
          multiline={multiline}
          maxLength={maxLength}
        />

        {icon && (
          <TouchableOpacity onPress={onPressIcon}>
            <Image
              source={showPassword ? IMAGES.icon_OpenEye : IMAGES.eye_icon}
              style={styles.iconStyle}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <TextView style={styles.errorMessage} text={error} />}
    </View>
  );
};

const styles = StyleSheet.create({
  inputParentView: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
    height: 52,
    backgroundColor: '#F7F8FA',
    justifyContent: 'space-between',
    borderRadius: 26,
    paddingHorizontal: 10,
  },
  input: {
    textAlignVertical: 'center',
    alignItems: 'center',
    flex: 1,
    color: COLORS.blackColor,
  },
  iconStyle: {height: 17, width: 17, marginRight: 8},
  errorMessage: {
    marginLeft: 20,
    color: '#cc0000',
    fontSize: 13,
  },
});
