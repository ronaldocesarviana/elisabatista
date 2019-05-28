angular.module('app', [
    'ui.router'
]);

angular.module('app').config(ConfigMain);

ConfigMain.$inject = ['$stateProvider'];

function ConfigMain ($stateProvider) {
    $stateProvider
        .state({
            name: 'clienteList',
            url: '/clientes',
            templateUrl: '/partials/clientes/list.html',
            controller: 'ClienteListController',
            controllerAs: 'vm'
        })
        .state({
            name: 'clienteNovo',
            url: '/clientes/novo',
            templateUrl: '/partials/clientes/form.html',
            controller: 'ClienteFormController',
            controllerAs: 'vm'
        })
        .state({
            name: 'clienteEditar',
            url: '/clientes/:id',
            templateUrl: '/partials/clientes/form.html',
            controller: 'ClienteFormController',
            controllerAs: 'vm'
        })
        .state({
            name: 'produtoList',
            url: '/produtos',
            templateUrl: '/partials/produtos/list.html',
            controller: 'ProdutoListController',
            controllerAs: 'vm'
        })
        .state({
            name: 'produtoNovo',
            url: '/produtos/novo',
            templateUrl: '/partials/produtos/form.html',
            controller: 'ProdutoFormController',
            controllerAs: 'vm'
        })
        .state({
            name: 'produtoEditar',
            url: '/produtor/:id',
            templateUrl: '/partials/produtos/form.html',
            controller: 'ProdutoFormController',
            controllerAs: 'vm'
        })
        .state({
            name: 'vendaList',
            url: '/vendas',
            templateUrl: '/partials/vendas/list.html',
            controller: 'VendaListController',
            controllerAs: 'vm'
        })
        .state({
            name: 'vendaNovo',
            url: '/venda/novo',
            templateUrl: '/partials/vendas/form.html',
            controller: 'VendaFormController',
            controllerAs: 'vm'
        })
        .state({
            name: 'vendaEditar',
            url: '/venda/:id',
            templateUrl: '/partials/vendas/form.html',
            controller: 'VendaFormController',
            controllerAs: 'vm'
        });
} 
