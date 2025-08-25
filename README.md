📊 Dashboard AngularJS

Um dashboard Front-End dinâmico construído com AngularJS, com foco em métricas em tempo real.



## 📁 Estrutura do Projeto

dashboard-app/

├── app/

│   ├── components/

│   │   ├── leftPanel.component.js

│   │   ├── centerPanel.component.js

│   │   ├── rightPanel.component.js

│   │   ├── metricCard.component.js

│   │   ├── rfvCard.component.js

│   │   ├── trafficCard.component.js

│   │   ├── pagesTable.component.js

│   │   ├── searchbar.component.js

│   │   └── chartPlaceholder.directive.js

│   ├── services/

│   │   └── data.service.js

│   └── assets/

│       └── data.json

├── index.html

└── styles.css

---



🚀 Funcionalidades

Métricas em tempo real: visitantes online, tempo médio, rolagem, recirculação e RFV.

Tráfego, RFV detalhado, Tabela de páginas mais acessadas com mini gráficos de tendência e tipos de usuários.

Gráfico de linha com evolução do tráfego nas últimas 24 horas (usando Chart.js).



🛠️ Tecnologias Utilizadas

AngularJS 1.x

Chart.js – para gráficos de linha e tendência

HTML5 / CSS3

JavaScript (ES5/ES6)

$http / $interval / $timeout / $q – para manipulação de dados e simulação de tempo real

Dados simulados via data.json local



📦 Instalação e Execução

1. Pré-requisitos

  Node.js (opcional, se quiser rodar servidor local)

  Um servidor HTTP simples (como http-server, lite-server, Python HTTP, etc.)

2. Rodar com http-server
npm install -g http-server
http-server .


Abra http://localhost:8080
 no navegador.



📊 Dados Simulados

Os dados são lidos de um arquivo local:

// app/services/data.json


Os dados são carregados uma única vez e armazenados em cache, com pequenas variações randômicas aplicadas em tempo real para simular mudanças ao longo do tempo.



🧠 Componentes Customizados

✅ left-panel

Mostra a métrica principal e métricas secundárias.

Contém 2 <rfv-card>s com informações agregadas.

✅ center-panel

Contém métricas como visitantes únicos e pageviews do dia.

Exibe gráfico de tráfego.

Exibe a tabela de páginas mais acessadas com mini gráficos.

✅ right-panel

Mostra informações de tráfego por origem, referência e categorias, com barras.

✅ rfv-card

Lista de itens com barras proporcionais.

✅ traffic-card

Lista dados com ou sem barras. Usa fetch-function customizável.

✅ pages-table

Tabela de artigos mais acessados.

Usa mini gráficos com Chart.js.

✅ chart-placeholder

Diretiva com gráfico de linhas para tráfego nas últimas 24 horas.

✅ metric-card

Card de métrica com visualização de comparação (mínimo e máximo anteriores).

✅ searchbar

Input de pesquisa com filtros por categoria, autor e filtros customizáveis via “chips”.

