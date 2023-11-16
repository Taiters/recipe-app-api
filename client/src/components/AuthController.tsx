import { useState } from "react";
import { Redirect } from "react-router-dom";
import { RecipeAPIError } from "../app/api";
import { User } from "../app/models";
import AuthForm from "./AuthForm";

type Props = {
  currentUser: User | null;
  onLogin: (email: string, password: string) => Promise<void>;
};

function AuthController({ currentUser, onLogin }: Props) {
  const [error, setError] = useState<string | null>(null);
  const handleLogin = async (email: string, password: string) => {
    setError(null);
    try {
      await onLogin(email, password);
    } catch (err) {
      if (err instanceof RecipeAPIError) {
        setError("Invalid credentials");
      }
    }
  };

  return currentUser == null ? (
    <AuthForm onSubmit={handleLogin} error={error} />
  ) : (
    <Redirect to="/" />
  );
}

export default AuthController;
