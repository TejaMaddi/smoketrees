const express = require('express');
const bodyParser = require('body-parser');
const { User, Address } = require('./models');

const app = express();
app.use(bodyParser.json());

// POST /register: Register user and address
app.post('/register', async (req, res) => {
  try {
    const { name, street, city, state, zip } = req.body;

    // Create User
    const user = await User.create({ name });

    // Create Address linked to the user
    await Address.create({
      street,
      city,
      state,
      zip,
      userId: user.id,
    });

    res.status(201).json({ message: 'User and address created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error creating user or address', details: error.message });
  }
});

// GET /users: Get all users and their addresses
app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll({
      include: [{ model: Address, as: 'addresses' }],
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users', details: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
