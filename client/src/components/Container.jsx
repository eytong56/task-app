import { useState, useEffect } from "react";
import Header from "./header/Header.jsx";
import TaskList from "./tasks/TaskList.jsx";
import LoginForm from "./LoginForm.jsx";
import Logout from "./Logout.jsx";
import SignupForm from "./SignupForm.jsx";
import apiCall from "../utils/api.js";

function Container({ selectedDate, setSelectedDate }) {
  const [user, setUser] = useState(null);
  const [signup, setSignup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Check if user is logged in when app loads
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await apiCall("/auth/me");
        if (response.ok) {
          const authData = await response.json();
          setUser(authData.user);
          setError(null);
        } else {
          console.log("Not logged in");
          setUser(null);
        }
      } catch (error) {
        console.log(error);
        // Not logged in, no valid token
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await apiCall("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      console.log("Response object:", response); // Add this
      console.log("Response type:", typeof response); // Add this
      console.log("Response.json exists?", typeof response.json); // Add this

      if (response.ok) {
        const authData = await response.json();
        console.log("Login success:", authData);
        setUser(authData.user);
        setSuccess(null);
      } else {
        const errorData = await response.json(); // Get error details
        console.log("Login failed:", errorData);
        setError(errorData.error || "Failed to login");
      }
    } catch (error) {
      console.log(`Login error: ${error}`);
      setError(error.message);
    }
  };

  const logout = async () => {
    try {
      const response = await apiCall("/auth/logout", { method: "POST" });
      if (response.ok) {
        console.log("Logout success");
        setUser(null);
        setError(null);
        setSuccess("logged out");
      } else {
        const errorData = await response.json(); // Get error details
        console.log("Logout failed:", errorData);
        setError(errorData.error || "Failed to logout");
      }
    } catch (error) {
      console.log(`Logout error: ${error}`);
      setError(error.message);
    }
  };

  const register = async (email, password) => {
    try {
      const response = await apiCall("/auth/register", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        console.log("Registration success");
        setSignup(false);
        setError(null);
        setSuccess("registered");
      } else {
        const errorData = await response.json(); // Get error details
        console.log("Registration failed:", errorData);
        setError(errorData.error || "Failed to register");
      }
    } catch (error) {
      console.log(`Registration error: ${error}`);
      setError(error.message);
    }
  };

  return (
    <div className="flex-grow flex flex-col items-center max-w-200 min-w-150 gap-10 py-24 px-24">
      <Header selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      {error && <div className="text-red-800">Error: {error}</div>}
      {success && (
        <div className="text-emerald-800">Successfully {success}!</div>
      )}
      {loading ? (
        <div>Loading...</div>
      ) : user ? (
        <>
          <TaskList selectedDate={selectedDate} />
          <Logout onLogout={logout} />
        </>
      ) : signup ? (
        <SignupForm onRegister={register} onSwitch={() => setSignup(false)} />
      ) : (
        <LoginForm onLogin={login} onSwitch={() => setSignup(true)} />
      )}
    </div>
  );
}

export default Container;
