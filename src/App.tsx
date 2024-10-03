import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

// Annoying login page
const AnnoyingLoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [captchaInput, setCaptchaInput] = useState(""); // For user input of CAPTCHA
  const [captchaError, setCaptchaError] = useState(""); // Error message for invalid CAPTCHA
  const [placeholderText, setPlaceholderText] = useState("Enter username");
  const [errorMessage, setErrorMessage] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const navigate = useNavigate(); // To redirect the user

  // Predefined CAPTCHA text
  const correctCaptcha = "hjabgdhagbAA!!!!";

  useEffect(() => {
    const placeholders = [
      "Enter username...",
      "Type something...",
      "Who are you?",
      "I don't care...",
    ];
    const interval = setInterval(() => {
      setPlaceholderText(
        placeholders[Math.floor(Math.random() * placeholders.length)]
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const randomAlert = setTimeout(() => {
      alert("Why are you still here?");
    }, 5000);

    return () => clearTimeout(randomAlert);
  }, []);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleCaptchaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCaptchaInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if CAPTCHA is correct
    if (captchaInput !== correctCaptcha) {
      setCaptchaError("Incorrect CAPTCHA, please try again.");
      return;
    }

    // Clear error if CAPTCHA is correct and simulate successful login
    setCaptchaError("");
    navigate("/home");
  };

  useEffect(() => {
    const randomDisable = setInterval(() => {
      setIsButtonDisabled(Math.random() < 0.5);
    }, 1000);

    return () => clearInterval(randomDisable);
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1> YOU SUCK! </h1>
      <form onSubmit={handleSubmit}>
        <label style={{ display: "block", marginBottom: "5px" }}>
          {Math.random() < 0.5 ? "User?" : "Who is this?"}
        </label>
        <input
          type="password" // Username now appears as hidden dots or asterisks
          placeholder={placeholderText}
          value={username}
          onChange={handleUsernameChange}
          style={{ marginBottom: "10px", width: "200px", padding: "10px" }}
        />
        <br />
        <label style={{ display: "block", marginBottom: "5px" }}>
          {Math.random() < 0.5 ? "Password (Visible)!" : "Your secret..."}
        </label>
        <input
          type="text"
          placeholder="Type password here"
          value={password}
          onChange={handlePasswordChange}
          style={{ marginBottom: "10px", width: "200px", padding: "10px" }}
        />
        <br />

        <label>Prove you are worthy of logging in: </label>
        <input
          type="text"
          placeholder="Captcha: hjabgdhagbAA!!!!"
          value={captchaInput}
          onChange={handleCaptchaChange}
          style={{ marginBottom: "10px", width: "300px", padding: "10px" }}
        />
        <br />

        {/* Show CAPTCHA error message */}
        {captchaError && <p style={{ color: "red" }}>{captchaError}</p>}

        <button className="submit" type="submit" disabled={isButtonDisabled}>
          {isButtonDisabled ? "Wait..." : "Login"}
        </button>
      </form>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

// Home page after successful login
const HomePage = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome! You’ve successfully logged in.</h1>
      <p>Now what?</p>
    </div>
  );
};

// App component with routing
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AnnoyingLoginPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default App;
