import React, { useState } from 'react';
import { searchFoodByName, fetchFoodById } from '../api/foodApi';

const FoodSearch = () => {
  const [foodName, setFoodName] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [foodData, setFoodData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      const results = await searchFoodByName(foodName);
      setSearchResults(results.foods);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectFood = async (fdcId) => {
    setLoading(true);
    setError(null);
    
    try {
      const foodDetails = await fetchFoodById(fdcId);

      const filteredNutrients = foodDetails.foodNutrients.filter(
        (nutrient) => nutrient.nutrient.number === '203' || nutrient.nutrient.number === '291' || nutrient.nutrient.number === '269'
      );

      const nutrientAmounts = filteredNutrients.map((nutrient) => ({
        name: nutrient.nutrient.name,
        amount: nutrient.amount,
      }));

      const filteredFoodData = {
        fdcId: foodDetails.fdcId,
        description: foodDetails.description,
        foodPortions: foodDetails.foodPortions,
        nutrientAmounts: nutrientAmounts,
        // foodNutrients: filteredNutrients,
      }

      setFoodData(filteredFoodData);
      setSelectedFood(fdcId);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      <input
        type="text"
        value={foodName}
        onChange={(e) => setFoodName(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter food name"
      />
      <button onClick={handleSearch}>Search</button>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {searchResults.length > 0 && (
        <div>
          <h2>Search Results</h2>
          <ul>
            {searchResults.map((food) => (
              <li key={food.fdcId}>
                {food.description}
                <button onClick={() => handleSelectFood(food.fdcId)}>Select</button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {foodData && (
        <div>
          <h1>Food Details</h1>
          <p>Description: {foodData.description}</p>
          {/* <pre>{JSON.stringify(foodData, null, 2)}</pre> */}
          <h2>Nutrient Amounts</h2>
          <ul>
            {foodData.nutrientAmounts.map((nutrient, index) => (
              <li key={index}>
                {nutrient.name}: {nutrient.amount} {nutrient.nutrient.unitName}
              </li>
            ))}
          </ul>
          <h2>Food Portions</h2>
          <ul>
            {foodData.foodPortions.map((portion) => (
              <li key={portion.id}>
                {portion.description} {portion.amount} {portion.measureUnit.name} {portion.modifier}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
};

export default FoodSearch;