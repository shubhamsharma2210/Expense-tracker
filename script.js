const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plush");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

const localStorageTransaction = JSON.parse(localStorage.getItem("trascations"));
let trascations =
  localStorage.getItem("trascations") !== null ? localStorageTransaction : [];

// Add transction
function addTransacationD(e) {
  e.preventDefault();
  if (text.value.trim(0) === "" || amount.value.trim() === "") {
    alert("please enter text and value");
  } else {
    const trascation = {
      id: genrateId(),
      text: text.value,
      amount: +amount.value,
    };
    trascations.push(trascation);
    addTransacation(trascation);
    updateLocalStorage();
    updateValues();
    text.value = "";
    amount.value = "";
  }
}
//
function genrateId() {
  return Math.floor(Math.random() * 1000000);
}

function addTransacation(trascation) {
  const sign = trascation.amount < 0 ? "-" : "+";
  const item = document.createElement("li");

  item.classList.add(trascation.amount < 0 ? "minus" : "plush");
  item.innerHTML = `
  ${trascation.text}<span>${sign}${Math.abs(trascation.amount)}</span>
  <button class="dlt-btn" onclick="removeTransaction(${
    trascation.id
  })">x</button> `;

  list.appendChild(item);
}
// remove trans
function removeTransaction(id) {
  trascations = trascations.filter((trascation) => trascation.id !== id);
  updateLocalStorage();
  Init();
}
// update value
function updateValues() {
  const amounts = trascations.map((trascation) => trascation.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;
}
// update local storge
function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(trascations));
}
// init app
function Init() {
  list.innerHTML = "";
  trascations.forEach(addTransacation);
  updateValues();
}
Init();
form.addEventListener("submit", addTransacationD);
