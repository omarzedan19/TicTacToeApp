document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const message = document.getElementById('message');
    const restartBtn = document.getElementById('restartBtn');
  
    let currentPlayer = 'X';
    let boardState = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
  
    const winningCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
  
    const handleCellClick = (index) => {
      if (gameActive && boardState[index] === '') {
        boardState[index] = currentPlayer;
        renderBoard();
        handleResultValidation();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      }
    };
  
    const handleResultValidation = () => {
      let roundWon = false;
      for (let i = 0; i < winningCombos.length; i++) {
        const [a, b, c] = winningCombos[i];
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
          roundWon = true;
          break;
        }
      }
  
      if (roundWon) {
        message.textContent = `Congrats ${currentPlayer} You Are The winer!`;
        message.style.color="red";
        message.style.fontSize='40px';
        message.style.background="black";
        gameActive = false;
        return;
      }
  
      if (!boardState.includes('')) {
        message.textContent = 'Draw!';
        gameActive = false;
        message.style.color="red";
        message.style.fontSize='40px';
        message.style.background="black";
        return;
      }
    };
  
    const renderBoard = () => {
      board.innerHTML = '';
      boardState.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.textContent = cell;
        cellElement.addEventListener('click', () => handleCellClick(index));
        board.appendChild(cellElement);
      });
    };
  
    const restartGame = () => {
      currentPlayer = 'X';
      boardState = ['', '', '', '', '', '', '', '', ''];
      gameActive = true;
      message.textContent = '';
      renderBoard();
    };
  
    renderBoard();
  
    restartBtn.addEventListener('click', restartGame);
  });
  