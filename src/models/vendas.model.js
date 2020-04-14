const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

var Schema = mongoose.Schema;

const VendaSchema = new mongoose.Schema({

    
    id_venda:{
        type: Number,
        required:true,
    },
    cliente_venda:{
        type : Schema.Types.ObjectId, 
        ref : 'fornecedor', 
        require : true,
    },
    produto_venda:{
        type: String,
        required:true,
    },
    quantidade_venda:{
        type: Number,
        default: 1,
        required:true,
    },
    valor_venda:{
        type: Number,
        default: 1,
        required:true,
    },
    valor_total_venda:{
        type: Number,
        default: 1,
        required:true,
    },
    status_venda:{
        type: String,
        required:true,
    },
    data_venda:{
        type: Date,
        default: Date.now,
        required:true,
    },
    datacad_venda:{
        type: Date,
        default: Date.now,
        required:true,
    },

  
});

VendaSchema.plugin(mongoosePaginate);
mongoose.model('venda',VendaSchema);