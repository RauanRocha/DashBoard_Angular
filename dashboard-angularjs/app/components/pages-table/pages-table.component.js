(function() {
  'use strict';

  angular
    .module('dashboardApp')
    .component('pagesTable', {
      template: `
        <div class="card">
          <h3>Páginas Mais Acessadas</h3>
          <table width="100%">
            <thead>
              <tr>
                <th>UV</th>
                <th>Página</th>
                <th>Tempo Engajado</th>
                <th>Tendência</th>
              </tr>
            </thead>
            <tbody>
              <tr ng-repeat="page in $ctrl.pages">
                <td>{{page.uv}}</td>
                <td>{{page.title}}</td>
                <td>{{page.engajado}}</td>
                <td>{{page.tendencia}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      `,
      controller: function(DataService) {
        this.pages = DataService.getPages();
      }
    });
})();
