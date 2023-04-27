// Get all the necessary elements from the DOM
const lengthInput = document.getElementById('length');
const uppercaseSwitch = document.getElementById('ABC').querySelector('input[type="checkbox"]');
const lowercaseSwitch = document.getElementById('abc').querySelector('input[type="checkbox"]');
const num123Switch = document.getElementById('num123').querySelector('input[type="checkbox"]');
const symbolsSwitch = document.getElementById('symbols').querySelector('input[type="checkbox"]');
const passwordField = document.getElementById('result');

// Define functions to generate password components

const randomFunc = {
  lower: getRandomLowerCase,
  upper: getRandomUpperCase,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};
function getRandomUpperCase() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomLowerCase() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    const symbols = "!@#$%^&*(){}[]=<>/,.";
    return symbols[Math.floor(Math.random() * symbols.length)];
}

// Define function to generate password
   
function generatePassword() {
  const length = parseInt(lengthInput.value);
  if (isNaN(length) || length < 4 || length > 20) {
    return 'Please enter a number between 4and 20';
  }
  const options = [
    { enabled: uppercaseSwitch.checked, generator: getRandomUpperCase },
    { enabled: lowercaseSwitch.checked, generator: getRandomLowerCase },
    { enabled: num123Switch.checked, generator: getRandomNumber },
    { enabled: symbolsSwitch.checked, generator: getRandomSymbol },
  ];
  const selectedOptions = options.filter(({ enabled }) => enabled);
  if (selectedOptions.length === 0) {
    return 'Please select at least one option';
  }
  let password = '';
  for (let i = 0; i < length; i++) {
    const { generator } = getRandomItem(selectedOptions);
    password += generator();
  }
  return password;
}

function getRandomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}



// Add event listener for button click
document.querySelector('.btn').addEventListener('click', () => {
    const password = generatePassword();
    passwordField.textContent = password;
});