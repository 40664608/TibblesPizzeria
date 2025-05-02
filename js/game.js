document.addEventListener("DOMContentLoaded", () => {
  const mainMenu = document.querySelector(".main-menu");
  const menuPage = document.querySelector(".menu-page");
  const newGameBtn = document.querySelector(".new-game");
  const continueGameBtn = document.querySelector(".continue-game");
  const progressBtn = document.querySelector(".progress");
  const buttonSound = document.getElementById('button-sound');

  const progressPage = document.querySelector(".progress-page");
  const helpPage = document.querySelector(".help-page");
  const introPage = document.querySelector(".intro-page");
  const characterPage = document.querySelector(".character-page");
  const introContinueBtn = document.getElementById("intro-continue");

  const tibbleBtn = document.querySelector(".tibble-button");
  const sallyBtn = document.querySelector(".sally-button");
  const helpBtn = document.querySelector(".help-button");
  const backBtn = document.querySelector(".back-button");

  const progressExit = document.querySelector(".progress-exit");

  let level = parseInt(localStorage.getItem('level')) || 1;
  let xp = parseInt(localStorage.getItem('xp')) || 0;
  const xpToNextLevel = 250;

  const xpAmountDisplay = document.querySelector(".xp-amount");
  const levelDisplay = document.querySelector(".level-display");
  const xpBarFill = document.querySelector(".xp-bar-fill");
  const xpToNextDisplay = document.querySelector(".xp-to-next");

  function playButtonSound() {
      if (buttonSound) {
          buttonSound.currentTime = 0;
          buttonSound.play();
      }
  }

  function saveProgress() {
    localStorage.setItem('level', level);
    localStorage.setItem('xp', xp);
  }

  function updateXP() {
    if (xp >= xpToNextLevel) {
      level++;
      xp = 0;
      alert(`Level up! You are now level ${level}`);
      saveProgress();
    }

    xpAmountDisplay.textContent = `${xp}xp / ${xpToNextLevel}xp`;
    xpToNextDisplay.textContent = `${xpToNextLevel - xp} xp til next level`;
    levelDisplay.textContent = `Level ${level}`;
    xpBarFill.style.width = `${(xp / xpToNextLevel) * 100}%`;
  }

  function earnXP(amount) {
    xp += amount;
    if (xp >= xpToNextLevel) xp = xpToNextLevel;
    updateXP();
    saveProgress();
  }

  updateXP();

  progressPage.style.display = "none";
  helpPage.style.display = "none";

  newGameBtn.addEventListener("click", () => {
    playButtonSound();
    introPage.style.display = "block";
    progressPage.style.display = "none";
    helpPage.style.display = "none";
    menuPage.style.display = "none";
  });

  introContinueBtn.addEventListener("click", () => {
    playButtonSound();
    introPage.style.display = "none";
    characterPage.style.display = "block";
  });

  tibbleBtn.addEventListener("click", () => {
    playButtonSound();
    localStorage.setItem('audioAllowed', 'true');
    setTimeout(() => {
    window.location.href = "/TibblesPizzeria/tibble-restaurant.html";
    }, 300);
  });

  sallyBtn.addEventListener("click", () => {
    playButtonSound();
    localStorage.setItem('audioAllowed', 'true');
    setTimeout(() => {
    window.location.href = "/TibblesPizzeria/sally-restaurant.html";
    }, 300);
  });

  continueGameBtn.addEventListener("click", () => {
    playButtonSound();
    alert("Continue Game is not available right now!");
  });

  progressBtn.addEventListener("click", () => {
    playButtonSound();
    updateXP();
    progressPage.style.display = "block";
    mainMenu.style.display = "none";
  });

  progressExit.addEventListener("click", () => {
    playButtonSound();
    progressPage.style.display = "none";
    mainMenu.style.display = "block";
  });

  helpBtn.addEventListener("click", () => {
    playButtonSound();
    helpPage.style.display = "block";
  });

  backBtn.addEventListener("click", () => {
    playButtonSound();
    helpPage.style.display = "none";
  });
});