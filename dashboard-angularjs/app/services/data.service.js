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
      getPages: getPages,
      getRealtime: getRealtime,
      getTopPages: getTopPages,
      getRFVDistribution: getRFVDistribution, 
      getUsersType: getUsersType
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
          value: rt.visitors_online,
          variant: 'especial'
        });

        metrics.push({
          title: 'Recirculação',
          value: (rt.metrics && rt.metrics.recirculation) || '-',
          variant: 'secondary'
        });

        metrics.push({
          title: 'Tempo Engajado',
          value: (rt.metrics && rt.metrics.average_time) || '-',
          variant: 'secondary'
        });

        metrics.push({
          title: 'Rolagem Média',
          value: (rt.metrics && rt.metrics.avg_scroll) || '-',
          variant: 'secondary'
        });

        metrics.push({
          title: 'RFV Medio',
          value: (rt.metrics && rt.metrics.rfv_mean) || '-',
          variant: 'secondary'
        });

        return metrics;
      });
    }

    function getPages() {
      return loadAll().then(function (data) {
        return (data.top_pages || []).map(function (p) {
          return {
            title: p.title,
            uv: p.uv,
            time_engaged: p.time_engaged,
            scroll_percent: p.scroll_percent,
            url: p.url,
            trend: p.trend
          };
        });
      });
    }

    function getRealtime() {
      return loadAll().then(function (data) {
        return data.rfv_distribution.map(item => {
          return {
            visitors_online: randomizeValue(visitors_online, 0.2),
            today_pageviews: randomizeValue(today_pageviews, 0.2),
            unique_visitors: randomizeValue(unique_visitors, 0.2),
            traffic_breakdown: {
              Interno: randomizeValue(Interno, 0.2),
              Busca: randomizeValue(Busca, 0.2),
              Social: randomizeValue(Social, 0.2),
              Direto: randomizeValue(Direto, 0.2),
              Links: randomizeValue(Links, 0.2)
            },
            metrics: {
              recirculation: `${randomizeValue(recirculation, 0.2)}%`,
              average_time: `0:${randomizeValue(average_time, 0.2)}`,
              avg_scroll: `${randomizeValue(avg_scroll, 0.2)}%`,
              rfv_mean: randomizeValue(rfv_mean, 0.2)
            }
          };
        });
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

    function getRFVDistribution() {
      return loadAll().then(function (data) {
        return data.rfv_distribution.map(item => {
          return {
            text: item.range,
            count: randomizeValue(item.count, 0.2)
          };
        });
      });
    }

    function getUsersType() {
      return loadAll().then(function (data) {
        return data.user_types.map(item => {
          return {
            text: item.type,
            count: randomizeValue(item.count, 0.5)
          };
        });
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
  }
})();
