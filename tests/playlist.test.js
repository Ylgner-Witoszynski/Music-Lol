const assert = require('node:assert/strict')
const fs = require('node:fs')

const tracks = JSON.parse(fs.readFileSync('musics.json', 'utf8'))
assert.ok(tracks.length >= 8, 'A playlist deve ter pelo menos oito faixas')
for (const track of tracks) {
  assert.ok(track.name && track.artist, 'Toda faixa deve ter nome e artista')
  assert.match(track.youtubeId, /^[A-Za-z0-9_-]{11}$/, 'ID do YouTube invalido')
}
console.log(`OK: ${tracks.length} faixas validas`)
