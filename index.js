const express = require("express");
const { route } = require("./routes");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:3000" }));
app.use(cors({ origin: true, credentials: true }));

const port = 4000;
require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(route);
app.listen(port, () => console.log(`Server running on port ${port}`));
