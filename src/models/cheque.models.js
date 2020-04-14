const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

var Schema = mongoose.Schema;

const ChequeSchema = new mongoose.Schema({

    
    id_cheque:{
        type: Number,
        required:true,
    },  
    nome_cheque:{
        type: String,
        required:true,
    },
    valor_cheque:{
        type: Number,
        default: 1,
        required:true,
    },
    data_cheque:{
        type: Date,
        default: Date.now,
        required:true,
    },
    datacad_cheque:{
        type: Date,
        default: Date.now,
        required:true,
    },
    status_cheque:{
        type: String,
        required:true,
    },

  
});

ChequeSchema.plugin(mongoosePaginate);
mongoose.model('cheque',ChequeSchema);