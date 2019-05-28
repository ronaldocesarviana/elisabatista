const mongoose = require('mongoose');
const produtoModel = mongoose.model('produtos');

module.exports = function (app) {
    app.get('/produtos', function (req, resp) {
        produtoModel.find()
            //produtoModel.find({}, ['emissao', 'produto'], {sort: {emissao: 1}})
            //    .populate('produto', 'documento nome email')
            .then(
                function (data) {
                    resp.status(200).send(data);
                },
                function (err) {
                    resp.status(500).send(err);
                }
            );
    });
    app.post('/produtos', function (req, resp) {
        produtoModel.create(req.body)
            .then(
                function (data) {
                    resp.status(201).send(data);
                },
                function (err) {
                    resp.status(500).send(err);
                }
            );
    });
    app.get('/produtos/:id', function (req, resp) {
        produtoModel.findById(req.params.id)
            .populate('produto')
            .populate('itens.produto')
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
    app.put('/produtos/:id', function (req, resp) {
        produtoModel.findOneAndUpdate({ '_id': req.params.id }, req.body)
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
    app.delete('/produtos/:id', function (req, resp) {
        produtoModel.deleteOne({ '_id': req.params.id })
            .then(
                function () {
                    resp.status(204).send();
                },
                function (err) {
                    resp.status(500).send(err);
                }
            );
    });

    app.get('/produtos/bydescricao/:descricao', function (req, resp) {
        produtoModel.find({ descricao: { $regex: new RegExp(req.params.descricao), $options: 'i' } })
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

    app.get('/produtos/max/cod', function (req, resp) {
        produtoModel.find().sort({ codigo: -1 }).limit(1)
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
}