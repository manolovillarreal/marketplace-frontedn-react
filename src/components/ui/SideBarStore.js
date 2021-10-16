import React from "react";
import { NavLink } from "react-router-dom";

export const SideBarStore = () => {

  return (

        <div
          id="sidebar-nav"
          className="list-group border-0 rounded-0 text-sm-start min-vh-100"
        >
          <NavLink
            className="list-group-item border-end-0 d-inline-block text-truncate"
            activeClassName="active"
            exact
            to="/dashboard"
          >
            <span>Dashboard</span>
          </NavLink>
          <NavLink
            className="list-group-item border-end-0 d-inline-block text-truncate"
            activeClassName="active"
            exact
            to="/cotizaciones"
          >
            <span>Cotizaciones</span>
          </NavLink>
          <NavLink
            className="list-group-item border-end-0 d-inline-block text-truncate"
            activeClassName="active"
            exact
            to="/ordenes"
          >
            <span>Ordenes</span>
          </NavLink>
          <NavLink
            className="list-group-item border-end-0 d-inline-block text-truncate"
            activeClassName="active"
            exact
            to="/inventario"
          >
            <span>Inventario</span>
          </NavLink>
          
        </div>
  );
};
