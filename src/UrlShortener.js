import React, { useState, useEffect } from 'react';

const UrlShortener = () => {
const [fullUrl, setFullUrl] = useState('');
const [shortUrls, setShortUrls] = useState([]);
const [loading, setLoading] = useState(false);
const [token, setToken] = useState(localStorage.getItem('token'));

useEffect(() => {
fetchShortUrls();
}, []);

const fetchShortUrls = async () => {
try {
const response = await fetch('/api/shortUrls', {
headers: {
Authorization: `Bearer ${token}`, // Pass the token for authentication
},
});
if (!response.ok) {
throw new Error(`HTTP error! status: ${response.status}`);
}
const data = await response.json();
setShortUrls(data);
} catch (error) {
console.error('Error fetching short URLs:', error);
}
};

const handleSubmit = async (e) => {
e.preventDefault();
if (!fullUrl) return;

setLoading(true);

try {
const response = await fetch('/shortUrls', {
method: 'POST',
headers: {
'Content-Type': 'application/json',
Authorization: `Bearer ${token}`, // Add the token to the request header
},
body: JSON.stringify({ full: fullUrl }),
});

if (!response.ok) {
throw new Error(`Failed to shorten URL: ${response.statusText}`);
}

setFullUrl('');
fetchShortUrls();
} catch (error) {
console.error('Error shortening URL:', error);
} finally {
setLoading(false);
}
};

return (
<div>
<h1>URL Shortener</h1>
{token ? (
<>
<form onSubmit={handleSubmit}>
<input
type="url"
value={fullUrl}
onChange={(e) => setFullUrl(e.target.value)}
placeholder="Enter URL to shorten"
required
/>
<button type="submit" disabled={loading}>Shorten</button>
</form>
{loading && <p>Loading...</p>}

<ul>
{shortUrls.map((shortUrl) => (
<li key={shortUrl.short}>
{shortUrl.full} - <a href={shortUrl.full} target="_blank" rel="noopener noreferrer">
{shortUrl.short}
</a>
</li>
))}
</ul>
</>
) : (
<p>You must log in to create short URLs.</p>
)}
</div>
);
};

export default UrlShortener;
