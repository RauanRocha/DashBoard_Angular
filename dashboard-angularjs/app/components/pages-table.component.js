(function(angular){
  'use strict';
  angular.module('dashboardApp')
    .component('pagesTable', {
      bindings: { data: '<' },
      template: '<table class="table">' +
                '  <thead>' +
                '    <tr><th>UV</th><th>Página</th><th>Tempo Engajado</th><th>% Scrolling</th></tr>' +
                '  </thead>' +
                '  <tbody>' +
                '    <tr ng-repeat="p in $ctrl.data">' +
                '      <td>{{p.uv}}</td>' +
                '      <td><div style="font-weight:600">{{p.title}}</div><div style="font-size:12px;color:var(--muted)">{{p.url}}</div></td>' +
                '      <td>{{p.time}}</td>' +
                '      <td>{{p.scroll}}%</td>' +
                '    </tr>' +
                '  </tbody>' +
                '</table>',
      controller: function(){}
    });
})(angular);
