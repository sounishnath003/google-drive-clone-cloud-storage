import firebase from "firebase";
import React from "react";
import { Error as ERROR, Sucess } from "../components";
import { auth } from "../firebase";

interface AuthContextInterface {
  currentUser: firebase.User | null;
  signUpWithRedirect: (payload: {
    email: string;
    password: string;
  }) => Promise<void>;
}

const AuthContext = React.createContext<AuthContextInterface>({
  currentUser: null,
  signUpWithRedirect: () =>
    Promise.reject(new Error("Email and password are required")),
});

export function useAuth() {
  return React.useContext(AuthContext);
}

interface AuthProps {
  children: any;
}

const AuthProvider: React.FC<AuthProps> = ({ children }: AuthProps) => {
  const [currentUser, setCurrentUser] = React.useState<firebase.User | null>(
    null
  );
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSucess] = React.useState<string | null>(null);

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
      setSucess(`Welcome, ${payload.email}! You are logged in!`);
      dismiss(() => setSucess(null), 3);
    } catch (error) {
      setError(
        error.message ||
          "Could not able to create an account, Please try again!"
      );
      dismiss(() => setError(null), 3);
    }
  }

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
      setSucess(`Welcome, ${currentUser.email}! You are logged in!`);
      dismiss(() => setSucess(null), 3);
    }

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, signUpWithRedirect }}>
      <ERROR error={error} />
      <Sucess message={success} />
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

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
