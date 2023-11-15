import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthParamList, RootParamList } from "./Navigators";

export type SignInProps = NativeStackScreenProps<AuthParamList & RootParamList, 'SignIn'>;
export type SignUpProps = NativeStackScreenProps<AuthParamList, 'SignUp'>;