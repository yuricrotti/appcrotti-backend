const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

var Schema = mongoose.Schema;

const DinheiroSchema = new mongoose.Schema({

    
    id_dinheiro:{
        type: Number,
        required:true,
    },  
    valor_dinheiro:{
        type: Number,
        default: 1,
        required:true,
    },
    datacad_dinheiro:{
        type: Date,
        default: Date.now,
        required:true,
    },
    data_dinheiro:{
        type: Date,
        default: Date.now,
        required:true,
    },
    status_dinheiro:{
        type: String,
        required:true,
    },

  
});

DinheiroSchema.plugin(mongoosePaginate);
mongoose.model('dinheiro',DinheiroSchema);