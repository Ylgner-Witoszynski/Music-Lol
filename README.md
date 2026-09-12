<div align="center">

# 🎵 League Music

### A web music player inspired by the League of Legends universe.

<p>
  <img src="https://img.shields.io/badge/Status-Completed-00E5FF?style=for-the-badge" alt="Status: Completed"/>
  <img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=000" alt="JavaScript"/>
  <img src="https://img.shields.io/badge/PWA-Ready-5A0FC8?style=for-the-badge" alt="PWA Ready"/>
  <img src="https://img.shields.io/badge/YouTube-Player_API-FF0000?style=for-the-badge&logo=youtube&logoColor=white" alt="YouTube Player API"/>
</p>

<p>
  <strong>Listen. Discover. Enjoy.</strong><br/>
  Uma experiência de reprodução musical inspirada no universo de League of Legends,
  com suporte a playlists, favoritos, reprodução aleatória e PWA.
</p>

<br/>

</div>

---

## 🎧 Sobre o projeto

**League Music** é um player de música desenvolvido para a web, inspirado no universo de **League of Legends**, reunindo faixas relacionadas ao jogo, K/DA e outros artistas do mesmo universo musical.

O projeto utiliza a **YouTube IFrame Player API** para reproduzir conteúdos oficiais diretamente no player, enquanto oferece uma interface própria para gerenciamento da experiência de reprodução.

Além da reprodução de músicas, o projeto conta com persistência de preferências, retomada de reprodução, atalhos de teclado e suporte à instalação como **Progressive Web App (PWA)**.

> **Projeto de fã, não oficial e sem vínculo com a Riot Games.**

---

## ✨ Funcionalidades

### 🎵 Player

- ▶️ Reprodução e pausa de faixas
- ⏭️ Avanço para a próxima faixa
- ⏮️ Retorno para a faixa anterior
- 🔊 Controle de volume
- 🔇 Modo silencioso
- 🔀 Reprodução aleatória
- 🔁 Modo de repetição
- 📊 Barra de progresso interativa
- ⏱️ Exibição da duração e progresso da faixa

### 📚 Playlist

- 🔎 Busca por músicas
- ❤️ Sistema de favoritas
- 📂 Playlist lateral recolhível
- 🎵 Biblioteca de faixas do universo de League of Legends
- ▶️ Seleção direta de qualquer faixa

### 💾 Persistência

As principais preferências do usuário são armazenadas no navegador:

- Músicas favoritas
- Volume
- Modo aleatório
- Modo de repetição
- Última faixa reproduzida
- Posição em que a reprodução foi interrompida

Ao retornar ao projeto, o player pode continuar a reprodução a partir do estado salvo.

### 📱 PWA

O projeto também possui suporte a **Progressive Web App**, permitindo sua instalação em dispositivos compatíveis.

Inclui:

- Web App Manifest
- Service Worker
- Cache de recursos
- Experiência semelhante a um aplicativo instalado

---

## ⌨️ Atalhos de teclado

|  Tecla   | Ação                            |
| :------: | ------------------------------- |
| `Espaço` | ▶️ Tocar / pausar               |
|   `←`    | ⏮️ Faixa anterior               |
|   `→`    | ⏭️ Próxima faixa                |
|   `M`    | 🔇 Silenciar / restaurar volume |
|   `S`    | 🔀 Ativar / desativar aleatório |
|   `R`    | 🔁 Alternar modo de repetição   |

---

## 🧩 Tecnologias

<div align="center">

<img src="https://skillicons.dev/icons?i=html,css,js,git,github,vscode" />

</div>

<br/>

| Tecnologia                    | Utilização                                   |
| ----------------------------- | -------------------------------------------- |
| **HTML5**                     | Estrutura e semântica da aplicação           |
| **CSS3**                      | Interface, responsividade e animações        |
| **JavaScript**                | Lógica do player e interação com a interface |
| **YouTube IFrame Player API** | Reprodução dos conteúdos musicais            |
| **Service Worker**            | Recursos de PWA e cache                      |
| **Web App Manifest**          | Instalação como aplicação                    |
| **JSON**                      | Estrutura e gerenciamento da playlist        |

---

## 🏗️ Arquitetura

O projeto foi desenvolvido utilizando tecnologias nativas da web, sem depender de frameworks para a estrutura principal da aplicação.

A organização separa responsabilidades entre:

