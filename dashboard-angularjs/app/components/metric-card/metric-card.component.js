(function () {
  'use strict';

  angular
    .module('dashboardApp')
    .component('metricCard', {
      bindings: {
        title: '@',
        value: '@',
        variant: '@',
        subtitle: '@',
        showObservation: '<'
      },
      controller: function () {
        const ctrl = this;

        ctrl.minValue = null;
        ctrl.maxValue = null;

        ctrl.$onChanges = function (changes) {
          if (changes.value) {
            const newValue = parseFloat(ctrl.value);

            if (!isNaN(newValue)) {
              // Atualiza valores mínimos e máximos para comparação
              if (ctrl.minValue === null || newValue < ctrl.minValue) {
                ctrl.minValue = newValue;
              }

              if (ctrl.maxValue === null || newValue > ctrl.maxValue) {
                ctrl.maxValue = newValue;
              }
            }
          }
        };
      },
      template: `
        <div class="card metric-card" ng-class="{
          'card--secondary': $ctrl.variant === 'secondary',
          'card--especial': $ctrl.variant === 'especial',
          'card--subtitle': $ctrl.variant === 'subtitle'
        }">
          <h3>{{$ctrl.title}}</h3>
          <div class="card-value">{{$ctrl.value}}</div>
          <div class="card-subtitle" ng-if="$ctrl.subtitle">{{$ctrl.subtitle}}</div>

          <div class="observation-area" ng-if="$ctrl.showObservation && $ctrl.minValue !== null && $ctrl.maxValue !== null">
            <div class="observation-title-area">
              <img src="https://cdn-icons-png.flaticon.com/512/69/69544.png" alt="Ícone de Observação">
              <h4 class="observation-title">Comparação</h4>
            </div>
            <div class="observation-info-area">
              <p class="observation-info-primary">
                Neste horário, número de visitantes online normalmente é entre {{$ctrl.minValue}} e {{$ctrl.maxValue}}.
                Hoje você está em <span class="observation-info-primary-especial">{{$ctrl.value}}</span>.
              </p>
              <p class="observation-info-secundary">
                No último mês, seu máximo foi de <b>{{$ctrl.maxValue}}</b>.
              </p>
            </div>
          </div>
        </div>
      `
    });
})();
