const mongoose = require('mongoose');
const compra = mongoose.model('compra');

module.exports = {
    async showall(req,res){
        const compras = await compra.find({});
        console.log("------SHOWALL (compras)-----")
        console.log(compras)
        return res.json(compras);
    },

    async save(req,res){
        const compras = await compra.create(req.body);
        console.log("------SAVE (compras)-----")
        console.log(compras)
        return res.json(compras);
    },

    async show(req,res){
        filtros = {}
        console.log("------ SHOW FILTER (compras)-----")
       
        let query = req.query
        Object.keys(query).forEach(function(item){
            filtro = JSON.parse(query[item])
            Object.keys(filtro).forEach(function(campo){
                
                if(campo == "status_compra"){
                    const cond1 = filtro.cond1
                    const valor = filtro.status_compra
                    
                    if(cond1=="$eq"){
                    filtros.status_compra = {"$eq":valor}
                    }
                }
    
                if(campo == "data_compra"){
                    
                    const cond1 = filtro.cond1
                    const cond2 = filtro.cond2
    
                    if(cond1 ==="$gte"|| cond2 === "$lt"){
                        var datas = filtro.data_compra
                        var array_data = datas.split(",");
                     
                        var data_incial  = new Date(array_data[0]);
                        var data_final  =  new Date(array_data[1]);
    
                        filtros.data_compra = { 
                            '$gte': data_incial,
                            '$lt': data_final
                        }
                    }
        
                }
    
                if(campo == "fornecedor_compra"){
                    
                    const cond1 = filtro.cond1
                    const valor = filtro.fornecedor_compra
                    
                    if(cond1=="$eq" && (valor.length > 0 || valor.length == undefined)){
                        filtros.fornecedor_compra = {"$eq":mongoose.Types.ObjectId(valor._id)}
                    }
                    
                }
            });
        });
       
        console.log(filtros)

        const compras = await compra.aggregate([
             {$match: { $and: [filtros]}},
             {  $lookup:{
                        from:"fornecedors",
                        localField:"fornecedor_compra",
                        foreignField:"_id",
                        as:"listaforn"
                            
                       }
            }
        ]
        );


       // const despesas = await despesa.find({filtros})
       // console.log(compras)
        return res.json(compras);

       
    },
   

    
    async updateestatus (req,res){
        console.log("-----Alterando Status Compra----")
        console.log("ID:"+ req.params.id)
        console.log("Status atual :"+ req.body.status_atual)
        let novo_status = ''
        if(req.body.status_atual == 'E'){
            novo_status = 'P'    
        }else{
            novo_status = 'E'
        }
        console.log("Novo Status:"+novo_status)
        const compras = await compra.updateOne({id_compra:req.params.id},{status_compra:novo_status});
        return res.json(compras);
    },

};


