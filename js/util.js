'use strict'

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
//////////////////////////////////////////////////////////////////////

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min //The maximum is inclusive and the minimum is inclusive
}
//////////////////////////////////////////////////////////////////////
//gives an a random color code
function getRandomColor() {
  var letters = '0123456789ABCDEF'.split('')
  var color = '#'
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

//////////////////////////////////////////////////////////////////////

function renderCell(location, value) {
  // Select the elCell and set the value
  var elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
  elCell.innerHTML = value
}

//////////////////////////////////////////////////////////////////////
// gives an array
function getNums(count) {
  var nums = []
  for (var i = 1; i <= count; i++) {
    nums.push(i)
  }
  return nums
}

//////////////////////////////////////////////////////////////////////
//shuffles an array
function shuffle(items) {
  var randIdx, temp, i

  for (i = items.length - 1; i > 0; i--) {
    randIdx = getRandomInt(0, items.length - 1)

    temp = items[i]
    items[i] = items[randIdx]
    items[randIdx] = temp
  }
  return items
}
//////////////////////////////////////////////////////////////////////
// print diagonals on matrix
var gMat = [
  [1, 2, 3, 6, 8],
  [1, 8, 3, 6, 8],
  [1, 2, 2, 6, 8],
  [1, 1, 3, 0, 8],
  [1, 2, 3, 6, 8],
]

printPrimaryDiagonal(gMat)
// printSecondaryDiagonal(gMat)

function printPrimaryDiagonal(mat) {
  for (var d = 0; d < mat.length; d++) {
    var item = mat[d][d]
    console.log(item)
  }
}

function printSecondaryDiagonal(mat) {
  for (var d = 0; d < mat.length; d++) {
    var item = mat[d][mat.length - d - 1]
    console.log(item)
  }
}

//////////////////////////////////////////////////////////////////////
//print mat

var gMat = [
  [
    { i: 5, j: 6 },
    { i: 5, j: 6 },
    { i: 5, j: 6 },
    { i: 5, j: 6 },
  ],
  [
    { i: 5, j: 6 },
    { i: 5, j: 6 },
    { i: 5, j: 6 },
    { i: 5, j: 6 },
  ],
  [
    { i: 5, j: 6 },
    { i: 5, j: 6 },
    { i: 5, j: 6 },
    { i: 5, j: 6 },
  ],
  [
    { i: 5, j: 6 },
    { i: 5, j: 6 },
    { i: 5, j: 6 },
    { i: 5, j: 6 },
  ],
]

console.table(gMat)

function printMat() {
  var mat = []
  for (var i = 0; i < gMat.length; i++) {
    mat[i] = []
    for (var j = 0; j < gMat[i].length; j++) {
      mat[i][j] = `${gMat[i][j].i}${gMat[i][j].j}`
    }
  }
  console.table(mat)
}
//////////////////////////////////////////////////////////////////////

// creating empty board

function createBoard() {
  for (var i = 0; i < 3; i++) {
    gBoard[i] = []
    for (var j = 0; j < 3; j++) {
      gBoard[i][j] = ''
    }
  }
}
//////////////////////////////////////////////////////////////////////
//creating empty mat
function createMat(ROWS, COLS) {
  const mat = []
  for (var i = 0; i < ROWS; i++) {
    const row = []
    for (var j = 0; j < COLS; j++) {
      row.push('')
    }
    mat.push(row)
  }
  return mat
}
//////////////////////////////////////////////////////////////////////
// find empty cell on a board
function findEmptyPos() {
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[i].length; j++) {
      if (gBoard[i][j] === '') return { i, j } // Same as { i: i, j: j }
    }
  }
  return null
}

//////////////////////////////////////////////////////////////////////
//copt mat
function copyMat(mat) {
  var newMat = []
  for (var i = 0; i < mat.length; i++) {
    newMat[i] = []
    for (var j = 0; j < mat[0].length; j++) {
      newMat[i][j] = mat[i][j]
    }
  }
  return newMat
}
//////////////////////////////////////////////////////////////////////
//create and rendering a board to html

function createBoard() {
  var board = []
  for (var i = 0; i < 8; i++) {
    board.push([])
    for (var j = 0; j < 8; j++) {
      board[i][j] = Math.random() > 0.5 ? LIFE : ''
    }
  }
  return board
}

function renderBoard(board) {
  // console.table(board)
  // render the board in table
  var strHTML = ''

  for (var i = 0; i < board.length; i++) {
    strHTML += '<tr>'

    for (var j = 0; j < board[0].length; j++) {
      var currCell = board[i][j]
      var className = currCell ? 'occupied' : ''
      var strData = `data-i="${i}" data-j="${j}"`

      strHTML += `<td class="${className}" ${strData}
                            onclick="onCellClicked(this,${i},${j})">
                            ${currCell}
                        </td>`
    }

    strHTML += '</tr>'
  }

  // console.log('strHTML:', strHTML)

  const elBoard = document.querySelector('.board')
  elBoard.innerHTML = strHTML
}

//////////////////////////////////////////////////////////////////////
//neighbors count

function countNegs(cellI, cellJ, mat) {
  var negsCount = 0
  for (var i = cellI - 1; i <= cellI + 1; i++) {
    if (i < 0 || i >= mat.length) continue
    for (var j = cellJ - 1; j <= cellJ + 1; j++) {
      if (i === cellI && j === cellJ) continue
      if (j < 0 || j >= mat[i].length) continue
      if (mat[i][j] === LIFE || mat[i][j] === SUPER_LIFE) negsCount++
    }
  }
  return negsCount
}

//////////////////////////////////////////////////////////////////////
//change text on DOM
function changeHeader() {
  var elHeader = document.querySelector('selector')
  elHeader.innerText = 'text'
}
//////////////////////////////////////////////////////////////////////
// open and closing a modal
function onOpenModal() {
  const elModal = document.querySelector('.modal')
  elModal.style.display = 'block'

  setTimeout(onCloseModal, 5000)

  // setTimeout(() => {
  //   onCloseModal()
  // }, 5000)
}

function onCloseModal() {
  const elModal = document.querySelector('.modal')
  elModal.style.display = 'none'
}
