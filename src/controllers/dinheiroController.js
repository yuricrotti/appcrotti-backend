const mongoose = require('mongoose');
const dinheiro = mongoose.model('dinheiro');

module.exports = {
    async showall(req,res){
        const dinheiros = await dinheiro.find({});
        console.log("------SHOWALL (dinheiro)-----")
        console.log(dinheiros)
        return res.json(dinheiros);
    },

    async save(req,res){
        const dinheiros = await dinheiro.create(req.body);
        console.log("------SAVE (dinheiro)-----")
        console.log(dinheiros)
        return res.json(dinheiros);
    },

    async show(req,res){
        filtros = {}
        console.log("------FILTER SHOW (dinheiro)-----")
        let query = req.query
        Object.keys(query).forEach(function(item){
            filtro = JSON.parse(query[item])
            Object.keys(filtro).forEach(function(campo){
               
                if(campo == "data_dinheiro"){
                    
                    const cond1 = filtro.cond1
                    const cond2 = filtro.cond2
    
                    if(cond1 ==="$gte"|| cond2 === "$lt"){

                        var datas = filtro.data_dinheiro
                        var array_data = datas.split(",");
                     
                        var data_incial  = new Date(array_data[0]);
                        var data_final  =  new Date(array_data[1]);
    
                        filtros.data_dinheiro = { 
                            '$gte': new Date(data_incial),
                            '$lt': new Date(data_final)
                        }
                    }
        
                }
    
            
            });
        });
        
       
        console.log(filtros)

        const dinheiros = await dinheiro.aggregate([
             {$match: { $and: [filtros]}}
             
        ]
        );


       // const despesas = await despesa.find({filtros})
        console.log(dinheiros)
        return res.json(dinheiros);

       
    },



   

};