import React, { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const foodQuery = 'apple';
        const res = await fetch(`/api/food/${foodQuery}`);
        const data = await res.json();
        setMessage(JSON.stringify(data));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
  <div>
    <h1>Fetched Food Data</h1>
    <pre>{JSON.stringify(message, null, 2)}</pre>
  </div>)
}

export default App;
