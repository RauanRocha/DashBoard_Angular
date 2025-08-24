(function () {
  'use strict';

  angular
    .module('dashboardApp')
    .component('leftPanel', {
      template: `
        <section class="left-panel">
          <!-- Card principal -->
          <div class="left-panel-main">
            <metric-card ng-if="$ctrl.mainCard"
                         title="{{$ctrl.mainCard.title}}"
                         value="{{$ctrl.mainCard.value}}"
                         variant="{{$ctrl.mainCard.variant}}"
                         show-observation="true">
            </metric-card>
          </div>

          <!-- Small metric cards -->
          <div class="left-painel-secund-section">
            <metric-card ng-repeat="c in $ctrl.smallCards track by $index"
                         title="{{c.title}}"
                         value="{{c.value}}"
                         variant="{{c.variant}}">
            </metric-card>
          </div>

          <rfv-card
            title="Tipos de Usuario"
            fetch-function="$ctrl.getUsersType()">
          </rfv-card>

          <rfv-card
            title="RFV ( Referencia, Frequencia, Volume )"
            fetch-function="$ctrl.getRFVDistribution()">
          </rfv-card>
          
        </section>
      `,
      controller: LeftPanelCtrl
    });

  LeftPanelCtrl.$inject = ['DataService', '$log', '$interval'];
  function LeftPanelCtrl(DataService, $log, $interval) {
    var vm = this;
    vm.mainCard = null;
    vm.smallCards = [];
    vm.showInfo = true;

    vm.getRFVDistribution = function () {
      return DataService.getData('rfv_distribution', 'range', 'count', 0.2);
    };

    vm.getUsersType = function () {
      return DataService.getData('user_types', 'type', 'count', 0.5);
    };
    
    function updateMetrics() {
      $log.info('[leftPanel] Atualizando métricas...');
      DataService.getMetrics().then(function (metrics) {
        if (!metrics || metrics.length === 0) return;

        vm.mainCard = metrics[0];

        vm.smallCards = metrics.slice(1);
      }).catch(function (err) {
        $log.error('[leftPanel] Erro ao atualizar métricas', err);
      });
    }

    vm.$onInit = function () {

      updateMetrics();
      $interval(updateMetrics, 10000); 
    };
  }
})();
