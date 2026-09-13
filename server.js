require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const newsRouter = require('./routes/news-routes');

const app = express();

// Middleware with updated CORS for Vercel production frontend
app.use(cors({
  origin: [
    'https://news-app-frontend-tau.vercel.app',
    'http://localhost:5173',
    'http://localhost:3000'
  ],
  credentials: true
}));
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch((err) => console.log('MongoDB Connection Error:', err.message));

// Routes
app.use('/api', newsRouter);

// Express Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});