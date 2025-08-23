(function(angular){
  'use strict';
  angular.module('dashboardApp')
    .directive('chartPlaceholder', function(){
      return {
        restrict: 'E',
        scope: { type:'=', data:'=', options:'=' },
        template: '<div class="chart-placeholder">' +
                  '  <div style="text-align:center">' +
                  '    <div style="font-weight:700">{{displayTitle}}</div>' +
                  '    <div style="font-size:13px;color:var(--muted)">{{displaySubtitle}}</div>' +
                  '  </div>' +
                  '</div>',
        link: function(scope){
          scope.displayTitle = (scope.type || 'chart').toString().replace(/-/g,' ');
          scope.displaySubtitle = 'Placeholder para gráfico — integre Chart.js/D3 aqui';
          scope.$watch('data', function(){ /* futuro: redraw */ }, true);
        }
      };
    });
})(angular);
