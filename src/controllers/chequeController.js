const mongoose = require('mongoose');
const cheque = mongoose.model('cheque');

module.exports = {
    async showall(req,res){
        const cheques = await cheque.find({});
        console.log("------SHOWALL (cheque)-----")
        console.log(cheques)
        return res.json(cheques);
    },

    async save(req,res){
        const cheques = await cheque.create(req.body);
        console.log("------SAVE (cheque)-----")
        console.log(cheques)
        return res.json(cheques);
    },


    async show(req,res){
        filtros = {}
   
        console.log("------ SHOW FILTER (cheqye)-----")
        let query = req.query
        Object.keys(query).forEach(function(item){
            filtro = JSON.parse(query[item])
            Object.keys(filtro).forEach(function(campo){
                
                
                if(campo == "data_cheque"){
                    
                    const cond1 = filtro.cond1
                    const cond2 = filtro.cond2
    
                    if(cond1 ==="$gte"|| cond2 === "$lt"){
                     
                        var datas = filtro.data_cheque
                        var array_data = datas.split(",");
                     
                        var data_incial  = new Date(array_data[0]);
                        var data_final  =  new Date(array_data[1]);
    
                        filtros.data_cheque = { 
                            '$gte': new Date(data_incial),
                            '$lt': new Date(data_final)
                        }
                    }
        
                }
    
                
            });
        });
        
       
        console.log(filtros)

        const cheques = await cheque.aggregate([
             {$match: { $and: [filtros]}}
             
        ]
        );


       // const despesas = await despesa.find({filtros})
        console.log(cheques)
        return res.json(cheques);

       
    },



};