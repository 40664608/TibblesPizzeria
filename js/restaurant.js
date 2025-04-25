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
        const count = inventory.dough;

        if (count > 0 && !currentPizza.dough) {
            currentPizza.dough = true;
            inventory.dough--;
            doughCountEl.textContent = inventory.dough;

            const pizzaDisplay = document.querySelector('.pizza.pizza-1');
            if (pizzaDisplay) {
                pizzaDisplay.style.backgroundColor = '#AF8060';
            }
        } else if (count === 0) {
            alert("No more dough in inventory!");
        }
    });

    sauceBox.addEventListener('click', () => {
        const count = inventory.sauce;

        if (currentPizza.dough && count > 0 && !currentPizza.sauce) {
            currentPizza.sauce = true;
            inventory.sauce--;
            sauceCountEl.textContent = inventory.sauce;

            const pizzaDisplay = document.querySelector('.pizza.pizza-1');
            if (pizzaDisplay) {
                const sauceLayer = document.createElement('div');
                sauceLayer.className = 'pizza-sauce-layer';
                pizzaDisplay.appendChild(sauceLayer);
            }
        } else if (!currentPizza.dough) {
            alert("You need to add dough first!");
        } else if (count === 0) {
            alert("No more sauce in inventory!");
        }
    });

    cheeseBox.addEventListener('click', () => {
        const count = inventory.cheese;

        if (count > 0 && currentPizza.dough && !currentPizza.cheese) {
            currentPizza.cheese = true;
            inventory.cheese--;
            cheeseCountEl.textContent = inventory.cheese;

            const pizzaDisplay = document.querySelector('.pizza.pizza-1');
            if (pizzaDisplay) {
                const cheeseLayer = document.createElement('div');
                cheeseLayer.classList.add('pizza-cheese-layer');
                pizzaDisplay.appendChild(cheeseLayer);
            }
        } else if (count === 0) {
            alert("No more cheese in inventory!");
        } else if (!currentPizza.dough) {
            alert("Add dough first!");
        }
    });

    pepperoniBox.addEventListener('click', () => {
        const count = inventory.pepperoni;

        if (count > 0 && currentPizza.dough && currentPizza.cheese && !currentPizza.pepperoni) {
            currentPizza.pepperoni = true;
            inventory.pepperoni--;
            pepperoniCountEl.textContent = inventory.pepperoni;

            const pizzaDisplay = document.querySelector('.pizza.pizza-1');
            if (pizzaDisplay) {
                const pepperoniLayer = document.createElement('div');
                pepperoniLayer.classList.add('pizza-pepperoni-layer');
                pizzaDisplay.appendChild(pepperoniLayer);
            }
        } else if (count === 0) {
            alert("No more pepperoni in inventory!");
        } else if (!currentPizza.cheese) {
            alert("Add cheese first!");
        } else if (!currentPizza.dough) {
            alert("Add dough first!");
        }
    });

    document.getElementById('done-button').addEventListener('click', function () {
      document.getElementById('pizza-making-scene').style.display = 'none';
      document.querySelector('.restaurant-scene').style.display = 'block';
    });

    updateInventoryUI();
    updateMoneyUI();
});