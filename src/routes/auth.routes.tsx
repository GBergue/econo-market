import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ForgotPassword from "../screens/ForgotPassword";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";


const { Navigator, Screen } = createNativeStackNavigator();

export function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="login" component={Login} />
      <Screen name="signup" component={SignUp} />
      <Screen name="forgotpassword" component={ForgotPassword} />
    </Navigator>
  )
}