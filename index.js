class TicTacToe {
  constructor() {
    this.currentPlayer = 'X';
    this.isGameActive = true;
    this.PLAYER_X_WON = `CONGRATS PLAYER X, YOU WON THE GAME!`;
    this.PLAYER_O_WON = `CONGRATS PLAYER O, YOU WON THE GAME!`;
    this.DRAW = `THE GAME ENDED AS A TIE, PLEASE PLAY AGAIN!`;
    this.board = [];
    this.win = false;
    this.lastMove = [];
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
    } else {
      return 'X';
    }
  }

  UpdateBoard = (...args) => {
    const [index, player] = args;
    if (index !== NaN) {
      this.board[index] = player;
      this.lastMove.push(index);
      console.log(this.lastMove);
      console.log(this.board);
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

  playerDisplay = (...args) => {
    const [player, tile] = args;
    if (player === "X") {
      tile.innerHTML = "O";
    } else {
      tile.innerHTML = "X";
    }
  }

  typeEffect = (words, div) => {
    let word = words[0].split("");
    const typingLoop = () => {
      if (word.length > 0) {
        div.innerHTML += word.shift();
      }
      setTimeout(typingLoop, 20);
    }
    typingLoop();
  }

  ResultsAnimation = (...args) => {
    const [result, div] = args;
    const words = [result];
    this.typeEffect(words, div);
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

  winningCombination = (...args) => {
    const [winCombs] = args;
    if (this.win) {
      for (let i in winCombs) {
        const tiles = document.querySelector(`.tile${winCombs[i] + 1}`);
        tiles.classList.add('green');
      }
    }
  }

  nextPossibleMovesAvail = () => {
    
  }

  handlePlayerResults = () => {
    let roundWon = false;
    let winingCombinations = [];
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
        winingCombinations = [win[0], win[1], win[2]];
        break;
      }
    }

    if (roundWon) {
      this.announceResults(this.currentPlayer === 'X' ? this.PLAYER_X_WON : this.PLAYER_O_WON);
      this.isGameActive = false;
      this.win = true;
      this.winningCombination(winingCombinations);
      return;
    }

    if (!this.board.includes(undefined) && this.board.length === 9) {
      this.announceResults(this.DRAW);
      return;
    }
  }

  playerActions = (...args) => {
    const [tile, index, players] = args;
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

  changeColor = (...args) => {
    const [player, currentPlayer] = args;
    if (currentPlayer === 'O') {
      player.style.color = 'green';
    } else {
      player.style.color = 'red';
    }
  }

  reverseMove = () => {
    let index;
    if(this.lastMove.length !== 0){
      index = this.lastMove.pop();
      this.board[index] = undefined;
      let tile = document.querySelectorAll('.tile')[index];
      tile.innerText = index + 1;
    }
   return this.lastMove;
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
    const words = ["HI THERE, WELCOME TO TIC TAC TOE"];
    this.typeEffect(words, text);
  }

  removeOverlay = () => {
    const overlay = document.querySelector('.overlay-div');
    const btns = document.querySelectorAll('.confirmation-btn');
    if (btns) {
      [...btns].forEach(btn => {
        btn.addEventListener('click', () => {
          overlay.classList.remove('overlay-display');
        });
      });
    }
  }

  resetContainerFunc = () => {
    const overlay = document.querySelector('.overlay-div');
    let resultsDiv = document.querySelector('.game-results');
    const text = document.querySelector('.welcome-text');
    const player = document.querySelector('.player');
    const color = document.querySelectorAll('.color');

    if (color.length !== 0) {
      [...color].forEach(colors => {
        colors.classList.remove('color');
      });
      this.lastMove.length = 0;
      this.currentPlayer = 'X';
      player.innerText = this.currentPlayer;
      text.innerText = '';
      this.boardDisplay();
      this.Animate();
      this.isGameActive = true;
      resultsDiv.innerText = '';
      this.board.length = 0;
    } else {
      overlay.classList.add('overlay-display');
    }
  }

  removeColor = () => {
    const color = document.querySelectorAll('.green');
    color.forEach(color => color.classList.remove('green'));
  }

  resetGame = () => {
    const reset = document.querySelector('.reset');
    const resetMove = document.querySelector('.reset-move');
    resetMove.addEventListener("click", this.reversemove());
    reset.addEventListener('click', () => {
      this.resetContainerFunc();
      this.removeColor();
      this.win = false;
    });
  }
}

window.addEventListener('load', () => {
  const game = new TicTacToe();
  game.Animate();
  game.boardDisplay();
  game.gameLogic();
  game.resetGame();
  game.removeOverlay();
});
