(function () {
  'use strict';

  angular
    .module('dashboardApp')
    .component('dataCard', {
      bindings: {
        title: '@',
        fetchDataFn: '&',       
        valueField: '<'           
      },
      template: `
        <div class="card">
          <h3>{{$ctrl.title}}</h3>
          <ul class="dataCard-list">
            <li class="item-dataCard" ng-repeat="item in $ctrl.items">
              <h4 class="item-title">{{item.range || item.name}}</h4>
              <div class="item-value-area">
                <span class="item-info">{{item[$ctrl.valueField]}}</span>
                <div class="item-progressbar-area">
                  <div class="item-progressbar" ng-style="{'width': item.progress + '%'}"></div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      `,
      controller: DataCardController
    });

  DataCardController.$inject = ['$interval', '$scope'];

  function DataCardController($interval, $scope) {
    var ctrl = this;
    ctrl.items = [];

    function fetchAndProcess() {
      ctrl.fetchDataFn().then(data => {
        console.log('Data recebida:', data);
        const max = Math.max(...data.map(o => o[ctrl.valueField]));
        ctrl.items = data.map(item => ({
          ...item,
          progress: max ? Math.round((item[ctrl.valueField] / max) * 100) : 0
        }));
      });
    }

    ctrl.$onInit = function () {
      fetchAndProcess();

      console.log('[dataCard] $onInit');

      const intervalPromise = $interval(fetchAndProcess, 5000);

      $scope.$on('$destroy', () => {
        $interval.cancel(intervalPromise);
      });
    };

    console.log('[dataCard.component] carregado 2');
  }

  console.log('[dataCard.component] carregado 1');
})();
