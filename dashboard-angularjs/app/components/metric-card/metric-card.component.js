(function () {
  'use strict';

  angular
    .module('dashboardApp')
    .component('metricCard', {
      bindings: {
        title: '@',
        value: '@',
        variant: '@',
        subtitle: '@' 
      },
      template: `
        <div class="card" ng-class="{
          'card--secondary': $ctrl.variant === 'secondary', 
          'card--especial': $ctrl.variant === 'especial',
          'card--subtitle': $ctrl.variant === 'subtitle'}"
        >
            <h3>{{$ctrl.title}}</h3>
            <div class="card-value">{{$ctrl.value}}</div>
            <div class="card-subtitle" ng-if="$ctrl.subtitle">{{$ctrl.subtitle}}</div>
        
        </div>
      `
    });
})();
