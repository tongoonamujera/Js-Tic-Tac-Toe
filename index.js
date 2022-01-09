window.addEventListener('load', () => {
  const tiles = document.querySelectorAll('.tile');
  [...tiles].forEach(tile => {
    tile.addEventListener('click', () => {
      console.log(tile.innerText - 1);
      tile.innerHTML = 'X';
      tile.classList.add('color');
    });
  });

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
        setTimeout(typingLoop, 270);
      }
      typingLoop();
    }

    typeEffect();
  }

  reset.addEventListener('click', () => {
    const color = document.querySelectorAll('.color');
    if (color.length !== 0) {
      console.log(color);
      [...color].forEach(colors => {
      colors.classList.remove('color');
    });

    const text = document.querySelector('.welcome-text');
    text.innerText = '';
    boardDisplay();
    Animate();
    } else {
      alert('Nothing to reset!!!!')
    }
  });

  Animate();
});