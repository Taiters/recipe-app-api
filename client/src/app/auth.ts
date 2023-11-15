/**
 * This isn't a prod ready / safe auth. Just getting something working with
 * the Django app from the Udemy exercise, which uses Token authentication
 */
import { createContext, useContext, useState } from "react";
import { RecipeAPI } from "./api";

const STORAGE_KEY = 'authedUser';

type AuthedUser = {
    email: string,
    token: string,
}

const AuthContext = createContext<AuthedUser | null>(null);

const useAuthenticatedUser = () => useContext(AuthContext);

const useAuthentication = (): [
    AuthedUser | null,
    (email: string, password: string) => Promise<void>,
    () => void,
] => {
    const [currentUser, setCurrentUser] = useState<AuthedUser | null>(() => {
        const storedUser = window.sessionStorage.getItem(STORAGE_KEY);
        if (storedUser == null) {
            return null;
        }

        return JSON.parse(storedUser);
    });

    const login = async (email: string, password: string) => {
        const token = await RecipeAPI.token(email, password);
        const user = await (new RecipeAPI(token)).me();

        const authedUser = {
            email: user.email,
            token,
        };

        window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(authedUser));

        setCurrentUser(authedUser);
    }

    const logout = () => {
        window.sessionStorage.removeItem(STORAGE_KEY);
        setCurrentUser(null);
    }

    return [currentUser, login, logout];
}

export {
    AuthContext,
    useAuthenticatedUser,
    useAuthentication
};
