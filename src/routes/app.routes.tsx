import { createNativeStackNavigator } from "@react-navigation/native-stack";

import RegisterProduct from "../screens/RegisterProduct";


const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>    
      <Screen name="registerProduct" component={RegisterProduct} />
    </Navigator>
  )
}