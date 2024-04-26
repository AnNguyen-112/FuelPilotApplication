import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import image from "./Assets/images/fuel-pilot-background.png";
import { useAuth0 } from "@auth0/auth0-react";
const ProfileManagement = () => {
  const { user, isAuthenticated } = useAuth0();
  const userEmail = isAuthenticated && user?.email;
  const [profileUpdated, setProfileUpdated] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
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
        try {
          const response = await fetch(
            `http://localhost:3500/userProfile?userEmail=${userEmail}`
          );
          if (!response.ok) {
            throw new Error("Fail to fetch Data");
          }
          const data = await response.json();
          if (data) {
            setProfileData(data);
            setProfileUpdated(true);
            reset(data);
            setIsLoading(false);
          } else {
            setProfileData(null);
            setProfileUpdated(false);
          }
        } catch (error) {
          setProfileData(null);
          setProfileUpdated(false);
          setIsLoading(false);
        }
      };
      fetchData();
    }
  }, [user, isAuthenticated, reset]);
  if (isLoading) {
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
        ;
      </section>
    );
  }
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
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000);
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
        <div className="col-md-8">
          <div className="card">
            <div className="card-header pb-0 bg-dark">
              <div className="d-flex align-items-center">
                <p className="mb-0" style={{ fontWeight: 'bold', color: '#F8F8FF', fontSize: '1.3rem'}}>CUSTOMER PROFILE</p>
              </div>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label
                      htmlFor="example-text-input"
                      className="form-control-label"
                    >
                      Username
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      value={user?.name}
                      disabled
                    />{" "}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label
                      htmlFor="example-firstname-input"
                      className="form-control-label"
                    >
                      Name
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      value={profileData.fullName}
                      disabled
                    />{" "}
                  </div>
                </div>
              </div>
              <hr className="horizontal dark" />
              <p className="text-uppercase text-sm">Contact Information</p>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label
                      htmlFor="example-address-input"
                      className="form-control-label"
                    >
                      Address 1
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      value={profileData.address1}
                      disabled
                    />{" "}
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="example-address-input"
                      className="form-control-label"
                    >
                      Address 2
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      value={profileData.address2}
                      disabled
                    />{" "}
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label
                      htmlFor="example-city-input"
                      className="form-control-label"
                    >
                      City
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      value={profileData.city}
                      disabled
                    />{" "}
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label
                      htmlFor="example-country-input"
                      className="form-control-label"
                    >
                      State
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      value={profileData.state}
                      disabled
                    />{" "}
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label
                      htmlFor="example-postalcode-input"
                      className="form-control-label"
                    >
                      Postal code
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      value={profileData.zipCode}
                      disabled
                    />{" "}
                  </div>
                </div>
              </div>
              <hr className="horizontal dark" />
              <button className="btn btn-dark btn-md ms-auto" onClick={handleEditProfile}>
                  Edit profile
                </button>
            </div>
          </div>
        </div>
      </section>
    );
  } else {
    return (
      <section
        className="vh-100"
        style={{
          // overflow: 'auto',
          backgroundImage: `url(${image})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
        }}
      >
        <div className="container py-1 h-50">
          <div className="row d-flex justify-content-center align-items-center vh-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card bg-dark text-white"
                style={{ width: "30rem" }}
              >
                <div
                  className="card-body text-center"
                  style={{ "border-radius": "1rem;" }}
                >
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mt-3">
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
          {showPopup && (
            <div
              style={{
                position: "fixed",
                top: "20%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              Your Information Has Been Saved
            </div>
          )}
        </div>
      </section>
    );
  }
};

export default ProfileManagement;
