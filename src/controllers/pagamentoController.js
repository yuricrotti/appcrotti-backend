const mongoose = require('mongoose');
const pagamento = mongoose.model('pagamento');

module.exports = {
    async showall(req,res){
        const pagamentos = await pagamento.find({});
        console.log("------SHOWALL (pagamento)-----")
        console.log(pagamentos)
        return res.json(pagamentos);
    },

    async save(req,res){
        const pagamentos = await pagamento.create(req.body);
        console.log("------SAVE (pagamento)-----")
        console.log(pagamentos)
        return res.json(pagamentos);
    },

    async show(req,res){
        filtros = {}
        console.log("------ SHOW FILTER (pagamento)-----")
        let query = req.query
        Object.keys(query).forEach(function(item){
            filtro = JSON.parse(query[item])
            Object.keys(filtro).forEach(function(campo){
                
                if(campo == "status_pagamento"){
                    const cond1 = filtro.cond1
                    const valor = filtro.status_pagamento
                    
                    if(cond1=="$eq"){
                    filtros.status_pagamento = {"$eq":valor}
                    }
                }
    
                if(campo == "data_pagamento"){
                    
                    const cond1 = filtro.cond1
                    const cond2 = filtro.cond2
    
                    if(cond1 ==="$gte"|| cond2 === "$lt"){
                        var Data  = new Date(filtro.data_pagamento);
                        var FirstDay = new Date(Data.getFullYear(), Data.getMonth()+1, 1);
                        var LastDay = new Date(Data.getFullYear(), Data.getMonth()+2, 0);
    
                        filtros.data_pagamento = { 
                            '$gte': new Date(FirstDay),
                            '$lt': new Date(LastDay)
                        }
                    }
        
                }
    
            
            });
        });
        
       
        console.log(filtros)

        const pagamentos = await pagamento.aggregate([
             {$match: { $and: [filtros]}},
             {  $lookup:
                            {
                                from:"compras",
                                localField:"compra_pagamento",
                                foreignField:"_id",
                                as:"listacompras"   
                            }
                
            }
            
        ]
        );


       // const despesas = await despesa.find({filtros})
        console.log(pagamentos)
        return res.json(pagamentos);

       
    },

   

};