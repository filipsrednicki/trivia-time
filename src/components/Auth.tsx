import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logIn, signUp } from "../actions/userActions";
import InputEl from "./InputEl";

const Auth: React.FC = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUpMode) {
      dispatch(signUp(email, username, password));
    } else {
      dispatch(logIn(email, password));
    }
  };

  return (
    <div className="auth">
      <form onSubmit={handleSubmit}>
        {isSignUpMode && (
          <InputEl
            id="username"
            label="Username"
            type="text"
            value={username}
            setValue={setUsername}
            minLength={2}
            maxLength={20}
          />
        )}
        <InputEl
          label="E-mail"
          id="email"
          type="email"
          value={email}
          setValue={setEmail}
        />
        <InputEl
          id="password"
          label="Password"
          type="password"
          value={password}
          setValue={setPassword}
          minLength={6}
        />
        {isSignUpMode && (
          <InputEl
            id="confirm-password"
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            setValue={setConfirmPassword}
            minLength={6}
          />
        )}
        <button type="submit">{isSignUpMode ? "Sign Up" : "Log In"}</button>

        <span onClick={() => setIsSignUpMode((bool) => !bool)}>
          {isSignUpMode
            ? "Already have an account? Log In!"
            : "Need an account? Create one!"}
        </span>
      </form>
    </div>
  );
};

export default Auth;
