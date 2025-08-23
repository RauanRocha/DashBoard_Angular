(function () {
  'use strict';

  angular
    .module('dashboardApp')
    .component('rfvCard', {
      template: `
        <div class="card">
          <h3>RFV ( Recencia, Frequencia e Volume )</h3>
          <ul class="rfvCard-list">
            <li class="item-rfvCard">
                    <h4 class="item-title">0-5</h4>
                    <div class="item-value-area">
                        <span class="item-info">245</span>
                        <div class="item-progressbar-area">
                          <div class="item-progressbar"></div>
                        </div>
                    </div>
            </li>

            <li class="item-rfvCard">
                    <h4 class="item-title">0-5</h4>
                    <div class="item-value-area">
                        <span class="item-info">245</span>
                        <div class="item-progressbar-area">
                          <div class="item-progressbar"></div>
                        </div>
                    </div>
            </li>

            <li class="item-rfvCard">
                    <h4 class="item-title">0-5</h4>
                    <div class="item-value-area">
                        <span class="item-info">245</span>
                        <div class="item-progressbar-area">
                          <div class="item-progressbar"></div>
                        </div>
                    </div>
            </li>

            <li class="item-rfvCard">
                    <h4 class="item-title">0-5</h4>
                    <div class="item-value-area">
                        <span class="item-info">245</span>
                        <div class="item-progressbar-area">
                          <div class="item-progressbar"></div>
                        </div>
                    </div>
            </li>

            <li class="item-rfvCard">
                    <h4 class="item-title">0-5</h4>
                    <div class="item-value-area">
                        <span class="item-info">245</span>
                        <div class="item-progressbar-area">
                          <div class="item-progressbar"></div>
                        </div>
                    </div>
            </li>

            <li class="item-rfvCard">
                    <h4 class="item-title">0-5</h4>
                    <div class="item-value-area">
                        <span class="item-info">245</span>
                        <div class="item-progressbar-area">
                          <div class="item-progressbar"></div>
                        </div>
                    </div>
            </li>
          </ul>
      `
    });
})();