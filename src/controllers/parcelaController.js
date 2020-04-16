const mongoose = require('mongoose');
const parcela = mongoose.model('parcela');
const despesa = mongoose.model('despesa');

module.exports = {
    async showall(req,res){
        const {page = 1} = req.query;
        const parcelas = await parcela.paginate({},{page , limit:100});
        return res.json(parcelas);
    },

    async save(req,res){
        const parcelas = await parcela.create(req.body);
        console.log("------SAVE (parcela)-----")
        console.log(parcelas)
        return res.json(parcelas);
    },

  
  


    async show(req,res){
        filtros = {}
        console.log("------ SHOW FILTER  (parcela)-----")
        let query = req.query
        Object.keys(query).forEach(function(item){
            filtro = JSON.parse(query[item])
            Object.keys(filtro).forEach(function(campo){
                
                if(campo == "status_parcela"){
                    const cond1 = filtro.cond1
                    const valor = filtro.status_parcela
                    
                    if(cond1=="$eq"){
                    filtros.status_parcela = {"$eq":valor}
                    }
                }
    
                if(campo == "datapagamento_parcela"){
                    
                    const cond1 = filtro.cond1
                    const cond2 = filtro.cond2
    
                    if(cond1 ==="$gte"|| cond2 === "$lt"){
                       

                        var datas = filtro.datapagamento_parcela
                        var array_data = datas.split(",");
                     
                        var data_incial  = new Date(array_data[0]);
                        var data_final  =  new Date(array_data[1]);
    
                        filtros.datapagamento_parcela = { 
                            '$gte': new Date(data_incial),
                            '$lt': new Date(data_final)
                        }
                    }
        
                }
    
                if(campo == "fornecedor_parcela"){
                    
                    const cond1 = filtro.cond1
                    const valor = filtro.fornecedor_parcela
                    
                    if(cond1=="$eq" && (valor.length > 0 || valor.length == undefined)){
                        filtros.fornecedor_parcela = {"$eq":mongoose.Types.ObjectId(valor._id)}
                    }
                    
                }
            });
        });
        
        console.log(filtros)
        const parcelas = await parcela.aggregate([
            {$match: { $and: [filtros]}},
            {  $lookup:{
                       from:"fornecedors",
                       localField:"fornecedor_parcela",
                       foreignField:"_id",
                       as:"lista_forne"
                           
                      }
           }
       ]
       );
        return res.json(parcelas);


       
    },


    async updateestatus (req,res){
       
        console.log("-----UPDATE STATUS (parcela)----")
        console.log("id:"+ req.params.id)
        console.log("status atual :"+ req.body.status_atual)

        let novo_status = ''
        if(req.body.status_atual == 'E'){
            novo_status = 'P'    
        }else{
            novo_status = 'E'
        }
        const parcelas = await parcela.updateOne({_id:req.params.id},{status_parcela:novo_status})
        var cont = 0
        console.log("-----Analisando se todas parcelas foram pagas----")
        for (let value of req.body.lista_parcelas) {
            //console.log(value)
            console.log("id:", value)
            const parc = await parcela.findById(value)   
            if(parc.status_parcela == "E"){
                console.log("Essa parcela não está paga", value)
                cont = cont + 1
            }else{
                console.log("Essa parcela está paga",value)
                cont = cont + 0
            }
        }
        console.log("Numero de parcelas não pagas", cont)
        if(cont==0){
            console.log("Todas as parcelas pagas...Vamos alterar o status a despesa")
            console.log("id:", req.body.id_despesa)
            const desp = await despesa.updateOne({id_despesa:req.body.id_despesa},{status_despesa:"P"})
        }
    
        return res.json(parcela);
    },





};