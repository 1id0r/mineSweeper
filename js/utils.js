//////////////////////////////////////////////////////////////////////
//timer
function startTimer() {
  startTime = Date.now()
  gameTimer = setInterval(updateTimer, 1000)
}
function updateTimer() {
  const now = Date.now()
  gGame.secsPassed = Math.floor((now - startTime) / 1000)
  console.log('elapsedTime', gGame.secsPassed)
  var elTimer = document.querySelector('.timer')
  elTimer.innerText = `time: ${gGame.secsPassed} secs`
}
function stopTimer() {
  clearInterval(gameTimer)
}

//////////////////////////////////////////////////////////////////////
//counters
function counters() {
  isSmiley('🙂')
  shownCount()
  markedCount()
  livesCount()
}
function shownCount() {
  var shownCount = gGame.shownCount
  var elShownCount = document.querySelector('span.shown-count')
  elShownCount.innerText = shownCount
}
function markedCount() {
  var markedCount = gGame.markedCount
  var elMarkedCount = document.querySelector('span.marked-count')
  elMarkedCount.innerText = markedCount
}
function livesCount() {
  var lives = gGame.lives
  var elLives = document.querySelector('span.lives-count')
  elLives.innerText = ''
  for (var i = 0; i < lives; i++) {
    elLives.innerText += '❤️'
  }
}
//////////////////////////////////////////////////////////////////////
//modal
function onOpenModal() {
  const elModal = document.querySelector('.modal')
  elModal.style.display = 'block'
}

function onCloseModal() {
  const elModal = document.querySelector('.modal')
  elModal.style.display = 'none'
}
//////////////////////////////////////////////////////////////////////
function setBoardSize(grid) {
  stopTimer()
  gLevel.SIZE = grid
  gLevel.MINES = grid
  onInit()
}
