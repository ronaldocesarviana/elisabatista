const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const _model = new Schema({
    emissao: {
        type: Date,
        default: Date.now
    },
    cliente: {
        required: true,
      ///  type: Schema.Types.ObjectId,
      type:String,
     //   ref: 'clientes'
    },
    itens: [{
      produto: {
            required: true,
            type: Schema.Types.ObjectId,
            ref: 'produtos'
        },
        descricao: String,
        preco: String,
        quantidade: String
    }]
   // itens:{type:String}
});

mongoose.model('vendas', _model);