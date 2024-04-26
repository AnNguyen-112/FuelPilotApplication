import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import image from "./Assets/images/fuel-pilot-background.png"
import LoginButton from "./LoginButton";
// import LogoutButton from "./LogoutButton";
import Profile from "./Profile";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

import { FaArrowRight } from "react-icons/fa";

const LoginForm = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    <Wrapper>
    <section class="vh-100"
    style={{
      backgroundImage: `url(${image})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center center',
    }}>
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12 col-md-8 col-lg-6 col-xl-5">
            <div class="card bg-dark text-white">
              <div
                class="card-body p-4 text-center"
                style={{ "border-radius": "1rem;" }}
              >
                <div class="mb-md-5 mt-md-4 pb-5">
                  <h2 class="fw-bold mb-2 text-uppercase">Welcome</h2>
                  {!isAuthenticated && (
                  <p class="text-white-50 mb-5">
                    Please click below to get started!
                  </p>
                  )}
                  {/* <div class="form-outline form-white mb-4">
                    <input
                      type="email"
                      id="typeEmailX"
                      class="form-control form-control-lg"
                    />
                    <label class="form-label" for="typeEmailX">
                      Email
                    </label>
                  </div>
                  <div class="form-outline form-white mb-4">
                    <input
                      type="pass"
                      id="typePasswordX"
                      class="form-control form-control-lg"
                    />
                    <label class="form-label" for="typePasswordX">
                      Password
                    </label>
                  </div>
                  <p class="small mb-5 pb-lg-2">
                    <a class="text-white-50" href="#!">
                      Forgot password?
                    </a>
                  </p>
                  <button
                    class="btn btn-outline-light btn-lg px-5"
                    type="submit"
                  >
                    Login
                  </button> */}
                  <LoginButton />
                  <Profile />
                  {isAuthenticated && (
                  <div  >
                    <a href="/quote" className="link">
                    < FaArrowRight /> Click Here To Try Fuel Quote 
                    </a>
                  </div>
                  )}
                  {/* <LogoutButton /> */}
                </div>
                <div>
                  {/*<p class="mb-0">
                    Don't have an account?{" "}
                    <a href="#!" class="text-white-50 fw-bold">
                      Sign Up
                    </a>
                </p>*/}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </Wrapper>
  );
};

const Wrapper = styled.div`


.link {
  text-decoration: none; /* Removes underline from the link */
  color: white;
  font-size: 20px;
}
`;
export default LoginForm;
