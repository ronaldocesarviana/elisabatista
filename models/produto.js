const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const _model = new Schema({
    codigo: {
        type:String,
        required: true
    },
    categoria: String,
    descricao: String,
    preco_compra: String,
    preco_venda: String,
    estoque: String
});

mongoose.model('produtos', _model);