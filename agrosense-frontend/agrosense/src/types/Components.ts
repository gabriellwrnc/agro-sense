import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FormikErrors } from 'formik';
import { NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';
import { AuthParamList, RootParamList } from './Navigators';

export type ScreenLayoutProps = {
    children: React.ReactNode;
    backgroundColor: 'secondary' | 'light' | 'dark';
    testId?: string;
    center?: boolean;
    spread?: boolean;
    start?: boolean;
    flex?: boolean;
    padding?: number;
};

export type CustomTextProps = {
    text: any;
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
        | 'poppinsRegular'
        | 'poppinsMediumItalic';
    fontSize:
        | 'xxxs'
        | 'xs'
        | 'sm'
        | 'ssm'
        | 'md'
        | 'lg'
        | 'xl'
        | 'xl1'
        | 'xl2'
        | 'xxl'
        | 'xxxl';
    color:
        | 'primaryColor'
        | 'secColor'
        | 'bgColor'
        | 'errorColor'
        | 'boldSuccessColor'
        | 'greyColor'
        | 'ligthTextColor'
        | 'secLigthTextColor'
        | 'primaryLightColor';
    ellipsizeMode?: boolean;
    alignCenter?: boolean;
    textAlign?: 'left' | 'right' | 'center' | 'justify';
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
};

export type CustomButtonProps = {
    text: string;
    disable?: boolean;
    type: 'primary' | 'secondary';
    onPress: () => void;
    isSubmitting?: boolean;
};

export type FormSignInProps = {
    navigation: NativeStackNavigationProp<
        AuthParamList & RootParamList,
        'SignIn',
        undefined
    >;
};

export type FormSignUpProps = {
    navigation: NativeStackNavigationProp<AuthParamList, 'SignUp', undefined>;
};

export type CarouselHomeProps = {
    imageUrls: string[];
};

export type AdminCardDataProps = {
    title: string;
    totalData: number;
    onPress: () => void;
};
