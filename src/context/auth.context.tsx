import firebase from "firebase";
import React from "react";
import { Error as ERROR, Success } from "../components";
import useHook from "./hooks";

interface AuthContextInterface {
  currentUser: firebase.User | null;
  signUpWithRedirect: (payload: {
    email: string;
    password: string;
  }) => Promise<void>;
  loginWithRedirect: (payload: {
    email: string;
    password: string;
  }) => Promise<void>;
}

const AuthContext = React.createContext<AuthContextInterface>({
  currentUser: null,
  signUpWithRedirect: () =>
    Promise.reject(new Error("Email and password are required!")),
  loginWithRedirect: () =>
    Promise.reject(new Error("Email and password are required!")),
});

export function useAuth() {
  return React.useContext(AuthContext);
}

interface AuthProps {
  children: any;
}

const AuthProvider: React.FC<AuthProps> = ({ children }: AuthProps) => {
  const { error, success, loginWithRedirect, signUpWithRedirect, currentUser } =
    useHook();
  return (
    <AuthContext.Provider
      value={{ currentUser, signUpWithRedirect, loginWithRedirect }}
    >
      <ERROR error={error} />
      <Success message={success} />
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
