const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const cors = require('cors');
const {dados} = require('./src/dbconfig')

//Iniciando o app
const app = express();
//permite que envie dados para aplicação em formato de json
app.use(express.json());
app.use(cors());

//iniciando o DB
console.log(dados.url)
mongoose.connect(dados.url);

requireDir('./src/models');

app.use('/',require("./src/routes/routes"));

app.listen(4000);


//