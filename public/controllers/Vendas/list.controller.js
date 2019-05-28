angular.module('app')
    .controller('VendaListController', VendaListController);

VendaListController.$inject = ['VendaService'];

function VendaListController(VendaService){
    var vm = this;
    vm.venda = [];

    function _load() {
        VendaService.findAll()
            .then(function (dados) {
                vm.venda = dados;
            });
    }
    _load();

    vm.excluir = function (id) {
        if (confirm('Deseja realmente excluir?')) {
            VendaService.remove(id)
                .then(function() {
                    _load();
                });
        }
    }

    vm.somarItensVenda = function(itens){
       totais =0
       totalItem=0
       for (i = 0; i < itens.length; i++) { 
        totalItem = itens[i].preco * itens[i].quantidade;
        totais = totais +  totalItem       
      }
      
      return totais.toFixed(2);
    }
}