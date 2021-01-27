require('dotenv').config();

const app_port = process.env.PORT;

const express = require('express');

const { getConnection, db_instance } = require('./app/db_repository');

const router = require('./app/router')

const app = express();

app.use(async (req, res, next) => {
  const db_connection = await getConnection();

  const db_collection = db_instance(db_connection);
  
  res.locals = { db_collection };

  next();
});

app.use('/', router);

app.listen(app_port, () => {
  console.log(`app is live in port ${app_port}`);
});