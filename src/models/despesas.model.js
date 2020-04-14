const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

var Schema = mongoose.Schema;

const DepesesaSchema = new mongoose.Schema({

    id_despesa:{
        type: Number,
        required:true,
    },
    tipo_despesa:{
        type: String,
        required:true,
    },
    fornecedor_despesa:{
        type : Schema.Types.ObjectId, 
        ref : 'fornecedor', 
        require : true,
    },
    parcelas_despesa:[{
        type : Schema.Types.ObjectId, 
        ref : 'parcela', 
        require : false,
    }],
    descricao_despesa:{
        type: String,
        required:true,
    },
    numeroparcela_despesa:{
        type: Number,
        default: 1,
        required:true,
    },
    valortotal_despesa:{
        type: Number,
        required:true,
    },
    status_despesa:{
        type: String,
        required:true,
    },
    datacad_despesa:{
        type: Date,
        default: Date.now,
        required:true,
    },
    
    
    
  
});

DepesesaSchema.plugin(mongoosePaginate);
mongoose.model('despesa',DepesesaSchema);