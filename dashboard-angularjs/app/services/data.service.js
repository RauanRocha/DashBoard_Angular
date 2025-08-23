(function() {
  'use strict';

  angular
    .module('dashboardApp')
    .factory('DataService', DataService);

  function DataService() {
    var service = {
      getMetrics: getMetrics,
      getPages: getPages
    };

    return service;

    function getMetrics() {
      return [
        { title: 'Visitantes Online', value: 1096 },
        { title: 'Recirculação', value: '8%' },
        { title: 'Tempo Engajado', value: '0:31' },
        { title: 'Rolagem Média', value: '68%' }
      ];
    }

    function getPages() {
      return [
        { title: 'Correio do Povo', uv: 68, engajado: '0:12', tendencia: '↑' },
        { title: 'Adolescente mata pais...', uv: 25, engajado: '0:37', tendencia: '↑' },
        { title: 'Acúmulo de água alaga ruas', uv: 16, engajado: '0:41', tendencia: '↑' }
      ];
    }
  }
})();
