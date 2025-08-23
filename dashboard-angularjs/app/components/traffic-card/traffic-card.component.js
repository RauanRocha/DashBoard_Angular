(function() {
  'use strict';

  angular
    .module('dashboardApp')
    .component('trafficCard', {
      template: `
        <div class="card">
          <h3>Tráfego</h3>
          <ul>
            <li>Interno - 44%</li>
            <li>Busca - 35%</li>
            <li>Social - 14%</li>
            <li>Direto - 6%</li>
            <li>Links - 2%</li>
          </ul>
        </div>
      `
    });
})();
