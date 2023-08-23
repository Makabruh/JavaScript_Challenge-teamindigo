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
  let cBudget = 500;

  let result = mBudget - cBudget;

  document.getElementById("currentBudget").innerHTML =
    "Current Budget: £ " + result;
}

//Function to fill the table:
//Placeholder values for testing
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
    essential: 5,
    savingDesc: "chaging Subscription type",
    savingValue: 5.99,
  },
  {
    expenseName: "Rent",
    category: "Housing",
    subcategory: "Renting",
    frequency: "Montly",
    expValue: 850.0,
    essential: 10,
    savingDesc: "No",
    savingValue: 0,
  },
];

function fillTable() {
  let newTr = document.createElement("tr");
  console.log(newTr);

  let myTable = document.getElementById("tableExpenses");
  for (i = 0; i <= tableArray.length; i++) {
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
fillTable();
