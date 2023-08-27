//Get elements
const expenseName = document.getElementById("expensiveName");
const category = document.getElementById("category");
const frequency = document.getElementById("frequency");
const expValue = document.getElementById("expValue");
//const selectedEssentialValue = document.querySelector('input[name="selNumber"]:checked').value;
const savingDesc = document.getElementById("savingDesc");
const savingValue = document.getElementById("savingValue");

async function createExpenseRequest() {
    const payload = {
        expenseName: document.getElementById('expensiveName').value,
        category: document.getElementById('category').value,
        //frequency: document.getElementById('frequency').value, 
        frequency: frequencyValue,
        expValue: document.getElementById('expValue').value,
        selectedEssentialValue: document.querySelector('input[name="selNumber"]:checked').value,
        savingDesc: document.getElementById('savingDesc').value,
        savingValue: document.getElementById('savingValue').value
    };
    
    const response = await fetch('http://localhost:3000/add-expense', {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    const jsonResponse = await response.json();

    alert("Expense added! Please return to the main page")
    
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


/*
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
*/