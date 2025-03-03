// Game State
let money = 100;
let satisfaction = 100;
let timeLeft = 120; // 2 minutes
let currentPizza = [];
let customers = [];
let earnings = 0;
let expenses = 0;

// DOM Elements
const moneyDisplay = document.getElementById('money');
const satisfactionDisplay = document.getElementById('satisfaction');
const timeLeftDisplay = document.getElementById('time-left');
const pizzaPreview = document.getElementById('pizza-preview');
const customersList = document.getElementById('customers-list');
const dayEndMenu = document.getElementById('day-end-menu');
const earningsDisplay = document.getElementById('earnings');
const expensesDisplay = document.getElementById('expenses');

// Buttons
document.getElementById('add-dough').addEventListener('click', () => addIngredient('dough'));
document.getElementById('add-sauce').addEventListener('click', () => addIngredient('sauce'));
document.getElementById('add-cheese').addEventListener('click', () => addIngredient('cheese'));
document.getElementById('add-pepperoni').addEventListener('click', () => addIngredient('pepperoni'));
document.getElementById('serve-pizza').addEventListener('click', servePizza);
document.getElementById('next-day').addEventListener('click', startNextDay);

// Functions
function addIngredient(ingredient) {
  currentPizza.push(ingredient);
  updatePizzaPreview();
}

function updatePizzaPreview() {
  pizzaPreview.textContent = currentPizza.join(', ');
}

function servePizza() {
  if (customers.length === 0) return;

  const customer = customers.shift();
  const order = customer.order;

  if (arraysEqual(currentPizza, order)) {
    money += 10;
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
  customers = generateCustomers(5);
  updateGameState();

  const timer = setInterval(() => {
    timeLeft--;
    timeLeftDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      endDay();
    }
  }, 1000);
}

function endDay() {
  earnings = money - 100;
  expenses = 20;
  earningsDisplay.textContent = earnings;
  expensesDisplay.textContent = expenses;
  dayEndMenu.classList.remove('hidden');
}

function generateCustomers(count) {
  const orders = [
    ['dough', 'sauce', 'cheese'],
    ['dough', 'sauce', 'cheese', 'pepperoni'],
    ['dough', 'sauce', 'cheese', 'cheese'],
  ];
  return Array.from({ length: count }, () => ({ order: orders[Math.floor(Math.random() * orders.length)] }));
}

// Start the game
startDay();