/*global chrome*/
import { useState } from 'react';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [userData, setUser] = useState();


  return (
    <div className="App">
      <header className="App-header">
        {!userData ? (
          <button>
          SignIn
        </button>
        ) : (
          <p>HI !!</p>
        )}
      </header>
    </div>
  );
}

export default App;
