require("dotenv").config();
const { USER, HOST, DATABASE, PASSWORD, PORT } = process.env;
const { Client } = require("pg");
const connectionData = {
  user: USER,
  host: HOST,
  database: DATABASE,
  password: PASSWORD,
  port: PORT,
};
const client = new Client(connectionData);
module.exports = client;
