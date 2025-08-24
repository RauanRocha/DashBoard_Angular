(function () {
  'use strict';

  angular
    .module('dashboardApp')
    .component('pagesTable', {
      template: `
        <div class="card">
          <div class="page-table-header">
            <div class="page-table-title">
              <h3>Páginas Mais Acessadas</h3>
              <h4>Principais Artigos ordenados por engajamento</h4>
            </div>
            <!-- Ícone de adicionar coluna -->
            <img class="page-table-add-column" 
                 src="https://cdn-icons-png.flaticon.com/128/16958/16958897.png" 
                 ng-click="$ctrl.addColumn()"
                 style="cursor:pointer;">
          </div>
          <table class="page-table-table" width="100%">
            <thead class="page-table-thead">
              <tr>
                <th>UV</th>
                <th>Página</th>
                <th>Tempo Engajado</th>
                <th>% Scrolling</th>
                <th>Tendência</th>
              </tr>
            </thead>
            <tbody class="page-table-tbody">
              <tr ng-repeat="page in $ctrl.pages" class="page-table-tr">
                <td class="page-table-td">{{page.uv}}</td>
                <td class="page-table-td">
                  {{page.title}}
                  <div class="item-table-info-area">
                    <p>linkaleatorio.com.br</p>
                    <img src="https://images.icon-icons.com/2550/PNG/512/link_icon_152591.png">
                    <span class="item-table-info-especial">Cidade</span>
                    <span class="item-table-info-especial">Brasil Urgente</span>
                  </div>
                </td>
                <td class="page-table-td">{{page.time_engaged}}</td>
                <td class="page-table-td">{{page.scroll_percent}}%</td>
                <td class="page-table-td">
                  <canvas class="trend-chart" id="trend-{{$index}}"></canvas>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      `,
      controller: PagesTableController
    });

  PagesTableController.$inject = ['DataService', '$interval', '$scope', '$timeout'];

  function PagesTableController(DataService, $interval, $scope, $timeout) {
    var ctrl = this;
    ctrl.pages = [];

    // Novo método para o click no ícone
    ctrl.addColumn = function () {
      alert("Função de adicionar coluna indisponível no momento.");
    };

    function fetchPages() {
      DataService.getTopPages().then(function (pages) {
        ctrl.pages = pages;
        renderTrends();
      });
    }

    ctrl.$onInit = function () {
      fetchPages();

      var refreshInterval = $interval(fetchPages, 20000);

      $scope.$on('$destroy', function () {
        $interval.cancel(refreshInterval);
      });
    };

    function renderTrends() {
      $timeout(function () {
        ctrl.pages.forEach(function (page, index) {
          var canvas = document.getElementById("trend-" + index);
          if (canvas) {
            var ctx = canvas.getContext("2d");
            new Chart(ctx, {
              type: "line",
              data: {
                labels: page.trend.map((_, i) => i + 1),
                datasets: [{
                  data: page.trend,
                  borderColor: "#7c3aed",
                  borderWidth: 2,
                  fill: false,
                  tension: 0.4,
                  pointRadius: 0
                }]
              },
              options: {
                plugins: { legend: { display: false } },
                responsive: false,
                scales: { x: { display: false }, y: { display: false } }
              }
            });
          }
        });
      }, 0);
    }

  }
})();
