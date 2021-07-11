import React from "react";
import { useAuth } from "../../context/auth.context";

interface AuthPayloadInterface {
  email: string;
  password: string;
}

const AuthHome: React.FC = () => {
  const { signUpWithRedirect } = useAuth();

  const [showPassword, setShowPassword] = React.useState(false);
  const [isSignupPressed, setSignupPressed] = React.useState(false);

  const [payload, setPayload] = React.useState<AuthPayloadInterface>({
    email: "",
    password: "",
  });

  function handleOnChage(e: React.ChangeEvent<HTMLInputElement>) {
    setPayload((prevPayload) => {
      return {
        ...prevPayload,
        [e.target.name]: e.target.value,
      };
    });
  }

  return (
    <div>
      <div className="max-w-md mt-8 text-gray-800 md:mt-28 m-auto p-3">
        <div className="text-center flex flex-col space-y-1">
          <div className="text-2xl text-indigo-700">👋 Hi! Welcome Aboard</div>
          <div className="text-sm">
            ℹ️ Please Login / Register yourself to continue the process.
          </div>
        </div>

        {/* form */}
        <div className="my-8 space-y-6">
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                onChange={handleOnChage}
                value={payload.email}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email: flock.sinasini@gmail.com"
              />
            </div>
            <div>
              <input
                onChange={handleOnChage}
                value={payload.password}
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
              <div className="text-xs my-2 inline">
                <input
                  type="checkbox"
                  name="showPassword"
                  className="outline-none"
                  id="showPassword"
                  onClick={() => setShowPassword(!showPassword)}
                />{" "}
                Show password
              </div>
            </div>
          </div>

          {!isSignupPressed ? (
            <div
              onClick={() => console.log(payload)}
              className="button-indigo-block"
            >
              <div className="button-text">Login &rarr; </div>
            </div>
          ) : (
            <div
              onClick={() => signUpWithRedirect(payload)}
              className="button-red-block"
            >
              <div className="button-text">Register &rarr; </div>
            </div>
          )}

          <div className="my-4 text-center">
            <div className="text-sm">
              Don&apos; t have an account?{" "}
              <span
                onClick={() => setSignupPressed((state: boolean) => !state)}
                className="text-indigo-500 cursor-pointer"
              >
                Signup
              </span>{" "}
            </div>
          </div>
        </div>
        {/* form end */}
      </div>
    </div>
  );
};

export default AuthHome;
