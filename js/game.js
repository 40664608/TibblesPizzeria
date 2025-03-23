// Game State
let money = 100;
let satisfaction = 100;
let timeLeft = 120;
let currentPizza = [];
let customers = [];
let earnings = 0;
let expenses = 0;

// Staff and Upgrades
let staff = {
    chefs: 0,
    servers: 0,
};

let upgrades = {
    oven: 1, // Level of oven (increases pizza quality)
    tables: 1, // Number of tables (increases customer capacity)
};

// DOM Elements
const moneyDisplay = document.getElementById('money');
const satisfactionDisplay = document.getElementById('satisfaction');
const timeLeftDisplay = document.getElementById('time-left');
const pizzaPreview = document.getElementById('pizza-preview');
const customersList = document.getElementById('customers-list');
const dayEndMenu = document.getElementById('day-end-menu');
const earningsDisplay = document.getElementById('earnings');
const expensesDisplay = document.getElementById('expenses');
const leaderboardList = document.getElementById('leaderboard-list');

// Audio Elements
const backgroundMusic = document.getElementById('background-music');
const ovenDing = document.getElementById('oven-ding');

// Buttons
document.getElementById('add-dough').addEventListener('click', () => addIngredient('dough'));
document.getElementById('add-sauce').addEventListener('click', () => addIngredient('sauce'));
document.getElementById('add-cheese').addEventListener('click', () => addIngredient('cheese'));
document.getElementById('add-pepperoni').addEventListener('click', () => addIngredient('pepperoni'));
document.getElementById('serve-pizza').addEventListener('click', servePizza);
document.getElementById('next-day').addEventListener('click', startNextDay);
document.getElementById('save-game').addEventListener('click', saveGame);
document.getElementById('load-game').addEventListener('click', loadGame);
document.getElementById('toggle-sound').addEventListener('click', toggleSound);

// Staff and Upgrades Buttons
document.getElementById('hire-chef').addEventListener('click', () => hireStaff('chefs'));
document.getElementById('hire-server').addEventListener('click', () => hireStaff('servers'));
document.getElementById('upgrade-oven').addEventListener('click', () => purchaseUpgrade('oven'));
document.getElementById('upgrade-tables').addEventListener('click', () => purchaseUpgrade('tables'));

// Functions
function addIngredient(ingredient) {
    currentPizza.push(ingredient);
    updatePizzaPreview();
    playSound(ovenDing);
}

function updatePizzaPreview() {
    pizzaPreview.textContent = currentPizza.join(', ');
}

function servePizza() {
    if (customers.length === 0) return;

    const customer = customers.shift();
    const order = customer.order;

    if (arraysEqual(currentPizza, order)) {
        money += 10 * upgrades.oven;
        satisfaction += 5;
    } else {
        satisfaction -= 10;
    }

    currentPizza = [];
    updatePizzaPreview();
    updateGameState();
}

function arraysEqual(a, b) {
    return a.length === b.length && a.every((val, index) => val === b[index]);
}

function updateGameState() {
    moneyDisplay.textContent = money;
    satisfactionDisplay.textContent = satisfaction;
    updateCustomersList();
    updateSatisfactionBar();
}

function updateCustomersList() {
    customersList.innerHTML = customers.map(customer => `<li>${customer.order.join(', ')}</li>`).join('');
}

function startNextDay() {
    dayEndMenu.classList.add('hidden');
    timeLeft = 120;
    earnings = 0;
    expenses = 0;
    startDay();
}

function startDay() {
    customers = generateCustomers(5 + upgrades.tables);
    updateGameState();

    const timer = setInterval(() => {
        timeLeft--;
        timeLeftDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            endDay();
        }

        triggerRandomEvent();
    }, 1000);
}

function endDay() {
    earnings = money - 100;
    expenses = 20 + (staff.chefs * 10) + (staff.servers * 5);
    earningsDisplay.textContent = earnings;
    expensesDisplay.textContent = expenses;
    dayEndMenu.classList.remove('hidden');
    updateLeaderboard(money);
    displayLeaderboard();
}

function generateCustomers(count) {
    const orders = [
        ['dough', 'sauce', 'cheese'],
        ['dough', 'sauce', 'cheese', 'pepperoni'],
        ['dough', 'sauce', 'cheese', 'cheese', 'mushrooms'],
    ];
    return Array.from({ length: count }, () => ({ order: orders[Math.floor(Math.random() * orders.length)] }));
}

function randomEvent() {
    const events = [
        { message: "A food critic visited! Satisfaction increased!", effect: () => satisfaction += 20 },
        { message: "Ingredient shortage! You lost some money.", effect: () => money -= 30 },
    ];
    const event = events[Math.floor(Math.random() * events.length)];
    event.effect();
    alert(event.message);
}

function triggerRandomEvent() {
    if (Math.random() < 0.1) { // 10% chance of an event
        randomEvent();
    }
}

function updateSatisfactionBar() {
    const progress = document.getElementById('satisfaction-progress');
    progress.style.width = `${satisfaction}%`;
    progress.style.backgroundColor = satisfaction > 50 ? 'green' : 'red';
}

function saveGame() {
    const gameState = {
        money,
        satisfaction,
        timeLeft,
        customers,
        earnings,
        expenses,
        staff,
        upgrades,
    };
    localStorage.setItem('tibblesPizzeria', JSON.stringify(gameState));
    alert('Game saved!');
}

function loadGame() {
    const savedGame = localStorage.getItem('tibblesPizzeria');
    if (savedGame) {
        const gameState = JSON.parse(savedGame);
        money = gameState.money;
        satisfaction = gameState.satisfaction;
        timeLeft = gameState.timeLeft;
        customers = gameState.customers;
        earnings = gameState.earnings;
        expenses = gameState.expenses;
        staff = gameState.staff;
        upgrades = gameState.upgrades;
        updateGameState();
        alert('Game loaded!');
    } else {
        alert('No saved game found!');
    }
}

function toggleSound() {
    const soundEnabled = localStorage.getItem('soundEnabled') !== 'false';
    localStorage.setItem('soundEnabled', !soundEnabled);
    alert(`Sound ${!soundEnabled ? 'enabled' : 'disabled'}`);
}

function playSound(sound) {
    if (localStorage.getItem('soundEnabled') !== 'false') {
        sound.currentTime = 0;
        sound.play();
    }
}

function updateLeaderboard(score) {
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    leaderboard.push(score);
    leaderboard.sort((a, b) => b - a);
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
}

function displayLeaderboard() {
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    leaderboardList.innerHTML = leaderboard.map((score, index) => `<li>${index + 1}. $${score}</li>`).join('');
    document.getElementById('leaderboard').classList.remove('hidden');
}

// Staff and Upgrades Functions
function hireStaff(type) {
    const cost = { chefs: 50, servers: 30 }[type];
    if (money >= cost) {
        money -= cost;
        staff[type]++;
        updateGameState();
        alert(`Hired a ${type}!`);
    } else {
        alert('Not enough money to hire staff!');
    }
}

function purchaseUpgrade(type) {
    const cost = { oven: 100, tables: 80 }[type];
    if (money >= cost) {
        money -= cost;
        upgrades[type]++;
        updateGameState();
        alert(`Upgraded ${type}!`);
    } else {
        alert('Not enough money to purchase upgrade!');
    }
}

// Start the game
startDay();
playSound(backgroundMusic);