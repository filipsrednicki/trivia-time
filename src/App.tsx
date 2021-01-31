import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import "./App.scss";
import ConfigureTriviaSet from "./components/TriviaSet/ConfigureTriviaSet";
import CreateTriviaSet from "./components/TriviaSet/CreateTriviaSet";
import Nav from "./components/Nav";
import { useDispatch } from "react-redux";
import { auth } from "./firebase";
import { logInUser, userLoading } from "./actions/userActions";

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userLoading());
    auth.onAuthStateChanged((user) => {
      if (user?.email) {
        dispatch(logInUser({ email: user.email, username: user.displayName }));
      }
    });
  }, [dispatch]);

  return (
    <div className="App">
      <Nav/>
      <Route path="/create-set" render={({ match: { url }}) => (
        <>
          <Route exact path={`${url}/`} component={CreateTriviaSet}/>
          <Route path={`${url}/config`} component={ConfigureTriviaSet}/>
        </>
      )}/>
    </div>
  );
};

export default App;
