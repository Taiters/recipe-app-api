import React from "react";
import { Route, Switch } from "react-router-dom";
import { AuthContext, useAuthentication } from "./app/auth";
import AuthForm from "./components/AuthForm";

const App = () => {
  const [currentUser, login] = useAuthentication();

  console.log(currentUser);
  return (
    <AuthContext.Provider value={currentUser}>
      <Switch>
        <Route path="/">

        </Route>
        <Route path="/login">
          <AuthForm onSubmit={login} />
        </Route>
      </Switch>
    </AuthContext.Provider>
  );
}

export default App;
