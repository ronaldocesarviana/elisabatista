angular.module('app')
    .controller('ProdutoFormController', ProdutoFormController);

ProdutoFormController.$inject = [
    'ProdutoService',
    '$stateParams',
    '$state'
];

function ProdutoFormController(ProdutoService, $stateParams, $state) {
    var vm = this;
    vm.produto = {};
    vm.titulo = 'Novo produto';
    
    vm.podutoCategoriaList = getCategoria()

    if ($stateParams.id) {
        vm.titulo = 'Editando produto';
        ProdutoService.findOne($stateParams.id)
            .then(function (data) {
                vm.produto = data;
            });
    }

    vm.save = function () {
        if ($stateParams.id) {
            ProdutoService
                .update($stateParams.id, vm.produto)
                .then(function () {
                    $state.go('produtoList');
                });
        } else {
            ProdutoService
                .insert(vm.produto)
                .then(function () {
                    $state.go('produtoList');
                });
        }
    }
}
   

function getCategoria(){
    var podutoCategoriaList=[]
    podutoCategoriaList.push("Perfumaria")
    podutoCategoriaList.push("Maquiagem")
    podutoCategoriaList.push("Cuidados com a pele")
    return podutoCategoriaList
}
