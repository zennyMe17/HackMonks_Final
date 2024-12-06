// server.js (Your main server file)
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // Import CORS
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const quizRoutes = require('./routes/quizRoutes');


dotenv.config();
connectDB();

const app = express();

app.use(cors({ origin: 'http://localhost:3000' })); // Replace with your frontend URL


app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/auth/quiz', quizRoutes); // Backend route for quiz submission


// Error handling middleware
const { errorHandler } = require('./middlewares/errorHandler');
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
