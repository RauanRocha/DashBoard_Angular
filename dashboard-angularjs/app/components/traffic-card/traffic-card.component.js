(function () {
  'use strict';

  angular
    .module('dashboardApp')
    .component('trafficCard', {
      bindings: {
        showBars: '<',         // Mostra barra de progresso
        title: '@',            // Título do card
        fetchFunction: '&',    // Função externa para buscar os dados
        useMaxAs100: '<'       // Define se o valor máximo será fixo em 100%
      },
      template: `
        <div class="card traffic-area">
          <div class="traffic-area-header">
            <h3>{{ $ctrl.title || 'Tráfego' }}</h3>

            <select id="origem" name="origem" ng-if="$ctrl.showBars">
              <option value="maca">Origem...</option> <!-- Exemplo de placeholder -->
            </select>
          </div>  

          <ul class="list-trafficCard">
            <li ng-repeat="item in $ctrl.data">
              <div class="traffic-item-info">
                <span>{{ item.text }}</span>  
                <span>{{ item.count }}<span ng-if="$ctrl.showBars">%</span></span>
              </div>

              <div class="traffic-item-barArea" ng-if="$ctrl.showBars">
                <div class="traffic-item-progressBar" ng-class="item.barClass" style="width: {{ item.progress }}%"></div>
              </div>
            </li>
          </ul>
        </div>
      `,
      controller: function ($log, $interval) {
        const ctrl = this;
        ctrl.data = [];

        // Atualiza os dados chamando a função fornecida
        function updateData() {
          const result = ctrl.fetchFunction();

          if (result && typeof result.then === 'function') {
            result.then(data => {
              const maxValue = ctrl.useMaxAs100 ? 100 : Math.max(...data.map(item => item.count));

              ctrl.data = data.map(item => ({
                text: item.text,
                count: item.count,
                progress: Math.min((item.count / maxValue) * 100, 100),
                barClass: item.barClass
              }));
            }).catch(err => {
              $log.error('Erro ao buscar dados para TrafficCard', err);
            });
          }
        }

        ctrl.$onInit = function () {
          updateData();
          $interval(updateData, 10000); // Atualiza a cada 10 segundos
        };
      }
    });
})();
