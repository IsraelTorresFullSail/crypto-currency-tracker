import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Modal,
} from "@material-ui/core";
import "./coin.css";
import Chart from "./chart";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 800,
  },
  modal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    outline: "none",
  },
  paper: {
    position: "absolute",
    top: 8,
    bottom: 8,
    width: 800,
    backgroundColor: "#272d33",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    margin: theme.spacing(8, 4),
    overflow: "auto",
    borderRadius: "5px",
    outline: "none",
    maxHeight: "600px",
  },
  tableRow: {
    cursor: "pointer",
  },
}));

const Coin = ({ filteredCoins }) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [coinId, setCoinId] = useState("");
  const [coinName, setCoinName] = useState("");
  const [coinImg, setCoinImg] = useState("");
  const [chartColor, setChartColor] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpen = (id, name, image, color) => {
    setOpen(true);
    setCoinId(id);
    setCoinName(name);
    setCoinImg(image);
    setChartColor(color);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Icon</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Symbol</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Volume</TableCell>
              <TableCell align="center">Last 24h</TableCell>
              <TableCell align="center">Market Cap</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCoins
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((coin) => {
                return (
                  <React.Fragment key={coin.id}>
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      onClick={() =>
                        handleOpen(coin.id, coin.name, coin.image, {
                          color:
                            coin.price_change_percentage_24h < 0
                              ? "#ef233c"
                              : "#26c485",
                        })
                      }
                      className={classes.tableRow}
                    >
                      <TableCell component="th" scope="row" align="center">
                        <img src={coin.image} alt="crypto" />
                      </TableCell>
                      <TableCell component="th" scope="row" align="center">
                        {coin.name}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        align="center"
                        className="coin-symbol"
                      >
                        {coin.symbol}
                      </TableCell>
                      <TableCell component="th" scope="row" align="center">
                        ${coin.current_price.toLocaleString("en-US")}
                      </TableCell>
                      <TableCell component="th" scope="row" align="center">
                        ${coin.total_volume.toLocaleString("en-US")}
                      </TableCell>
                      <TableCell component="th" scope="row" align="center">
                        {coin.price_change_percentage_24h < 0 ? (
                          <p className=" red">
                            {coin.price_change_percentage_24h.toFixed(2)}%
                          </p>
                        ) : (
                          <p className=" green">
                            {coin.price_change_percentage_24h.toFixed(2)}%
                          </p>
                        )}
                      </TableCell>
                      <TableCell component="th" scope="row" align="center">
                        ${coin.market_cap.toLocaleString("en-US")}
                      </TableCell>
                    </TableRow>
                    <Modal
                      className={classes.modal}
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="simple-modal-title"
                      aria-describedby="simple-modal-description"
                    >
                      <div className={classes.paper}>
                        <Chart
                          id={coinId}
                          name={coinName}
                          image={coinImg}
                          color={chartColor}
                        />
                      </div>
                    </Modal>
                  </React.Fragment>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <Paper className={classes.root}>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={filteredCoins.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </Paper>
  );
};

export default Coin;
