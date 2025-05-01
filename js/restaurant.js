document.addEventListener('DOMContentLoaded', () => {
    const ambienceSound = document.getElementById('ambience');
    const alertSound = document.getElementById('alert-sound');
    const backSound = document.getElementById('back-sound');
    const buttonSound = document.getElementById('button-sound');
    const doughSound = document.getElementById('dough-sound');
    const pepperoniSound = document.getElementById('pepperoni-sound');

    let isMusicOn = true;
    let isSoundOn = true;
    let globalVolume = 1;

    function playSound(sound) {
        if (!isSoundOn) return;
        sound.currentTime = 0;
        sound.volume = globalVolume;
        sound.play().catch(e => console.log("Audio play failed:", e));
    }

    function startAmbience() {
        if (!isMusicOn) return;
        ambienceSound.loop = true;
        ambienceSound.volume = globalVolume * 0.3;
        ambienceSound.play().catch(e => console.log("Ambience play failed:", e));
    }

    function stopAmbience() {
        ambienceSound.pause();
    }

    function toggleMusic() {
        isMusicOn = !isMusicOn;
        if (isMusicOn) {
            startAmbience();
        } else {
            stopAmbience();
        }
        updateMusicButtonUI();
    }

    function toggleSound() {
        isSoundOn = !isSoundOn;
        updateSoundButtonUI();
    }

    function updateMusicButtonUI() {
        const icon = document.querySelector('.music-icon');
        if (icon) {
            icon.style.opacity = isMusicOn ? 1 : 0.5;
        }
    }

    function updateSoundButtonUI() {
        const icon = document.querySelector('.sound-icon');
        if (icon) {
            icon.style.opacity = isSoundOn ? 1 : 0.5;
        }
    }

    const restaurantPage = document.querySelector('.restaurant-page');
    const shopPage = document.getElementById('shop-page');
    const settingsPage = document.getElementById('settings-page');
    const restartPage = document.getElementById('restart-page');
    const languagePage = document.querySelector('.language-page');
    const backHomeButton = document.getElementById('back-home');
    const pizzaMakingScene = document.getElementById('pizza-making-scene');

    const shopIcon = document.querySelector('.shop-icon');
    const menuIcon = document.querySelectorAll('.menu-icon');
    const plusButton = document.querySelector('.plus-button');
    const backToRestaurantBtn = document.getElementById('back-to-restaurant');
    const backFromPizzaButton = document.getElementById('back-to-restaurant-from-pizza');
    const exitSettingsBtn = document.getElementById('exit-settings');
    const alertButton = document.querySelector('.alert-wrapper');
    const musicButton = document.querySelector('.music-wrapper');
    const soundButton = document.querySelector('.sound-wrapper');

    const doughBox = document.querySelector('.inventory-box.inventory-dough');
    const doughCountEl = document.querySelector('.dough-count .count');
    const sauceBox = document.querySelector('.inventory-box.inventory-sauce');
    const sauceCountEl = document.querySelector('.sauce-count .count');
    const cheeseBox = document.querySelector('.inventory-box.inventory-cheese');
    const cheeseCountEl = document.querySelector('.cheese-count .count');
    const pepperoniBox = document.querySelector('.inventory-box.inventory-pepperoni');
    const pepperoniCountEl = document.querySelector('.pepperoni-count .count');

    const doughLayer = document.querySelector('.dough');
    const sauceLayer = document.querySelector('.sauce');
    const cheeseLayer = document.querySelector('.cheese');
    const pepperoniLayer = document.querySelector('.pepperoni');

    const shopMoneyDisplay = document.querySelector('.shop-money-amount');
    const inventory = {
        dough: 1,
        sauce: 1,
        cheese: 1,
        pepperoni: 0,
        olives: 0,
        peppers: 0
    };
    let money = 1000;
    let playerLevel = 1;
    let currentPizza = {
        dough: false,
        sauce: false,
        cheese: false,
        pepperoni: false
    };

    function updateInventoryUI() {
        document.querySelectorAll('.inventory-item').forEach(item => {
            const itemName = item.querySelector('.item-name').textContent.toLowerCase().replace(' ', '-');
            if (inventory.hasOwnProperty(itemName)) {
                item.querySelector('.item-count').textContent = inventory[itemName];
            }
        });
    }

    function updateMoneyUI() {
        shopMoneyDisplay.textContent = `£${money}`;
        document.querySelector('.money-amount').textContent = `£${money}`;
    }

    function isUnlocked(item) {
        const unlockLevel = {
            pepperoni: 2,
            olives: 3,
            peppers: 4
        };
        return !unlockLevel[item] || playerLevel >= unlockLevel[item];
    }

    function refreshShopUI() {
        document.querySelectorAll('.shop-item').forEach(item => {
            const type = Array.from(item.querySelector('.item-box').classList)
                .find(cls => ['dough', 'sauce', 'cheese', 'pepperoni', 'olives', 'peppers'].includes(cls));

            if (isUnlocked(type)) {
                item.querySelector('.overlay').style.display = 'none';
            } else {
                item.querySelector('.overlay').style.display = 'block';
            }
        });
    }

    function showRestaurantPage() {
        restaurantPage.style.display = 'block';
        document.querySelector('.main-sections').style.display = 'flex';
        startAmbience();
    }

    shopIcon.addEventListener('click', () => {
        playSound(buttonSound);
        restaurantPage.style.display = 'none';
        shopPage.style.display = 'block';
        stopAmbience();
    });

   document.querySelector('.restaurant-page .menu-icon').addEventListener('click', () => {
       playSound(buttonSound);
       restaurantPage.style.display = 'none';
       settingsPage.style.display = 'block';
       stopAmbience();
   });

   document.querySelector('.shop-page .menu-icon').addEventListener('click', () => {
       playSound(buttonSound);
       shopPage.style.display = 'none';
       settingsPage.style.display = 'block';
       stopAmbience();
   });

    plusButton.addEventListener('click', () => {
        playSound(buttonSound);
        restaurantPage.style.display = 'none';
        pizzaMakingScene.style.display = 'block';
        stopAmbience();
    });

    backToRestaurantBtn.addEventListener('click', () => {
        playSound(backSound);
        shopPage.style.display = 'none';
        showRestaurantPage();
        startAmbience();
    });

    backFromPizzaButton.addEventListener('click', () => {
        playSound(backSound);
        pizzaMakingScene.style.display = 'none';
        showRestaurantPage();
        startAmbience();
    });

    exitSettingsBtn.addEventListener('click', () => {
        playSound(backSound);
        settingsPage.style.display = 'none';
        showRestaurantPage();
        startAmbience();
    });

    document.getElementById('language').addEventListener('click', () => {
        playSound(buttonSound);
        settingsPage.style.display = 'none';
        languagePage.style.display = 'block';
    });

    document.getElementById('restart').addEventListener('click', () => {
        playSound(buttonSound);
        settingsPage.style.display = 'none';
        restartPage.style.display = 'block';
    });

    const exitLanguage = document.getElementById('exit-language');
    if (exitLanguage) {
        exitLanguage.addEventListener('click', () => {
            playSound(buttonSound);
            languagePage.style.display = 'none';
            settingsPage.style.display = 'block';
        });
    }

    const languages = ['en', 'fr', 'it', 'es', 'de', 'pt'];
    languages.forEach(lang => {
        const button = document.querySelector(`.language-button.${lang}`);
        if (button) {
            button.addEventListener('click', () => {
                playSound(buttonSound);
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
            playSound(buttonSound);
            alert('Game Restarted!');
            restartPage.style.display = 'none';
            startingPage.style.display = 'block';
        });

        noButton.addEventListener('click', () => {
            playSound(buttonSound);
            restartPage.style.display = 'none';
            settingsPage.style.display = 'block';
        });

        exitRestart.addEventListener('click', () => {
            playSound(buttonSound);
            restartPage.style.display = 'none';
            settingsPage.style.display = 'block';
        });
    }

    if (backHomeButton) {
        backHomeButton.addEventListener('click', () => {
            playSound(buttonSound);
            setTimeout(() => {
            window.location.href = 'index.html';
            }, 300);
        });
    }

    if (musicButton) {
        musicButton.addEventListener('click', () => {
            playSound(buttonSound);
            toggleMusic();
        });
    }

    if (soundButton) {
        soundButton.addEventListener('click', () => {
            playSound(buttonSound);
            toggleSound();
        });
    }

    if (alertButton) {
        alertButton.addEventListener('click', () => {
            playSound(alertSound);
        });
    }

    document.querySelectorAll('.shop-item').forEach(item => {
        item.addEventListener('click', () => {
            playSound(buttonSound);
            const itemBox = item.querySelector('.item-box');
            const type = Array.from(itemBox.classList).find(cls =>
                ['dough', 'sauce', 'cheese', 'pepperoni', 'olives', 'peppers'].includes(cls)
            );

            const price = parseInt(item.querySelector('.item-price').textContent.replace('£', ''));

            if (!isUnlocked(type)) {
                playSound(alertSound);
                alert('This item is locked. Level up to unlock it!');
                return;
            }

            if (money >= price) {
                money -= price;
                inventory[type]++;
                updateInventoryUI();
                updateMoneyUI();
            } else {
                playSound(alertSound);
                alert('Not enough money!');
            }
        });
    });

    doughBox.addEventListener('click', () => {
        if (inventory.dough > 0 && !currentPizza.dough) {
            playSound(doughSound);
            currentPizza.dough = true;
            inventory.dough--;
            doughCountEl.textContent = inventory.dough;
            doughLayer.style.display = 'block';
        } else if (inventory.dough === 0) {
            playSound(alertSound);
            alert("No more dough in inventory!");
        }
    });

    sauceBox.addEventListener('click', () => {
        playSound(buttonSound);
        if (!currentPizza.dough) {
            playSound(alertSound);
            alert("Add dough first!");
        } else if (inventory.sauce > 0 && !currentPizza.sauce) {
            currentPizza.sauce = true;
            inventory.sauce--;
            sauceCountEl.textContent = inventory.sauce;
            sauceLayer.style.display = 'block';
        } else if (inventory.sauce === 0) {
            playSound(alertSound);
            alert("No more sauce in inventory!");
        }
    });

    cheeseBox.addEventListener('click', () => {
        playSound(buttonSound);
        if (!currentPizza.dough) {
            playSound(alertSound);
            alert("Add dough first!");
        } else if (!currentPizza.sauce) {
            playSound(alertSound);
            alert("Add sauce first!");
        } else if (inventory.cheese > 0 && !currentPizza.cheese) {
            currentPizza.cheese = true;
            inventory.cheese--;
            cheeseCountEl.textContent = inventory.cheese;
            cheeseLayer.style.display = 'block';
        } else if (inventory.cheese === 0) {
            playSound(alertSound);
            alert("No more cheese in inventory!");
        }
    });

    pepperoniBox.addEventListener('click', () => {
        if (!currentPizza.dough) {
            playSound(alertSound);
            alert("Add dough first!");
        } else if (!currentPizza.sauce) {
            playSound(alertSound);
            alert("Add sauce first!");
        } else if (!currentPizza.cheese) {
            playSound(alertSound);
            alert("Add cheese first!");
        } else if (inventory.pepperoni > 0 && !currentPizza.pepperoni) {
            playSound(pepperoniSound);
            currentPizza.pepperoni = true;
            inventory.pepperoni--;
            pepperoniCountEl.textContent = inventory.pepperoni;
            pepperoniLayer.style.display = 'block';
        } else if (inventory.pepperoni === 0) {
            playSound(alertSound);
            alert("No more pepperoni in inventory!");
        }
    });

    document.getElementById('done-button').addEventListener('click', () => {
        playSound(buttonSound);
        pizzaMakingScene.style.display = 'none';
        restaurantPage.style.display = 'block';
        startAmbience();
    });

    document.getElementById('clear-pizza').addEventListener('click', () => {
        playSound(buttonSound);
        currentPizza = { dough: false, sauce: false, cheese: false, pepperoni: false };
        document.querySelectorAll('.dough, .sauce, .cheese, .pepperoni').forEach(layer => {
            layer.style.display = 'none';
        });
    });

    function initializeGame() {
        updateInventoryUI();
        updateMoneyUI();
        refreshShopUI();

        document.querySelectorAll('.settings-page, .shop-page, .pizza-making-scene, .language-page, .restart-page').forEach(page => {
            page.style.display = 'none';
        });

        restaurantPage.style.display = 'block';
        document.querySelector('.main-sections').style.display = 'flex';

        updateMusicButtonUI();
        updateSoundButtonUI();

        document.body.addEventListener('click', function firstInteraction() {
            if (isMusicOn) {
                startAmbience();
            }
            document.body.removeEventListener('click', firstInteraction);
        }, { once: true });
    }

    function startAmbience() {
        if (!isMusicOn) return;

        try {
            ambienceSound.currentTime = 0;
            ambienceSound.loop = true;
            ambienceSound.volume = globalVolume * 0.3;
            const playPromise = ambienceSound.play();

            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Audio play failed, waiting for interaction:", error);
                    document.body.addEventListener('click', function retryPlay() {
                        ambienceSound.play().catch(e => console.log("Still failed:", e));
                        document.body.removeEventListener('click', retryPlay);
                    }, { once: true });
                });
            }
        } catch (e) {
            console.log("Ambience error:", e);
        }
    }

    initializeGame();
});