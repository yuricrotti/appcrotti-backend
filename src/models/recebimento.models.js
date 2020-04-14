const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

var Schema = mongoose.Schema;

const RecebimentoSchema = new mongoose.Schema({

    
    id_recebimento:{
        type: Number,
        required:true,
    },
    data_recebimento:{
        type: Date,
        default: Date.now,
        required:true,
    },
    status_recebimento:{
        type: String,
        required:true,
    },
    cheque_recebimento:[{
        type: Schema.Types.Mixed,
       
    }],
    dinheiro_recebimento:[{
        type: Schema.Types.Mixed,
    
    }],
    
    venda_recebimento:[{
        type : Schema.Types.ObjectId,
        ref : 'venda'
    
    }],
    datacad_recebimento:{
        type: Date,
        default: Date.now,
        required:true,
    },
   
   
  
});

RecebimentoSchema.plugin(mongoosePaginate);
mongoose.model('recebimento',RecebimentoSchema);