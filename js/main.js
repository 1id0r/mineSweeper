'use strict'
var gBoard
var MINE_IMG = '💣'

const gLevel = {
  SIZE: 10,
  MINES: 10,
}
const gGame = {
  isOn: false,
  shownCount: 0,
  markedCount: 0,
  secsPassed: 0,
}

function onInit() {
  gBoard = buildBoard(gLevel.SIZE)
  //   placeMines(gBoard, gLevel.MINES)
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
  board[1][2].isMine = true
  board[2][2].isMine = true
  board[0][0].isMine = true

  return board
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
  console.log('strHTML', strHTML)
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

function onCellClicked(elCell, i, j) {
  const currCell = gBoard[i][j]
  console.log('elCell', elCell)

  if (!currCell.isShown) {
    currCell.isShown = true
    elCell.classList.remove('hidden')
    elCell.classList.add('shown')
    gGame.shownCount++
    // console.log('shownCount', gGame.shownCount)
  }
  // to be continued...
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
  } else {
    currCell.isMarked = false
    elCell.classList.remove('marked')
    elCell.innerHTML = ''
  }
}
