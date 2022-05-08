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
app.use(express.urlencoded({ extended: true }));

app.use(route);
app.listen(port, () => console.log(`Server running on port ${port}`));
