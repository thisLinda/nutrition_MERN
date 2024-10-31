import express from 'express';
import axios from 'axios';
import { env } from 'process';

const router = express.Router();

router.get('/api/food/:query', async (req, res) => {
  console.log('hi from inside the get')
  const query = req.params.query;
  console.log('Query received:', query);
  const apiKey = env.VITE_FOOD_API_KEY;
  const url = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${query}&api_key=${apiKey}`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error getting food data' });
  }
});

export default router;
