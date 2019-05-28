angular.module('app')
    .service('VendaService', VendaService);

VendaService.$inject = ['$http']

function VendaService ($http) {
    var URL = '/vendas';

    var service = this;

    service.findAll = function () {
        return $http.get(URL)
            .then(function(resp) {
                return resp.data;
            });
    }

    service.findOne = function (id) {
        return $http.get(URL + '/' + id)
            .then(function(resp) {
                return resp.data;
            });
    }

    service.update = function (id, venda) {
        return $http.put(URL + '/' + id, venda)
            .then(function(resp) {
                return resp.data;
            });
    }

    service.remove = function (id) {
        return $http.delete(URL + '/' + id);
    }

    service.insert = function (venda) {
        return $http.post(URL, venda)
            .then(function(resp) {
                return resp.data;
            });
    }

}