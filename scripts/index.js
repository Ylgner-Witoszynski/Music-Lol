let music = 0
let musics = []
let isPlaying = false
let player = null
let playerReady = false
let progressEvent = null
let volume = Number(localStorage.getItem('league-music-volume') || 80)
let favorites = new Set(JSON.parse(localStorage.getItem('league-music-favorites') || '[]'))
let shuffle = localStorage.getItem('league-music-shuffle') === 'true'
let repeatMode = localStorage.getItem('league-music-repeat') || 'off'
let resume = JSON.parse(localStorage.getItem('league-music-resume') || 'null')

const heart = '\u2665'
const emptyHeart = '\u2661'

function currentMusic() { return musics[music] }

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`
}

function showPlayerMessage(message = '') {
  const element = document.getElementById('player-message')
  element.textContent = message
  element.hidden = !message
}

function updateMusicInfo() {
  const track = currentMusic()
  if (!track) return
  document.querySelector('.controll span').textContent = `${music + 1} / ${musics.length}`
  document.querySelectorAll('h2:not(#playlist-title)').forEach(element => element.textContent = track.name)
  document.querySelectorAll('h3').forEach(element => element.textContent = track.artist)
  const favoriteButton = document.getElementById('button-favorite')
  const isFavorite = favorites.has(track.youtubeId)
  favoriteButton.classList.toggle('active', isFavorite)
  favoriteButton.textContent = isFavorite ? heart : emptyHeart
  favoriteButton.setAttribute('aria-label', isFavorite ? 'Remover m\u00fasica dos favoritos' : 'Adicionar m\u00fasica aos favoritos')
  const cover = `https://i.ytimg.com/vi/${track.youtubeId}/hqdefault.jpg`
  document.getElementById('track-cover').src = cover
  document.getElementById('track-cover').alt = `Capa de ${track.name}`
  document.documentElement.style.setProperty('--track-background', `url("${cover}")`)
  renderPlaylist()
}

function renderPlaylist() {
  const query = document.getElementById('search').value.trim().toLowerCase()
  const favoritesOnly = document.getElementById('favorites-only').checked
  const list = document.getElementById('playlist-items')
  const filtered = musics.map((track, index) => ({ track, index })).filter(({ track }) =>
    `${track.name} ${track.artist}`.toLowerCase().includes(query) && (!favoritesOnly || favorites.has(track.youtubeId)))
  list.innerHTML = filtered.map(({ track, index }) => `
    <li class="playlist__item ${index === music ? 'active' : ''}">
      <span class="playlist__number">${String(index + 1).padStart(2, '0')}</span>
      <button type="button" class="playlist__track" data-track="${index}"><strong>${track.name}</strong><small>${track.artist}</small></button>
      <button type="button" class="playlist__favorite ${favorites.has(track.youtubeId) ? 'active' : ''}" data-favorite="${index}" aria-label="Favoritar ${track.name}">${favorites.has(track.youtubeId) ? heart : emptyHeart}</button>
    </li>`).join('') || '<li class="playlist__empty">Nenhuma m\u00fasica encontrada.</li>'
  document.getElementById('favorite-count').textContent = `${favorites.size} favorita${favorites.size === 1 ? '' : 's'}`
}

function persist(key, value) { localStorage.setItem(key, value) }

function toggleFavorite(index = music) {
  const track = musics[index]
  if (!track) return
  favorites.has(track.youtubeId) ? favorites.delete(track.youtubeId) : favorites.add(track.youtubeId)
  persist('league-music-favorites', JSON.stringify([...favorites]))
  updateMusicInfo()
}

function selectMusic(index, autoplay = isPlaying) {
  if (!Number.isInteger(index) || !musics[index]) return
  music = index
  updateMusicInfo()
  document.getElementById('timeline').style.width = '0%'
  document.getElementById('time').textContent = '0:00 / 0:00'
  loadCurrentMusic(autoplay)
}

function nextIndex(direction = 1) {
  if (shuffle && musics.length > 1) {
    let index = music
    while (index === music) index = Math.floor(Math.random() * musics.length)
    return index
  }
  return (music + direction + musics.length) % musics.length
}

function changeMusic(direction) { if (musics.length) selectMusic(nextIndex(direction)) }

function updateProgress() {
  if (!playerReady) return
  const duration = player.getDuration()
  const current = player.getCurrentTime()
  document.getElementById('timeline').style.width = `${duration ? (current / duration) * 100 : 0}%`
  document.getElementById('time').textContent = `${formatTime(current)} / ${formatTime(duration)}`
  if (duration && current) persist('league-music-resume', JSON.stringify({ index: music, time: current }))
}

function seekMusic(event) {
  if (!playerReady || !player.getDuration()) return
  const bounds = event.currentTarget.parentElement.getBoundingClientRect()
  player.seekTo(((event.clientX - bounds.left) / bounds.width) * player.getDuration(), true)
}

async function shareMusic() {
  const track = currentMusic()
  if (!track) return
  const share = { title: `${track.name} — ${track.artist}`, text: `Ouça ${track.name} por ${track.artist}`, url: `https://www.youtube.com/watch?v=${track.youtubeId}` }
  try {
    if (navigator.share) await navigator.share(share)
    else { await navigator.clipboard.writeText(share.url); showPlayerMessage('Link copiado para a area de transferencia.') }
  } catch (_) { /* compartilhamento cancelado */ }
}

