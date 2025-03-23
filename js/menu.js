// DOM Elements
const mainMenu = document.getElementById('main-menu');
const settingsMenu = document.getElementById('settings-menu');
const languageMenu = document.getElementById('language-menu');
const restartConfirm = document.getElementById('restart-confirm');

// Buttons
document.getElementById('new-game').addEventListener('click', () => {
    window.location.href = 'game.html';
});

document.getElementById('continue').addEventListener('click', () => {
    alert('Continuing Game...');
});

document.getElementById('settings').addEventListener('click', () => {
    mainMenu.classList.add('hidden');
    settingsMenu.classList.remove('hidden');
});

document.getElementById('exit').addEventListener('click', () => {
    alert('Exiting Game...');
    window.close();
});

document.getElementById('language').addEventListener('click', () => {
    settingsMenu.classList.add('hidden');
    languageMenu.classList.remove('hidden');
});

document.getElementById('restart').addEventListener('click', () => {
    settingsMenu.classList.add('hidden');
    restartConfirm.classList.remove('hidden');
});

document.getElementById('back-to-main').addEventListener('click', () => {
    settingsMenu.classList.add('hidden');
    mainMenu.classList.remove('hidden');
});

document.getElementById('back-to-settings').addEventListener('click', () => {
    languageMenu.classList.add('hidden');
    settingsMenu.classList.remove('hidden');
});

document.getElementById('confirm-restart').addEventListener('click', () => {
    alert('Game Restarted!');
    restartConfirm.classList.add('hidden');
    mainMenu.classList.remove('hidden');
});

document.getElementById('cancel-restart').addEventListener('click', () => {
    restartConfirm.classList.add('hidden');
    settingsMenu.classList.remove('hidden');
});

// Language Selection
document.getElementById('english').addEventListener('click', () => setLanguage('English'));
document.getElementById('french').addEventListener('click', () => setLanguage('French'));
document.getElementById('italian').addEventListener('click', () => setLanguage('Italian'));
document.getElementById('spanish').addEventListener('click', () => setLanguage('Spanish'));
document.getElementById('german').addEventListener('click', () => setLanguage('German'));

function setLanguage(language) {
    alert(`Language set to ${language}`);
    languageMenu.classList.add('hidden');
    settingsMenu.classList.remove('hidden');
}