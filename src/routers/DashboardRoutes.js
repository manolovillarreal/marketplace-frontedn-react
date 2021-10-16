import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { DashboardScreen } from "../components/screens/DashboardScreen";
import { OrdersScreen } from "../components/screens/OrdersScreen";
import { QuoteScreen } from "../components/screens/QuoteScreen";
import { StockScreen } from "../components/screens/StockScreen";
import { SideBar } from "../components/ui/SideBar";
import { TopNavbar } from "../components/ui/TopNavbar";

export const DashboardRoutes = () => {
  return (
    <>
      <TopNavbar />
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <SideBar />
          <main className="col ms-5 pt-2">
            <Switch>
              <Route exact path="/dashboard" component={DashboardScreen} />
              <Route exact path="/cotizaciones" component={QuoteScreen} />
              <Route exact path="/ordenes" component={OrdersScreen} />
              <Route exact path="/inventario" component={StockScreen} />

              <Redirect to="/dashboard" />
            </Switch>
          </main>
        </div>
      </div>
    </>
  );
};
