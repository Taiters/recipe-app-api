/**
 * This isn't a prod ready / safe auth. Just getting something working with
 * the Django app from the Udemy exercise, which uses Token authentication
 */
import { createContext, useContext, useState } from "react";

const TOKEN_URL = '/api/user/tokens/'
const ME_URL = '/api/user/me/'

type User = {
    email: string,
    token: string,
}

const AuthContext = createContext<User | null>(null);

const useAuthenticatedUser = () => useContext(AuthContext);

const loadToken = async (email: string, password: string): Promise<string> => {
    const response = await fetch(
        TOKEN_URL,
        {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );
    const tokenData = await response.json();
    return tokenData['token'];
}

const loadUser = async (token: string): Promise<User> => {
    const result = await fetch(
        ME_URL,
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`,
            }
        }
    )
    const user = await result.json();
    return {
        email: user['email'],
        token: token,
    }
}

const useAuthentication = (): [
    User | null,
    (email: string, password: string) => Promise<void>,
    () => void,
] => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    const login = async (email: string, password: string) => {
        const token = await loadToken(email, password);
        const user = await loadUser(token);
        setCurrentUser(user);
    }

    const logout = () => setCurrentUser(null);

    return [currentUser, login, logout];
}

export {
    AuthContext,
    useAuthenticatedUser,
    useAuthentication
};
