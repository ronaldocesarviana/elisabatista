angular.module('app')
    .controller('VendaListController', VendaListController);

VendaListController.$inject = ['VendaService','$scope'];

function VendaListController(VendaService,$scope){
    var vm = this;
    vm.venda = [];
    vm.monthCurrent = function(){
        return new Date().getMonth()+1;
    }
    vm.units = [
        {'id':1,'label': "Janeiro"},
        {'id':2,'label': "Fevereiro"},
        {'id':3,'label': "Março"},
        {'id':4,'label': "Abril"},
        {'id':5,'label': "Maio"},
        {'id':6,'label': "Junho"},
        {'id':7,'label': "Julho"},
        {'id':8,'label': "Agosto"},
        {'id':9,'label': "Setembro"},
        {'id':10,'label': "Outubro"},
        {'id':11,'label': "Novembro"},
        {'id':12,'label': "Dezembro"}
    ]
        vm.data = {
        'id': 2,
        'unit': vm.monthCurrent()
        }

   
      
    vm.competenciasList=[
        {value:"1",descricao: "Janeiro"},
        {value:"2",descricao: "Fevereiro"},
        {value:"3",descricao: "Março"},
        {value:"4",descricao: "Abril"},
        {value:"5",descricao: "Maio"},
        {value:"6",descricao: "Junho"},
        {value:"7",descricao: "Julho"},
        {value:"8",descricao: "Agosto"},
        {value:"9",descricao: "Setembro"},
        {value:"10",descricao: "Outubro"},
        {value:"11",descricao: "Novembro"},
        {value:"12",descricao: "Dezembro"}
    ]
    vm.currentYear = new Date().getFullYear();
    vm.year = vm.currentYear
    vm.isMonthCurrent = function(competencia){
        return competencia.value === new Date().getMonth()+1+'';
    }
    vm.filter = function(year, month){
        value=""
        if(parseInt(month.value) < 10){
         value=year+"-0"+month.value
        }else{
            value=year+"-"+month.value
        }
       return value
    }
    vm.teste = {
            'id': 1,
            'unit': 27
        }
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