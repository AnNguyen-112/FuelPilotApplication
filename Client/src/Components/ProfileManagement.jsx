import React from "react";
import { useForm } from "react-hook-form";
import image from "./Assets/images/fuel-pilot-background.png";

const ProfileManagement = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Here you would handle sending the data to the backend
    console.log(data);
  };
  return (
    <section
      className="vh-50"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
      }}
    >
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white" style={{ width: "30rem" }}>
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
                      />
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
                        <option>...</option>
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
                          Zipcode must be at least 5 characters and no more than
                          9 characters.
                        </p>
                      )}
                      {errors.zipCode?.type === "maxLength" && (
                        <p className="text-danger">
                          Zipcode must be at least 5 characters and no more than
                          9 characters.
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
};

export default ProfileManagement;
