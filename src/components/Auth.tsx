import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logIn, signUp } from "../actions/userActions";
import { database } from "../firebase";
import InputEl from "./InputEl";

const Auth: React.FC = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [isUsernameInvalid, setIsUsernameInvalid] = useState(false);
  const [isUsernameTaken, setIsUsernameTaken] = useState(false);

  const handleUsernameChange = (name: string) => {
    setUsername(name);
    setIsUsernameInvalid(false);
    setIsUsernameTaken(false);
    if (name.length > 1 && !name.match(/^[a-z0-9_]{2,20}$/i)) {
      return setIsUsernameInvalid(true);
    }
    database
      .ref("usernames")
      .once("value")
      .then((snapshot) => {
        const usernameList: string[] = Object.values(snapshot.val());
        if (usernameList.includes(name)) {
          setIsUsernameTaken(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUpMode) {
      if (isUsernameTaken) {
        return;
      }
      dispatch(signUp(email, username, password));
    } else {
      dispatch(logIn(email, password));
    }
  };

  return (
    <div className="auth">
      <form onSubmit={handleSubmit}>
        <h1>
          {isSignUpMode ? "Create an account" : "Log In"}
        </h1>
        {isSignUpMode && (
          <>
            <InputEl
              id="username"
              label="Username"
              type="text"
              value={username}
              setValue={handleUsernameChange}
              minLength={2}
              maxLength={20}
              {...((isUsernameInvalid || isUsernameTaken) && {
                className: "invalid-input",
              })}
            />
            {isUsernameInvalid && (
              <span className="invalid-msg">
                Username can't contain special characters other than "_".
              </span>
            )}
            {isUsernameTaken && (
              <span className="invalid-msg">
                Sorry, this username in unavailable.
              </span>
            )}
          </>
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

        <span className="auth-mode-btn" onClick={() => setIsSignUpMode((bool) => !bool)}>
          {isSignUpMode
            ? "Already have an account? Log In!"
            : "Need an account? Create one!"}
        </span>
      </form>
    </div>
  );
};

export default Auth;
