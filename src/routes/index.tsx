import { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";
import AuthContext from "../context/AuthContext";

export default function Routes() {
  const { isAuthenticated }  = useContext(AuthContext);


  return (
    <NavigationContainer>
      {isAuthenticated ? < AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  )
}