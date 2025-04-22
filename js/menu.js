const startingPage = document.querySelector('.starting-page');
const settingsPage = document.getElementById('settings-page');
const restartPage = document.getElementById('restart-page');
const languagePage = document.querySelector('.language-page');

document.getElementById('play-game').addEventListener('click', () => {
    window.location.href = 'game.html';
});

document.getElementById('settings').addEventListener('click', () => {
    startingPage.style.display = 'none';
    settingsPage.style.display = 'block';
});

document.getElementById('exit-settings').addEventListener('click', () => {
    settingsPage.style.display = 'none';
    startingPage.style.display = 'block';
});

document.getElementById('language').addEventListener('click', () => {
    settingsPage.style.display = 'none';
    languagePage.style.display = 'block';
});

const exitLanguage = document.getElementById('exit-language');
if (exitLanguage) {
    exitLanguage.addEventListener('click', () => {
        languagePage.style.display = 'none';
        settingsPage.style.display = 'block';
    });
}

const languages = ['en', 'fr', 'it', 'es', 'de', 'pt'];
languages.forEach(lang => {
    const button = document.querySelector(`.language-button.${lang}`);
    if (button) {
        button.addEventListener('click', () => {
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
        alert('Game Restarted!');
        restartPage.style.display = 'none';
        startingPage.style.display = 'block';
    });

    noButton.addEventListener('click', () => {
        restartPage.style.display = 'none';
        settingsPage.style.display = 'block';
    });

    exitRestart.addEventListener('click', () => {
        restartPage.style.display = 'none';
        settingsPage.style.display = 'block';
    });
}