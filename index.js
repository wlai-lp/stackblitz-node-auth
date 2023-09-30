// run `node index.js` in the terminal
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = 'your-secret-key';

console.log(`Hello Node.js v${process.versions.node}!`);

// Middleware
app.use(bodyParser.json());

// Sample user database (replace with a real database)
const users = [
  { id: 1, username: 'user1', password: 'password1' },
  { id: 2, username: 'user2', password: 'password2' },
];

// Route to register a new user
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  // Check if the user already exists
  if (users.find((user) => user.username === username)) {
    return res.status(400).json({ message: 'User already exists' });
  }
  // Add the new user to the database (in a real app, hash the password)
  const newUser = { id: users.length + 1, username, password };
  users.push(newUser);
  res.status(201).json({ message: 'User registered successfully' });
});

// Route to authenticate a user and generate a token
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Check if the user exists and the password is correct
  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  // Generate a JWT token
  const token = jwt.sign({ userId: user.id, userName: 'wei' }, SECRET_KEY, {
    expiresIn: '1h', // Token expires in 1 hour (adjust as needed)
  });
  res.json({ token });
});

// Protected route (requires a valid token)
app.get('/protected', (req, res) => {
  console.log(`token is ${req.header('Authorization')}`);
  // const token = req.header('Authorization')?.split(' ')[1];
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Access denied' });
  }
  // Verify the token
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    // Token is valid, you can perform protected actions here
    res.json({ message: 'Protected route accessed', user: decoded });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
