(function() {
  'use strict';

  angular
    .module('dashboardApp')
    .component('metricCard', {
      bindings: {
        title: '@',
        value: '@',
        variant: '@' 
      },
      template: `
        <div class="card" 
        ng-class="{'card--secondary': $ctrl.variant === 'secondary','card--especial': $ctrl.variant === 'especial'}">
          <h3>{{$ctrl.title}}</h3>
          <div class="card-value">{{$ctrl.value}}</div>
        </div>
      `
    });
})();
