# CEP Digital — Busca CEP PWA

> Aplicação web para consulta de CEPs e endereços, transformada em Progressive Web App (PWA) e publicada na internet via Netlify.

---

## 1. Sobre o Projeto

### Descrição
O **CEP Digital** é uma aplicação web que permite consultar endereços a partir de um CEP ou buscar CEPs a partir de um logradouro. Os dados são obtidos em tempo real através da API pública **ViaCEP** e da API de localidades do **IBGE**.

### Objetivo
Oferecer uma experiência rápida e acessível de consulta de CEP, funcionando como um aplicativo instalável no celular, com suporte parcial a funcionamento offline — tornando a aplicação mais moderna, confiável e profissional.

### Tecnologias Utilizadas
- **HTML5** — estrutura da aplicação
- **CSS3** — estilização customizada
- **JavaScript (ES6+)** — lógica de consulta e manipulação do DOM
- **Materialize CSS** — framework de UI responsivo (Material Design)
- **Fetch API** — requisições HTTP para as APIs externas
- **ViaCEP API** — consulta de CEPs (`https://viacep.com.br`)
- **IBGE API** — listagem de estados e municípios brasileiros
- **PWA** — manifest.json + Service Worker para instalação e cache offline

---

## 2. Conceitos de PWA

### O que é uma PWA?
Uma **Progressive Web App (PWA)** é uma aplicação web que utiliza tecnologias modernas do navegador para oferecer uma experiência similar a um aplicativo nativo. Ela pode ser instalada no celular ou desktop, funcionar offline (ou com conexão instável) e carregar rapidamente graças ao uso de cache.

### Principais Características
- **Instalável**: o usuário pode adicionar a app na tela inicial do celular ou desktop, sem precisar de loja de aplicativos
- **Offline / conexão instável**: os arquivos principais ficam em cache, garantindo que a interface carregue mesmo sem internet
- **Responsiva**: adapta-se a qualquer tamanho de tela (celular, tablet, desktop)
- **Segura**: exige HTTPS para funcionar corretamente
- **Rápida**: recursos em cache reduzem o tempo de carregamento

### manifest.json
O `manifest.json` é um arquivo JSON que descreve a aplicação para o navegador. Ele define:
- **name / short_name**: nome completo e nome curto exibido no ícone
- **start_url**: página inicial ao abrir pelo atalho instalado
- **display**: modo de exibição (`standalone` remove a barra do navegador, parecendo um app nativo)
- **theme_color / background_color**: cores da barra de status e splash screen
- **icons**: ícones da aplicação em diferentes tamanhos (192px e 512px são obrigatórios)

### Service Worker
O **Service Worker** é um script JavaScript que roda em segundo plano, separado da página. Ele intercepta as requisições de rede e pode:
- **Cachear arquivos** durante a instalação
- **Servir arquivos do cache** quando offline
- **Atualizar o cache** quando há nova versão da aplicação

No projeto, o Service Worker usa a estratégia **Network First com fallback para cache**: tenta buscar da rede primeiro; se falhar (offline), serve o arquivo do cache.

---

## 3. Como Rodar o Projeto Localmente

### Pré-requisitos
- [VS Code](https://code.visualstudio.com/) com a extensão **Live Server** instalada

### Passo a Passo

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/busca-cep-pwa.git

# 2. Abra a pasta no VS Code
cd busca-cep-pwa
code .
```

```
# 3. Inicie o Live Server
- Clique com o botão direito no index.html
- Selecione "Open with Live Server"
- A aplicação abrirá em http://127.0.0.1:5500
```

> **Atenção:** O Service Worker só funciona em HTTPS ou em `localhost`. Ao usar o Live Server localmente, use `127.0.0.1` ou `localhost` para que o PWA funcione corretamente.

---

## 4. Como Fazer o Deploy no Netlify

### Passo a Passo

**1. Acesse o Netlify**
- Vá até [https://netlify.com](https://netlify.com) e faça login (pode usar a conta do GitHub)

**2. Novo site — Deploy manual**
- Na dashboard, clique em **"Add new site" → "Deploy manually"**

**3. Upload do projeto**
- Arraste a pasta do projeto inteira para a área indicada no Netlify
- Aguarde o upload terminar

**4. Configuração automática**
- O Netlify detecta automaticamente os arquivos e faz o deploy
- Não é necessário configurar build commands para projetos HTML/CSS/JS puro


**5. Link final da aplicação**
> 🔗 [https://buscacep-marcosbino-nr.netlify.app/)

> **Importante:** O Netlify já serve o site em HTTPS automaticamente, o que é obrigatório para o PWA funcionar (Service Worker exige HTTPS).

---

## Estrutura do Projeto

```
busca-cep-pwa/
├── index.html
├── manifest.json
├── service-worker.js
├── icons/
│   ├── icon-192x192.png
│   └── icon-512x512.png
├── css/
│   ├── materialize.css
│   └── style.css
└── js/
    ├── init.js
    ├── script.js
    └── materialize.js
```
