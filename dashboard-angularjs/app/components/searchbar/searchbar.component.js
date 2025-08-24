(function () {
  'use strict';

  angular
    .module('dashboardApp')
    .component('searchbar', {
      template: `
        <div class="card filter-bar">
          <div class="filter-bar-main">
            <div class="search-box">
              <input
                type="text"
                placeholder="Pesquisar..."
                ng-model="$ctrl.query"
                ng-keypress="$ctrl.onSearchKeyPress($event)"
                aria-label="Campo de busca"
              />

              <button class="search-btn" type="button" ng-click="$ctrl.performSearch()" aria-label="Pesquisar">
                <img src="https://images.vexels.com/media/users/3/132068/isolated/preview/f9bb81e576c1a361c61a8c08945b2c48-icone-de-pesquisa.png" alt="Buscar"/>
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
              <input
                type="text"
                placeholder="filtros"
                ng-model="$ctrl.searchText"
                ng-keypress="$ctrl.handleKeyPress($event)"
                aria-label="Adicionar filtro"
              />

              <span class="chip" ng-repeat="chip in $ctrl.chips track by $index">
                {{chip}}
                <button type="button" ng-click="$ctrl.removeChip($index)" aria-label="Remover filtro">✕</button>
              </span>

              <button class="search-btn" type="button" ng-click="$ctrl.addChip()" aria-label="Adicionar filtro">
                <img src="https://images.vexels.com/media/users/3/132068/isolated/preview/f9bb81e576c1a361c61a8c08945b2c48-icone-de-pesquisa.png" alt="Adicionar"/>
              </button>
            </div>
          </div>

          <button class="filter-icon" type="button" ng-click="$ctrl.openConfig()" aria-label="Configurações">⚙️</button>
        </div>
      `,
      controller: SearchbarCtrl
    });

  function SearchbarCtrl() {
    const ctrl = this;

    // Inicializa estado do componente quando o ciclo do Angular estiver pronto
    ctrl.$onInit = function () {
      ctrl.query = '';
      ctrl.searchText = '';
      ctrl.chips = [];
    };

    // Helper reutilizável para checar texto vazio / somente espaços
    ctrl.isEmpty = (text) => !text || String(text).trim().length === 0;

    // Executa a ação de busca (placeholder) — mantemos `alert` como comportamento temporário
    ctrl.performSearch = () => {
      if (ctrl.isEmpty(ctrl.query)) return; // sem texto: nada a fazer

      alert('Busca indisponível no momento.');
      ctrl.query = '';
    };

    // Atalho de teclado no input principal (Enter)
    ctrl.onSearchKeyPress = (event) => {
      if (event.key === 'Enter') ctrl.performSearch();
    };

    // Adiciona um novo chip de filtro com validações básicas
    ctrl.addChip = () => {
      if (ctrl.isEmpty(ctrl.searchText)) {
        alert('O campo não pode estar vazio.');
        return;
      }

      const trimmed = String(ctrl.searchText).trim();

      if (ctrl.chips.includes(trimmed)) {
        alert('Este filtro já foi adicionado.');
        ctrl.searchText = '';
        return;
      }

      if (ctrl.chips.length >= 2) {
        alert('Não é possível adicionar mais de 2 filtros.');
        ctrl.searchText = '';
        return;
      }

      ctrl.chips.push(trimmed);
      ctrl.searchText = '';
    };

    // Remove chip por índice
    ctrl.removeChip = (index) => ctrl.chips.splice(index, 1);

    // Enter no campo de filtros adiciona o chip
    ctrl.handleKeyPress = (event) => {
      if (event.key === 'Enter') ctrl.addChip();
    };

    // Configurações: placeholder
    ctrl.openConfig = () => alert('Configurações indisponíveis no momento.');
  }
})();
