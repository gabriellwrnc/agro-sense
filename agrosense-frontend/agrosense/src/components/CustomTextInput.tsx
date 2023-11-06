import { Pressable, TextInput } from 'react-native';
import { View } from 'react-native-ui-lib';
import { Colors, EmailIcon, FontFamily, FontSize } from '../configs';
import { CustomTextInputProps } from '../types';
import CustomText from './CustomText';

const CustomTextInput: React.FC<CustomTextInputProps> = ({
    placeholder,
    icon,
    editable,
    error,
    onBlur,
    onIconTouch,
    keyboardType,
    rightIcon,
    multiline,
    onChange,
    value,
    secureTextEntry,
}) => {
    return (
        <View style={{ gap: 2 }}>
            <View
                row
                centerV
                style={{
                    gap: 10,
                    borderWidth: 1,
                    borderColor: error
                        ? Colors.errorColor
                        : Colors.primaryColor,
                    padding: 10,
                    borderRadius: 6,
                }}>
                {icon}
                <TextInput
                    style={{
                        top: 3,
                        padding: 0,
                        width: '100%',
                        fontFamily: FontFamily.poppinsRegular,
                        fontSize: FontSize.md,
                    }}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    secureTextEntry={secureTextEntry}
                    editable={editable}
                    keyboardType={keyboardType}
                    multiline={multiline}
                    onChangeText={onChange}
                    value={value}
                />
                {rightIcon && (
                    <Pressable
                        style={{
                            position: 'absolute',
                            right: 14,
                            top: 14,
                        }}
                        onPress={onIconTouch}>
                        {rightIcon}
                    </Pressable>
                )}
            </View>
            {error && (
                <View style={{ left: 4 }}>
                    <CustomText
                        text={error.toString()}
                        color="errorColor"
                        fontFamily="reemkufiRegular"
                        fontSize="sm"
                    />
                </View>
            )}
        </View>
    );
};

export default CustomTextInput;
