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
