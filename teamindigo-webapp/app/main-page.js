//last update 24/08/2023 - 9pm

// Placeholder values for testing
let tableArray = [];
let tableLength;

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

    //This is fine, just a string
    expenseObj.category = expenses[i].category;
    
    //This is fine, just a string
    expenseObj.frequency = expenses[i].frequency
    
    //Convert to decimal
    expenseObj.expValue = parseFloat(expenses[i].expValue);
    //Figure out input value
    //PROBLEM HERE
    expenseObj.essential = parseInt(expenses[i].selectedEssentialValue);
    //This is fine
    expenseObj.savingDesc = expenses[i].savingDesc;
    //Convert to decimal
    expenseObj.savingValue = parseFloat(expenses[i].savingValue);

    tableArray.push(expenseObj);

  }

  
  console.log(tableArray);
  
  tableLength = tableArray.length;
  fillTable();
  
  prepPage();


  const getNameResponse = await fetch('http://localhost:3000/get-user-name');
  const userData = await getNameResponse.json();
  const userFirstName = userData.firstName;
  document.getElementById('fillName').textContent = userFirstName ? userFirstName : 'PLACEHOLDER';

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
  helpByCategory();
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
      "</td><td>"
      let deleteExpense = document.createElement("button")
      deleteExpense.innerText="Delete Expense"

      "</td></tr>";
  }
}


let buttonForDelete = document.getElementById('deleteButtons');

buttonForDelete.addEventListener('click',function (event) {
  let tableForButtons = document.getElementById("tableExpenses");
  let rows = tableForButtons.rows;
  //i = 2 because we start from the third row to add delete buttons
  for(let i = 2; i < rows.length; i++){
    let cols = rows[i].cells;
    let lastCol = rows[i]['cells'][cols.length - 1];

    let button = document.createElement('button');
    button.innerText = 'Delete'

    button.setAttribute('onclick', `deleteSpecificExpense(${(i-2)})`);
    lastCol.appendChild(button);
  }
});


async function deleteSpecificExpense(numberForExpense) {

  let expenseNameForDelete = tableArray[numberForExpense].expenseName;
  
    const payload = {
      _id: expenseNameForDelete,
    };
  
    const response = await fetch("http://localhost:3000/delete-expense", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const jsonResponse = await response.json();
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
        "For Essential Value " +
        "<b>" +
        j +
        "</b>" +
        ", the total expense is: £" +
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

selectedCategoriesArray=[];
function helpByCategory(){
  for (let i in categoriesList){
    //Go through each category available
    let selectedCategory = categoriesList[i];

    for (j = 0; j < tableLength; j++) {
      //If the current category is on the list then add it to the list
      let currentCategory = tableArray[j].category;
      //console.log("i = " + currentCategory);
      if(selectedCategory == currentCategory){
        selectedCategoriesArray.push(selectedCategory);
      }
    }


  }

  console.log(selectedCategoriesArray);
  //If the array contains a category, supply the help links
  if(selectedCategoriesArray.includes("Debt Payments")){
    resultHelp.innerHTML +=
      "For help with " + "<b>" + "Debt Payments" + "</b>" + ", please see our" + "<b>" + " Help with Debts " + "</b>" + "page" +
      "<br>"
  }
  if(selectedCategoriesArray.includes("Housing")){
    resultHelp.innerHTML +=
      "For help with " + "<b>" + "Housing" + "</b>" + ", please see our" + "<b>" + " Help with Housing " + "</b>" + "page" +
      "<br>"
  }
  if(selectedCategoriesArray.includes("Transportation")){
    resultHelp.innerHTML +=
      "For help with " + "<b>" + "Transportation" + "</b>" + ", please see our" + "<b>" + " Help with Transport " + "</b>" + "page" +
      "<br>"
  }
  if(selectedCategoriesArray.includes("Food")){
    resultHelp.innerHTML +=
      "For help with " + "<b>" + "Food Costs" + "</b>" + ", please see our" + "<b>" + " Help with Food & Living " + "</b>" + "page" +
      "<br>"
  }
  if(selectedCategoriesArray.includes("Medical & Healthcare")){
    resultHelp.innerHTML +=
      "For help with " + "<b>" + "Medical & Healthcare Bills" + "</b>" + ", please see our" + "<b>" + " Help with Health " + "</b>" + "page" +
      "<br>"
  }
  if(selectedCategoriesArray.includes("Saving, Investing")){
    resultHelp.innerHTML +=
      "For help with " + "<b>" + "Ways to Save & Invest" + "</b>" + ", please see our" + "<b>" + " Help with Saving or Investing " + "</b>" + "page" +
      "<br>"
  }
  if(selectedCategoriesArray.includes("Personal Spending")){
    resultHelp.innerHTML +=
      "For help with " + "<b>" + "Personal Spending Habits" + "</b>" + ", please see our" + "<b>" + " Help with Personal Spending " + "</b>" + "page" +
      "<br>"
  }
  if(selectedCategoriesArray.includes("Recreation & Entertainment")){
    resultHelp.innerHTML +=
      "For help with " + "<b>" + "Recreation & Entertainment Costs" + "</b>" + ", please see our" + "<b>" + " Help with Recreation & Entertainment " + "</b>" + "page" +
      "<br>"
  }
  if(selectedCategoriesArray.includes("Other")){
    resultHelp.innerHTML +=
      "For help with " + "<b>" + "Other Costs" + "</b>" + ", please see our" + "<b>" + " Other Help " + "</b>" + "page" +
      "<br>"
  }

}

