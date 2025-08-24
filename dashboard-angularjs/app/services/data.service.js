(function () {
  'use strict';

  angular
    .module('dashboardApp')
    .factory('DataService', DataService);

  DataService.$inject = ['$http', '$q'];

  function DataService($http, $q) {
    const base = 'app/services/data.json';
    let cached = null;

    return {
      loadAll,
      getMetrics,
      getRealtime,
      getTopPages,
      getData,
      getTrafficTimeseries
    };

    // Carrega o JSON de dados uma vez e cacheia
    function loadAll() {
      if (cached) return $q.resolve(cached);

      return $http.get(base).then(function (res) {
        cached = res.data;
        return cached;
      });
    }

    // Retorna as métricas principais da tela (visitantes, engajamento etc.)
    function getMetrics() {
      return loadAll().then(function (data) {
        const rt = data.realtime || {};
        const mt = rt.metrics || {};

        return [
          {
            title: 'Visitantes Online',
            value: randomizeValue(rt.visitors_online, 0.1),
            variant: 'especial'
          },
          {
            title: 'Recirculação',
            value: randomizeValue(mt.recirculation || 0, 0.1),
            variant: 'secondary'
          },
          {
            title: 'Tempo Engajado',
            value: randomizeValue(mt.average_time || 0, 0.1),
            variant: 'secondary'
          },
          {
            title: 'Rolagem Média',
            value: randomizeValue(mt.avg_scroll || 0, 0.1),
            variant: 'secondary'
          },
          {
            title: 'RFV Médio',
            value: randomizeValue(mt.rfv_mean || 0, 0.1),
            variant: 'secondary'
          }
        ];
      });
    }

    // Dados em tempo real da sessão atual
    function getRealtime() {
      return loadAll().then(function (data) {
        const rt = data.realtime || {};
        const tb = rt.traffic_breakdown || {};
        const mt = rt.metrics || {};

        return [{
          visitors_online: randomizeValue(rt.visitors_online || 0, 0.2),
          today_pageviews: randomizeValue(rt.today_pageviews || 0, 0.2),
          unique_visitors: randomizeValue(rt.unique_visitors || 0, 0.2),
          traffic_breakdown: {
            Interno: randomizeValue(tb.Interno || 0, 0.2),
            Busca: randomizeValue(tb.Busca || 0, 0.2),
            Social: randomizeValue(tb.Social || 0, 0.2),
            Direto: randomizeValue(tb.Direto || 0, 0.2),
            Links: randomizeValue(tb.Links || 0, 0.2)
          },
          metrics: {
            recirculation: `${randomizeValue(mt.recirculation || 0, 0.2)}%`,
            average_time: `0:${randomizeValue(mt.average_time || 0, 0.2)}`,
            avg_scroll: `${randomizeValue(mt.avg_scroll || 0, 0.2)}%`,
            rfv_mean: randomizeValue(mt.rfv_mean || 0, 0.2)
          }
        }];
      });
    }

    // Retorna as páginas mais acessadas com dados adicionais
    function getTopPages() {
      return loadAll().then(function (data) {
        return data.top_pages.map(item => ({
          uv: randomizeValue(item.uv, 0.1),
          title: item.title,
          url: item.url,
          time_engaged: `0:${randomizeValue(item.time_engaged, 0.1)}`,
          scroll_percent: randomizeValue(item.scroll_percent, 0.1),
          trend: item.trend.map((v, i) => randomizeValue(v, i === 2 ? 0.2 : 0.3))
        }));
      });
    }

    /**
     * Função genérica para buscar dados por chave.
     * @param {string} dataKey - Nome da propriedade no JSON.
     * @param {string} textKey - Nome do campo que será usado como 'text'.
     * @param {string} countKey - Nome do campo que será usado como 'count'.
     * @param {number} randomizeFactor - Fator de variação no count.
     */
    function getData(dataKey, textKey, countKey, randomizeFactor) {
      return loadAll().then(function (data) {
        return data[dataKey]
          .map(item => ({
            text: item[textKey],
            count: randomizeFactor
              ? randomizeValue(item[countKey], randomizeFactor)
              : item[countKey]
          }))
          .sort((a, b) => b.count - a.count);
      });
    }

    // Simula variação dos dados para parecer mais dinâmico
    function randomizeValue(value, percentage) {
      const variation = Math.floor(value * percentage);
      const delta = Math.floor(Math.random() * (2 * variation + 1)) - variation;
      const result = value + delta;
      return result < 0 ? 0 : result;
    }

    // Retorna séries temporais de tráfego
    function getTrafficTimeseries() {
      return loadAll().then(function (data) {
        const ts = data.traffic_timeseries;

        return {
          labels: ts.labels,
          series: Object.keys(ts.series),
          data: Object.values(ts.series)
        };
      });
    }
  }
})();
