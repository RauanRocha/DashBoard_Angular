(function () {
    'use strict';

    angular
        .module('dashboardApp')
        .component('searchbar', {
            template: `
      <div class="card filter-bar">
        <div class="filter-bar-main">
            <div class="search-box">
                <input type="text" placeholder="Pesquisar..."/>
                <button class="search-btn"> 
                    <img src="https://images.vexels.com/media/users/3/132068/isolated/preview/f9bb81e576c1a361c61a8c08945b2c48-icone-de-pesquisa.png" />
                </button>
            </div>

            <select class="filter-select">
                <option>Todas as categorias</option>
                <option>Categoria 1</option>
                <option>Categoria 2</option>
            </select>

            <select class="filter-select">
                <option>Todos os autores</option>
                <option>Autor 1</option>
                <option>Autor 2</option>
            </select>

            <div class="filter-chips">
                <input type="text" placeholder="filtros" ng-model="$ctrl.searchText" ng-keypress="$ctrl.handleKeyPress($event)"/>
                <span class="chip" ng-repeat="chip in $ctrl.chips">{{chip}} <button ng-click="$ctrl.removeChip($index)">✕</button></span>
                <button class="search-btn" ng-click="$ctrl.addChip()"> <img src="https://images.vexels.com/media/users/3/132068/isolated/preview/f9bb81e576c1a361c61a8c08945b2c48-icone-de-pesquisa.png"></button>
            </div>
        </div>
            
        <button class="filter-icon">⚙️</button>
      </div>
      `,
            controller: SearchbarCtrl
        });

    function SearchbarCtrl() {
        const ctrl = this;
        ctrl.searchText = '';
        ctrl.chips = [];

        ctrl.addChip = function () {
            const trimmedText = ctrl.searchText.trim();

            if (!trimmedText) {
                alert("O campo não pode estar vazio.");
                return;
            }

            if (ctrl.chips.includes(trimmedText)) {
                alert("Este filtro já foi adicionado.");
                ctrl.searchText = '';
                return;
            }

            if (ctrl.chips.length >= 2) {
                alert("Não é possível adicionar mais de 2 filtros.");
                ctrl.searchText = '';
                return;
            }

            ctrl.chips.push(trimmedText);
            ctrl.searchText = '';
        };


        ctrl.removeChip = function (index) {
            ctrl.chips.splice(index, 1);
        };

        ctrl.handleKeyPress = function (event) {
            if (event.key === 'Enter') {
                ctrl.addChip();
            }
        };
    }
})();
