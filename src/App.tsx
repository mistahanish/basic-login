import React, { useState, useEffect } from 'react';
import './App.css';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [workingFormIndex, setWorkingFormIndex] = useState<number | null>(null);
  const [formAttempts, setFormAttempts] = useState<number[]>([]);
  
  // Manage the state for each form (name and password)
  const [formStates, setFormStates] = useState(
    Array.from({ length: 9 }, () => ({ name: '', password: '' }))
  );

  // Randomly select one form to work when the component mounts
  useEffect(() => {
    const randomFormIndex = Math.floor(Math.random() * 9);
    setWorkingFormIndex(randomFormIndex);
  }, []);

  const handleSubmit = (event: React.FormEvent, formIndex: number) => {
    event.preventDefault();
    
    // Only the randomly selected form will allow login
    const { name, password } = formStates[formIndex];
    if (formIndex === workingFormIndex && name && password) {
      setIsLoggedIn(true);
    } else {
      alert(`Form ${formIndex + 1} does not work. Try another one!`);
      setFormAttempts([...formAttempts, formIndex]);
    }
  };

  const handleInputChange = (formIndex: number, field: 'name' | 'password', value: string) => {
    const newFormStates = [...formStates];
    newFormStates[formIndex] = { ...newFormStates[formIndex], [field]: value };
    setFormStates(newFormStates);
  };

  const renderLoginForm = (formIndex: number) => (
    <form onSubmit={(e) => handleSubmit(e, formIndex)} key={formIndex} className="login-form">
      <h2>Login</h2>
      <div>
        <label htmlFor={`name-${formIndex}`}>Name:</label>
        <input
          type="password"
          id={`name-${formIndex}`}
          value={formStates[formIndex].name}
          onChange={(e) => handleInputChange(formIndex, 'name', e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor={`password-${formIndex}`}>Password:</label>
        <input
          type="text"
          id={`password-${formIndex}`}
          value={formStates[formIndex].password}
          onChange={(e) => handleInputChange(formIndex, 'password', e.target.value)}
          required
        />
      </div>
      <button type="submit">Enter</button>
    </form>
  );

  return (
    <div className="App">
      {isLoggedIn ? (
        <h1>Welcome! You found the correct login form.</h1>
      ) : (
        <div>
          <h1>Log in</h1>
          <div className="grid-container">
            {Array.from({ length: 9 }, (_, index) => renderLoginForm(index))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
