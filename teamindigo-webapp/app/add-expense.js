//Get elements
const expenseName = document.getElementById("expensiveName");
const category = document.getElementById("category");
const frequency = document.getElementById("frequency");
const expValue = document.getElementById("expValue");

//?
//const selectedEssentialValue = document.querySelector('input[name="selNumber"]:checked').value;
/*
const selectedEssentialElement = document.querySelector('input[name="selNumber"]:checked');
if (selectedEssentialElement) {
  const selectedEssentialValue = selectedEssentialElement.value;
  console.log("checkbox: " + selectedEssentialValue);
} else {
  console.log("No checkbox selected");
}
console.log("checkbox: " + selectedEssentialValue);
*/

//missing here
const savingDesc = document.getElementById("savingDesc");
const savingValue = document.getElementById("savingValue");
//Need to somehow get the username and pass it into the payload to be used to select the correct collection

async function createExpenseRequest() {
  const payload = {
    expenseName: document.getElementById("expensiveName").value,
    category: document.getElementById("category").value,
    frequency: document.getElementById("frequency").value,
    expValue: document.getElementById("expValue").value,
    //missing here
    savingDesc: document.getElementById("savingDesc").value,
    savingValue: document.getElementById("savingValue").value,
  };

  const response = await fetch("http://localhost:3000/add-expense", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const jsonResponse = await response.json();

  document.getElementById("expenseName").textContent = jsonResponse.expenseName;
  document.getElementById("category").textContent = jsonResponse.category;
  document.getElementById("frequency").textContent = jsonResponse.frequency;
  document.getElementById("expValue").textContent = jsonResponse.expValue;
  //missing here
  document.getElementById("savingDesc").textContent = jsonResponse.savingDesc;
  document.getElementById("savingValue").textContent = jsonResponse.savingValue;
}

//Might not need this function
function createExpense() {
  document.getElementById("expenseName").value =
    document.getElementById("expenseName").textContent;
  document.getElementById("category").value =
    document.getElementById("category").textContent;
  document.getElementById("frequency").value =
    document.getElementById("frequency").textContent;
  document.getElementById("expValue").value =
    document.getElementById("expValue").textContent;
  //missing here
  document.getElementById("savingDesc").value =
    document.getElementById("savingDesc").textContent;
  document.getElementById("savingValue").value =
    document.getElementById("savingValue").textContent;
}

//Function to get the value of checked Radio Button Frequency

// varible that will be storage the Radio value for Frequency
let frequencyValue = "";
function displayRadioValue(radioName) {
  let selectedValue = "";
  let radioOption = document.getElementsByName(radioName);
  console.log("calling function " + radioOption);

  for (i = 0; i < radioOption.length; i++) {
    console.log(radioOption[i]);

    if (radioOption[i].checked) {
      selectedValue = radioOption[i].value;
      console.log("Selected value:", selectedValue);
      break; // Exit the loop since we found the checked radio button
    }
  }
  frequencyValue = selectedValue;
}

// varible that will be storage the Radio value for Essential
let essentialValue = 0;

function displayRadioValue2(radioName) {
  let selectedValue = "";
  let radioOption = document.getElementsByName(radioName);
  console.log("calling function " + radioOption);

  for (i = 0; i < radioOption.length; i++) {
    console.log(radioOption[i]);

    if (radioOption[i].checked) {
      selectedValue = radioOption[i].value;
      console.log("Selected value:", selectedValue);
      break; // Exit the loop since we found the checked radio button
    }
  }
  essentialValue = selectedValue;
}
