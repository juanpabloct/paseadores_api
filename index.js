const express = require("express");
const { route } = require("./routes");
const app = express();
const cors = require("cors");
const corsOptions = { origin: "*", optionsSuccessStatus: 200 };
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(cors(corsOptions));

const port = 4000;
require("dotenv").config();
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use(express.urlencoded({ extended: true }));

app.use(route);
app.listen(port, () => console.log(`Server running on port ${port}`));
