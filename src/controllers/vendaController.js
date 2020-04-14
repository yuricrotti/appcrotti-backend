const mongoose = require('mongoose');
const venda = mongoose.model('venda');

module.exports = {
    async showall(req,res){
        const vendas = await venda.find({});
        console.log("------SHOWALL (vendas)-----")
        console.log(vendas)
        return res.json(vendas);
    },

    async save(req,res){
        const vendas = await venda.create(req.body);
        console.log("------SAVE (vendas)-----")
        console.log(vendas)
        return res.json(vendas);
    },



    async show(req,res){
        
    filtros = {}
    console.log("------ SHOW FILTER (vendas)-----")
    let query = req.query
    Object.keys(query).forEach(function(item){
        filtro = JSON.parse(query[item])
        Object.keys(filtro).forEach(function(campo){
            
            if(campo == "status_venda"){
                const cond1 = filtro.cond1
                const valor = filtro.status_venda
                
                if(cond1=="$eq"){
                filtros.status_venda = {"$eq":valor}
                }
            }

            if(campo == "data_venda"){
                
                const cond1 = filtro.cond1
                const cond2 = filtro.cond2

                if(cond1 ==="$gte"|| cond2 === "$lt"){
                    var Data  = new Date(filtro.data_venda);
                    var FirstDay = new Date(Data.getFullYear(), Data.getMonth()+1, 1);
                    var LastDay = new Date(Data.getFullYear(), Data.getMonth()+2, 0);

                    filtros.data_venda = { 
                        '$gte': new Date(FirstDay),
                        '$lt': new Date(LastDay)
                    }
                }
    
            }

            if(campo == "cliente_venda"){
                
                const cond1 = filtro.cond1
                const valor = filtro.cliente_venda
                
                if(cond1=="$eq" && (valor.length > 0 || valor.length == undefined)){
                    filtros.cliente_venda = {"$eq":mongoose.Types.ObjectId(valor._id)}
                }
                
            }
        });
    });

    console.log(filtros)

    const vendas = await venda.aggregate([
            {$match: { $and: [filtros]}},
            {  $lookup:{
                    from:"clientes",
                    localField:"cliente_venda",
                    foreignField:"_id",
                    as:"listacliente"
                        
                    }
        }
    ]
    );


    // const despesas = await despesa.find({filtros})
    console.log(vendas)
    return res.json(vendas);

    
    },


    async updateestatus (req,res){
        console.log("-----Alterando Status Venda----")
        console.log("ID:"+ req.params.id)
        console.log("Status atual :"+ req.body.status_atual)
        let novo_status = ''
        if(req.body.status_atual == 'E'){
            novo_status = 'P'    
        }else{
            novo_status = 'E'
        }
        console.log("Novo Status:"+novo_status)
        const vendas = await venda.updateOne({id_venda:req.params.id},{status_venda:novo_status});
        return res.json(vendas);
    },
   


};