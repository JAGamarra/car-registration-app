import { useState, useEffect } from "react";
import car from "./car.png";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import DeleteIcon from "@mui/icons-material/Delete";

import "./App.css";

const App = () => {
  const [cars, setCars] = useState([]);
  const [emptyData, setEmptyData] = useState(false);
  const [success, setSuccess] = useState(false);
  const [carInfo, setCarInfo] = useState({
    brand: "",
    model: "",
    year: "",
    horsepower: "",
  });

  useEffect(() => {
    const localStorageCars = JSON.parse(localStorage.getItem("carList"));
    setCars(localStorageCars);
  }, [setCars]);

  const { brand, model, year, horsepower } = carInfo;

  const handleCarInfo = ({ target }) => {
    setCarInfo({
      ...carInfo,
      [target.name]: target.value,
    });
  };

  const addCarHandler = () => {
    const newCar = {
      brand,
      model,
      year,
      horsepower,
      id: Math.random(),
    };

    if (brand === "" || model === "" || year === "" || horsepower === "") {
      setEmptyData(true);
      setTimeout(() => {
        setEmptyData(false);
      }, 3000);
      return;
    }
    const oldCars = [...cars];
    const newCars = oldCars.concat(newCar);
    setCars(newCars);
    localStorage.setItem("carList", JSON.stringify(newCars));
    setCarInfo({
      brand: "",
      model: "",
      year: "",
      horsepower: "",
    });
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  const deleteCarHandler = (id) => {
    // alert("Eliminado: ", id);
    const newCarList = cars.filter((car) => car.id !== id);
    setCars(newCarList);
    localStorage.setItem("carList", JSON.stringify(newCarList));
  };

  return (
    <div className="app">
      <img src={car} alt="#" style={{ width: "300px" }} />
      <h1 className="heading">ReactJS Car Registration App</h1>

      <TextField
        id="outlined-basic"
        label="Brand"
        variant="outlined"
        className="textField"
        name="brand"
        onChange={handleCarInfo}
        value={brand}
      />
      <TextField
        id="outlined-basic"
        label="Model"
        variant="outlined"
        className="textField"
        name="model"
        onChange={handleCarInfo}
        value={model}
      />
      <TextField
        id="outlined-basic"
        label="Year"
        variant="outlined"
        className="textField"
        name="year"
        onChange={handleCarInfo}
        value={year}
      />
      <TextField
        id="outlined-basic"
        label="Horsepower"
        variant="outlined"
        className="textField"
        name="horsepower"
        onChange={handleCarInfo}
        value={horsepower}
      />

      {emptyData && (
        <p className="errorMessage">Please, fields cannot be blank!</p>
      )}
      {success && <p className="successMessage">Added correctly!</p>}

      <Button
        variant="contained"
        color="success"
        className="button"
        onClick={addCarHandler}
      >
        REGISTER CAR
      </Button>
      <br />
      <br />
      <h2>Car List</h2>
      <Table sx={{ maxWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Brand</TableCell>
            <TableCell align="center">Model</TableCell>
            <TableCell align="center">Year</TableCell>
            <TableCell align="center">Horsepower</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cars.map(({ brand, model, year, horsepower, id }) => (
            <TableRow key={id}>
              <TableCell align="center"> {brand} </TableCell>
              <TableCell align="center"> {model} </TableCell>
              <TableCell align="center"> {year} </TableCell>
              <TableCell align="center"> {horsepower} </TableCell>
              <TableCell
                className="deleteIcon"
                align="center"
                onClick={() => deleteCarHandler(id)}
              >
                <DeleteIcon />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default App;
