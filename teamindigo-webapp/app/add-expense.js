//Get elements
const expenseName = document.getElementById('expensiveName');
const category = document.getElementById('category');
const frequency = document.getElementById('frequency');
const expValue = document.getElementById('expValue');
const savingDesc = document.getElementById('savingDesc');
const savingValue = document.getElementById('savingValue');
//Need to somehow get the username and pass it into the payload to be used to select the correct collection

async function createExpenseRequest() {
    const payload = {
        expenseName: document.getElementById('expensiveName').value,
        category: document.getElementById('category').value,
        frequency: document.getElementById('frequency').value, 
        expValue: document.getElementById('expValue').value,
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

    document.getElementById('expenseName').textContent = jsonResponse.expenseName;
    document.getElementById('category').textContent = jsonResponse.category;
    document.getElementById('frequency').textContent = jsonResponse.frequency;
    document.getElementById('expValue').textContent = jsonResponse.expValue;
    document.getElementById('savingDesc').textContent = jsonResponse.savingDesc;
    document.getElementById('savingValue').textContent = jsonResponse.savingValue;
}

function createProfile() {
    document.getElementById('expenseName').value = document.getElementById('expenseName').textContent;
    document.getElementById('category').value = document.getElementById('category').textContent;
    document.getElementById('frequency').value = document.getElementById('frequency').textContent;
    document.getElementById('expValue').value = document.getElementById('expValue').textContent;
    document.getElementById('savingDesc').value = document.getElementById('savingDesc').textContent;
    document.getElementById('savingValue').value = document.getElementById('savingValue').textContent;
}