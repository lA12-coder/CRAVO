import React from "react";
import { useParams } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const AuthLayout = () => {
  const { Authpage } = useParams();

  return (
    <div className="bg-Background">
      {Authpage && Authpage == "signin" ? (
        <SignIn />
      ) : (
        Authpage && Authpage == "signup" && <SignUp />
      )}
    </div>
  );
};

export default AuthLayout;
