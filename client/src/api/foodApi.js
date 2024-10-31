export const fetchFoodData = async () => {
  try {
    const res = await fetch('/api/foods/list');
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const searchFoodByName = async (name) => {
  try {
    const res = await fetch(`/api/foods/search?query=${name}`)
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error searching for food by name:', error);
    throw error;
  }
};

export const fetchFoodById = async (id) => {
  try {
    const res = await fetch(`/api/food/${id}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching food by ID:', error);
    throw error;
  }
}