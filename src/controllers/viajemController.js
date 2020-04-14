const mongoose = require('mongoose');
const viajem = mongoose.model('viajem');

module.exports = {
    async showall(req,res){
        const viagens = await viajem.find({});
        console.log("------SHOWALL (viajem)-----")
        console.log(viagens)
        return res.json(viagens);
    },

    async save(req,res){
        const viagens = await viajem.create(req.body);
        console.log("------SAVE (viajem)-----")
        console.log(viagens)
        return res.json(viagens);
    },

    
    async updateestatus (req,res){
        console.log("-----Alterando Status viajem----")
        console.log("ID:"+ req.params.id)
        console.log("Status atual :"+ req.body.status_atual)
        let novo_status = ''
        if(req.body.status_atual == 'A'){
            novo_status = 'C'    
        }else{
            novo_status = 'A'
        }
        console.log("Novo Status:"+novo_status)
        const viagens = await viajem.updateOne({id_viajem:req.params.id},{status_viajem:novo_status});
        return res.json(viagens);
    },
   

};