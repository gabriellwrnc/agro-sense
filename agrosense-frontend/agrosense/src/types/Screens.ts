import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
    AdminHomeDrawerParamList,
    AdminStackParamList,
    AuthParamList,
    FarmerHomeTabParamList,
    FarmerStackParamList,
    RootParamList,
} from './Navigators';
import { DrawerScreenProps } from '@react-navigation/drawer';

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

export type FarmerConsultResultProps = NativeStackScreenProps<
    FarmerStackParamList & FarmerHomeTabParamList,
    'FarmerConsultResult'
>;

export type AdminHomeProps = DrawerScreenProps<
    AdminStackParamList & AdminHomeDrawerParamList,
    'AdminHomeScreen'
>;

export type AdminAddPestProps = NativeStackScreenProps<
    AdminStackParamList,
    'AdminAddPestScreen'
>;

export type AdminAddPestSymptomWeightProps = NativeStackScreenProps<
    AdminStackParamList,
    'AdminAddPestSymptomWeightScreen'
>;

export type AdminAddPestImageProps = NativeStackScreenProps<
    AdminStackParamList,
    'AdminAddPestImageScreen'
>;

export type AdminCaseDetailProps = NativeStackScreenProps<
    AdminStackParamList,
    'AdminCaseDetailScreen'
>;

export type AdminVerifyCaseProps = NativeStackScreenProps<
    AdminStackParamList,
    'AdminVerifyCaseScreen'
>;

export type AdminVerifyCaseSymptomWeightProps = NativeStackScreenProps<
    AdminStackParamList,
    'AdminVerifyCaseSymptomWeightScreen'
>;

export type AdminUserDetailScreen = NativeStackScreenProps<
    AdminStackParamList,
    'AdminUserDetailScreen'
>;
