import express from 'express';
import cors from 'cors';
import getFood from './routes/getFood.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5001;
const app = express();

app.use(cors());

app.use('/api', getFood);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});