const PLAYER_X_CLASS = 'x'
const PLAYER_O_CLASS = 'circle'
const WINNING_COMBINATIONS = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
]

const cellElements = document.querySelectorAll('[data-cell]')
const boardElement = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.getElementById('winningMessageText')
const clearButton = document.getElementById('clearBoard')
let isPlayer_O_Turn = false

// let p1Score = 0;
// let p2Score = 0;
// let drawScore = 0;

// const p1ScoreElement = document.getElementById('p1Score');
// const p2ScoreElement = document.getElementById('p2Score');
// const drawScoreElement = document.getElementById('drawScore'); 

startGame();

restartButton.addEventListener('click', startGame)
clearButton.addEventListener('click', startGame)

function startGame() {
	isPlayer_O_Turn = false
	cellElements.forEach(cell => {
		cell.classList.remove(PLAYER_X_CLASS)
		cell.classList.remove(PLAYER_O_CLASS)
		cell.removeEventListener('click', handleCellClick)
		cell.addEventListener('click', handleCellClick, { once: true })
	})
	setBoardHoverClass()
	winningMessageElement.classList.remove('show')
}

function handleCellClick(e) {
	const cell = e.target
	const currentClass = isPlayer_O_Turn ? PLAYER_O_CLASS : PLAYER_X_CLASS
	placeMark(cell, currentClass)
	if (checkWin(currentClass)) {
		endGame(false)
	} else if (isDraw()) {
		endGame(true)
	} else {
		swapTurns()
		setBoardHoverClass()
	}
}

function endGame(draw) {
	if (draw) {
		winningMessageTextElement.innerText = "What no winner?"
	} else {
		winningMessageTextElement.innerText = `Player ${isPlayer_O_Turn ? "O" : "X"} wins!`;
	}
	winningMessageElement.classList.add('show')
}

function isDraw() {
	return [...cellElements].every(cell => {
		return cell.classList.contains(PLAYER_X_CLASS) || cell.classList.contains(PLAYER_O_CLASS)
	})
}

function placeMark(cell, currentClass) {
	cell.classList.add(currentClass)
}

function swapTurns() {
	isPlayer_O_Turn = !isPlayer_O_Turn
}

function setBoardHoverClass() {
	boardElement.classList.remove(PLAYER_X_CLASS)
	boardElement.classList.remove(PLAYER_O_CLASS)
	if (isPlayer_O_Turn) {
		boardElement.classList.add(PLAYER_O_CLASS)
	} else {
		boardElement.classList.add(PLAYER_X_CLASS)
	}
}

function checkWin(currentClass) {
	return WINNING_COMBINATIONS.some(combination => {
		return combination.every(index => {
			return cellElements[index].classList.contains(currentClass)
		})
	})
}

/* function updateScore(winner) {
	if (winner === PLAYER_X_CLASS) {
		p1Score++;
		p1ScoreElement.innerText = p1Score;
	} else if (winner === PLAYER_O_CLASS) {
		p2Score++;
		p2ScoreElement.innerText = p2Score;
	} else if (winner === draw)
		drawScore++;
		drawScoreElement.innerText = drawScore;
} */