const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');


const ClienteSchema = new mongoose.Schema({

    id_cliente:{
        type: Number,
        required:true,
    },
    nome_cliente:{
        type: String,
        required:true,
    },
    registro_cliente:{
        type: String,
        required:false,
    },
    cidade_cliente:{
        type: String,
        required:false,
    },
    datacad_cliente:{
        type: Date,
        default: Date.now,
        required:false,
    },
    status_cliente:{
        type: String,
        required:false,
    },
  
});

ClienteSchema.plugin(mongoosePaginate);
mongoose.model('cliente',ClienteSchema);
