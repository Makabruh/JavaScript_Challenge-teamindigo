//last update 24/08/2023 - 9pm

// Placeholder values for testing
let tableArray = [];

//This function should run first to pull the necessary data from the database
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

  for(let i=0; i<numberOfExpenses; i++){

    const expenseObj = {};

    //This is fine, just a string
    expenseObj.expenseName = expenses[i]._id;

    //This needs to take the category (eg. c8) and convert it
    //PROBLEM HERE
    if(expenses[i].category == 'c1')
      expenseObj.category = 'Housing';
    else if (expenses[i].category == 'c2')
      expenseObj.category = 'Transportation';
    else if (expenses[i].category == 'c3')
      expenseObj.category = 'Food';
    else if (expenses[i].category == 'c4')
      expenseObj.category = 'Medical & Healthcare';
    else if (expenses[i].category == 'c5')
      expenseObj.category = 'Debt Payments';
    else if (expenses[i].category == 'c6')
      expenseObj.category = 'Saving & Investing';
    else if (expenses[i].category == 'c7')
      expenseObj.category = 'Personal Spending';
      else if (expenses[i].category == 'c8')
      expenseObj.category = 'Recreation & Entertainment';
    else if (expenses[i].category == 'c9')
      expenseObj.category = 'Other';


    //Same as above
    //PROBLEM HERE?
    if(expenses[i].frequency == 'f1')
      expenseObj.frequency = 'Only This Time';
    else if (expenses[i].frequency == 'f2')
      expenseObj.frequency = 'Weekly';
    else if (expenses[i].frequency == 'f3')
      expenseObj.frequency = 'Monthly';
    else if (expenses[i].frequency == 'f4')
      expenseObj.frequency = 'Annually';
    
    //Convert to decimal
    expenseObj.expValue = parseFloat(expenses[i].expValue);
    //Figure out input value
    //PROBLEM HERE
    expenseObj.essential = 5;
    //This is fine
    expenseObj.savingDesc = expenses[i].savingDesc;
    //Convert to decimal
    expenseObj.savingValue = parseFloat(expenses[i].savingValue);

    tableArray.push(expenseObj);
    
    //NOT FILLING TABLE?

  }

  
  console.log(tableArray);
  
  fillTable();
  prepPage();

})();

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
//window.onload = function ()
function prepPage() {
  calcBudget();
  //fillTable();
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
  for (i = 0; i < tableLength; i++) {
    x += tableArray[i].expValue;
  }
  console.log(x);
  return x;
}


function fillTable() {
  // Function to fill the table:
  let tableLength = tableArray.length;
  let myTable = document.getElementById("tableExpenses");
  for (i = 0; i < tableLength; i++) {
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
  for (i = 0; i < tableLength; i++) {
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
    for (i = 0; i < tableLength; i++) {
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

    for (i = 0; i < tableLength; i++) {
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

