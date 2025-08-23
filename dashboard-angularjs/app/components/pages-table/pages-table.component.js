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
              
            <img class="page-table-add-column" src="https://cdn-icons-png.flaticon.com/128/16958/16958897.png"
            
            </div>
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
                <td class="page-table-td">{{page.engajado}}</td>
                <td class="page-table-td">{{page.engajado}}</td>
                <td class="page-table-td">{{page.tendencia}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      `,
      controller: function (DataService) {
        this.pages = DataService.getPages();
      }
    });
})();
