import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FormikErrors } from "formik";
import { NativeSyntheticEvent, TextInputFocusEventData } from "react-native";
import { AuthParamList } from "./Navigators";

export type ScreenLayoutProps = {
    children: React.ReactNode;
    backgroundColor: 'secondary' | 'light' | 'dark';
    testId?: string;
    center?: boolean;
    spread?: boolean;
    start?: boolean;
    flex?: boolean;
    padding?: number;
}

export type CustomTextProps = {
    text: string;
    fontFamily:
    | 'reemkufiBold'
    | 'reemkufiSemiBold'
    | 'reemkufiMedium'
    | 'reemkufiRegular'
    | 'poppinsExtraBold'
    | 'poppinsBold'
    | 'poppinsBoldItalic'
    | 'poppinsSemiBold'
    | 'poppinsMedium'
    | 'poppinsRegular';
    fontSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xl1' | 'xl2' | 'xxl' | 'xxxl';
    color: 'primaryColor' | 'secColor' | 'bgColor' | 'errorColor' | 'greyColor';
};

export type CustomTextInputProps = {
    placeholder: string;
    icon: React.JSX.Element;
    rightIcon?: React.JSX.Element;
    onChange?: (e: string) => void;
    onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
    onIconTouch?: () => void;
    onPress?: () => void;
    editable?: boolean;
    secureTextEntry?: boolean;
    error?:
    | string
    | false
    | string[]
    | FormikErrors<any>
    | FormikErrors<any>[]
    | boolean
    | Date;
    value?: string;
    multiline?: boolean;
    rightIconTestId?: string;
    keyboardType?:
    | 'default'
    | 'number-pad'
    | 'decimal-pad'
    | 'numeric'
    | 'email-address'
    | 'phone-pad';
    fullBorder?: boolean;
}

export type CustomButtonProps = {
    text: string;
    color?: 'primaryColor' | 'secColor' | 'bgColor' | 'errorColor' | 'greyColor';
    type: 'primary' | 'secondary';
    onPress: () => void;
    isSubmitting?: boolean;
}

export type FormSignInProps = {
    navigation: NativeStackNavigationProp<AuthParamList, "SignIn", undefined>
}