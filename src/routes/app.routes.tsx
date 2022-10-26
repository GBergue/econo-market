import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons'

import RegisterProduct from "../screens/RegisterProduct";
import Main from "../screens/Main";
import ProductList from "../screens/ProductList";
import CategoryList from "../screens/CategoryList";
import SearchProductByCategory from "../screens/SearchProductByCategory";

import { theme } from "../theme/theme";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function getTabIcon( route, focused, color, size ) {
  let iconName;

  if (route.name === 'categoryList') {
    iconName = focused ? 'ios-home' : 'ios-home-outline';
  }
  else if (route.name === 'productList') {
    iconName = focused ? 'list-circle-sharp' : 'list-circle-outline';
  }
  else if (route.name === 'registerProduct') {
    iconName = focused ? 'add-circle-sharp' : 'add-circle-outline';
  }

  return <Ionicons name={iconName} size={size} color={color} />;
}

function getTabBarLabel(route) {
  if (route.name === 'categoryList') return "Home";
  if (route.name === 'productList') return "Produto";  
  if (route.name === 'registerProduct') return "Adicionar";
}


export function AppRoutes() {
  const tabBarActiveTintColor = theme.colors.primary['400'];

  function TabNavigation() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => getTabIcon( route, focused, color, size ),
          tabBarActiveTintColor,
          tabBarInactiveTintColor: 'gray',
          tabBarLabel: getTabBarLabel(route),
          headerShown: false,
        })}
      >
        <Tab.Screen name="categoryList" component={CategoryList} />
        <Tab.Screen name="registerProduct" component={RegisterProduct} />
        <Tab.Screen name="productList" component={ProductList} />
      </Tab.Navigator>
    );
  }

  return (
    <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={TabNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="searchProductByCategory"
          component={SearchProductByCategory}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
  );
}