import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Coin from "./components/coin";

import { Grid } from "@material-ui/core";
import Navbar from "./components/appbar";

const App = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((response) => {
        setCoins(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <React.Fragment>
      <Navbar handleChange={handleChange} />

      <Grid container className="coin-app">
        <Grid item xs={12}>
          <Coin filteredCoins={filteredCoins} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default App;
