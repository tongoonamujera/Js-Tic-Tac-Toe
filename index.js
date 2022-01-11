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
  const PLAYER_X_WON = `CONGRATS PLAYER <span>X</span><span class='exl'>!!!</span>, YOU WON THE GAME`;
  const PLAYER_O_WON = 'CONGRATS PLAYER <span>X</span><span class="exl">!!!</span>, YOU WON THE GAME';
  const DRAW = 'THE GAME ENDED AS A TIE, PLEASE PLAY AGAIN';
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

  const playerDisplay = (player, tile) => {
    if (player === "X") {
        tile.innerHTML = "O";
      } else {
        tile.innerHTML = "X";
      }
  }

  const announceResults = (type) => {
    let resultsDiv = document.querySelector('.game-results');
    switch (type) {
      case PLAYER_X_WON:
        resultsDiv.innerHTML = PLAYER_X_WON;
        resultsDiv.classList.add('color-win');
        break;
      case PLAYER_O_WON:
        resultsDiv.innerHTML = PLAYER_O_WON;
        resultsDiv.classList.add('color-win');
        break;
      case DRAW:
        resultsDiv.classList.remove('color-win');
        resultsDiv.innerText = DRAW;
        resultsDiv.classList.add('color-tie')
    }
  }

  const handlePlayerResults = () => {
    let roundWon = false;
    for (let i = 0; i < winningOutcomes.length; i++) {
      const win = winningOutcomes[i];
      const a = board[win[0]];
      const b = board[win[1]];
      const c = board[win[2]];
      console.log(a, b, c);
      if (a === undefined || b === undefined || c === undefined) {
        continue;
      }

      if (a === b && b === c) {
        roundWon = true;
        break;
      }
    }

    if (roundWon) {
      announceResults(currentPlayer === 'X' ? PLAYER_X_WON: PLAYER_O_WON);
      isGameActive = false;
      return;
    }

    if (!board.includes(undefined) && board.length === 9) {
      announceResults(DRAW);
      return;
    }
  }

  const playerActions = (tile, index, players) => {
    if (validActions(tile) && isGameActive) {
      const player = document.querySelector('.player');
      player.innerText = changePlayerTurn();
      UpdateBoard(index, players);
      handlePlayerResults();
      changePlayer();
      playerDisplay(currentPlayer, tile);
      tile.classList.add('color');
      changeColor(player, currentPlayer);
      console.log(board);
    }
  }

  const tiles = document.querySelectorAll('.tile');
  [...tiles].forEach(tile => {
    tile.addEventListener('click', () => {
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
    let resultsDiv = document.querySelector('.game-results');
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
        isGameActive = true;
        resultsDiv.innerText = '';
      board.length = 0;
      } else {
        alert('Nothing to reset!!!!')
      }
    });
  }

  resetGame();

  Animate();
});