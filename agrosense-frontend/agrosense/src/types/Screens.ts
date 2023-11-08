import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthParamList } from "./Navigators";

export type SignInProps = NativeStackScreenProps<AuthParamList, 'SignIn'>;
export type SignUpProps = NativeStackScreenProps<AuthParamList, 'SignUp'>;