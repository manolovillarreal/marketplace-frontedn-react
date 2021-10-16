import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import { AuthContext } from "../../auth/AuthContext";
import { SideBarAdmin } from "./SideBarAdmin";
import { SideBarPublic } from "./SideBarPublic";
import { SideBarStore } from "./SideBarStore";
import { logout } from "../../actions/auth";
import { roles } from "../../types/types";

export const SideBar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const history = useHistory();
  const handleLogout = () => {
    logout(dispatch, history);
  };

  return (

      <div className="col-auto px-0">
        <div
          id="sidebar"
          className="collapse collapse-horizontal show border-end"
        >
          {!user.logged && <SideBarPublic />}
          {user.logged && user.role === roles.admin && <SideBarAdmin />}
          {user.logged && user.role === roles.store && <SideBarStore />}
          {user.logged && (
            <button onClick={handleLogout} className="btn text-danger mt-5">
              cerrar sesion
            </button>
          )}
        </div>
        
      </div>
  );
};
