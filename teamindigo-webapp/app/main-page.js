//last update 23/08/2023 - 10pm

// Placeholder values for testing
let tableArray = [
  {
    expenseName: "New shoes",
    category: "Personal",
    subcategory: "clothes",
    frequency: "Only once",
    expValue: 60.0,
    essential: 2,
    savingDesc: "No",
    savingValue: 0,
  },
  {
    expenseName: "Netflix",
    category: "Entertainment",
    subcategory: "Streaming",
    frequency: "Montly",
    expValue: 15.99,
    essential: 3,
    savingDesc: "chaging Subscription type",
    savingValue: 5.99,
  },
  {
    expenseName: "Rent",
    category: "Housing",
    subcategory: "Renting",
    frequency: "Montly",
    expValue: 850.0,
    essential: 5,
    savingDesc: "No",
    savingValue: 0,
  },
  {
    expenseName: "grosseries",
    category: "Food",
    subcategory: "supermarket",
    frequency: "weekly",
    expValue: 150,
    essential: 5,
    savingDesc: "No",
    savingValue: 0,
  },
];

// Browser onloaded will run those functions automatically.
window.onload = function () {
  calcBudget();
  fillTable();
  sumSavingValue();
  sumByEssential();
};

//function to Add Expense Buton
function openPage() {
  const url = "expense_form.html";
  window.open(url);
}

//calc and Display Current Budget test.
function calcBudget() {
  //Getting the value from montlyBusget input
  let mBudget = document.getElementById("montlyBudget").value;
  console.log(mBudget);

  //Getting the SUM from current expenses (replace the value for cBudget)
  let cBudget = sumExpValue();

  let result = mBudget - cBudget;

  document.getElementById("currentBudget").innerHTML =
    "Current Budget: £ " + result;
}

// Function to fill the table:

function fillTable() {
  let myTable = document.getElementById("tableExpenses");
  for (i = 0; i < tableArray.length; i++) {
    myTable.innerHTML +=
      "<tr><td>" +
      tableArray[i].expenseName +
      "</td><td>" +
      tableArray[i].category +
      "</td><td>" +
      tableArray[i].subcategory +
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
let tableLenght = tableArray.length;
function sumExpValue() {
  let x = 0;
  for (i = 0; i < tableLenght; i++) {
    x += tableArray[i].expValue;
  }
  console.log(x);
  return x;
}

function sumSavingValue() {
  let x = 0;
  for (i = 0; i < tableLenght; i++) {
    x += tableArray[i].savingValue;
  }
  console.log(x);
  let savingResult = document.getElementById("resultSaving");

  savingResult.innerHTML = "£" + x;
}

function sumByEssential() {
  let resultByGrade = document.getElementById("resultEssential");

  for (j = 1; j <= 10; j++) {
    let x = 0;
    console.log("j=" + j);
    for (i = 0; i < tableLenght; i++) {
      let essentialGrade = tableArray[i].essential;
      console.log("essential =" + essentialGrade);
      console.log("i= " + i);
      let essentialExp = tableArray[i].expValue;
      console.log(essentialExp);
      if (essentialGrade == j) {
        console.log("true");
        x += essentialExp;
        console.log("x=" + x);
      }
    }
    if (x > 0) {
      resultByGrade.innerHTML +=
        "Essential value " + j + ", total expense is: £" + x + "<br>";
    }
  }
}

//This function will run first to pull the necessary data from the database
(async function initPullData() {
  const initialResponse = await fetch('http://localhost:3000/get-number-of-expenses');
  const initialData = await initialResponse.json();
  const numberOfExpenses = initialData.count;
  console.log("Number of Expenses:", numberOfExpenses);
  //Use the number of expenses to decide the length of the table

  
  const expenseResponse = await fetch(`http://localhost:3000/get-profile-data?numberOfExpenses=${numberOfExpenses}`);
  const expenseData = await expenseResponse.json();
  const expenses = expenseData.expenses;
  console.log("Expenses:", expenses);
  console.log("Expense 1 Name: ", expenses[0]._id);
  // Populate tableArray with the retrieved expenses
  //tableArray = expenses;

  
  
  
  
})();