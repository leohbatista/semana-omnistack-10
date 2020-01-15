const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/week10', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});

app.use(routes);

app.listen(3333);
