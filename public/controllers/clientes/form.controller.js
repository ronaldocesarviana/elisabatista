angular.module('app')
    .controller('ClienteFormController', ClienteFormController);

ClienteFormController.$inject = [
    'ClienteService', 
    '$stateParams', 
    '$state'
];

function ClienteFormController (ClienteService, $stateParams, $state){
    var vm = this;
    vm.cliente = {};
    vm.titulo = 'Novo cliente';

    if ($stateParams.id) {
        vm.titulo = 'Editando cliente';
        ClienteService.findOne($stateParams.id)
            .then(function (data) {
                vm.cliente = data;
            });
    }

    vm.save = function() {
        if ($stateParams.id) {
            ClienteService
                .update($stateParams.id, vm.cliente)
                .then(function() {
                    $state.go('clienteList');
                });
        } else {
            ClienteService.maxCod()
            .then(function(maxcod){
                
                vm.cliente.codigo=++maxcod
                console.log('maxcod: ',maxcod)
                ClienteService
                .insert(vm.cliente)
                .then(function() {
                    $state.go('clienteList');
                });
            })
            
        }
    }
}