class TicTacToe {
  constructor() {
    this.currentPlayer = 'X';
    this.isGameActive = true;
    this.PLAYER_X_WON = `CONGRATS PLAYER X, YOU WON THE GAME!`;
    this.PLAYER_O_WON = `CONGRATS PLAYER O, YOU WON THE GAME!`;
    this.DRAW = `THE GAME ENDED AS A TIE, PLEASE PLAY AGAIN!`;
    this.board = [];
    this.winningOutcomes = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [2, 4, 6],
    [0, 4, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
    ];
  }

  changePlayer = () => {
    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
  }

  changePlayerTurn = () => {
    if (this.currentPlayer === 'X') {
      return 'O';
    }else {
      return 'X';
    }
  }

  UpdateBoard = (index, player) => {
    if (index !== NaN) {
      this.board[index] = player;
      return this.board;
    }
  }

  validActions = (tile) => {
    if (tile.innerText === 'X' || tile.innerText === 'O') {
      return false;
    } else {
      return true;
    }
  }

  playerDisplay = (player, tile) => {
    if (player === "X") {
        tile.innerHTML = "O";
      } else {
        tile.innerHTML = "X";
      }
  }

  ResultsAnimation = (result, div) => {
    let i = 0;
    const words = [result];

    const typeEffect = () => {
      let word = words[i].split("");
      const typingLoop = () => {
        if (word.length > 0 ) {
          div.innerHTML += word.shift();
        } 
        setTimeout(typingLoop, 20);
      }
      typingLoop();
    }

    typeEffect();
  }

  announceResults = (type) => {
    let resultsDiv = document.querySelector('.game-results');
    switch (type) {
      case this.PLAYER_X_WON:
        this.ResultsAnimation(this.PLAYER_X_WON, resultsDiv);
        resultsDiv.classList.add('color-win');
        break;
      case this.PLAYER_O_WON:
        this.ResultsAnimation(this.PLAYER_O_WON, resultsDiv);
        resultsDiv.classList.add('color-win');
        break;
      case this.DRAW:
        resultsDiv.classList.remove('color-win');
        this.ResultsAnimation(this.DRAW, resultsDiv);
        resultsDiv.classList.add('color-tie')
    }
  }

  handlePlayerResults = () => {
    let roundWon = false;
    for (let i = 0; i < this.winningOutcomes.length; i++) {
      const win = this.winningOutcomes[i];
      const a = this.board[win[0]];
      const b = this.board[win[1]];
      const c = this.board[win[2]];
      if (a === undefined || b === undefined || c === undefined) {
        continue;
      }

      if (a === b && b === c) {
        roundWon = true;
        break;
      }
    }

    if (roundWon) {
      this.announceResults(this.currentPlayer === 'X' ? this.PLAYER_X_WON: this.PLAYER_O_WON);
      this.isGameActive = false;
      return;
    }

    if (!this.board.includes(undefined) && this.board.length === 9) {
      this.announceResults(this.DRAW);
      return;
    }
  }

  playerActions = (tile, index, players) => {
    if (this.validActions(tile) && this.isGameActive) {
      const player = document.querySelector('.player');
      player.innerText = this.changePlayerTurn();
      this.UpdateBoard(index, players);
      this.handlePlayerResults();
      this.changePlayer();
      this.playerDisplay(this.currentPlayer, tile);
      tile.classList.add('color');
      this.changeColor(player, this.currentPlayer);
    }
  }

  gameLogic = () => {
    const tiles = document.querySelectorAll('.tile');
    [...tiles].forEach(tile => {
      tile.addEventListener('click', () => {
        this.playerActions(tile, tile.innerText - 1, this.currentPlayer);
      });
    });
  }

  changeColor = (player, currentPlayer) => {
    if (currentPlayer === 'O') {
      player.style.color = 'green';
    } else {
      player.style.color = 'red';
    }
  }

  boardDisplay = () => {
    const tiles = document.querySelectorAll('.tile');
    const tile = [...tiles];
    for (let i in tile) {
      tile[i].innerText = +i + 1;
    }
  }

  Animate = () => {
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

  resetGame = () => {
    let resultsDiv = document.querySelector('.game-results');
    const reset = document.querySelector('.reset');
    reset.addEventListener('click', () => {
      const color = document.querySelectorAll('.color');
      if (color.length !== 0) {
        [...color].forEach(colors => {
        colors.classList.remove('color');
        });
        const text = document.querySelector('.welcome-text');
        const player = document.querySelector('.player');
        this.currentPlayer = 'X';
        player.innerText = this.currentPlayer;
        text.innerText = '';
        this.boardDisplay();
        this.Animate();
        this.isGameActive = true;
        resultsDiv.innerText = '';
        this.board.length = 0;
      } else {
        alert('Nothing to reset!!!!')
      }
    });
  }
}

window.addEventListener('load', () => {
  const game = new TicTacToe();
  game.Animate();
  game.boardDisplay();
  game.gameLogic();
  game.resetGame();
});
