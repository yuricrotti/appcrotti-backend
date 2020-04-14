const mongoose = require('mongoose');
const fornecedor = mongoose.model('fornecedor');

module.exports = {
    async showall(req,res){
        const fornecedores = await fornecedor.find({});
        console.log("------SHOWALL (fornecedores)-----")
        console.log(fornecedores)
        return res.json(fornecedores);
    },

    async show_by_id(req,res){
       const fornecedores = await fornecedor.findById(req.params.id);
       return res.json(fornecedores);
    },

    async save(req,res){
        const fornecedores = await fornecedor.create(req.body);
        console.log("------SAVE (fornecedor)-----")
        console.log(fornecedores)
        return res.json(fornecedores);
    },

    async update (req,res){
        const fornecedores = await fornecedor.findByIdAndUpdate(req.params.id,req.body);
        return res.json(fornecedores);
    },

    async delete (req,res){
        console.log("-----Deletano Fornecedor----")
        console.log("ID:"+ req.params.id)
        const fornecedores = await fornecedor.findOneAndDelete({id_fornecedor:req.params.id});
        return res.json(fornecedores);
    },


    async updateestatus (req,res){
        console.log("-----Alterando Status Fornecedor----")
        console.log("ID:"+ req.params.id)
        console.log("Status atual :"+ req.body.status_atual)
        let novo_status = ''
        if(req.body.status_atual == 'A'){
            novo_status = 'C'    
        }else{
            novo_status = 'A'
        }
        console.log("Novo Status:"+novo_status)
        const fornecedores = await fornecedor.updateOne({id_fornecedor:req.params.id},{status_fornecedor:novo_status});
        return res.json(fornecedores);
    },

};