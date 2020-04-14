const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const cors = require('cors');

//Iniciando o app
const app = express();
//permite que envie dados para aplicação em formato de json
app.use(express.json());
app.use(cors());

//iniciando o DB
mongoose.connect('mongodb://localhost:27017/appcrotti',{useNewUrlParser: true});

requireDir('./src/models');

app.use('/',require("./src/routes/routes"));

app.listen(4000);


//