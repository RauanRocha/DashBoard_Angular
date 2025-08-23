(function() {
  'use strict';

  angular
    .module('dashboardApp')
    .controller('MainController', MainController);

  function MainController() {
    var vm = this;
    vm.title = "Real Time Dashboard";
  }
})();
