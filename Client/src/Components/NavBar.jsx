import React from 'react'
import styled from "styled-components";
import { FaSignInAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <Wrapper>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
      <NavLink className="nav-link text-light" aria-current="page" to ="/">
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
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to ="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
            <NavLink className="nav-link" aria-current="page" to ="/quote">
                Quote Form
              </NavLink>
            </li>
            <li className="nav-item">
            <NavLink className="nav-link" aria-current="page" to ="/history">
                Quote History
              </NavLink>
            </li>
            <li className="nav-item">
            <NavLink className="nav-link" aria-current="page" to ="/profile">
                Profile
              </NavLink>
            </li>
          </ul>

          <div className="nav-item mb-2 mb-lg-0 p-2">
            <NavLink to="/register" className="btn btn-outline-light">
                <FaSignInAlt /> Register
            </NavLink>
          </div>

          <div>
            <form className="mb-lg-0 col align-self-center">
              <input
                className="form-control form-control-lg "
                type="search"
                placeholder="Search..."
                aria-label="Search"
              />
            </form>
          </div>
        </div>
      </div>
    </nav>
  </Wrapper>
  )
}
const Wrapper = styled.div``;
export default NavBar