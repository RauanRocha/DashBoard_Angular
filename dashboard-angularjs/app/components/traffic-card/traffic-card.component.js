(function () {
  'use strict';

  angular
    .module('dashboardApp')
    .component('trafficCard', {
      bindings: {
        showBars: '<' // true = mostra barras e select | false = apenas lista simples
      },
      template: `
      <div class="card traffic-area">
        <div class="traffic-area-header">
          <h3>Tráfego</h3>

          <!-- Select só aparece quando showBars for true -->
          <select id="origem" name="origem" ng-if="$ctrl.showBars">
            <option value="maca">Origem...</option>
          </select>
        </div>  
        
        <ul class="list-trafficCard">
          <li ng-repeat="item in $ctrl.data">
            <div class="traffic-item-info">
              <span>{{ item.nome }}</span>
              <span>{{ item.valor }}%</span>
            </div>
            
            <!-- Barra só aparece quando showBars for true -->
            <div class="traffic-item-barArea" ng-if="$ctrl.showBars">
              <div class="traffic-item-progressBar" style="width: {{ item.valor }}%"></div>
            </div>
          </li>
        </ul>
      </div>
      `,
      controller: function () {
        this.data = [
          { nome: 'Interno', valor: 44 },
          { nome: 'Externo', valor: 56 },
          { nome: 'Mobile', valor: 30 },
          { nome: 'Desktop', valor: 70 }
        ];
      }
    });
})();
