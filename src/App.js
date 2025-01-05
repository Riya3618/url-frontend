import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Login from './Login';
import Signup from './Signup';
import UrlShortener from './UrlShortener';

function App() {
const [token, setToken] = useState(localStorage.getItem('token')); // Check for saved token

useEffect(() => {
// If the token is not valid or expired, you can handle logout or redirect here
}, [token]);

const handleLogout = () => {
localStorage.removeItem('token');
setToken(null); // Update state to reflect user logged out
};

return (
<Router>
<div className="App">
<nav>
<Link to="/">Home</Link> | <Link to="/login">Login</Link> | <Link to="/signup">Sign Up</Link>
{token && <button onClick={handleLogout}>Logout</button>}
</nav>

<Routes>
<Route path="/" element={token ? <UrlShortener /> : <Login setToken={setToken} />} />
<Route path="/login" element={<Login setToken={setToken} />} />
<Route path="/signup" element={<Signup setToken={setToken} />} />
</Routes>
</div>
</Router>
);
}

export default App;