import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import image from "./Assets/images/fuel-pilot-background.png";
import { useAuth0 } from "@auth0/auth0-react";

import {
  MDBCol,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBContainer,
  MDBBtn,
} from "mdb-react-ui-kit";
const ProfileManagement = () => {
  const { user, isAuthenticated } = useAuth0();
  const userEmail = isAuthenticated && user?.email;
  const [profileUpdated, setProfileUpdated] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  //Checking if user already has a profile
  useEffect(() => {
    if (isAuthenticated && user?.email) {
      const fetchData = async () => {
        try
        {
           const response = await fetch(
          `http://localhost:3500/userProfile?userEmail=${userEmail}`
        );
        if (!response.ok) {
          throw new Error("Fail to fetch Data");
        }
        const data = await response.json();
        if(data){
          setProfileData(data);
          setProfileUpdated(true);
          reset(data);
        }else{
          setProfileData(null);
          setProfileUpdated(false);
        }
      }
      catch(error){
          setProfileData(null);
          setProfileUpdated(false);
      }
        }
       fetchData();
    }
  },[user, isAuthenticated, reset]);
  // const userEmail = isAuthenticated && user?.email;
  const onSubmit = (data) => {
    fetch("http://localhost:3500/userProfile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setProfileUpdated(true);
        setProfileData(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const handleEditProfile = () => {
    setProfileUpdated(false);
    reset(profileData);
  };
  if (profileUpdated) {
    return (
      <section
        //Centering items
        className="vh-100 d-flex justify-content-center align-items-center"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
        }}
      >
        <MDBContainer>
          <MDBRow className="justify-content-center">
            <MDBCol md="12" lg="12" xl="12">
              <MDBCard className="mb-4">
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Full Name</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {profileData.fullName}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Address</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {" "}
                        {profileData.address1}
                        {profileData.address2 && `, ${profileData.address2}`}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>City</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {profileData.city}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>State</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {" "}
                        {profileData.state}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>ZipCode</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {" "}
                        {profileData.zipCode}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
                <MDBBtn onClick={handleEditProfile}>Edit Profile</MDBBtn>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    );
  } else {
    return (
      <section
        className="vh-100"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
        }}
      >
        <div className="container py-5 h-50">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card bg-dark text-white"
                style={{ width: "30rem" }}
              >
                <div
                  className="card-body p-3 text-center"
                  style={{ "border-radius": "1rem;" }}
                >
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-md-5 mt-md-4 pb-5">
                      <h2 className="fw-bold mb-2 text-uppercase">Profile</h2>
                      <p className="text-white-50 mb-5">
                        Please enter your profile information!
                      </p>
                      {/* NAME INPUT */}
                      <div className="form-outline form-white mb-4">
                        <input
                          type="hidden"
                          id="userEmail"
                          {...register("userEmail", { required: true })}
                          defaultValue={userEmail}
                        />
                        <input
                          type="text"
                          id="fullName"
                          className="form-control form-control-lg"
                          {...register("fullName", {
                            required: true,
                            maxLength: 50,
                          })}
                        />
                        <label className="form-label" for="fullName">
                          Name
                        </label>
                        {errors.fullName?.type === "required" && (
                          <p className="text-danger">Name is required.</p>
                        )}
                        {errors.fullName?.type === "maxLength" && (
                          <p className="text-danger">
                            Your name should have at max 50 characters.
                          </p>
                        )}
                      </div>
                      {/* ADDRESS INPUT */}
                      <div className="form-outline form-white mb-4">
                        <input
                          type="text"
                          id="address1"
                          className="form-control form-control-lg"
                          {...register("address1", {
                            required: true,
                            maxLength: 100,
                          })}
                        />
                        {errors.address1?.type === "required" && (
                          <p className="text-danger">Address is required.</p>
                        )}
                        {errors.address1?.type === "maxLength" && (
                          <p className="text-danger">
                            Your address should have at max 100 characters.
                          </p>
                        )}
                        <label className="form-label" for="address1">
                          Address 1
                        </label>
                      </div>
                      <div className="form-outline form-white mb-4">
                        <input
                          type="text"
                          id="address2"
                          className="form-control form-control-lg"
                          {...register("address2", {
                            maxLength: 100,
                          })}
                        />

                        {errors.address2?.type === "maxLength" && (
                          <p className="text-danger">
                            Your address should have at max 100 characters.
                          </p>
                        )}
                        <label className="form-label" for="address2">
                          Address 2
                        </label>
                      </div>
                      {/* CITY INPUT */}
                      <div className="form-outline form-white mb-4">
                        <input
                          type="text"
                          id="city"
                          className="form-control form-control-lg"
                          {...register("city", {
                            required: true,
                            maxLength: 100,
                          })}
                        />
                        <label className="form-label" for="city">
                          City
                        </label>
                        {errors.city?.type === "required" && (
                          <p className="text-danger">City is required.</p>
                        )}
                        {errors.city?.type === "maxLength" && (
                          <p className="text-danger">
                            City should be at max 100 characters.
                          </p>
                        )}
                      </div>
                      {/* STATE INPUT */}
                      <div className="form-outline form-white mb-4">
                        <select
                          id="state"
                          className="form-control form-control-lg"
                          {...register("state", { required: true })}
                          defaultValue=""
                        >
                          <option value="" disabled>
                            Choose...
                          </option>
                          <option value="AK">Alaska</option>
                          <option value="AL">Alabama</option>
                          <option value="AR">Arkansas</option>
                          <option value="AZ">Arizona</option>
                          <option value="CA">California</option>
                          <option value="CO">Colorado</option>
                          <option value="CT">Connecticut</option>
                          <option value="DC">District of Columbia</option>
                          <option value="DE">Delaware</option>
                          <option value="FL">Florida</option>
                          <option value="GA">Georgia</option>
                          <option value="HI">Hawaii</option>
                          <option value="IA">Iowa</option>
                          <option value="ID">Idaho</option>
                          <option value="IL">Illinois</option>
                          <option value="IN">Indiana</option>
                          <option value="KS">Kansas</option>
                          <option value="KY">Kentucky</option>
                          <option value="LA">Louisiana</option>
                          <option value="MA">Massachusetts</option>
                          <option value="MD">Maryland</option>
                          <option value="ME">Maine</option>
                          <option value="MI">Michigan</option>
                          <option value="MN">Minnesota</option>
                          <option value="MO">Missouri</option>
                          <option value="MS">Mississippi</option>
                          <option value="MT">Montana</option>
                          <option value="NC">North Carolina</option>
                          <option value="ND">North Dakota</option>
                          <option value="NE">Nebraska</option>
                          <option value="NH">New Hampshire</option>
                          <option value="NJ">New Jersey</option>
                          <option value="NM">New Mexico</option>
                          <option value="NV">Nevada</option>
                          <option value="NY">New York</option>
                          <option value="OH">Ohio</option>
                          <option value="OK">Oklahoma</option>
                          <option value="OR">Oregon</option>
                          <option value="PA">Pennsylvania</option>
                          <option value="PR">Puerto Rico</option>
                          <option value="RI">Rhode Island</option>
                          <option value="SC">South Carolina</option>
                          <option value="SD">South Dakota</option>
                          <option value="TN">Tennessee</option>
                          <option value="TX">Texas</option>
                          <option value="UT">Utah</option>
                          <option value="VA">Virginia</option>
                          <option value="VT">Vermont</option>
                          <option value="WA">Washington</option>
                          <option value="WI">Wisconsin</option>
                          <option value="WV">West Virginia</option>
                          <option value="WY">Wyoming</option>
                        </select>
                        <label className="form-label" for="state">
                          State
                        </label>
                        {errors.state?.type === "required" && (
                          <p className="text-danger">State is required.</p>
                        )}
                      </div>
                      {/* ZIPCODE INPUT */}
                      <div className="form-outline form-white mb-4">
                        <input
                          type="text"
                          id="zipCode"
                          className="form-control form-control-lg"
                          {...register("zipCode", {
                            required: true,
                            minLength: 5,
                            maxLength: 9,
                          })}
                        />
                        <label className="form-label" for="zipCode">
                          ZIP code
                        </label>
                        {errors.zipCode?.type === "required" && (
                          <p className="text-danger">Zipcode is required.</p>
                        )}
                        {errors.zipCode?.type === "minLength" && (
                          <p className="text-danger">
                            Zipcode must be at least 5 characters and no more
                            than 9 characters.
                          </p>
                        )}
                        {errors.zipCode?.type === "maxLength" && (
                          <p className="text-danger">
                            Zipcode must be at least 5 characters and no more
                            than 9 characters.
                          </p>
                        )}
                      </div>
                      <button
                        className="btn btn-outline-light btn-lg px-5"
                        type="submit"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
};

export default ProfileManagement;
