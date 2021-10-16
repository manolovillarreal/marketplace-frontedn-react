import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch,Route } from "react-router-dom";
import { startChecking } from "../actions/auth";
import { AuthContext } from "../auth/AuthContext";
import { LoginScreen } from "../components/screens/LoginScreen";
import { DashboardRoutes } from "./DashboardRoutes";
// import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {

  const {user,dispatch} = useContext(AuthContext)

  useEffect(() => {
    startChecking(dispatch);
  }, [dispatch])
 
  return (
    <Router>
      <div>
        <Switch>
            <PublicRoute 
              exact 
              path="/login" 
              component={LoginScreen} 
              isAuthenticated={user.logged}
              />

            <Route 
              path="/" 
              component={DashboardRoutes} 
              />
        </Switch>
      </div>
    </Router>
  );
};
