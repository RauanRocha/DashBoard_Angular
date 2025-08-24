(function () {
  'use strict';

  angular
    .module('dashboardApp')
    .component('rightPanel', {
      template: `
        <section class="right-panel">
          <traffic-card 
            title="Tráfego de Usuários" 
            show-bars="true" 
            fetch-function="$ctrl.getTrafficData()"
            use-Max-As-100="true">
          </traffic-card>

          <traffic-card 
            title="Referencias" 
            show-bars="false" 
            fetch-function="$ctrl.getReferences()">
          </traffic-card>

          <traffic-card 
            title="Categoria de Páginas" 
            show-bars="false" 
            fetch-function="$ctrl.getPageCategories()">
          </traffic-card>
        </section>
      `,
      controller: RightPanelCtrl
    });

  RightPanelCtrl.$inject = ['DataService'];

  function RightPanelCtrl(DataService) {
    const vm = this;

    const COLOR_CLASSES = ['bgPurple', 'bgPink', 'bgGreen'];

    // Adiciona uma propriedade `barClass` em cada item (para uso no template do traffic-card)
    function applyColorClasses(items) {
      if (!Array.isArray(items)) return items;
      return items.map(function (item, index) {
        // não mutamos o item original — retornamos um novo objeto
        return Object.assign({}, item, { barClass: COLOR_CLASSES[index % COLOR_CLASSES.length] });
      });
    }

    // Retorna uma Promise que resolve com os itens já marcados com `barClass`
    vm.getTrafficData = function () {
      return DataService
        .getData('traffic_breakdown', 'name', 'count', 0.3)
        .then(function (items) {
          return applyColorClasses(items);
        });
    };

    // As outras chamadas apenas repassam o serviço (sem alteração)
    vm.getReferences = function () {
      return DataService.getData('references', 'name', 'count', 0.3);
    };

    vm.getPageCategories = function () {
      return DataService.getData('page_categories', 'name', 'count', 0.3);
    };
  }
})();
