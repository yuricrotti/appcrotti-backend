const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

var Schema = mongoose.Schema;

const CompraSchema = new mongoose.Schema({
  

    id_compra:{
        type: Number,
        required:true,
    },
    fornecedor_compra:{
        type : Schema.Types.ObjectId, 
        ref : 'fornecedor', 
        require : true,
    },
    produto_compra:{
        type: String,
        required:true,
    },
    quantidade_compra:{
        type: Number,
        default: 1,
        required:true,
    },
    valor_compra:{
        type: Number,
        default: 1,
        required:true,
    },
    valor_total_compra:{
        type: Number,
        default: 1,
        required:true,
    },
    status_compra:{
        type: String,
        required:true,
    },
    data_compra:{
        type: Date,
        default: Date.now,
        required:true,
    },
    datacad_compra:{
        type: Date,
        default: Date.now,
        required:true,
    },

  
});

CompraSchema.plugin(mongoosePaginate);
mongoose.model('compra',CompraSchema);