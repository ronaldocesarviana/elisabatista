const mongoose = require('mongoose');
const clienteModel = mongoose.model('clientes');

module.exports = function (app) {
    app.get('/clientes', function (req, resp) {
        clienteModel.find()
            .then(
                function (data) {
                    resp.status(200).send(data);
                },
                function (err) {
                    resp.status(500).send(err);
                }
            );
    });
    app.post('/clientes', function (req, resp) {
        clienteModel.create(req.body)
            .then(
                function (data) {
                    resp.status(201).send(data);
                },
                function (err) {
                    resp.status(500).send(err);
                }
            );
    });
    app.get('/clientes/:id', function (req, resp) {
        clienteModel.findById(req.params.id)
            .then(
                function (data) {
                    if (!data) {
                        resp.status(404).send();
                    } else {
                        resp.status(200).send(data);
                    }
                },
                function (err) {
                    resp.status(500).send(err);
                }
            );
    });
    app.put('/clientes/:id', function (req, resp) {
        clienteModel.findOneAndUpdate({ '_id': req.params.id }, req.body)
            .then(
                function (data) {
                    if (!data) {
                        resp.status(404).send();
                    } else {
                        resp.status(200).send(data);
                    }
                },
                function (err) {
                    resp.status(500).send(err);
                }
            );
    });
    app.delete('/clientes/:id', function (req, resp) {
        clienteModel.deleteOne({ '_id': req.params.id })
            .then(
                function () {
                    resp.status(204).send();
                },
                function (err) {
                    resp.status(500).send(err);
                }
            );
    });

    app.get('/clientes/bynome/:nome', function (req, resp) {
        clienteModel.find({ nome: { $regex: new RegExp(req.params.nome), $options: 'i' } }).limit(5)
            .then(
                function (data) {
                    if (!data) {
                        resp.status(404).send();
                    } else {
                        resp.status(200).send(data);
                    }
                },
                function (err) {
                    resp.status(500).send(err);
                }
            );
    });

    app.get('/clientes/max/cod', function (req, resp) {
        clienteModel.find().sort({ codigo: -1 }).limit(1)
            .then(
                function (data) {
                    if (!data) {
                        resp.status(404).send();
                    } else {
                        if(data.length==0){
                            resp.status(200).send("0");
                        }else{
                            resp.status(200).send(data[0].codigo);
                        }
                        
                    }
                },
                function (err) {
                    resp.status(500).send(err);
                }
            );
    });
}
