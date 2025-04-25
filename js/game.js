document.addEventListener("DOMContentLoaded", () => {
  const newGameBtn = document.querySelector(".new-game");
  const continueGameBtn = document.querySelector(".continue-game");
  const progressBtn = document.querySelector(".progress");

  const progressContainer = document.querySelector(".progress-container");
  const helpPage = document.querySelector(".help-page");
  const introPage = document.querySelector(".intro-page");
  const characterPage = document.querySelector(".character-page");
  const introContinueBtn = document.getElementById("intro-continue");

  const michaelBtn = document.querySelector(".michael-button");
  const sallyBtn = document.querySelector(".sally-button");
  const helpBtn = document.querySelector(".help-button");
  const backBtn = document.querySelector(".back-button");

  const progressExit = document.querySelector(".progress-exit");

  let level = 1;
  let xp = 0;
  const xpToNextLevel = 250;

  const xpAmountDisplay = document.querySelector(".xp-amount");
  const levelDisplay = document.querySelector(".level-display");
  const xpBarFill = document.querySelector(".xp-bar-fill");
  const xpToNextDisplay = document.querySelector(".xp-to-next");

function updateXP() {
    if (xp >= xpToNextLevel) {
        level++;
        xp = 0;
        xpToNextLevel = Math.floor(xpToNextLevel * 1.5);
        alert(`Level up! You are now level ${level}`);
    }

    xpAmountDisplay.textContent = `${xp}xp / ${xpToNextLevel}xp`;
    xpToNextDisplay.textContent = `${xpToNextLevel - xp} xp til next level`;
    levelDisplay.textContent = `Level ${level}`;
    xpBarFill.style.width = `${(xp / xpToNextLevel) * 100}%`;
}

function earnXP(amount) {
  xp += amount;
  if (xp > xpToNextLevel) xp = xpToNextLevel;
  updateXP();
}

updateXP();

  progressContainer.style.display = "none";
  helpPage.style.display = "none";

  newGameBtn.addEventListener("click", () => {
    introPage.style.display = "block";
    progressContainer.style.display = "none";
    helpPage.style.display = "none";
  });

  introContinueBtn.addEventListener("click", () => {
    introPage.style.display = "none";
    characterPage.style.display = "block";
  });

  michaelBtn.addEventListener("click", () => {
  window.location.href = "../michael-restaurant.html";
  });

  sallyBtn.addEventListener("click", () => {
  window.location.href = "../sally-restaurant.html";
  });

  continueGameBtn.addEventListener("click", () => {
  });

  progressBtn.addEventListener("click", () => {
    progressContainer.style.display = "block";
  });

  progressExit.addEventListener("click", () => {
    progressContainer.style.display = "none";
  });

  helpBtn.addEventListener("click", () => {
    helpPage.style.display = "block";
  });

  backBtn.addEventListener("click", () => {
    helpPage.style.display = "none";
  });
});