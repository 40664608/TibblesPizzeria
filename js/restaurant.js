document.addEventListener('DOMContentLoaded', () => {
    const restaurantScene = document.querySelector('.restaurant-scene');
    const shopPage = document.getElementById('shop-page');
    const shopIcon = document.querySelector('.shop-icon');
    const backToRestaurantBtn = document.getElementById('back-to-restaurant');

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

    updateInventoryUI();
    updateMoneyUI();
});