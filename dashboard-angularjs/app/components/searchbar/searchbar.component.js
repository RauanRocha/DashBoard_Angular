(function () {
  'use strict';

  angular
    .module('dashboardApp')
    .component('searchbar', {
      template: `
      <div class="card filter-bar">
        <div class="filter-bar-main">
            <div class="search-box">
                <input type="text" placeholder="Pesquisar..." />
                <button class="search-btn"> <img src="https://images.vexels.com/media/users/3/132068/isolated/preview/f9bb81e576c1a361c61a8c08945b2c48-icone-de-pesquisa.png"></button>
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
                <input type="text" placeholder="filtros" />
                <span class="chip">Visitante ✕</span>
                <span class="chip">Assinante ✕</span>
                <button class="search-btn"> <img src="https://images.vexels.com/media/users/3/132068/isolated/preview/f9bb81e576c1a361c61a8c08945b2c48-icone-de-pesquisa.png"></button>
            </div>
        </div>
            
        <button class="filter-icon">⚙️</button>
</div>
      `,
    });
})();
