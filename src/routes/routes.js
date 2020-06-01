const express = require('express');
const Routes = express.Router();

const ClienteController = require("../controllers/clienteController")
const CompraController= require("../controllers/compraController")
const ChequeController= require("../controllers/chequeController")
const DespesaController = require("../controllers/despesasController")
const DinheiroController = require("../controllers/dinheiroController")
const FornecedorController = require("../controllers/fornecedorController")
const ParcelaController = require("../controllers/parcelaController")
const PagamentoController = require("../controllers/pagamentoController")
const RecebimentoController = require("../controllers/recebimentoController")
const VendaController = require("../controllers/vendaController")
const ViajemController = require("../controllers/viajemController")

Routes.get('/cliente/showall' ,ClienteController.showall),
Routes.post('/cliente/save',ClienteController.save),
Routes.put('/cliente/updatestatus/:id',ClienteController.updateestatus);

Routes.get('/compra/showall' ,CompraController.showall),
Routes.post('/compra/save',CompraController.save),
Routes.get('/compra/show' ,CompraController.show),
Routes.put('/compra/updatestatus/:id',CompraController.updateestatus),


Routes.get('/cheque/showall' ,ChequeController.showall),
Routes.post('/cheque/save',ChequeController.save),
Routes.get('/cheque/show' ,ChequeController.show),
Routes.put('/cheque/updatestatus/:id',ChequeController.updateestatus),
Routes.put('/cheque/descontarcheque/:id',ChequeController.descontar_cheque),

Routes.get('/despesa/showall' ,DespesaController.showall),
Routes.get('/despesa/show' ,DespesaController.show),
Routes.post('/despesa/save',DespesaController.save),
Routes.put('/despesa/updatestatus/:id',DespesaController.updateestatus),

Routes.get('/dinheiro/showall' ,DinheiroController.showall),
Routes.post('/dinheiro/save',DinheiroController.save),
Routes.get('/dinheiro/show' ,DinheiroController.show),

Routes.get('/fornecedor/showall' ,FornecedorController.showall),
Routes.post('/fornecedor/save',FornecedorController.save),
Routes.put('/fornecedor/update/:id',FornecedorController.update),
Routes.put('/fornecedor/updatestatus/:id',FornecedorController.updateestatus),
Routes.delete('/fornecedor/delete/:id',FornecedorController.delete),

Routes.get('/parcela/showall' ,ParcelaController.showall),
Routes.post('/parcela/save',ParcelaController.save),
Routes.get('/parcela/show' ,ParcelaController.show),
Routes.put('/parcela/updatestatus/:id',ParcelaController.updateestatus),

Routes.get('/pagamento/showall' ,PagamentoController.showall),
Routes.get('/pagamento/show' ,PagamentoController.show),
Routes.post('/pagamento/save',PagamentoController.save),

Routes.get('/recebimento/showall' ,RecebimentoController.showall),
Routes.post('/recebimento/save',RecebimentoController.save),
Routes.get('/recebimento/show' ,RecebimentoController.show),

Routes.get('/venda/showall' ,VendaController.showall),
Routes.post('/venda/save',VendaController.save),
Routes.get('/venda/show' ,VendaController.show),
Routes.put('/venda/updatestatus/:id',VendaController.updateestatus),

Routes.get('/viajem/showall' ,ViajemController.showall),
Routes.post('/viajem/save',ViajemController.save),
Routes.put('/viajem/updatestatus/:id',ViajemController.updateestatus),


module.exports = Routes;
