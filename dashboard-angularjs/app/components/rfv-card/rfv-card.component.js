angular
  .module('dashboardApp')
  .component('rfvCard', {
    bindings: {
      title: '@',           // Título do card
      fetchFunction: '&'    // Função externa para buscar os dados
    },
    template: `
      <div class="card">
        <h3>{{ $ctrl.title }}</h3>
        <ul class="rfvCard-list">
          <li class="item-rfvCard" ng-repeat="item in $ctrl.rfv_distribution">
            <h4 class="item-title">{{ item.text }}</h4>
            <div class="item-value-area">
              <span class="item-info">{{ item.count }}</span>
              <div class="item-progressbar-area">
                <div 
                  class="item-progressbar" 
                  ng-style="{ 'width': item.progress + '%' }">
                </div>
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
        intervalPromise = $interval(fetchData, 10000); // Atualiza a cada 10s
      };

      ctrl.$onDestroy = function () {
        if (intervalPromise) {
          $interval.cancel(intervalPromise);
        }
      };

      // Busca os dados e calcula a largura da barra de progresso
      function fetchData() {
        const result = ctrl.fetchFunction();

        if (result && typeof result.then === 'function') {
          result.then(data => {
            if (!data || data.length === 0) return;

            const maxValue = Math.max(...data.map(item => item.count));

            ctrl.rfv_distribution = data.map(item => ({
              ...item,
              progress: maxValue > 0
                ? Math.min((item.count / maxValue) * 100, 100)
                : 0
            }));
          });
        }
      }
    }
  });
