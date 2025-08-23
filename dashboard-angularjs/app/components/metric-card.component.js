(function(angular){
  'use strict';
  angular.module('dashboardApp')
    .component('metricCard', {
      bindings: { title: '@', value: '@', subtitle: '@' },
      template: '<div class="metric-card">' +
                '  <div style="font-weight:700">{{$ctrl.title}}</div>' +
                '  <div style="font-size:18px;margin-top:6px">{{$ctrl.value}}</div>' +
                '  <div style="color:var(--muted);font-size:12px;margin-top:6px" ng-if="$ctrl.subtitle">{{$ctrl.subtitle}}</div>' +
                '</div>',
      controller: function(){}
    });
})(angular);
