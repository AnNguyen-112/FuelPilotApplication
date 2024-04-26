import React from "react";
import styled from "styled-components";
import { FaSignInAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import LogoutButton from "./LogoutButton";


const NavBar = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    <Wrapper>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <NavLink className="nav-link text-light" aria-current="page" to="/">
            <h3>Fuel Pilot</h3>
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-lg-0">
              {/* <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/">
                  Home
                </NavLink>
              </li> */}
              {isAuthenticated && (
                <li className="nav-item">
                  <NavLink className="nav-link" aria-current="page" to="/quote">
                    Quote Form
                  </NavLink>
                </li>
              )}
              {isAuthenticated && (
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    aria-current="page"
                    to="/history"
                  >
                    Quote History
                  </NavLink>
                </li>
              )}
              {isAuthenticated && (
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    aria-current="page"
                    to="/profile"
                  >
                    Profile
                  </NavLink>
                </li>
              )}
              <li>
                <div>
                </div>
              </li>
            </ul>
            {isAuthenticated && (             
              <div className="nav-item mb-2 mb-lg-0 p-2 d-flex align-items-center">
                <p className="m-0 ps-1 text-light">
                  <LogoutButton />
                </p>
              </div>)}
            {/*SENDING USER EMAIL INTO THE BACKEND*/}
            {isAuthenticated && (             
              <div className="nav-item mb-2 mb-lg-0 p-2 d-flex align-items-center">
                
                {user?.picture && (
                  
                  <img
                    src={user.picture}
                    alt={user?.name}
                    style={{ width: "30px", height: "auto" }}
                  />
                )}
                <p className="m-0 ps-1 text-light">
                  Welcome back, {user?.name}
                </p>
                

              </div>
            )}
          </div>
        </div>
      </nav>
    </Wrapper>
  );
};
const Wrapper = styled.div``;
export default NavBar;
