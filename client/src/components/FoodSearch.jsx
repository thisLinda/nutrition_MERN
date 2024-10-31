import React, { useState } from 'react';
import { searchFoodByName, fetchFoodById } from '../api/foodApi';

const FoodSearch = () => {
  const [foodName, setFoodName] = useState('');
  const [foodData, setFoodData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      const searchResults = await searchFoodByName(foodName);
      if (searchResults.foods && searchResults.foods.length > 0) {
        const foodId = searchResults.foods[0].fdcId;
        const foodDetails = await fetchFoodById(foodId);

        // Create a new object to hold the desired results
        const filteredNutrients = foodDetails.foodNutrients.filter(
          (nutrient) => nutrient.nutrient.number === '203' || nutrient.nutrient.number === '291'
        );

        // New object with only the filtered parameters (additional information returned otherwise)
        const filteredFoodData = {
          fdcId: foodDetails.fdcId,
          description: foodDetails.description,
          foodNutrients: filteredNutrients,
          publicationDate: foodDetails.publicationDate,
        }

        setFoodData(filteredFoodData);
      } else {
        setFoodData(null);
        setError('No food found with that name');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={foodName}
        onChange={(e) => setFoodName(e.target.value)}
        placeholder="Enter food name"
      />
      <button onClick={handleSearch}>Search</button>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {foodData && (
        <div>
          <h1>Food Details</h1>
          <pre>{JSON.stringify(foodData, null, 2)}</pre>
        </div>
      )}
    </div>
  )
};

export default FoodSearch;