const { Sequelize } = require('sequelize');
require("dotenv").config();

const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname') 