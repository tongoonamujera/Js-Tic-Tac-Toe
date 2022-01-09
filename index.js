window.addEventListener('load', () => {
  'use strict';
  let currentPlayer = 'O';
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
  const tiles = document.querySelectorAll('.tile');
  [...tiles].forEach(tile => {
    tile.addEventListener('click', () => {
      const player = document.querySelector('.player');
      console.log(tile.innerText - 1);
      changePlayer();
      changeColor(player, currentPlayer);
      tile.innerHTML = currentPlayer;
      player.innerText = changePlayerTurn();
      tile.classList.add('color');
    });
  });

  const changeColor = (player, currentPlayer) => {
    if (currentPlayer === 'O') {
      player.style.color = 'green';
    } else {
      player.style.color = 'red';
    }
  }

  const reset = document.querySelector('.reset');

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
    reset.addEventListener('click', () => {
      const color = document.querySelectorAll('.color');
      if (color.length !== 0) {
        console.log(color);
        [...color].forEach(colors => {
        colors.classList.remove('color');
      });

      const text = document.querySelector('.welcome-text');
      const player = document.querySelector('.player');
      currentPlayer = '';
      player.innerText = currentPlayer;
      text.innerText = '';
      boardDisplay();
      Animate();
      } else {
        alert('Nothing to reset!!!!')
      }
    });
  }

  resetGame();

  Animate();
});