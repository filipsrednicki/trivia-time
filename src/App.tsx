import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import "./App.scss";
import ConfigureTriviaSet from "./components/TriviaSet/ConfigureTriviaSet";
import CreateTriviaSet from "./components/TriviaSet/CreateTriviaSet";
import Nav from "./components/Nav";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "./store";
import { auth } from "./firebase";
import { logInUser, userLoading } from "./actions/userActions";
import { getStoredSets } from "./actions/triviaActions";
const App: React.FC = () => {
  const user = useSelector((state: RootStore) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStoredSets());
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
          {user.user ? (
            <>
              <Route exact path={`${url}/`} component={CreateTriviaSet}/>
              <Route path={`${url}/config`} component={ConfigureTriviaSet}/>
            </>
          ) : (
            <h1>You need to be authorized in order to access this page.</h1>
          )}
        </>
      )}/>
    </div>
  );
};

export default App;
