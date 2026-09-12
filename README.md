# League Music

Player web inspirado no universo de League of Legends, criado por [Ylgner Witoszynski Santana](https://github.com/Ylgner-Witoszynski).

O projeto reproduz clipes oficiais incorporados do YouTube e oferece uma biblioteca de faixas do universo de League of Legends, K/DA e artistas relacionados.

## Recursos

- Reprodu&ccedil;&atilde;o, pausa, avan&ccedil;o e retorno de faixas
- Busca na playlist e filtro de favoritas
- Favoritos, volume, aleat&oacute;rio e repeti&ccedil;&atilde;o salvos no navegador
- Barra de progresso clic&aacute;vel e exibi&ccedil;&atilde;o da dura&ccedil;&atilde;o
- Retomada da &uacute;ltima faixa e posi&ccedil;&atilde;o de reprodu&ccedil;&atilde;o
- Compartilhamento da faixa atual
- Painel lateral de playlist recolh&iacute;vel
- Layout responsivo e suporte para instala&ccedil;&atilde;o como PWA

### Atalhos de teclado

|        Tecla        | A&ccedil;&atilde;o                         |
| :-----------------: | ------------------------------------------ |
|   `Espa&ccedil;o`   | Tocar ou pausar                            |
| `&larr;` / `&rarr;` | Faixa anterior ou pr&oacute;xima           |
|         `M`         | Silenciar ou restaurar o volume            |
|         `S`         | Ativar/desativar modo aleat&oacute;rio     |
|         `R`         | Alternar o modo de repeti&ccedil;&atilde;o |

## Tecnologias

- HTML5
- CSS3
- JavaScript
- YouTube IFrame Player API
- Service Worker e Web App Manifest

## Executar localmente

```bash
git clone https://github.com/Ylgner-Witoszynski/Music-Lol.git
cd Music-Lol
```

Abra o projeto por um servidor local para que a playlist, o player e o Service Worker sejam carregados corretamente. A forma mais simples &eacute; usar a extens&atilde;o **Live Server** do VS Code.

Com Python instalado, tamb&eacute;m &eacute; poss&iacute;vel executar:

```bash
python -m http.server 8000
```

Depois, acesse <http://localhost:8000>. N&atilde;o abra `index.html` diretamente pelo explorador de arquivos, pois isso pode impedir o carregamento de `musics.json`, do Service Worker e da API do YouTube.

## Testes

```bash
npm test
```

O teste valida se a playlist possui faixas suficientes e se todas as faixas possuem nome, artista e um identificador de v&iacute;deo do YouTube v&aacute;lido.

## Cr&eacute;ditos

Este &eacute; um projeto de f&atilde; e n&atilde;o oficial. League of Legends, Riot Games, K/DA e as faixas reproduzidas pertencem aos respectivos titulares. Os conte&uacute;dos musicais s&atilde;o fornecidos por embeds oficiais do YouTube.
