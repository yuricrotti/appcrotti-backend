const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;

const ParcelaSchema = new mongoose.Schema({

    id_parcela:{
        type: Number,
        required:true,
    },
    datapagamento_parcela:{
        type: Date,
        default: Date.now,
        required:true,
    },
    fornecedor_parcela:{
        type : Schema.Types.ObjectId, 
        ref : 'fornecedor', 
        require : false,
    },
    valor_parcela:{
        type: Number,
        required:true,
    },
    status_parcela:{
        type: String,
        required:true,
    },
    datacad_parcela:{
        type: Date,
        default: Date.now,
        required:true,
    },
    
    
    
  
});

ParcelaSchema.plugin(mongoosePaginate);
mongoose.model('parcela',ParcelaSchema);
