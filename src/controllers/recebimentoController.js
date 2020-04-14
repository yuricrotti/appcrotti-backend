const mongoose = require('mongoose');
const recebimento = mongoose.model('recebimento');

module.exports = {
    async showall(req,res){
        const recebimentos = await recebimento.find({});
        console.log("------SHOWALL (recebimento)-----")
        console.log(recebimentos)
        return res.json(recebimentos);
    },

    async save(req,res){
        const recebimentos = await recebimento.create(req.body);
        console.log("------SAVE (recebimentos)-----")
        console.log(recebimentos)
        return res.json(recebimentos);
    },

    async show(req,res){
        filtros = {}
        console.log("------ SHOW FILTER (recebimentos)-----")
       
        let query = req.query
        Object.keys(query).forEach(function(item){
            filtro = JSON.parse(query[item])
            Object.keys(filtro).forEach(function(campo){
                
                if(campo == "status_recebimento"){
                    const cond1 = filtro.cond1
                    const valor = filtro.status_recebimento
                    
                    if(cond1=="$eq"){
                    filtros.status_recebimento = {"$eq":valor}
                    }
                }
    
                if(campo == "data_recebimento"){
                    
                    const cond1 = filtro.cond1
                    const cond2 = filtro.cond2
    
                    if(cond1 ==="$gte"|| cond2 === "$lt"){
                        var Data  = new Date(filtro.data_recebimento);
                        var FirstDay = new Date(Data.getFullYear(), Data.getMonth()+1, 1);
                        var LastDay = new Date(Data.getFullYear(), Data.getMonth()+2, 0);
    
                        filtros.data_recebimento = { 
                            '$gte': new Date(FirstDay),
                            '$lt': new Date(LastDay)
                        }
                    }
        
                }
    
                
            });
        });
        
       
        console.log(filtros)

        const recebimentos = await recebimento.aggregate([
             {$match: { $and: [filtros]}},
             {  $lookup:
                            {
                                from:"vendas",
                                localField:"venda_recebimento",
                                foreignField:"_id",
                                as:"listavendas"   
                            }
                
            }
            
        ]
        );


       // const despesas = await despesa.find({filtros})
        console.log(recebimentos)
        return res.json(recebimentos);

       
    },

   

};