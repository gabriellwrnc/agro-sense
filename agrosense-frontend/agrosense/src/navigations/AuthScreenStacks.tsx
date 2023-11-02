import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SignIn, SignUp } from "../screens";
import { AuthParamList } from "../types";

const AuthStack = createNativeStackNavigator<AuthParamList>();

const AuthScreenStacks = () => {
    return (
        <AuthStack.Navigator screenOptions={{ headerShown: false }}>
            <AuthStack.Screen name="SignIn" component={SignIn} />
            <AuthStack.Screen name="SignUp" component={SignUp} />
        </AuthStack.Navigator>
    )
}

export default AuthScreenStacks