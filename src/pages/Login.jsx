import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStorageData, setStorageData } from "../data/helpers";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import SpinnerMini from "../ui/SpinnerMini";

function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("ahmed@curt.com");
  const [password, setPassword] = useState("123");
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    const users = getStorageData("users", []);

    if (isSignup) {
      if (!name.trim() || !email.trim() || !password.trim()) {
        setError("All fields are required");
        setIsLoading(false);
        return;
      }

      const existingEmail = users.find(
        (user) => user.email.toLowerCase() === email.trim().toLocaleLowerCase(),
      );

      if (existingEmail) {
        setError("Email is already taken");
        setIsLoading(false);
        return;
      }
      const newUser = {
        id: `u-${Date.now()}`,
        name: name.trim(),
        password: password,
        email: email.trim().toLocaleLowerCase(),
      };

      const updateUsers = [...users, newUser];
      setStorageData("users", updateUsers);
      setStorageData("currentUser", newUser);
      navigate("/home", { replace: true });
    } else {
      const user = users.find(
        (user) =>
          user.email.toLocaleLowerCase() === email.trim().toLocaleLowerCase() &&
          user.password.toLocaleLowerCase() ===
            password.trim().toLocaleLowerCase(),
      );
      if (user) {
        setStorageData("currentUser", user);
        navigate("/home", { replace: true });
      } else {
        setError("Invalid email or password");
        setIsLoading(false);
      }
    }
  }

  return (
    <div className="h-screen bg-[var(--color-grey-50)] flex items-center justify-center p-[4.8rem]">
      <form
        onSubmit={handleSubmit}
        className="bg-[var(--color-grey-0)] border border-[var(--color-grey-100)] rounded-[var(--border-radius-md)] p-[4.8rem] w-[48rem] flex flex-col gap-[2.4rem] shadow-[var(--shadow-md)]"
      >
        <Heading as="h2">
          {isSignup ? "Create a new account" : "Log in to your account"}
        </Heading>

        {error && (
          <p className="text-[1.4rem] text-[var(--color-red-700)] bg-red-50 p-[1rem] rounded-[var(--border-radius-sm)]">
            {error}
          </p>
        )}

        {isSignup && (
          <div className="flex flex-col gap-[0.8rem]">
            <label className="text-[1.4rem] font-medium">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-[var(--color-grey-300)] rounded-[var(--border-radius-sm)] p-[1.2rem] text-[1.4rem]"
            />
          </div>
        )}

        <div className="flex flex-col gap-[0.8rem]">
          <label className="text-[1.4rem] font-medium">Email address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-[var(--color-grey-300)] rounded-[var(--border-radius-sm)] p-[1.2rem] text-[1.4rem]"
          />
        </div>

        <div className="flex flex-col gap-[0.8rem]">
          <label className="text-[1.4rem] font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-[var(--color-grey-300)] rounded-[var(--border-radius-sm)] p-[1.2rem] text-[1.4rem]"
          />
        </div>

        <Button size="large">
          {isLoading ? <SpinnerMini /> : isSignup ? "Sign up" : "Log in"}
        </Button>

        <button
          type="button"
          onClick={() => {
            setIsSignup(!isSignup);
            setError("");
          }}
          className="text-[1.4rem] text-[var(--color-brand-600)] hover:underline bg-transparent border-none cursor-pointer text-center"
        >
          {isSignup
            ? "Already have an account? Log in"
            : "Don't have an account? Sign up"}
        </button>
      </form>
    </div>
  );
}

export default Login;
