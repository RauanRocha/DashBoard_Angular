(function () {
  'use strict';

  angular
    .module('dashboardApp')
    .component('trafficCard', {
      bindings: {
        showBars: '<',       
        title: '@',          
        fetchFunction: '&',   
        useMaxAs100: '<'      
      },
      template: `
      <div class="card traffic-area">
        <div class="traffic-area-header">
          <h3>{{ $ctrl.title || 'Tráfego' }}</h3>

          <select id="origem" name="origem" ng-if="$ctrl.showBars">
            <option value="maca">Origem...</option>
          </select>
        </div>  

        <ul class="list-trafficCard">
          <li ng-repeat="item in $ctrl.data">
            <div class="traffic-item-info">
              <span>{{ item.text }}</span>  
              <span>{{ item.count }}<span ng-if="$ctrl.showBars">%</span></span>
            </div>

            <div class="traffic-item-barArea" ng-if="$ctrl.showBars">
              <div class="traffic-item-progressBar" style="width: {{ item.progress }}%"></div>
            </div>
          </li>
        </ul>
      </div>
      `,
      controller: function ($log, $interval) {
        const ctrl = this;
        ctrl.data = [];

        // Função para atualizar os dados
        function updateData() {
          const result = ctrl.fetchFunction();

          if (result && typeof result.then === 'function') {
            result.then(data => {
              let maxValue;

              if (ctrl.useMaxAs100) {
                maxValue = 100;
              } else {
                maxValue = Math.max(...data.map(item => item.count));
              }

              ctrl.data = data.map(item => {
                return {
                  text: item.text,
                  count: item.count,
                  progress: Math.min((item.count / maxValue) * 100, 100)
                };
              });
            }).catch(err => {
              $log.error('Erro ao buscar dados para TrafficCard', err);
            });
          }
        }

        // Chama a função para atualizar os dados imediatamente
        ctrl.$onInit = function () {
          updateData(); // Atualiza os dados na inicialização

          // Atualiza os dados a cada 10 segundos
          $interval(updateData, 10000); // 10000ms = 10 segundos
        };
      }
    });
})();
