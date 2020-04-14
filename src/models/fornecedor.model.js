const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');


const FornecedorSchema = new mongoose.Schema({

    id_fornecedor:{
        type: Number,
        required:true,
    },
    nome_fornecedor:{
        type: String,
        required:true,
    },
    registro_fornecedor:{
        type: String,
        required:false,
    },
    cidade_fornecedor:{
        type: String,
        required:false,
    },
    datacad_fornecedor:{
        type: Date,
        default: Date.now,
        required:false,
    },
    status_fornecedor:{
        type: String,
        required:false,
    },
  
});

FornecedorSchema.plugin(mongoosePaginate);
mongoose.model('fornecedor',FornecedorSchema);
