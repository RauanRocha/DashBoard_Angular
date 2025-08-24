angular
  .module('dashboardApp')
  .component('rfvCard', {
    bindings: {
      title: '@',
      fetchFunction: '&'
    },
    template: `
      <div class="card">
        <h3>{{$ctrl.title}}</h3>
        <ul class="rfvCard-list">
          <li class="item-rfvCard" ng-repeat="item in $ctrl.rfv_distribution">
            <h4 class="item-title">{{item.text}}</h4>
            <div class="item-value-area">
              <span class="item-info">{{item.count}}</span>
              <div class="item-progressbar-area">
                <div class="item-progressbar" ng-style="{'width': item.progress + '%'}"></div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    `,
    controller: function ($interval) {
      const ctrl = this;
      let intervalPromise;

      ctrl.rfv_distribution = [];

      ctrl.$onInit = function () {
        fetchData();
        intervalPromise = $interval(fetchData, 10000);
      };

      ctrl.$onDestroy = function () {
        if (intervalPromise) {
          $interval.cancel(intervalPromise);
        }
      };

      function fetchData() {
        // Chama a função passada via binding
        const result = ctrl.fetchFunction();
        if (result && typeof result.then === 'function') {
          result.then(data => {
            const maxValue = 300;
            ctrl.rfv_distribution = data.map(item => {
              return {
                ...item,
                progress: Math.min((item.count / maxValue) * 100, 100)
              };
            });
          });
        }
      }
    }
  });
