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

          // Recuperando os dados do serviço DataService
          DataService.getTrafficTimeseries().then(function (timeseries) {
            vm.labels = timeseries.labels;
            vm.series = timeseries.series;
            vm.data = timeseries.data;

            // Adiar a execução da criação do gráfico para garantir que o DOM foi renderizado
            $timeout(function () {
              createChart();
            }, 0);
          }).catch(function (error) {
            console.error("Erro ao carregar dados do DataService:", error);
          });

          // Função para criar o gráfico
          function createChart() {
            var ctx = document.getElementById('trafficChart').getContext('2d');

            // Verifica se o contexto do canvas foi obtido corretamente
            if (!ctx) {
              console.error("Contexto do Canvas não encontrado.");
              return;
            }

            // Configuração dos datasets para o gráfico
            var datasets = vm.data.map(function (data, index) {
              const colors = ['#8e44ad', '#e74c3c', '#3498db', '#2ecc71']; // Ajuste das cores
              return {
                label: vm.series[index],
                data: data,
                borderColor: colors[index],  // Cor da linha
                backgroundColor: colors[index],  // Cor do fundo (sem opacidade)
                fill: true,  // Preencher a área abaixo da linha
                tension: 0,
                pointRadius: 0,  // Tamanho das bolinhas na legenda
                borderWidth: 2,
              };
            });

            // Criando o gráfico com Chart.js
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
                    position: 'top', // Legenda no topo
                    align: 'start', // Alinhar a legenda à esquerda
                    padding: 800,
                    labels: {
                      usePointStyle: true, // Usar bolinhas na legenda
                      pointStyle: 'circle', // Usar círculos para as bolinhas
                      boxWidth: 6, // Tamanho da bolinha na legenda
                      boxHeight: 6,
                      padding: 20
                    }
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    stacked: true,
                    grid: {
                      display: false  // Remover as linhas de quadriculado do eixo Y
                    }
                  },
                  x: {
                    stacked: true,
                    grid: {
                      display: false  // Remover as linhas de quadriculado do eixo X
                    }
                  }
                },
              }
            });
          }
        }
      };
    });
})();
