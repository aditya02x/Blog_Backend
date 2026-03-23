import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import authroute from './src/routes/auth.route.js'

dotenv.config();

const app = express();

// middleware
app.use(express.json());

// test route
app.get('/', (req, res) => {
  res.send('API running');
});

app.use('/api/auth',authroute)

const PORT = process.env.PORT || 5000;

// start server properly
const startServer = async () => {
  try {
    await connectDB(); // wait for DB
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(`Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

startServer();