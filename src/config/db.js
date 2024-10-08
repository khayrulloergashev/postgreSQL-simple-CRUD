const { Sequelize } = require("sequelize");

const path = require("path");
const { Client } = require("pg");

require("dotenv").config({
  path: path.join(__dirname, "./env"),
});

const dbconfig = {
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  user: process.env.USER,
  host: "localhost",
};

const dbConnection = async () => {
  const newClient = new Client({
    host: dbconfig.host,
    user: dbconfig.user,
    password: dbconfig.password,
    port: 5432,
  });

  try {
    await newClient.connect();

    const res = await newClient.query(
      `SELECT 1 FROM pg_database WHERE datname='${dbconfig.database}';`
    );

    if (res.rowCount === 0) {
      await newClient.query(`CREATE DATABASE "${dbconfig.database}";`);
    }
  } catch (error) {
    console.log("Error creating the database:", error);
  } finally {
    await newClient.end();
  }
};

let sequelize;

(async () => {
  try {
    sequelize = new Sequelize(
      dbconfig.database,
      dbconfig.user,
      dbconfig.password,
      {
        host: "localhost",
        dialect: "postgres",
        port: 5432,
        logging: false,
      }
    );

    await dbConnection();
    await sequelize.authenticate();
    console.log("Connection has been successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = sequelize;
