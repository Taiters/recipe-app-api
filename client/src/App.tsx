import { Redirect, Route, Switch } from "react-router-dom";
import { AuthContext, useAuthenticatedUser, useAuthentication } from "./app/auth";
import AuthForm from "./components/AuthForm";
import Navigation from "./components/Navigation";
import RecipeCreateController from "./components/RecipeCreateController";
import RecipeDetailView from "./components/RecipeDetailView";
import RecipeEditController from "./components/RecipeEditController";
import RecipeListView from "./components/RecipeListView";

const LOGIN_PATH = "/login";

const PrivateRoute = ({ children, ...rest }: React.ComponentProps<typeof Route>) => {
  const currentUser = useAuthenticatedUser();
  return (
    <Route {...rest}>
      {currentUser ? children : <Redirect to={LOGIN_PATH} />}
    </Route>
  );
}

const App = () => {
  const [currentUser, login, logout] = useAuthentication();

  return (
    <AuthContext.Provider value={currentUser}>
      <Navigation onLogout={logout} />
      <Switch>
        <Route path={LOGIN_PATH}>
          {currentUser == null
            ? <AuthForm onSubmit={login} />
            : <Redirect to="/" />
          }
        </Route>
        <PrivateRoute path="/recipes/create">
          <RecipeCreateController />
        </PrivateRoute>
        <PrivateRoute path="/recipes/:id/edit">
          <RecipeEditController />
        </PrivateRoute>
        <PrivateRoute path="/recipes/:id">
          <RecipeDetailView />
        </PrivateRoute>
        <PrivateRoute path="/">
          <RecipeListView />
        </PrivateRoute>
      </Switch>
    </AuthContext.Provider>
  );
}

export default App;
