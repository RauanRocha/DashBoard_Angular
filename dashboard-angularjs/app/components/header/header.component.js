(function() {
  'use strict';

  angular
    .module('dashboardApp')
    .component('appHeader', {
      template: `
        <header class="app-header">
          <h2>{{$ctrl.title}}</h2>
          <p>Análise em tempo real</p>
        </header>
      `,
      controller: function() {
        this.title = "Real Time";
      }
    });
})();