function updatePlayButton() {
  document.getElementById('button__play').classList.toggle('play', !isPlaying)
  document.getElementById('button__play').classList.toggle('pause', isPlaying)
}

function updateOptions() {
  const shuffleButton = document.getElementById('button-shuffle')
  const repeatButton = document.getElementById('button-repeat')
  shuffleButton.classList.toggle('active', shuffle)
  repeatButton.classList.toggle('active', repeatMode !== 'off')
  repeatButton.dataset.mode = repeatMode
  repeatButton.setAttribute('aria-label', `Repeti\u00e7\u00e3o: ${repeatMode === 'one' ? 'uma m\u00fasica' : repeatMode === 'all' ? 'todas' : 'desativada'}`)
}

function toggleShuffle() { shuffle = !shuffle; persist('league-music-shuffle', shuffle); updateOptions() }
function toggleRepeat() {
  repeatMode = repeatMode === 'off' ? 'all' : repeatMode === 'all' ? 'one' : 'off'
  persist('league-music-repeat', repeatMode)
  updateOptions()
}

function updateVolumeControl() {
  const muted = playerReady && player.isMuted()
  document.getElementById('volume').value = volume
  document.getElementById('button-mute').classList.toggle('active', muted || volume === 0)
}

function setVolume(value) {
  volume = Number(value)
  persist('league-music-volume', volume)
  if (playerReady) { player.setVolume(volume); volume ? player.unMute() : player.mute() }
  updateVolumeControl()
}

function toggleMute() {
  if (!playerReady) return
  player.isMuted() || volume === 0 ? (player.unMute(), player.setVolume(volume || 80)) : player.mute()
  updateVolumeControl()
}

function loadCurrentMusic(autoplay = false) {
  if (!playerReady || !currentMusic()) return
  showPlayerMessage('Carregando musica...')
  player[autoplay ? 'loadVideoById' : 'cueVideoById'](currentMusic().youtubeId)
}

function playMusic() { if (playerReady) isPlaying ? player.pauseVideo() : player.playVideo() }
function handleToggle() { document.getElementById('button__toggle').classList.toggle('active'); document.getElementById('navigation').classList.toggle('active') }

function onPlayerReady() {
  playerReady = true
  player.setVolume(volume)
  if (resume && musics[resume.index]) music = resume.index
  updateMusicInfo()
  loadCurrentMusic(false)
  updateVolumeControl()
  progressEvent = window.setInterval(updateProgress, 500)
}

function onPlayerStateChange(event) {
  isPlaying = event.data === YT.PlayerState.PLAYING
  updatePlayButton()
  if (event.data === YT.PlayerState.CUED) {
    if (resume && resume.index === music && resume.time) { player.seekTo(resume.time, true); resume = null }
    showPlayerMessage()
  }
  if (event.data !== YT.PlayerState.ENDED) return
  if (repeatMode === 'one') player.playVideo()
  else if (shuffle || repeatMode === 'all' || music < musics.length - 1) selectMusic(nextIndex(1), true)
}

function onPlayerError() { showPlayerMessage('Esta faixa n\u00e3o est\u00e1 dispon\u00edvel para reprodu\u00e7\u00e3o incorporada. Escolha outra m\u00fasica.') }

function onYouTubeIframeAPIReady() {
  player = new YT.Player('yt-player', {
    width: '480', height: '270', playerVars: { playsinline: 1, rel: 0 },
    events: { onReady: onPlayerReady, onStateChange: onPlayerStateChange, onError: onPlayerError }
  })
}

document.getElementById('playlist-items').addEventListener('click', event => {
  const track = event.target.closest('[data-track]')
  const favorite = event.target.closest('[data-favorite]')
  if (track) selectMusic(Number(track.dataset.track))
  if (favorite) toggleFavorite(Number(favorite.dataset.favorite))
})
document.getElementById('search').addEventListener('input', renderPlaylist)
document.getElementById('favorites-only').addEventListener('change', renderPlaylist)

fetch('./musics.json').then(response => {
  if (!response.ok) throw new Error('playlist')
  return response.json()
}).then(data => {
  musics = data
  if (resume && musics[resume.index]) music = resume.index
  updateMusicInfo()
  updateOptions()
  if (!playerReady) updateMusicInfo()
  loadCurrentMusic(false)
  updateVolumeControl()
}).catch(() => showPlayerMessage('N\u00e3o foi poss\u00edvel carregar a playlist. Atualize a p\u00e1gina e tente novamente.'))

document.addEventListener('keydown', event => {
  const actions = { Space: playMusic, ArrowRight: () => changeMusic(1), ArrowLeft: () => changeMusic(-1), KeyM: toggleMute, KeyS: toggleShuffle, KeyR: toggleRepeat }
  if (actions[event.code] && !['INPUT', 'TEXTAREA'].includes(event.target.tagName)) { event.preventDefault(); actions[event.code]() }
})
window.addEventListener('beforeunload', () => window.clearInterval(progressEvent))

if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js'))
