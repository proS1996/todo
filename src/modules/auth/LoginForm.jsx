import { useState } from "react";
import { useLoginMutation } from "@services/rtk-query/authApi";
import { useDispatch } from "react-redux";
import { setAuth, setError } from "@features/auth/authSlice";
import { useLogin1Query } from "../../services/rtk-query/authApi";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const { data: useLogin1QueryData } = useLogin1Query();
  console.log("useLogin1QueryData :", useLogin1QueryData);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ username, password }).unwrap();
      dispatch(setAuth({ user: response.user, token: response.token }));
      console.log("Login Successful:", response);
    } catch (error) {
      console.error("Login Failed:", error);
      dispatch(setError(error?.data?.message || "Login error"));
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
