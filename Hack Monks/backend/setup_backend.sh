#!/bin/bash

# Create folder structure
mkdir -p backend/{config,controllers,middlewares,models,routes,utils}

# Create environment variable file
cat > backend/.env <<EOL
MONGO_URI=your_mongo_connection_string
PORT=5000
EOL

# Create server.js
cat > backend/server.js <<EOL
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Error handling middleware
const { errorHandler } = require('./middlewares/errorHandler');
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(\`Server running on port \${PORT}\`));
EOL

# Create config/db.js
cat > backend/config/db.js <<EOL
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(\`MongoDB Connected: \${conn.connection.host}\`);
  } catch (error) {
    console.error(\`Error: \${error.message}\`);
    process.exit(1);
  }
};

module.exports = connectDB;
EOL

# Create models/User.js
cat > backend/models/User.js <<EOL
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Password hashing before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', userSchema);
EOL

# Create controllers/authController.js
cat > backend/controllers/authController.js <<EOL
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ name, email, password });
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { signup };
EOL

# Create routes/authRoutes.js
cat > backend/routes/authRoutes.js <<EOL
const express = require('express');
const { signup } = require('../controllers/authController');
const router = express.Router();

router.post('/signup', signup);

module.exports = router;
EOL

# Create utils/generateToken.js
cat > backend/utils/generateToken.js <<EOL
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = generateToken;
EOL

# Create middlewares/errorHandler.js
cat > backend/middlewares/errorHandler.js <<EOL
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = { errorHandler };
EOL

echo "Backend setup completed! Navigate to the 'backend' folder to start coding."
