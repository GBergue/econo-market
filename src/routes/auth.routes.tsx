import { createNativeStackNavigator } from "@react-navigation/native-stack";

import RegisterProduct from "../screens/RegisterProduct";
import ForgotPassword from "../screens/ForgotPassword";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import Main from "../screens/Main";
import ProductList from "../screens/ProductList";


const { Navigator, Screen } = createNativeStackNavigator();

export function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="registerProduct" component={RegisterProduct} />
      <Screen name="productList" component={ProductList} />
      <Screen name="main" component={Main} />
      <Screen name="login" component={Login} />
      <Screen name="signup" component={SignUp} />
      <Screen name="forgotPassword" component={ForgotPassword} />
    </Navigator>
  )
}