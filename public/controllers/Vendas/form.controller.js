angular.module('app')
    .controller('VendaFormController', VendaFormController);

VendaFormController.$inject = [
    'VendaService',
    'UtilService',
    '$stateParams',
    '$state',
    'ClienteService',
    'ProdutoService',
    '$filter'
];

function VendaFormController(VendaService, UtilService, $stateParams, $state, ClienteService, ProdutoService, $filter) {
    var vm = this;
    vm.venda = {};
    vm.titulo = 'Nova venda';
    vm.clientesFiltrados = []
    vm.produtosFiltrados = []
    vm.venda.itens=[]
    vm.vlTotalDesconto=0
    vm.vlTotalProd=0
    vm.vlTotalvenda=0
    var produtoSelecionadoIndex = -1;
    
   
    vm.venda.emissao = UtilService.getDataAtual();

    if ($stateParams.id) {
        vm.titulo = 'Editando venda';
        VendaService.findOne($stateParams.id)
            .then(function (data) {
                vm.venda = data;
                vm.somaTotalizadores(vm.venda.itens)
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
            if (nome.length <= 1) {
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
        if (descricao) {
            if (descricao.length <= 1) {
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
        console.log(JSON.stringify(produto))
        vm.produtoSelecionado.descricao = produto.descricao;
        vm.produtoSelecionado.vlProduto = $filter('currency')(produto.preco_venda, '');  
        vm.produtoSelecionado.preco =  $filter('currency')(produto.preco_venda, '');
        vm.produtoSelecionado.produto = produto._id;         
    }

    vm.removeProduto = function(indice){
        vm.venda.itens.splice(indice,1)
    }

    vm.editProduto = function(produto){  
        produtoSelecionadoIndex = vm.venda.itens.indexOf(produto); 
        vm.produtoSelecionado = {};    
        vm.produtoSelecionado = angular.copy(produto);
        console.log(JSON.stringify(vm.produtoSelecionado))
    };    

    vm.addProdutoVenda = function(){ 
        if(!vm.produtoSelecionado){
            return
        }
        vm.produtoSelecionado.vlDesconto = vm.produtoSelecionado.vlDesconto     
        vm.produtoSelecionado.vlTotalVenda= vm.produtoSelecionado.preco * vm.produtoSelecionado.quantidade;              
        vm.produtoSelecionado.vlTotalDesc= (vm.produtoSelecionado.vlProduto * vm.produtoSelecionado.quantidade) - (vm.produtoSelecionado.preco * vm.produtoSelecionado.quantidade) || 0;  
        if(!vm.produtoSelecionado._id){
            if (vm.venda.itens) {
                vm.venda.itens.push(vm.produtoSelecionado)
            } else{
                vm.venda.itens = [vm.produtoSelecionado];
            }
        }else{
            vm.venda.itens[produtoSelecionadoIndex] = vm.produtoSelecionado;
            produtoSelecionadoIndex = -1;
        }
        vm.produtoSelecionado = {};        
        vm.somaTotalizadores(vm.venda.itens)        
    }
  
    vm.somaTotal = function(vlProduto,qtd){
        total =vlProduto*qtd
        return total.toFixed(2);
    }

    vm.somaTotalizadores = function(produtos){
        vm.vlTotalDesconto =0 ;
        vm.vlTotalProd = 0 ;
        vm.vlTotalvenda=0;
        produtos.forEach(produto=>{
            console.log("totalizando produto", JSON.stringify(produto))
            vm.vlTotalDesconto = parseFloat(vm.vlTotalDesconto) + parseFloat(produto.vlTotalDesc) ;
            vm.vlTotalProd = parseFloat(vm.vlTotalProd) + parseFloat(produto.vlProduto) * parseInt(produto.quantidade) ;
            vm.vlTotalvenda = parseFloat(vm.vlTotalvenda) + parseFloat(produto.preco) * parseInt(produto.quantidade);    
        })
    }
}