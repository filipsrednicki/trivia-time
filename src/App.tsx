import React from "react";
import { Route } from "react-router-dom";
import "./App.scss";
import ConfigureTriviaSet from "./components/TriviaSet/ConfigureTriviaSet";
import CreateTriviaSet from "./components/TriviaSet/CreateTriviaSet";
import Nav from "./components/Nav";

const App: React.FC = () => {
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
