const mongoose = require('mongoose');
const despesa = mongoose.model('despesa');
const parcela = mongoose.model('parcela');



module.exports = {
    async showall(req,res){
        const {page = 1} = req.query;
        const despesas = await despesa.paginate({},{page , limit:100});
        return res.json(despesas);
    },

    async show_status_E(req,res){
       const despesas = await despesa.findOne({status_despesa:'E'});
       return res.json(despesas);
    },

    async save(req,res){
        const despesas = await despesa.create(req.body);
        console.log("------SAVE (Despesa)-----")
        console.log(despesas)
        return res.json(despesas);
    },

  

    
    
    async updateestatus (req,res){
       
        console.log("-----UPDATE STATUS (despesa)----")
        console.log("id:"+ req.params.id)
        console.log("status atual :"+ req.body.status_atual)
        let novo_status = ''
        if(req.body.status_atual == 'E'){
            novo_status = 'P'    
        }else{
            novo_status = 'E'
        }
        console.log("novo Status:"+novo_status)

        var despesas = await despesa.updateOne({id_despesa:req.params.id},{status_despesa:novo_status})
        var despesas_2 = await despesa.find({id_despesa:req.params.id});
        //console.log(despesas_2[0].parcelas_despesa)
        var ids_parcelas=despesas_2[0].parcelas_despesa;
        console.log("-----mudando status de todas parcelas----")
        for (let value of ids_parcelas) {
            console.log("-----mudou status da parcela ----")
            console.log("id:", value)
            const parcelas = await parcela.updateOne({_id:value},{status_parcela:novo_status})
          
          }
          console.log(despesas)
           return res.json(despesas);
    },

   

    async show(req,res){
        filtros = {}
        
        console.log("------ SHOW FILTER (despesas)-----")
        let query = req.query
        Object.keys(query).forEach(function(item){
            filtro = JSON.parse(query[item])
            Object.keys(filtro).forEach(function(campo){
                
                if(campo == "status_despesa"){
                    const cond1 = filtro.cond1
                    const valor = filtro.status_despesa
                    
                    if(cond1=="$eq"){
                    filtros.status_despesa = {"$eq":valor}
                    }
                }
    
                if(campo == "datacad_despesa"){
                    
                    const cond1 = filtro.cond1
                    const cond2 = filtro.cond2
    
                    if(cond1 ==="$gte"|| cond2 === "$lt"){
                   
                        var datas = filtro.datacad_despesa
                        var array_data = datas.split(",");
                     
                        var data_incial  = new Date(array_data[0]);
                        var data_final  =  new Date(array_data[1]);
    
                        filtros.datacad_despesa = { 
                            '$gte': new Date(data_incial),
                            '$lt': new Date(data_final)
                        }
                    }
        
                }
    
                if(campo == "fornecedor_despesa"){
                    
                    const cond1 = filtro.cond1
                    const valor = filtro.fornecedor_despesa
                    
                    if(cond1=="$eq" && (valor.length > 0 || valor.length == undefined)){
                        filtros.fornecedor_despesa = {"$eq":mongoose.Types.ObjectId(valor._id)}
                    }
                    
                }
            });
        });
    
        
       
        console.log(filtros)

        const despesas = await despesa.aggregate([
             {$match: { $and: [filtros]}},
             {  $lookup:{
                        from:"fornecedors",
                        localField:"fornecedor_despesa",
                        foreignField:"_id",
                        as:"lista_forne"
                            
                       }
            }
        ]
        );


       // const despesas = await despesa.find({filtros})
        console.log(despesas)
        return res.json(despesas);

       
    },


};