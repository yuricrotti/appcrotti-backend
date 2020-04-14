const mongoose = require('mongoose');
const cliente = mongoose.model('cliente');

module.exports = {
    async showall(req,res){
        const clientes = await cliente.find({});
        console.log("------SHOWALL (clientes)-----")
        console.log(clientes)
        return res.json(clientes);
    },


    async save(req,res){
        const clientes = await cliente.create(req.body);
        console.log("------SAVE (cliente)-----")
        console.log(clientes)
        return res.json(clientes);
    },



    async updateestatus (req,res){
        console.log("-----UPDATE STATUS (cliente)----")
        console.log("ID:"+ req.params.id)
        console.log("Status atual :"+ req.body.status_atual)
        let novo_status = ''
        if(req.body.status_atual == 'A'){
            novo_status = 'C'    
        }else{
            novo_status = 'A'
        }
        console.log("Novo Status:"+novo_status)
        const clientes = await cliente.updateOne({id_cliente:req.params.id},{status_cliente:novo_status});
        return res.json(clientes);
    },

};