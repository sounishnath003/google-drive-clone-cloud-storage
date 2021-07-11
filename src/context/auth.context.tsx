import firebase from "firebase";
import React from "react";
import {Error as ERROR, Success} from "../components";
import {auth} from "../firebase";

interface AuthContextInterface {
    currentUser: firebase.User | null;
    signUpWithRedirect: (payload: {
        email: string;
        password: string;
    }) => Promise<void>;
    loginWithRedirect: (payload: { email: string, password: string }) => Promise<void>
}

const AuthContext = React.createContext<AuthContextInterface>({
    currentUser: null,
    signUpWithRedirect: () =>
        Promise.reject(new Error("Email and password are required!")),
    loginWithRedirect: () => Promise.reject(new Error("Email and password are required!"))
});

export function useAuth() {
    return React.useContext(AuthContext);
}

interface AuthProps {
    children: any;
}

const AuthProvider: React.FC<AuthProps> = ({children}: AuthProps) => {
    const [currentUser, setCurrentUser] = React.useState<firebase.User | null>(
        null
    );
    const [error, setError] = React.useState<string | null>(null);
    const [success, setSuccess] = React.useState<string | null>(null);

    async function loginWithRedirect(payload: { email: string, password: string }) {
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

    return (
        <AuthContext.Provider value={{currentUser, signUpWithRedirect, loginWithRedirect}}>
            <ERROR error={error}/>
            <Success message={success}/>
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
