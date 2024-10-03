import React, { useState, useEffect } from "react";

const AnnoyingLoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [placeholderText, setPlaceholderText] = useState("Enter username");
  const [errorMessage, setErrorMessage] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  // Random placeholder text logic
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

  // Annoying alert that pops up randomly
  useEffect(() => {
    const randomAlert = setTimeout(() => {
      alert("Why are you still here?");
    }, 5000);

    return () => clearTimeout(randomAlert);
  }, []);

  // Correct event types for onChange and onSubmit
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username === "" || password === "") {
      setErrorMessage("Fields cannot be empty, duh!");
      return;
    }
    setErrorMessage("Oops, try again...");
    setTimeout(() => {
      alert("Login failed. Please try again.");
    }, 2000);
  };

  useEffect(() => {
    const randomDisable = setInterval(() => {
      setIsButtonDisabled(Math.random() < 0.5);
    }, 1000);

    return () => clearInterval(randomDisable);
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Worst Login Page Ever</h1>
      <form onSubmit={handleSubmit}>
        <label style={{ display: "block", marginBottom: "5px" }}>
          {Math.random() < 0.5 ? "User?" : "Who is this?"}
        </label>
        <input
          type="text"
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
        <button className="submit" type="submit" disabled={isButtonDisabled}>
          {isButtonDisabled ? "Wait..." : "Login"}
        </button>
      </form>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <div style={{ marginTop: "20px" }}>
        <label>Prove you are human: </label>
        <input type="text" placeholder="Captcha: 9Kx7z" />
      </div>
    </div>
  );
};

export default AnnoyingLoginPage;
