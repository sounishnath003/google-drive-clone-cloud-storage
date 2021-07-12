import firebase from "firebase";
import React from "react";
import { auth } from "../firebase";

interface HookInterface {
  loginWithRedirect: (payload: {
    email: string;
    password: string;
  }) => Promise<void>;
  signUpWithRedirect: (payload: {
    email: string;
    password: string;
  }) => Promise<void>;
  error: string | null;
  success: string | null;
  currentUser: firebase.User | null;
}

export default function useHook(): HookInterface {
  const [currentUser, setCurrentUser] = React.useState<firebase.User | null>(
    null
  );
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

  function dismiss(callback: any, seconds: number) {
    setTimeout(() => callback(), seconds * 1000);
  }

  React.useEffect(() => {
    const unsubscribe: firebase.Unsubscribe = auth.onAuthStateChanged(
      (user) => {
        setCurrentUser(user);
      }
    );
    if (currentUser !== null) {
      setSuccess(`Welcome, ${currentUser.email}! You are logged in!`);
      dismiss(() => setSuccess(null), 3);
    }

    return () => unsubscribe();
  }, []);

  async function loginWithRedirect(payload: {
    email: string;
    password: string;
  }) {
    try {
      if (checkForEmailAndPasswordValidity(payload)) {
        throw new Error(
          "Email and password must be at least 5 characters long"
        );
      }

      await auth.signInWithEmailAndPassword(payload.email, payload.password);
      setSuccess("Howdy! You are now logged in!");
      dismiss(() => setSuccess(null), 3);
    } catch (e: any) {
      setError(e.message || "Could not able to log you in! Please try again!");
      dismiss(() => setError(null), 3);
    }
  }

  async function signUpWithRedirect(payload: {
    email: string;
    password: string;
  }) {
    try {
      if (checkForEmailAndPasswordValidity(payload)) {
        throw new Error(
          "Email and password must be at least 5 characters long"
        );
      }

      await auth.createUserWithEmailAndPassword(
        payload.email,
        payload.password
      );
      setSuccess(`Welcome, ${payload.email}! You are logged in!`);
      dismiss(() => setSuccess(null), 3);
    } catch (error) {
      setError(
        error.message ||
          "Could not able to create an account, Please try again!"
      );
      dismiss(() => setError(null), 3);
    }
  }

  return { loginWithRedirect, signUpWithRedirect, error, success, currentUser };
}

function checkForEmailAndPasswordValidity(payload: {
  email: string;
  password: string;
}) {
  return (
    !payload.email ||
    !payload.password ||
    payload.email.length < 5 ||
    payload.password.length < 5
  );
}
