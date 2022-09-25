import { createNativeStackNavigator } from "@react-navigation/native-stack";

import RegisterProduct from "../screens/RegisterProduct";
import Main from "../screens/Main";
import ProductList from "../screens/ProductList";


const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>    
      <Screen name="registerProduct" component={RegisterProduct} />
      <Screen name="productList" component={ProductList} />
      <Screen name="main" component={Main} />
    </Navigator>
  )
}