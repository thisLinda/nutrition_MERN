import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/foods/list', async (req, res) => {
  const apiKey = process.env.VITE_FOOD_API_KEY;
  const url = `https://api.nal.usda.gov/fdc/v1/foods/list?dataType=Foundation,SR%20Legacy&pageSize=25&pageNumber=2&api_key=${apiKey}`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error getting food data' });
  }
});

router.get('/foods/search', async (req, res) => {
  const apiKey = process.env.VITE_FOOD_API_KEY;
  const query = req.query.query;
  const url = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${query}&pageSize=25&pageNumber=2&api_key=${apiKey}`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error searching for food data' });
  }
});

router.get('/food/:fdcId', async (req, res) => {
  const apiKey = process.env.VITE_FOOD_API_KEY;
  const fdcId = req.params.fdcId;
  const url = `https://api.nal.usda.gov/fdc/v1/${fdcId}?api_key=${apiKey}`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error getting food data by ID' });
  }
});

export default router;
