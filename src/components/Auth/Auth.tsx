import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logIn, signUp } from "../../actions/userActions";
import { database } from "../../firebase";
import InputEl from "../InputEl";
import "./_auth.scss";

const Auth: React.FC = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [isUsernameInvalid, setIsUsernameInvalid] = useState(false);
  const [isUsernameTaken, setIsUsernameTaken] = useState(false);
  const [doPasswordsMatch, setDoPasswordsMatch] = useState(true);

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
      if (isUsernameInvalid || isUsernameTaken) {
        return;
      }
      dispatch(signUp(email, username, password));
    } else {
      dispatch(logIn(email, password));
    }
  };

  const arePasswordsMatching = (pw1: string, pw2: string) => {
    if (pw1 === pw2 || !pw2) {
      setDoPasswordsMatch(true);
    } else {
      setDoPasswordsMatch(false);
    }
  };

  const handlePasswordChange = (pass: string) => {
    setPassword(pass);
    if (isSignUpMode) {
      arePasswordsMatching(pass, confirmPassword);
    }
  };

  const handleConfirmPasswordChange = (pass: string) => {
    setConfirmPassword(pass);
    arePasswordsMatching(password, pass);
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
          setValue={handlePasswordChange}
          minLength={6}
        />
        {isSignUpMode && (
          <>
            <InputEl
              id="confirm-password"
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              setValue={handleConfirmPasswordChange}
              minLength={6}
              {...(!doPasswordsMatch && {
                className: "invalid-input",
              })}
            />
            {!doPasswordsMatch && (
              <span className="invalid-msg">
                Passwords do not match. Please try again.
              </span>
            )}
          </>
        )}
        <button type="submit" disabled={isUsernameInvalid || isUsernameTaken}>
          {isSignUpMode ? "Sign Up" : "Log In"}
        </button>

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
