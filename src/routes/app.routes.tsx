import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons, AntDesign  } from '@expo/vector-icons'

import ProductList from "../screens/ProductList";
import CategoryList from "../screens/CategoryList";
import ShoppingList from "../screens/ShoppingList";
import RegisterProduct from "../screens/RegisterProduct";
import SearchProductByCategory from "../screens/SearchProductByCategory";
import RegisterLocation from "../screens/RegisterLocation";

import { theme } from "../theme/theme";


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function getTabIcon( route, focused: boolean, color: string, size: number ) {
  let iconName: any;
  let iconSize = size;

  if (route.name === 'categoryList') {
    iconName = focused ? 'ios-home' : 'ios-home-outline';
  }
  else if (route.name === 'productList') {
    iconSize = iconSize + 5;
    iconName = focused ? 'search-circle-sharp' : 'search-circle-outline';
  }
  else if (route.name === 'registerProduct') {
    iconName = focused ? 'add-circle-sharp' : 'add-circle-outline';
  }
  else if (route.name === 'shoppingList') {
    return (<AntDesign name="shoppingcart" size={size} color={color} />);
  }

  return <Ionicons name={iconName} size={iconSize} color={color} />;
}

function getTabBarLabel(route) {
  if (route.name === 'categoryList') return "Início";
  if (route.name === 'productList') return "Busca";
  if (route.name === 'registerProduct') return "Adicionar";
  if (route.name === 'shoppingList') return "Listas";
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
          tabBarStyle: { paddingBottom: 5 }
        })}
      >
        <Tab.Screen name="categoryList" component={CategoryList} />
        <Tab.Screen name="registerProduct" component={RegisterProduct} />
        <Tab.Screen name="productList" component={ProductList} />
        <Tab.Screen name="shoppingList" component={ShoppingList} />
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
        <Stack.Screen
          name="registerLocation"
          component={RegisterLocation}
          options={{ headerShown: false }}
        />
        
      </Stack.Navigator>
  );
}