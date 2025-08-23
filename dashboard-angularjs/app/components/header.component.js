(function(angular){
  'use strict';
  angular.module('dashboardApp')
    .component('appHeader', {
      template: '<div class="header">' +
                '  <div>' +
                '    <div class="title">Real Time</div>' +
                '    <div class="subtitle">Análise em tempo real</div>' +
                '  </div>' +
                '  <div style="display:flex;gap:10px;align-items:center">' +
                '    <div class="dropdown">Todas as categorias</div>' +
                '    <div class="dropdown">Todos os autores</div>' +
                '    <button ng-click="$ctrl.openSettings()" class="btn">⚙️</button>' +
                '  </div>' +
                '</div>',
      controller: function(){ this.openSettings = function(){ alert('Abrir configurações (header)'); }; }
    });
})(angular);
