document.addEventListener('DOMContentLoaded', () => {
    const restaurantScene = document.querySelector('.restaurant-scene');
    const shopPage = document.getElementById('shop-page');
    const shopIcon = document.querySelector('.shop-icon');
    const backToRestaurantBtn = document.getElementById('back-to-restaurant');
    const plusButton = document.querySelector('.plus-button');
    const pizzaMakingScene = document.getElementById('pizza-making-scene');
    const backFromPizzaButton = document.getElementById('back-to-restaurant-from-pizza');
    const doughBox = document.querySelector('.inventory-box.inventory-dough');
    const doughCountEl = document.querySelector('.dough-count .count');
    const sauceBox = document.querySelector('.inventory-box.inventory-sauce');
    const sauceCountEl = document.querySelector('.sauce-count .count');
    const cheeseBox = document.querySelector('.inventory-box.inventory-cheese');
    const cheeseCountEl = document.querySelector('.cheese-count .count');
    const pepperoniBox = document.querySelector('.inventory-box.inventory-pepperoni');
    const pepperoniCountEl = document.querySelector('.pepperoni-count .count');
    const pizzaDisplay = document.querySelector('.pizza-display');
    const doughLayer = document.querySelector('.dough');
    const sauceLayer = document.querySelector('.sauce');
    const cheeseLayer = document.querySelector('.cheese');
    const pepperoniLayer = document.querySelector('.pepperoni');

    const shopMoneyDisplay = document.querySelector('.shop-money-amount');
    const inventoryItems = document.querySelectorAll('.inventory-item');
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

    function updateInventoryUI() {
        for (const key in inventory) {
            const el = document.querySelector(`.inventory-item.${key} .count`);
            if (el) el.textContent = inventory[key];
        }
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

    shopIcon.addEventListener('click', () => {
        restaurantScene.style.display = 'none';
        shopPage.style.display = 'block';
    });

    backToRestaurantBtn.addEventListener('click', () => {
        shopPage.style.display = 'none';
        restaurantScene.style.display = 'block';
    });

    plusButton.addEventListener('click', () => {
        restaurantScene.style.display = 'none';
        pizzaMakingScene.style.display = 'block';
    });

    backFromPizzaButton.addEventListener('click', () => {
        pizzaMakingScene.style.display = 'none';
        restaurantScene.style.display = 'block';
    });

    document.querySelectorAll('.shop-item').forEach(item => {
        item.addEventListener('click', () => {
            const itemBox = item.querySelector('.item-box');
            const type = Array.from(itemBox.classList).find(cls =>
                ['dough', 'sauce', 'cheese', 'pepperoni', 'olives', 'peppers'].includes(cls)
            );

            const price = parseInt(item.querySelector('.item-price').textContent.replace('£', ''));
            const locked = item.querySelector('.overlay');

            if (!isUnlocked(type)) {
                alert('This item is locked. Level up to unlock it!');
                return;
            }

            if (money >= price) {
                money -= price;
                inventory[type]++;
                updateInventoryUI();
                updateMoneyUI();
            } else {
                alert('Not enough money!');
            }
        });
    });

    let currentPizza = {
        dough: false,
        sauce: false,
        cheese: false,
        pepperoni: false
    };

    doughBox.addEventListener('click', () => {
        if (inventory.dough > 0 && !currentPizza.dough) {
            currentPizza.dough = true;
            inventory.dough--;
            doughCountEl.textContent = inventory.dough;
            doughLayer.style.display = 'block';
        } else if (inventory.dough === 0) {
            alert("No more dough in inventory!");
        }
    });

    sauceBox.addEventListener('click', () => {
        if (!currentPizza.dough) {
            alert("Add dough first!");
        } else if (inventory.sauce > 0 && !currentPizza.sauce) {
            currentPizza.sauce = true;
            inventory.sauce--;
            sauceCountEl.textContent = inventory.sauce;
            sauceLayer.style.display = 'block';
        } else if (inventory.sauce === 0) {
            alert("No more sauce in inventory!");
        }
    });

    cheeseBox.addEventListener('click', () => {
        if (!currentPizza.dough) {
            alert("Add dough first!");
        } else if (!currentPizza.sauce) {
            alert("Add sauce first!");
        } else if (inventory.cheese > 0 && !currentPizza.cheese) {
            currentPizza.cheese = true;
            inventory.cheese--;
            cheeseCountEl.textContent = inventory.cheese;
            cheeseLayer.style.display = 'block';
        } else if (inventory.cheese === 0) {
            alert("No more cheese in inventory!");
        }
    });

    pepperoniBox.addEventListener('click', () => {
        if (!currentPizza.dough) {
            alert("Add dough first!");
        } else if (!currentPizza.sauce) {
            alert("Add sauce first!");
        } else if (!currentPizza.cheese) {
            alert("Add cheese first!");
        } else if (inventory.pepperoni > 0 && !currentPizza.pepperoni) {
            currentPizza.pepperoni = true;
            inventory.pepperoni--;
            pepperoniCountEl.textContent = inventory.pepperoni;
            pepperoniLayer.style.display = 'block';
        } else if (inventory.pepperoni === 0) {
            alert("No more pepperoni in inventory!");
        }
    });

    document.getElementById('done-button').addEventListener('click', function () {
      document.getElementById('pizza-making-scene').style.display = 'none';
      document.querySelector('.restaurant-scene').style.display = 'block';
    });

    document.getElementById('clear-pizza').addEventListener('click', () => {
        currentPizza = { dough: false, sauce: false, cheese: false, pepperoni: false };
        document.querySelectorAll('.dough, .sauce, .cheese, .pepperoni').forEach(layer => {
            layer.style.display = 'none';
        });
    });

    updateInventoryUI();
    updateMoneyUI();
    refreshShopUI();
});