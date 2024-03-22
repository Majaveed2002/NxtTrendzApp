import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate, Navigate } from "react-router-dom";
import "./index.css";

import React from "react";

const LoginForm = () => {
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
    errorMsg: "",
    showSubmitError: false,
  });
  const jwtToken = Cookies.get("jwt_token");
  if (jwtToken !== undefined) {
    return <Navigate to="/" />;
  }

  const navigate = useNavigate();

  const onChangeUsername = (event) => {
    setUserDetails({ ...userDetails, username: event.target.value });
  };

  const onChangePassword = (event) => {
    setUserDetails({ ...userDetails, password: event.target.value });
  };

  const onSubmitSuccess = (jwtToken) => {
    Cookies.set("jwt_token", jwtToken, {
      expires: 30,
      path: "/",
    });
    navigate("/");
  };

  const onSubmitFailure = (errorMsg) => {
    setUserDetails((prevState) => ({
      ...prevState,
      showSubmitError: true,
      errorMsg,
    }));
  };

  const submitForm = async (event) => {
    event.preventDefault();
    const { username, password } = userDetails;
    const usernameAndPassword = { username, password };
    const url = "https://apis.ccbp.in/login";
    const options = {
      method: "POST",
      body: JSON.stringify(usernameAndPassword),
    };
    const response = await fetch(url, options);
    const data = await response.json();
    if (response.ok === true) {
      onSubmitSuccess(data.jwt_token);
    } else {
      onSubmitFailure(data.error_msg);
    }
  };

  return (
    <div className="login-form-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
        className="login-website-logo-mobile-image"
        alt="website logo"
      />
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
        className="login-image"
        alt="website login"
      />
      <form className="form-container" onSubmit={submitForm}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          className="login-website-logo-desktop-image"
          alt="website logo"
        />
        <div className="input-container">
          <label className="input-label" htmlFor="username">
            USERNAME
          </label>
          <input
            type="text"
            id="username"
            className="username-input-field"
            value={userDetails.username}
            onChange={onChangeUsername}
            placeholder="Username"
          />
        </div>
        <div className="input-container">
          <label className="input-label" htmlFor="password">
            PASSWORD
          </label>
          <input
            type="password"
            id="password"
            className="password-input-field"
            value={userDetails.password}
            onChange={onChangePassword}
            placeholder="Password"
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
        {userDetails.showSubmitError && (
          <p className="error-message">*{userDetails.errorMsg}</p>
        )}
      </form>
    </div>
  );
};

export default LoginForm;
