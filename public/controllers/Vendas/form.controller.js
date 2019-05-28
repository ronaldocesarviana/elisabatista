angular.module('app')
    .controller('VendaFormController', VendaFormController);

VendaFormController.$inject = [
    'VendaService',
    'UtilService',
    '$stateParams',
    '$state',
    'ClienteService',
    'ProdutoService'
];

function VendaFormController(VendaService, UtilService, $stateParams, $state, ClienteService, ProdutoService) {
    var vm = this;
    vm.venda = {};
    vm.titulo = 'Nova venda';
    vm.clientesFiltrados = []
    vm.produtosFiltrados = []
    vm.venda.itens=[]
    
   
    vm.venda.emissao = UtilService.getDataAtual();

    if ($stateParams.id) {
        vm.titulo = 'Editando venda';
        VendaService.findOne($stateParams.id)
            .then(function (data) {
                vm.venda = data;
            });
    }

    vm.save = function () {
        console.log(JSON.stringify(vm.venda))
        if ($stateParams.id) {
            VendaService
                .update($stateParams.id, vm.venda)
                .then(function () {
                    $state.go('vendaList');
                });
        } else {
            VendaService
                .insert(vm.venda)
                .then(function () {
                    $state.go('vendaList');
                });
        }
    }

    vm.buscaClientes = function (nome) {
        vm.clienteSelecionado = null
        if (nome) {
            if (nome.length <= 2) {
                vm.hideListCliente = true
            } else {
                vm.hideListCliente = false;
                vm.clientesFiltrados = []
                ClienteService.getByNome(nome)
                    .then(function (clientesList) {
                        if (clientesList) {
                            angular.forEach(clientesList, function (cliente) {
                                vm.clientesFiltrados.push(cliente)
                            })

                        }
                    })
            }

        }
    }

    vm.setClienteSelecionado = function(cliente){
        vm.venda.cliente = cliente.nome;        
        vm.hideListCliente=true;
        vm.clienteSelecionado=cliente;
    }

    vm.buscaProdutos = function (descricao) {
      //  vm.produtoSelecionado = null
        if (descricao) {
            if (descricao.length <= 2) {
                vm.hideListProduto = true
            } else {
                vm.hideListProduto = false;
                vm.produtosFiltrados = []
                ProdutoService.getByDescricao(descricao)
                    .then(function (produtosList) {
                        if (produtosList) {
                            angular.forEach(produtosList, function (produto) {
                                vm.produtosFiltrados.push(produto)
                            })

                        }
                    })
            }

        }
    }

    vm.setProdutoSelecionado = function(produto){   
        vm.hideListProduto=true;
        vm.produtoSelecionado.descricao = produto.descricao;
        vm.produtoSelecionado.preco=produto.preco_venda;  
        vm.produtoSelecionado.produto=produto._id;         
    }

    vm.removeProduto = function(indice){
        vm.venda.itens.splice(indice,1)
    }

    vm.addProdutoVenda = function(){ 
        vm.venda.itens.push(angular.copy(vm.produtoSelecionado ))
    }
    vm.somaTotal = function(vlProduto,qtd){
        total =vlProduto*qtd
        return total.toFixed(2);

    }
}