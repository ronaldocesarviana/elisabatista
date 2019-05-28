const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const _model = new Schema({
    codigo: {
        type:String,
        required: true
    },
    cpf_cnpj: {
        type:String
    },
    nome: String,
    email: String,
    fone: String,
    data_nascimento: String,
    conjuge: String,
    fone_conjuge: String,
    endereco: String,
    complemento: String
});

mongoose.model('clientes', _model);