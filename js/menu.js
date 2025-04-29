const startingPage = document.querySelector('.starting-page');
const settingsPage = document.getElementById('settings-page');
const restartPage = document.getElementById('restart-page');
const languagePage = document.querySelector('.language-page');
const alertSound = document.getElementById('alert-sound');
const buttonSound = document.getElementById('button-sound');

const musicButton = document.querySelector('.music-wrapper');
const soundButton = document.querySelector('.sound-wrapper');
const alertButton = document.querySelector('.alert-wrapper');

document.getElementById('play-game').addEventListener('click', () => {
    playButtonSound();
    setTimeout(() => {
    window.location.href = 'game.html';
    }, 300);
});

document.getElementById('settings').addEventListener('click', () => {
    playButtonSound();
    startingPage.style.display = 'none';
    settingsPage.style.display = 'block';
});

document.getElementById('exit-settings').addEventListener('click', () => {
    playButtonSound();
    settingsPage.style.display = 'none';
    startingPage.style.display = 'block';
});

document.getElementById('language').addEventListener('click', () => {
    playButtonSound();
    settingsPage.style.display = 'none';
    languagePage.style.display = 'block';
});

document.getElementById('restart').addEventListener('click', () => {
    playButtonSound();
    settingsPage.style.display = 'none';
    restartPage.style.display = 'block';
});

const exitLanguage = document.getElementById('exit-language');
if (exitLanguage) {
    exitLanguage.addEventListener('click', () => {
        playButtonSound();
        languagePage.style.display = 'none';
        settingsPage.style.display = 'block';
    });
}

const languages = ['en', 'fr', 'it', 'es', 'de', 'pt'];
languages.forEach(lang => {
    const button = document.querySelector(`.language-button.${lang}`);
    if (button) {
        button.addEventListener('click', () => {
            playButtonSound();
            setLanguage(lang);
        });
    }
});

function setLanguage(languageCode) {
    const languageNames = {
        en: 'English',
        fr: 'French',
        it: 'Italian',
        es: 'Spanish',
        de: 'German',
        pt: 'Portuguese'
    };

    alert(`Language set to ${languageNames[languageCode] || 'Unknown'}`);
    languagePage.style.display = 'none';
    settingsPage.style.display = 'block';
}

const yesButton = document.querySelector('.yes-button');
const noButton = document.querySelector('.no-button');
const exitRestart = document.getElementById('exit-restart');

if (yesButton && noButton && exitRestart) {
    yesButton.addEventListener('click', () => {
        playButtonSound();
        alert('Game Restarted!');
        restartPage.style.display = 'none';
        startingPage.style.display = 'block';
    });

    noButton.addEventListener('click', () => {
        playButtonSound();
        restartPage.style.display = 'none';
        settingsPage.style.display = 'block';
    });

    exitRestart.addEventListener('click', () => {
        playButtonSound();
        restartPage.style.display = 'none';
        settingsPage.style.display = 'block';
    });
}

function playButtonSound() {
    if (buttonSound) {
        buttonSound.currentTime = 0;
        buttonSound.play();
    }
}

musicButton.addEventListener('click', () => {
    playButtonSound();
});

let volumeLevel = 1;

soundButton.addEventListener('click', () => {
    playButtonSound();
    if (volumeLevel === 1) {
        volumeLevel = 0.5;
    } else if (volumeLevel === 0.5) {
        volumeLevel = 0;
    } else {
        volumeLevel = 1;
    }
    buttonSound.volume = volumeLevel;
    alertSound.volume = volumeLevel;
});

alertButton.addEventListener('click', () => {
    if (alertSound) {
        alertSound.currentTime = 0;
        alertSound.play();
    }
});