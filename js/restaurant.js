document.addEventListener('DOMContentLoaded', () => {
    const ambienceSound = document.getElementById('ambience');
    const alertSound = document.getElementById('alert-sound');
    const backSound = document.getElementById('back-sound');
    const buttonSound = document.getElementById('button-sound');
    const doughSound = document.getElementById('dough-sound');
    const pepperoniSound = document.getElementById('pepperoni-sound');

    let playerXP = 0;
    let customers = [];
    let currentOrder = null;
    const customerNames = ["Peter", "Sarah", "Mike", "Emma", "John", "Lisa", "Dave", "Adam", "Mary", "James", "Harry", "Kate"];
    const pizzaTypes = ["Cheese", "Pepperoni", "Veggie"];
    const peakHours = [11, 12, 13, 18, 19];

    let isMusicOn = true;
    let isSoundOn = true;
    let globalVolume = 1;
    let money = 1000;
    let day = 1;
    let time = 540;
    let playerLevel = 1;
    let gameInterval;

    const inventory = {
        dough: 1,
        sauce: 1,
        cheese: 1,
        pepperoni: 0,
        olives: 0,
        peppers: 0
    };

    let currentPizza = {
        dough: false,
        sauce: false,
        cheese: false,
        pepperoni: false,
        olives: false,
        peppers: false
    };

    const restaurantPage = document.querySelector('.restaurant-page');
    const shopPage = document.getElementById('shop-page');
    const settingsPage = document.getElementById('settings-page');
    const restartPage = document.getElementById('restart-page');
    const languagePage = document.querySelector('.language-page');
    const pizzaMakingScene = document.getElementById('pizza-making-scene');
    const gameOverScreen = document.getElementById('game-over-screen');

    const moneyDisplay = document.querySelector('.money-amount');
    const timeDisplay = document.querySelector('.time');
    const dayDisplay = document.querySelector('.day');
    const shopMoneyDisplay = document.querySelector('.shop-money-amount');

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

    function initGame() {
        loadGame();
        updateUI();
        updateMainInventoryDisplay();
        startGameLoop();
        setupEventListeners();
        generateCustomers();
        gameOverScreen.style.display = 'none';
        setupAudioWithInteraction();
    }

    function setupAudioWithInteraction() {
        const enableAudio = () => {
            if (isMusicOn) {
                startAmbience();
            }
            document.body.removeEventListener('click', enableAudio);
            document.body.removeEventListener('keydown', enableAudio);
        };

        document.body.addEventListener('click', enableAudio, { once: true });
        document.body.addEventListener('keydown', enableAudio, { once: true });
    }

    function startGameLoop() {
        if (gameInterval) clearInterval(gameInterval);

        gameInterval = setInterval(() => {
            time += 1;

            if (time % 5 === 0) {
                updateCustomers();
            }

            if (time >= 1320) {
                endDay();
            }

            updateUI();
        }, 400);
    }

    function restartGame() {
        playSound(buttonSound);
        gameOverScreen.style.display = 'none';

        money = 1000;
        day = 1;
        time = 540;
        playerLevel = 1;
        playerXP = 0;

        inventory.dough = 1;
        inventory.sauce = 1;
        inventory.cheese = 1;
        inventory.pepperoni = 0;
        inventory.olives = 0;
        inventory.peppers = 0;

        resetCurrentPizza();

        generateCustomers();
        updateUI();
        updateMainInventoryDisplay();

        currentOrder = null;
        document.querySelector('.order-name').textContent = "No current order";
        document.querySelector('.order-item').textContent = "Please wait for customer";

        showRestaurantPage();
        startGameLoop();
    }

    function resetCurrentPizza() {
        currentPizza = {
            dough: false,
            sauce: false,
            cheese: false,
            pepperoni: false,
            olives: false,
            peppers: false
        };
        document.querySelectorAll('.dough, .sauce, .cheese, .pepperoni').forEach(layer => {
            layer.style.display = 'none';
        });
    }

    function checkGameOver() {
        if (money <= 0) {
            gameOverScreen.style.display = 'flex';
            clearInterval(gameInterval);

            const restartButton = document.getElementById('restart-button');
            restartButton.removeEventListener('click', restartGame);
            restartButton.addEventListener('click', restartGame);
        }
    }

    function generateCustomers() {
            customers = [];
            const availablePizzas = ["Cheese"];
            if (playerLevel >= 2) availablePizzas.push("Pepperoni");
            if (playerLevel >= 3) availablePizzas.push("Veggie");

            const customerCount = Math.floor(Math.random() * 20) + 20;

            for (let i = 0; i < customerCount; i++) {
                let arrivalTime;
                const hour = Math.floor(Math.random() * 10) + 8;
                const isPeakHour = peakHours.includes(hour % 24);

                if (isPeakHour) {
                    arrivalTime = 540 + (hour * 60) + Math.floor(Math.random() * 30);
                } else {
                    arrivalTime = 540 + (hour * 60) + Math.floor(Math.random() * 60);
                }

                customers.push({
                    name: customerNames[Math.floor(Math.random() * customerNames.length)],
                    order: availablePizzas[Math.floor(Math.random() * availablePizzas.length)],
                    arrivalTime: arrivalTime,
                    served: false,
                    patience: isPeakHour ? (30 + Math.floor(Math.random() * 15)) : (55 + Math.floor(Math.random() * 15)),
                    isAngry: false
                });
            }

            customers.sort((a, b) => a.arrivalTime - b.arrivalTime);
        }

    function updateCustomers() {
        const customersContainer = document.querySelector('.customers');
        customersContainer.innerHTML = '<h2>Customers</h2>';

        const currentCustomers = customers.filter(c =>
            !c.served && time >= c.arrivalTime && time < c.arrivalTime + c.patience
        );

        currentCustomers.forEach(customer => {
            const timeLeft = customer.arrivalTime + customer.patience - time;
            customer.isAngry = timeLeft < 5;
        });

        if (currentCustomers.length > 0) {
            currentCustomers.forEach(customer => {
                const customerEl = document.createElement('div');
                customerEl.className = `customer ${customer.isAngry ? 'angry' : ''}`;
                customerEl.innerHTML = `
                    <div class="customer-name">${customer.name}</div>
                    <div class="customer-order">Wants: ${customer.order} Pizza</div>
                    <div class="customer-patience">Patience: ${customer.arrivalTime + customer.patience - time} min</div>
                `;
                customersContainer.appendChild(customerEl);
            });

            currentOrder = currentCustomers[0];

            if (customersContainer.firstChild) {
                customersContainer.children[1].classList.add('current-order');
            }
        } else {
            currentOrder = null;
            customersContainer.innerHTML += '<div class="no-customers">No customers at the moment</div>';
        }

        if (currentOrder) {
            document.querySelector('.order-name').textContent = currentOrder.name;
            document.querySelector('.order-item').textContent = currentOrder.order;
        } else {
            document.querySelector('.order-name').textContent = "No current order";
            document.querySelector('.order-item').textContent = "Please wait for customer";
        }
    }

    function updateUI() {
        moneyDisplay.textContent = `£${money}`;
        shopMoneyDisplay.textContent = `£${money}`;

        const hours = Math.floor(time / 60);
        const minutes = time % 60;
        const ampm = hours >= 12 ? 'pm' : 'am';
        const displayHours = hours % 12 || 12;
        timeDisplay.textContent = `${displayHours}:${minutes.toString().padStart(2, '0')}${ampm}`;

        dayDisplay.textContent = day;

        updateInventoryUI();
    }

    function updateInventoryUI() {
        doughCountEl.textContent = inventory.dough;
        sauceCountEl.textContent = inventory.sauce;
        cheeseCountEl.textContent = inventory.cheese;
        pepperoniCountEl.textContent = inventory.pepperoni;
    }

    function endDay() {
        const servedCustomers = customers.filter(c => c.served).length;
        money += servedCustomers * 100;

        day++;
        time = 540;
        generateCustomers();
        updateUI();
        checkGameOver();

        alert(`Day ${day - 1} ended! You served ${servedCustomers} customers. Starting day ${day}`);
    }

    function setupPizzaMakingListeners() {
        doughBox.addEventListener('click', () => {
            if (inventory.dough > 0 && !currentPizza.dough) {
                playSound(doughSound);
                currentPizza.dough = true;
                inventory.dough--;
                updateInventoryUI();
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
                updateInventoryUI();
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
                updateInventoryUI();
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
                updateInventoryUI();
                pepperoniLayer.style.display = 'block';
            } else if (inventory.pepperoni === 0) {
                playSound(alertSound);
                alert("No more pepperoni in inventory!");
            }
        });

        document.getElementById('clear-pizza').addEventListener('click', () => {
            playSound(buttonSound);
            resetCurrentPizza();
        });

        document.getElementById('done-button').addEventListener('click', () => {
            playSound(buttonSound);

            if (!currentOrder) {
                alert("No current order to serve!");
                return;
            }

            if (currentOrder.order === "Pepperoni" && playerLevel < 2) {
                alert("You need to reach level 2 to make Pepperoni pizzas!");
                return;
            }

            if (currentOrder.order === "Veggie" && playerLevel < 3) {
                alert("You need to reach level 3 to make Veggie pizzas!");
                return;
            }

            const orderedPizza = currentOrder.order.toLowerCase();
            let pizzaCorrect = false;

            if (orderedPizza === "cheese" && currentPizza.dough && currentPizza.sauce && currentPizza.cheese) {
                pizzaCorrect = true;
            } else if (orderedPizza === "pepperoni" && currentPizza.dough && currentPizza.sauce &&
                      currentPizza.cheese && currentPizza.pepperoni) {
                pizzaCorrect = true;
            } else if (orderedPizza === "veggie" && currentPizza.dough && currentPizza.sauce &&
                       currentPizza.cheese && (currentPizza.olives || currentPizza.peppers)) {
                pizzaCorrect = true;
            }

            if (pizzaCorrect) {
                playerXP += 25;
                if (playerXP >= 100) {
                    playerLevel++;
                    playerXP = 0;
                    alert(`Level up! Now level ${playerLevel}`);
                }

                const customerIndex = customers.findIndex(c => c.name === currentOrder.name);
                if (customerIndex !== -1) {
                    customers[customerIndex].served = true;
                }

                money += 150;
                updateUI();
                checkGameOver();

                resetCurrentPizza();
                updateCustomers();
                pizzaMakingScene.style.display = 'none';
                restaurantPage.style.display = 'block';
                startAmbience();
            } else {
                alert("This doesn't match the customer's order!");
            }
        });
    }

    function isUnlocked(item) {
        const unlockLevel = {
            pepperoni: 2,
            olives: 3,
            peppers: 4
        };
        return !unlockLevel[item] || playerLevel >= unlockLevel[item];
    }

    function saveGame() {
        const gameState = {
            money,
            day,
            time,
            playerLevel,
            playerXP,
            inventory
        };
        localStorage.setItem('pizzaGameSave', JSON.stringify(gameState));
    }

    function loadGame() {
        const saved = localStorage.getItem('pizzaGameSave');
        if (saved) {
            try {
                const gameState = JSON.parse(saved);
                money = gameState.money || money;
                day = gameState.day || day;
                time = gameState.time || time;
                playerLevel = gameState.playerLevel || playerLevel;
                playerXP = gameState.playerXP || playerXP;

                if (gameState.inventory) {
                    for (const item in inventory) {
                        if (gameState.inventory.hasOwnProperty(item)) {
                            inventory[item] = gameState.inventory[item];
                        }
                    }
                }
            } catch (e) {
                console.error("Failed to load saved game:", e);
            }
        }
    }

    function setupShopListeners() {
        document.querySelectorAll('.shop-item:not(.locked)').forEach(item => {
            item.addEventListener('click', () => {
                playSound(buttonSound);
                const itemName = item.querySelector('.item-name').textContent.toLowerCase().replace(' ', '-');
                const price = parseInt(item.querySelector('.item-price').textContent.replace('£', ''));

                if (money >= price) {
                    money -= price;
                    inventory[itemName]++;
                    updateInventoryUI();
                    updateUI();
                    updateMainInventoryDisplay();
                    checkGameOver();
                } else {
                    playSound(alertSound);
                    alert('Not enough money!');
                }
            });
        });
    }

   function updateMainInventoryDisplay() {
           const inventoryContainer = document.querySelector('.inventory-items-container');
           inventoryContainer.innerHTML = '';

           for (const [item, count] of Object.entries(inventory)) {
               if (count > 0) {
                   const itemEl = document.createElement('div');
                   itemEl.className = 'inventory-item';
                   itemEl.innerHTML = `
                       <div class="inventory-box inventory-${item}"></div>
                       <div class="inventory-label">${item.charAt(0).toUpperCase() + item.slice(1)}</div>
                       <div class="inventory-count">${count}</div>
                   `;
                   inventoryContainer.appendChild(itemEl);
               }
           }

           if (inventoryContainer.children.length === 0) {
               inventoryContainer.innerHTML = '<div class="empty-inventory">Inventory is empty</div>';
           }
       }

    function showRestaurantPage() {
        document.querySelectorAll('.settings-page, .shop-page, .pizza-making-scene, .language-page, .restart-page').forEach(page => {
            page.style.display = 'none';
        });
        restaurantPage.style.display = 'block';
        startAmbience();
    }

    function setupPageNavigation() {
        document.querySelector('.shop-icon').addEventListener('click', (e) => {
            e.preventDefault();
            playSound(buttonSound);
            restaurantPage.style.display = 'none';
            shopPage.style.display = 'block';
            stopAmbience();
        });

        document.querySelectorAll('.menu-icon').forEach(icon => {
            icon.addEventListener('click', (e) => {
                e.preventDefault();
                playSound(buttonSound);
                restaurantPage.style.display = 'none';
                shopPage.style.display = 'none';
                settingsPage.style.display = 'block';
                stopAmbience();
            });
        });

        document.querySelector('.plus-button').addEventListener('click', (e) => {
            e.preventDefault();
            playSound(buttonSound);
            restaurantPage.style.display = 'none';
            pizzaMakingScene.style.display = 'block';
            stopAmbience();
            resetCurrentPizza();
        });

        document.querySelectorAll('[id^="back-to-restaurant"], [id^="exit-"]').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                playSound(backSound);
                showRestaurantPage();
            });
        });
    }

    function setupLanguageSystem() {
        document.getElementById('language').addEventListener('click', () => {
            playSound(buttonSound);
            settingsPage.style.display = 'none';
            languagePage.style.display = 'block';
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
    }

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

    function setupRestartSystem() {
        document.getElementById('restart').addEventListener('click', () => {
            playSound(buttonSound);
            settingsPage.style.display = 'none';
            restartPage.style.display = 'block';
        });

        const yesButton = document.querySelector('.yes-button');
        const noButton = document.querySelector('.no-button');
        const exitRestart = document.getElementById('exit-restart');

        if (yesButton) {
            yesButton.addEventListener('click', () => {
                playSound(buttonSound);
                alert('Game Restarted!');
                restartPage.style.display = 'none';
                restartGame();
            });
        }

        if (noButton) {
            noButton.addEventListener('click', () => {
                playSound(buttonSound);
                restartPage.style.display = 'none';
                settingsPage.style.display = 'block';
            });
        }

        if (exitRestart) {
            exitRestart.addEventListener('click', () => {
                playSound(buttonSound);
                restartPage.style.display = 'none';
                settingsPage.style.display = 'block';
            });
        }
    }

    function playSound(sound) {
        if (!isSoundOn || !sound) return;
        sound.currentTime = 0;
        sound.volume = globalVolume;
        sound.play().catch(e => console.log("Audio play failed:", e));
    }

    function startAmbience() {
        if (!isMusicOn || !ambienceSound) return;
        ambienceSound.loop = true;
        ambienceSound.volume = globalVolume * 0.3;
        ambienceSound.play().catch(e => console.log("Ambience play failed:", e));
    }

    function stopAmbience() {
        if (ambienceSound) {
            ambienceSound.pause();
        }
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

    function setupAudioControls() {
        const musicButton = document.querySelector('.music-wrapper');
        if (musicButton) {
            musicButton.addEventListener('click', () => {
                playSound(buttonSound);
                toggleMusic();
            });
        }

        const soundButton = document.querySelector('.sound-wrapper');
        if (soundButton) {
            soundButton.addEventListener('click', () => {
                playSound(buttonSound);
                toggleSound();
            });
        }

        const alertButton = document.querySelector('.alert-wrapper');
        if (alertButton) {
            alertButton.addEventListener('click', () => {
                playSound(alertSound);
            });
        }
    }

    function setupEventListeners() {
        setupPageNavigation();
        setupPizzaMakingListeners();
        setupShopListeners();
        setupLanguageSystem();
        setupRestartSystem();
        setupAudioControls();

        const backHomeButton = document.getElementById('back-home');
        if (backHomeButton) {
            backHomeButton.addEventListener('click', () => {
                playSound(buttonSound);
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 300);
            });
        }
    }

    initGame();
});