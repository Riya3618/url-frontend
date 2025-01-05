import React, { useState } from 'react';

const Login = ({ setToken }) => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState('');

const handleSubmit = async (e) => {
e.preventDefault();
try {
const response = await fetch('/api/auth/login', {
method: 'POST',
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify({ email, password }),
});

if (!response.ok) {
throw new Error('Login failed');
}

const data = await response.json();
localStorage.setItem('token', data.token); // Store the JWT token in localStorage
setToken(data.token); // Update the parent state to indicate the user is logged in
} catch (error) {
setError('Invalid credentials');
}
};

return (
<div>
<h1>Login</h1>
<form onSubmit={handleSubmit}>
<input
type="email"
value={email}
onChange={(e) => setEmail(e.target.value)}
placeholder="Email"
required
/>
<input
type="password"
value={password}
onChange={(e) => setPassword(e.target.value)}
placeholder="Password"
required
/>
<button type="submit">Login</button>
</form>
{error && <p style={{ color: 'red' }}>{error}</p>}
</div>
);
};

export default Login;