```text
League Music
│
├── Interface
│   ├── Player
│   ├── Playlist
│   ├── Controles
│   └── Busca
│
├── Dados
│   └── musics.json
│
├── Reprodução
│   └── YouTube IFrame Player API
│
├── Persistência
│   └── Preferências do usuário
│
└── PWA
    ├── Service Worker
    └── Web App Manifest
```

Essa estrutura facilita a manutenção e permite evoluir o projeto sem concentrar toda a lógica em uma única camada.

---

## 🚀 Executando localmente

### 1. Clone o repositório

```bash
git clone https://github.com/Ylgner-Witoszynski/Music-Lol.git
```

### 2. Entre na pasta

```bash
cd Music-Lol
```

O projeto pode ser aberto diretamente pelo `index.html`: a playlist possui um cat&aacute;logo embutido para funcionar no computador sem `fetch`. Nesse modo, o Service Worker fica desativado por uma restri&ccedil;&atilde;o do navegador, mas o player e os controles continuam dispon&iacute;veis.

Para obter cache offline e a experi&ecirc;ncia completa de PWA, abra o projeto por um servidor local. A forma mais simples &eacute; usar a extens&atilde;o **Live Server** do VS Code.

### 3. Inicie um servidor local

O projeto deve ser executado através de um servidor HTTP local.

Uma opção simples é utilizar a extensão **Live Server** no VS Code.

Ou, caso tenha Python instalado:

```bash
python -m http.server 8000
```

Depois, acesse <http://localhost:8000>.

```text
http://localhost:8000
```

> ⚠️ **Importante:** não abra o `index.html` diretamente pelo explorador de arquivos.
> O projeto utiliza recursos que dependem de um servidor HTTP, como `musics.json`, Service Worker e integração com a API do YouTube.

---

## 🧪 Testes

Para executar os testes automatizados:

```bash
npm test
```

Os testes verificam a integridade básica da playlist, incluindo:

- Quantidade mínima de faixas
- Nome da música
- Artista
- Identificador válido do vídeo do YouTube

Isso ajuda a evitar que entradas incompletas ou inválidas sejam adicionadas à biblioteca.

---

## 🎯 Objetivos do projeto

O **League Music** também foi desenvolvido como projeto prático para explorar conceitos importantes de desenvolvimento Front-End, incluindo:

- Manipulação do DOM
- Eventos e interação com usuário
- Consumo de APIs
- Gerenciamento de estado no navegador
- `localStorage`
- Organização de dados em JSON
- Reprodução de mídia
- Design responsivo
- Progressive Web Apps
- Service Workers
- Testes automatizados
- Organização e manutenção de código

---

## 📌 Possíveis evoluções

Algumas funcionalidades que podem ser exploradas em futuras versões:

- [ ] 🎚️ Equalizador de áudio
- [ ] 📜 Histórico de reprodução
- [ ] 🎼 Criação de playlists personalizadas
- [ ] 🌙 Temas visuais alternativos
- [ ] 🔍 Filtros por artista e categoria
- [ ] 📱 Melhorias específicas para dispositivos móveis
- [ ] 🎨 Novas experiências visuais inspiradas em diferentes regiões de Runeterra

---

## ⚠️ Créditos e direitos

**League Music é um projeto de fã, não oficial.**

League of Legends, Riot Games, K/DA e os respectivos personagens, marcas, músicas e conteúdos pertencem aos seus respectivos proprietários.

O projeto **não reivindica propriedade sobre esses materiais** e não possui vínculo oficial com a Riot Games.

Os conteúdos musicais são reproduzidos por meio de **incorporações oficiais do YouTube**, respeitando a origem e a plataforma de distribuição dos conteúdos.

---

## 👨‍💻 Desenvolvido por

<div align="center">

### Ylgner Witoszynski Santana

**Computer Science Graduate • Front-End Developer**

<a href="https://github.com/Ylgner-Witoszynski">
  <img src="https://img.shields.io/badge/GitHub-Ylgner--Witoszynski-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/>
</a>

<a href="https://www.linkedin.com/in/ylgner-witoszynski-santana-613a631a1">
  <img src="https://img.shields.io/badge/LinkedIn-Ylgner%20Witoszynski-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/>
</a>

<br/><br/>

⭐ **Se este projeto foi útil ou interessante, considere deixar uma estrela no repositório.**

</div>
