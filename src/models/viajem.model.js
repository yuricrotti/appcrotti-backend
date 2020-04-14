const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

var Schema = mongoose.Schema;

const ViajemSchema = new mongoose.Schema({

    
    id_viajem:{
        type: Number,
        required:true,
    },
    data_viajem:{
        type: Date,
        default: Date.now,
        required:true,
    },
    status_viajem:{
        type: String,
        required:true,
    },
    venda_viajem:{
        type: Schema.Types.Mixed,
        required:true,
    },
    compra_viajem:{
        type: Schema.Types.Mixed,
        required:true,
    },
   
   
  
});

ViajemSchema.plugin(mongoosePaginate);
mongoose.model('viajem',ViajemSchema);