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
                         variant="{{$ctrl.mainCard.variant}}">
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
            title="RFV ( Referencia, Frequencia, Volume"
            fetch-function="$ctrl.getRFVDistribution()">
          </rfv-card>



        </section>
      `,
      controller: LeftPanelCtrl
    });

  LeftPanelCtrl.$inject = ['DataService', '$log'];
  function LeftPanelCtrl(DataService, $log) {
    var vm = this;
    vm.mainCard = null;
    vm.smallCards = [];
    vm.showInfo = true;

    vm.getRFVDistribution = function () {
      return DataService.getRFVDistribution();
    };

    vm.getUsersType = function() {
      return DataService.getUsersType()
    }

    vm.$onInit = function () {
      $log.info('[leftPanel] init - carregando metrics');
      DataService.getMetrics().then(function (metrics) {
        if (!metrics || metrics.length === 0) return;

        // primeiro item é o principal
        vm.mainCard = metrics[0];

        // o resto são pequenos
        vm.smallCards = metrics.slice(1);

        $log.info('[leftPanel] metrics prontas', vm.mainCard, vm.smallCards);
      }).catch(function (err) {
        $log.error('[leftPanel] erro ao buscar metrics', err);
      });
    };
  }
})();
