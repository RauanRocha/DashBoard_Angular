(function () {
  'use strict';

  angular
    .module('dashboardApp')
    .directive('chartPlaceholder', function (DataService, $timeout) {
      return {
        restrict: 'E',
        scope: {},
        template: `
          <div class="card">
            <h3>Tráfego em Tempo Real</h3>
            <p>Visitantes por fonte de tráfego nas últimas 24 horas</p>
            <div style="height:250px;">
              <canvas id="trafficChart" width="400" height="250"></canvas>
            </div>
          </div>
        `,
        controllerAs: 'vm',
        controller: function ($element, $timeout) {
          var vm = this;

          vm.labels = [];
          vm.series = [];
          vm.data = [];
          vm.chart = null;

          DataService.getTrafficTimeseries()
            .then(function (timeseries) {
              vm.labels = timeseries.labels;
              vm.series = timeseries.series;
              vm.data = timeseries.data;

              // Aguarda ciclo do Angular antes de renderizar o gráfico
              $timeout(createChart, 0);
            })
            .catch(function (error) {
              console.error("Erro ao carregar dados do DataService:", error);
            });

          function createChart() {
            var ctx = document.getElementById('trafficChart')?.getContext('2d');
            if (!ctx) return console.error("Contexto do Canvas não encontrado.");

            var colors = ['#8e44ad', '#e74c3c', '#3498db', '#2ecc71'];

            var datasets = vm.data.map(function (data, index) {
              return {
                label: vm.series[index],
                data: data,
                borderColor: colors[index],
                backgroundColor: colors[index],
                fill: true,
                tension: 0,
                pointRadius: 0,
                borderWidth: 2,
              };
            });

            vm.chart = new Chart(ctx, {
              type: 'line',
              data: {
                labels: vm.labels,
                datasets: datasets
              },
              options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                    align: 'start',
                    labels: {
                      usePointStyle: true,
                      pointStyle: 'circle',
                      boxWidth: 6,
                      boxHeight: 6,
                      padding: 20
                    }
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    stacked: true,
                    grid: { display: false }
                  },
                  x: {
                    stacked: true,
                    grid: { display: false }
                  }
                },
              }
            });
          }
        }
      };
    });
})();
