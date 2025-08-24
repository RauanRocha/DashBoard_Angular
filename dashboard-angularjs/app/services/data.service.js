(function () {
  'use strict';

  angular
    .module('dashboardApp')
    .factory('DataService', DataService);

  DataService.$inject = ['$http', '$q'];

  function DataService($http, $q) {
    var base = 'app/services/data.json';
    var cached = null;

    var service = {
      loadAll: loadAll,
      getMetrics: getMetrics,
      getRealtime: getRealtime,
      getTopPages: getTopPages,
      getData: getData,
      getTrafficTimeseries: getTrafficTimeseries
    };

    return service;

    function loadAll() {
      if (cached) return $q.resolve(cached);
      return $http.get(base).then(function (res) {
        cached = res.data;
        return cached;
      });
    }

    function getMetrics() {
      return loadAll().then(function (data) {
        var rt = data.realtime || {};
        var metrics = [];

        metrics.push({
          title: 'Visitantes Online',
          value: randomizeValue(rt.visitors_online, 0.1),
          variant: 'especial'
        });

        metrics.push({
          title: 'Recirculação',
          value: randomizeValue((rt.metrics && rt.metrics.recirculation) || 0, 0.1),
          variant: 'secondary'
        });

        metrics.push({
          title: 'Tempo Engajado',
          value: randomizeValue((rt.metrics && rt.metrics.average_time) || 0, 0.1),
          variant: 'secondary'
        });

        metrics.push({
          title: 'Rolagem Média',
          value: randomizeValue((rt.metrics && rt.metrics.avg_scroll) || 0, 0.1),
          variant: 'secondary'
        });

        metrics.push({
          title: 'RFV Médio',
          value: randomizeValue((rt.metrics && rt.metrics.rfv_mean) || 0, 0.1),
          variant: 'secondary'
        });

        return metrics;
      });
    }

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




    function getTopPages() {
      return loadAll().then(function (data) {
        return data.top_pages.map(item => {
          return {
            uv: randomizeValue(item.uv, 0.1),
            title: item.title,
            url: item.url,
            time_engaged: `0:${randomizeValue(item.time_engaged, 0.1)}`,
            scroll_percent: randomizeValue(item.scroll_percent, 0.1),
            trend: [randomizeValue(item.trend[0], 0.3), randomizeValue(item.trend[1], 0.3), randomizeValue(item.trend[2], 0.2), randomizeValue(item.trend[3], 0.3), randomizeValue(item.trend[4], 0.3), randomizeValue(item.trend[5], 0.3), randomizeValue(item.trend[6], 0.3)]
          };
        });
      });
    }

    function getData(dataKey, textKey, countKey, randomizeFactor) {
      return loadAll().then(function (data) {
        return data[dataKey].map(item => {
          return {
            text: item[textKey],
            count: randomizeFactor ? randomizeValue(item[countKey], randomizeFactor) : item[countKey]
          };
        }).sort((a, b) => b.count - a.count);
      });
    }

    function randomizeValue(value, percentage) {
      const variation = Math.floor(value * percentage);
      const min = -variation;
      const max = variation;
      const delta = Math.floor(Math.random() * (max - min + 1)) + min;
      const result = value + delta;
      return result < 0 ? 0 : result;
    }

    function getTrafficTimeseries() {
      return loadAll().then(function (data) {
        var timeseries = data.traffic_timeseries;

        return {
          labels: timeseries.labels,
          series: Object.keys(timeseries.series),
          data: Object.keys(timeseries.series).map(function (key) {
            return timeseries.series[key];
          })
        };
      });
    }

  }
})();
