(function () {
  'use strict';

  angular
    .module('dashboardApp')
    .component('centerPanel', {
      template: `
        <section class="center-panel" ng-if="$ctrl.data">
          <div class="center-panel-first-section">
            <metric-card
              title="Hoje até agora"
              value="{{$ctrl.data.today_pageviews | number}}"
              subtitle="Pageviews">
            </metric-card>
            <metric-card
              title="Visitantes Únicos"
              value="{{$ctrl.data.unique_visitors | number}}"
              subtitle="UV">
            </metric-card>
          </div>

          <div class="chart-container">
            <chart-placeholder></chart-placeholder>
          </div>

          <pages-table></pages-table>
        </section>
      `,
      controller: CenterPanelController
    });

  // 💡 Injete o DataService aqui:
  CenterPanelController.$inject = ['$interval', 'DataService'];

  function CenterPanelController($interval, DataService) {
    const ctrl = this;
    ctrl.data = null;

    ctrl.$onInit = function () {
      fetchRealtime();

      // Atualizar a cada 15 segundos (15000 ms)
      $interval(fetchRealtime, 15000);
    };

    function fetchRealtime() {
      // ⚠️ Use o DataService corretamente aqui:
      DataService.getRealtime().then(function (data) {
        ctrl.data = data[0]; // Supondo que seja um array
      });
    }
  }

})();
