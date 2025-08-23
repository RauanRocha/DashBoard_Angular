(function() {
  'use strict';

  angular
    .module('dashboardApp')
    .component('pagesTable', {
      template: `
        <div class="card">
          <h3>Páginas Mais Acessadas</h3>
          <table width="100%">
            <thead class="page-table-thead">
              <tr>
                <th>UV</th>
                <th>Página</th>
                <th>Tempo Engajado</th>
                <th>Tendência</th>
              </tr>
            </thead>
            <tbody class="page-table-tbody">
              <tr ng-repeat="page in $ctrl.pages" class="page-table-tr">
                <td class="page-table-td">
                  {{page.uv}}
                  <div>
                    <p></p>
                    <span><

                  </div>
                </td>
                <td class="page-table-td">{{page.title}}</td>
                <td class="page-table-td">{{page.engajado}}</td>
                <td class="page-table-td">{{page.tendencia}}</td>
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
