//last update 24/08/2023 - 9pm

// Placeholder values for testing
let tableArray = [
  {
    expenseName: "New shoes",
    category: "Personal Spending",
    frequency: "Only once",
    expValue: 60.0,
    essential: 2,
    savingDesc: "No",
    savingValue: 0,
  },
  {
    expenseName: "Netflix",
    category: "Recreation & Entertainment",
    frequency: "Montly",
    expValue: 15.99,
    essential: 3,
    savingDesc: "chaging Subscription type",
    savingValue: 5.99,
  },
  {
    expenseName: "Rent",
    category: "Housing",
    frequency: "Montly",
    expValue: 850.0,
    essential: 5,
    savingDesc: "No",
    savingValue: 0,
  },
  {
    expenseName: "grosseries",
    category: "Food",
    frequency: "Weekly",
    expValue: 150,
    essential: 5,
    savingDesc: "No",
    savingValue: 0,
  },
  {
    expenseName: "jacket",
    category: "Personal Spending",
    frequency: "Weekly",
    expValue: 150,
    essential: 5,
    savingDesc: "No",
    savingValue: 0,
  },
  {
    expenseName: "eletricity",
    category: "Housing",
    frequency: "Monthly",
    expValue: 175,
    essential: 10,
    savingDesc: "using during night",
    savingValue: 30,
  },
];

//Array of Categories (will be used for function sumByCategory)
const categoriesList = [
  "Housing",
  "Transportation",
  "Food",
  "Medical & Healthcare",
  "Debt Payments",
  "Saving, Investing",
  "Personal Spending",
  "Recreation & Entertainment",
  "Other",
];

// Browser onloaded will run those functions automatically.
window.onload = function () {
  calcBudget();
  fillTable();
  sumSavingValue();
  sumByEssential();
  sumByCategory();
};

//function to Add Expense Buton
function openPage() {
  const url = "expense_form.html";
  window.open(url);
}

//calc and Display Current Budget test.
function calcBudget() {
  let mBudget = document.getElementById("montlyBudget").value;
  console.log(mBudget);

  let totalExpenses = sumExpValue();

  let result = mBudget - totalExpenses;

  document.getElementById("currentBudget").innerHTML =
    "Current Budget: £ " + result.toFixed(2);
}
function sumExpValue() {
  let x = 0;
  for (i = 0; i < tableLenght; i++) {
    x += tableArray[i].expValue;
  }
  console.log(x);
  return x;
}
// Function to fill the table:
let tableLenght = tableArray.length;

function fillTable() {
  let myTable = document.getElementById("tableExpenses");
  for (i = 0; i < tableLenght; i++) {
    myTable.innerHTML +=
      "<tr><td>" +
      tableArray[i].expenseName +
      "</td><td>" +
      tableArray[i].category +
      "</td><td>" +
      tableArray[i].frequency +
      "</td><td>" +
      tableArray[i].expValue +
      "</td><td>" +
      tableArray[i].essential +
      "</td><td>" +
      tableArray[i].savingDesc +
      "</td><td>" +
      tableArray[i].savingValue +
      "</td></tr>";
  }
}

//show  amount could be saved
function sumSavingValue() {
  let x = 0;
  for (i = 0; i < tableLenght; i++) {
    x += tableArray[i].savingValue;
  }
  console.log(x);
  let savingResult = document.getElementById("resultSaving");

  savingResult.innerHTML = "£" + x;
}

// show the values spent by essential
function sumByEssential() {
  let resultByGrade = document.getElementById("resultEssential");

  for (j = 1; j <= 10; j++) {
    let x = 0;
    //console.log("j=" + j);
    for (i = 0; i < tableLenght; i++) {
      let essentialGrade = tableArray[i].essential;
      //console.log("essential =" + essentialGrade);
      //console.log("i= " + i);
      let essentialExp = tableArray[i].expValue;
      //console.log(essentialExp);
      if (essentialGrade == j) {
        x += essentialExp;
        //console.log("x=" + x);
      }
    }
    if (x > 0) {
      resultByGrade.innerHTML +=
        "Essential value " +
        "<b>" +
        j +
        "</b>" +
        ", total expense is: £" +
        x +
        "<br>";
    }
  }
}

function sumByCategory() {
  for (let j in categoriesList) {
    let y = categoriesList[j];
    let x = 0;
    //console.log("j is " + y);

    for (i = 0; i < tableLenght; i++) {
      let currentCategory = tableArray[i].category;
      //console.log("i = " + currentCategory);

      let categoryValue = tableArray[i].expValue;

      if (y == currentCategory) {
        //console.log("match " + y);
        x += categoryValue;
      }
    }
    if (x > 0) {
      reesultCategory.innerHTML +=
        "The total expense for " + "<b>" + y + "</b>" + " is: £" + x + "<br>";
    }
  }
}
