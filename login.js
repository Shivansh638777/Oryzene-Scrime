const fs = require('fs');
const path = require('path');

// Admin login endpoint
// Expects JSON body: { email, password, code }
// Returns a session token placeholder. Replace with real JWT/secure session in production.

module.exports = (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });
  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => {
    try{
      const { email, password, code } = JSON.parse(body || '{}');
      const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'shivanshshukla8948@gmail.com';
      const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Sh@10204';
      const ADMIN_CODE = process.env.ADMIN_CODE || '05022006';

      // In production: do NOT fallback to hard-coded creds. Use env variables and secure hashing.
      if(email === ADMIN_EMAIL && password === ADMIN_PASSWORD && code === ADMIN_CODE){
        // Return a simple placeholder token. Replace with JWT or session management.
        const token = process.env.ADMIN_TOKEN || 'ADMIN_SESSION_TOKEN';
        return res.status(200).json({ token, message: 'Login successful' });
      }
      return res.status(401).json({ message: 'Invalid credentials' });
    }catch(err){
      return res.status(400).json({ message: 'Bad Request' });
    }
  });
};
