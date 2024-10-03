import React, { useState, useEffect } from 'react';
import './App.css';

const App: React.FC = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [workingFormIndex, setWorkingFormIndex] = useState<number | null>(null);
  const [formAttempts, setFormAttempts] = useState<number[]>([]);

  // Randomly select one form to work when the component mounts
  useEffect(() => {
    const randomFormIndex = Math.floor(Math.random() * 9);
    setWorkingFormIndex(randomFormIndex);
  }, []);

  const handleSubmit = (event: React.FormEvent, formIndex: number) => {
    event.preventDefault();
    
    // Only the randomly selected form will allow login
    if (formIndex === workingFormIndex && name && password) {
      setIsLoggedIn(true);
    } else {
      alert(`Form ${formIndex + 1} does not work. Try another one!`);
      setFormAttempts([...formAttempts, formIndex]);
    }
  };

  const renderLoginForm = (formIndex: number) => (
    <form onSubmit={(e) => handleSubmit(e, formIndex)} key={formIndex}>
      <h2>Login Form {formIndex + 1}</h2>
      <div>
        <label htmlFor={`name-${formIndex}`}>Name:</label>
        <input
          type="password"
          id={`name-${formIndex}`}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor={`password-${formIndex}`}>Password:</label>
        <input
          type="text"
          id={`password-${formIndex}`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Enter</button>
    </form>
  );

  return (
    <div className="App">
      {isLoggedIn ? (
        <h1>Welcome, {name}! You found the correct login form.</h1>
      ) : (
        <div>
          <h1>Log In!</h1>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {Array.from({ length: 9 }, (_, index) => renderLoginForm(index))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
