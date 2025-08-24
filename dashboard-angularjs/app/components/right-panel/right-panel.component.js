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
                title="Tráfego de Usuários" 
                show-bars="false" 
                fetch-function="$ctrl.getReferences()">
            </traffic-card>

            <traffic-card 
                title="Categoria de Páginas" 
                show-bars="false" 
                fetch-function="$ctrl.getPageCategories()">
            </traffic-card>
        </section>`,
      controller: RightPanelCtrl
    });

  RightPanelCtrl.$inject = ['DataService'];  
  function RightPanelCtrl(DataService) {
    const vm = this;

    vm.getTrafficData = function() {
      return DataService.getData('traffic_breakdown', 'name', 'count', 0.3);
    };

    vm.getReferences = function() {
      return DataService.getData('references', 'name', 'count', 0.3);
    };

    vm.getPageCategories = function() {
      console.log("EAEEEEE")
      return DataService.getData('page_categories', 'name', 'count', 0.3);
    };
  }
})();
