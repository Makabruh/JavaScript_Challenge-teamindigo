//Global Variables
let firstName = "";
let lastName = "";
let email = "";
let username = "";
let password = "";

async function loginProfile() {
    const payload = {
        username: document.getElementById('input-username').value,
        password: document.getElementById('input-password').value
    };
    
    const response = await fetch('http://localhost:3000/check-profile', {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    const jsonResponse = await response.json();

    if(jsonResponse.success){
        console.log("Login Success")
        firstName = jsonResponse.firstName;
        lastName = jsonResponse.lastName;
        email = jsonResponse.email;
        username = jsonResponse.username;
        password = jsonResponse.password;
    } else {
        console.log("Login Failure")
    }
    
}