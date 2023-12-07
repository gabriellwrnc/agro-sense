import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
    AuthParamList,
    FarmerHomeTabParamList,
    FarmerStackParamList,
    RootParamList,
} from './Navigators';

export type SignInProps = NativeStackScreenProps<
    AuthParamList & RootParamList,
    'SignIn'
>;

export type SignUpProps = NativeStackScreenProps<AuthParamList, 'SignUp'>;

export type FarmerHomeProps = NativeStackScreenProps<
    FarmerStackParamList & FarmerHomeTabParamList,
    'FarmerHome'
>;

export type FarmerConsultProps = NativeStackScreenProps<
    FarmerStackParamList,
    'FarmerConsult'
>;
