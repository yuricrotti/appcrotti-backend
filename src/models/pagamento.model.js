const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

var Schema = mongoose.Schema;

const PagamentoSchema = new mongoose.Schema({

    
    id_pagamento:{
        type: Number,
        required:true,
    },
    data_pagamento:{
        type: Date,
        default: Date.now,
        required:true,
    },
    status_pagamento:{
        type: String,
        required:true,
    },
    cheque_pagamento:[{
        type: Schema.Types.Mixed,
       
    }],
    dinheiro_pagamento:[{
        type: Schema.Types.Mixed,
    
    }],
    
    compra_pagamento:[{
        type : Schema.Types.ObjectId,
        ref : 'compra'
    
    }],
    datacad_pagamento:{
        type: Date,
        default: Date.now,
        required:true,
    },
   
   
  
});

PagamentoSchema.plugin(mongoosePaginate);
mongoose.model('pagamento',PagamentoSchema);