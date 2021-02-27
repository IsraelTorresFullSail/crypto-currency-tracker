import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: "100%",
    backgroundColor: "#272d33",
  },
});

const Chart = ({ id, name, image, color }) => {
  const classes = useStyles();
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7&interval=daily`
      )
      .then((response) => {
        let dataPrices = [];
        response.data.prices.map(
          (price) => (dataPrices = [...dataPrices, { price: price[1] }])
        );
        setPrices(dataPrices);
      })
      .catch((error) => console.log(error));
  }, [id]);

  return (
    <div
      style={{ width: "100%", height: 400, minWidth: "750px" }}
      className={classes.root}
    >
      <Grid container justify="flex-start" alignItems="center" spacing={2}>
        <Grid item xs={1}>
          <img src={image} alt="crypto" />
        </Grid>
        <Grid item xs={6}>
          <h2>{name}</h2>
        </Grid>
        <Grid item xs={12}>
          <h3>Last 7 days price changes</h3>
        </Grid>
      </Grid>

      <br></br>
      <ResponsiveContainer>
        <AreaChart
          data={prices}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="price"
            stroke={color.color}
            fill={color.color}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
