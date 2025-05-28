const bcrypt = require('bcrypt');
const { users } = require('../models/user');

// User registration
exports.registerUser = (req, res) => {
    const { name, email, password, age } = req.body;

    // Check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) throw err;

        // Save new user (in-memory for now)
        const newUser = { id: users.length + 1, name, email, passwordHash: hashedPassword, age };
        users.push(newUser);
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    });
};

// User login
exports.loginUser = (req, res) => {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email);
    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare the user-provided password with the stored hash
    bcrypt.compare(password, user.passwordHash, (err, isMatch) => {
        if (err) {
            console.error('Error comparing password:', err);
            return;
        }

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Store the user ID in the session
        req.session.userId = user.id;
        res.status(200).json({ message: 'Login successful' });
    });
};

// User logout
exports.logoutUser = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to log out' });
        }
        res.status(200).json({ message: 'Logged out successfully' });
    });
};
