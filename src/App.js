// Import useState and useEffect hooks from React
import React, { useState, useEffect } from 'react'
// Import the API category from AWS Amplify
import { API } from 'aws-amplify'
import './App.css';
function App() {
  // Create coins variable and set to empty array
  const [coins, updateCoins] = useState([])

  // create additional state to hold user input for limit and start properties
  const [input, updateInput] = useState({ limit: 0, start: 0 });

  // create a new function to allow users to update the input value
  function updateInputValue(type, value) {
    updateInput({ ...input, [type]: value })
  }

  // Define function to all API
  async function fetchCoins() {
    console.log("clicked");
    const { limit, start } = input
    const data = await API.get('cryptoapi', `/coins?limit=${limit}&start=${start}`)
    console.log("clicked: ", data);
    updateCoins(data.coins)
    console.log("clicked.coins: ", data.coins);
  }
  // Call fetchCoins function when component loads
  useEffect(() => {
    fetchCoins()
  }, [])
  return (
    <div className="App">
      {/* add input fileds to the UI for user input */}
      <input
        onChange={e => updateInputValue('limit', e.target.value)}
        placeholder='limit'
      />

      <input
        onChange={e => updateInputValue('start', e.target.value)}
        placeholder='start'
      />
      {/* // add button to the UI to give user the option to call the API */}
      <button onClick={fetchCoins}>Fetch Coins</button>
      {
        coins.map((coin, index) => (
          <div key={index}>
            <h2>{coin.name} - {coin.symbol}</h2>
            <h5>${coin.price_usd}</h5>
          </div>
        ))
      }

    </div >
  );
}
export default App