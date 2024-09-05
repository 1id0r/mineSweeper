'use strict'
var gBoard
var MINE_IMG = '💣'
var gIsFirstClick
var gameTimer
var startTime
var elapsedTime = 0

const gLevel = {
  SIZE: 4,
  MINES: 4,
}

const gGame = {
  isOn: false,
  shownCount: 0,
  markedCount: 0,
  secsPassed: 0,
  lives: 3,
}

function onInit() {
  onCloseModal()
  gGame.isOn = true
  gIsFirstClick = true
  gGame.shownCount = 0
  gGame.markedCount = 0
  gGame.secsPassed = 0
  shownCount()
  markedCount()
  gBoard = buildBoard(gLevel.SIZE)
  placeMines(gBoard, gLevel.MINES)
  setMinesNegsCount(gBoard)
  renderBoard(gBoard)
}

function buildBoard(size) {
  var board = []
  for (var i = 0; i < size; i++) {
    board[i] = []
    for (var j = 0; j < size; j++) {
      board[i][j] = {
        minesAroundCount: setMinesNegsCount(board, i, j),
        isShown: false,
        isMine: false,
        isMarked: false,
      }
    }
  }
  // board[1][1].isMine = true
  // board[2][2].isMine = true
  // board[3][3].isMine = true

  return board
}

function renderBoard(board) {
  var strHTML = ''
  for (var i = 0; i < board.length; i++) {
    strHTML += '<tr>'
    for (var j = 0; j < board[0].length; j++) {
      const currCell = board[i][j]
      var cellContent = ''
      if (currCell.isMine) cellContent = MINE_IMG
      else if (currCell.minesAroundCount > 0) {
        cellContent = currCell.minesAroundCount
      }

      var cellClass = currCell.isShown ? 'shown' : 'hidden'
      var cellClass_2 = currCell.isMine ? 'mine' : 'cell'
      var cellClass_3 = currCell.isMarked ? 'marked' : ''

      strHTML += `<td id="cell-${i}-${j}" 
      class="${cellClass} 
      ${cellClass_2}
      ${cellClass_3}" 
      onclick="onCellClicked(this,${i},${j})" 
      oncontextmenu="onCellMarked(event, ${i}, ${j})">
       ${cellContent} 
       </td>`
    }
    strHTML += '</tr>'
  }
  // console.log('strHTML', strHTML)
  const elBoard = document.querySelector('.board')
  elBoard.innerHTML = strHTML
}

function countNegs(board, rowIdx, colIdx) {
  var mineCount = 0
  for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
    for (var j = colIdx - 1; j <= colIdx + 1; j++) {
      if (i === rowIdx && j === colIdx) continue
      if (i >= 0 && i < board.length && j >= 0 && j < board[i].length) {
        if (board[i][j].isMine) {
          mineCount++
        }
      }
    }
  }
  return mineCount
}

function setMinesNegsCount(board) {
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      //   console.log('board[i][j]', board[i][j])
      if (!board[i][j].isMine) {
        board[i][j].minesAroundCount = countNegs(board, i, j)
        // console.log(
        //   `Cell (${i}, ${j}) has ${board[i][j].minesAroundCount} neighboring mines`
        // )
      }
    }
  }
}

function placeMines(board, numOfMines) {
  var minesPlaced = 0
  while (minesPlaced < numOfMines) {
    var i = Math.floor(Math.random() * board.length)
    var j = Math.floor(Math.random() * board[0].length)
    var currCell = board[i][j]
    if (!currCell.isMine) {
      currCell.isMine = true
      minesPlaced++
    }
  }
  console.log('minesPLaced', minesPlaced)
}

function onCellClicked(elCell, i, j) {
  const currCell = gBoard[i][j]
  if (gIsFirstClick) {
    if (currCell.isMine) placeMines(gBoard, gLevel.MINES)
    startTimer()
    gIsFirstClick = false
  }
  console.log('elCell', elCell)
  if (currCell.isMine) checkGameOver()

  if (!currCell.isShown) {
    currCell.isShown = true
    elCell.classList.remove('hidden')
    elCell.classList.add('shown')
    gGame.shownCount++
    shownCount()
  }
  if ((currCell.minesAroundCount === 0) & !currCell.isMine) {
    expandShown(i, j)
  }
  if (checkVictory()) {
    checkGameOver()
  }
}

function expandShown(row, col) {
  for (var i = row - 1; i <= row + 1; i++) {
    for (var j = col - 1; j <= col + 1; j++) {
      if (i === row && j === col) continue
      if (i >= 0 && i < gBoard.length && j >= 0 && j < gBoard[i].length) {
        var currCell = gBoard[i][j]
        if (!currCell.isShown) {
          var elnegCell = document.querySelector(`#cell-${i}-${j}`)
          onCellClicked(elnegCell, i, j)
        }
      }
    }
  }
}

function onCellMarked(event, i, j) {
  event.preventDefault()
  //   console.log('event', event, i, j)
  var currCell = gBoard[i][j]
  var elCell = document.querySelector(`#cell-${i}-${j}`)
  //   console.log('elCell', elCell)
  if (currCell.isShown) return
  if (!currCell.isMarked) {
    currCell.isMarked = true
    elCell.classList.add('marked')
    elCell.innerHTML = '🚩'
    gGame.markedCount++
    markedCount()
  } else {
    currCell.isMarked = false
    elCell.classList.remove('marked')
    elCell.innerHTML = ''
    gGame.markedCount--
    markedCount()
  }

  if (checkVictory()) {
    checkGameOver()
  }
}
function checkGameOver() {
  if (checkVictory()) {
    console.log('you Won!')
    var elGameOverModal = document.querySelector('h2')
    elGameOverModal.innerText = 'Victory'
  } else {
    var elGameOverModal = document.querySelector('h2')
    elGameOverModal.innerText = 'Game Over'
  }
  stopTimer()
  onOpenModal()
}

function checkVictory() {
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard.length; j++) {
      var currCell = gBoard[i][j]
      if (!currCell.isMine && !currCell.isShown) return false
      if (currCell.isMine && !currCell.isShown && !currCell.isMarked)
        return false
    }
  }
  return true
}

//////////////////////////////////////////////////////////////////////

function onOpenModal() {
  const elModal = document.querySelector('.modal')
  elModal.style.display = 'block'
}

function onCloseModal() {
  const elModal = document.querySelector('.modal')
  elModal.style.display = 'none'
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

function setBoardSize(grid) {
  stopTimer()
  gLevel.SIZE = grid
  gLevel.MINES = grid
  onInit()
}
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
