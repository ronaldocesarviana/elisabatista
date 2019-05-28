
angular.module('app')
.service('UtilService', UtilService);

function UtilService(){
    var service = this;

    service.getDataAtual = function(){
      var data = new Date();
      return data
    }

    service.formatarData = function(data){
      var dia=data.getDate();
      var mes=data.getMonth();
      var ano=data.getFullYear();
      data = dia + '/' + (mes++) + '/' + ano;
      return data
    }
  }
 
