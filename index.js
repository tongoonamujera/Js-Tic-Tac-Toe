window.addEventListener('load', () => {
  const winningOutcomes = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [2, 4, 6],
    [0, 4, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
  ];

  let currentPlayer = 'X';
  let isGameActive = true;
  const changePlayer = () => {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }

  const changePlayerTurn = () => {
    if (currentPlayer === 'X') {
      return 'O';
    }else {
      return 'X';
    }
  }

  let board = [];
  const UpdateBoard = (index, player) => {
    if (index !== NaN) {
      board[index] = player;
      return board;
    }
  }

  const validActions = (tile) => {
    if (tile.innerText === 'X' || tile.innerText === 'O') {
      return false;
    } else {
      return true;
    }
  }

  const playerActions = (tile, index, players) => {
    if (validActions(tile) && isGameActive) {
      const player = document.querySelector('.player');
      player.innerText = changePlayerTurn();
      changePlayer();
      UpdateBoard(index, players);
      if (currentPlayer === "X") {
        tile.innerHTML = "O";
      } else {
        tile.innerHTML = "X";
      }
      
      tile.classList.add('color');
      changeColor(player, currentPlayer);
      console.log(board);
    }
  }

  const tiles = document.querySelectorAll('.tile');
  [...tiles].forEach(tile => {
    tile.addEventListener('click', () => {
      console.log(tile.innerText - 1);
      playerActions(tile, tile.innerText - 1, currentPlayer);
    });
  });

  const changeColor = (player, currentPlayer) => {
    if (currentPlayer === 'O') {
      player.style.color = 'green';
    } else {
      player.style.color = 'red';
    }
  }

  const boardDisplay = () => {
    const tile = [...tiles];
    for (let i in tile) {
      tile[i].innerText = +i + 1;
    }
  }

  boardDisplay();

  const Animate = () => {
    const text = document.querySelector('.welcome-text');
    let i = 0;
    const words = ["HI THERE, WELCOME TO TIC TAC TOE"];

    const typeEffect = () => {
      let word = words[i].split("");
      const typingLoop = () => {
        if (word.length > 0 ) {
          text.innerHTML += word.shift();
        } 
        setTimeout(typingLoop, 150);
      }
      typingLoop();
    }

    typeEffect();
  }

  const resetGame = () => {
    const reset = document.querySelector('.reset');
    reset.addEventListener('click', () => {
      const color = document.querySelectorAll('.color');
      if (color.length !== 0) {
        console.log(color);
        [...color].forEach(colors => {
        colors.classList.remove('color');
      });

      const text = document.querySelector('.welcome-text');
      const player = document.querySelector('.player');
      currentPlayer = 'X';
      player.innerText = currentPlayer;
      text.innerText = '';
      boardDisplay();
      Animate();
      board.length = 0;
      } else {
        alert('Nothing to reset!!!!')
      }
    });
  }

  resetGame();

  Animate();
});