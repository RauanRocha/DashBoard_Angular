(function() {
  'use strict';

  angular
    .module('dashboardApp')
    .directive('chartPlaceholder', function() {
      return {
        restrict: 'E',
        template: `
          <div class="card">
            <h3>Tráfego em Tempo Real</h3>
            <div style="height:200px; display:flex; align-items:center; justify-content:center; color:#999;">
              [ Gráfico será implementado aqui ]
            </div>
          </div>
        `
      };
    });
})();
