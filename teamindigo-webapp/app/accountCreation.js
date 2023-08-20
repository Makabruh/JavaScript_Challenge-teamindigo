// Getting elements from the index, this is for the full name and email
const firstName = document.getElementById('firstName');
const firstNameMsg = document.getElementById('firstNameValidationMsg');

const lastName = document.getElementById('lastName');
const lastNameMsg = document.getElementById('lastNameValidationMsg');

const email = document.getElementById('email');
const emailMsg = document.getElementById('emailValidationMsg');

const username = document.getElementById('username');
const usernameMsg = document.getElementById('usernameValidationMsg');

const password = document.getElementById('password');
const passwordMsg = document.getElementById('passwordValidationMsg');

// Runs on submit button click
function validateForm(myForm) {

    /* First Name validation */
    const getFirstName = firstName.value; // get input box value
    let firstNameIsValid = false; // bool used later, set to false by default or when input in invalid

    // if the input box is empty
    if(getFirstName === '' || getFirstName == null) {
        firstNameMsg.innerText = "First name can't be empty"; // message to display
        firstNameMsg.classList.add('invalid-msg'); // css class to apply
        firstNameMsg.classList.remove('valid-msg'); // we remove this just in case it was added when the input was valid then they change the input so it became invalid again
        firstName.style.borderColor = 'rgb(204, 102, 114)'; // input box inidicative colour
        firstNameIsValid = false; // not valid so this remains false
    }
    else {
        firstNameMsg.innerText = "Looks right!"; // message to display
        firstNameMsg.classList.add('valid-msg'); // css class to apply
        firstNameMsg.classList.remove('invalid-msg'); // we remove this just in case it was added when the input was valid then they change the input so it became invalid again
        firstName.style.borderColor = 'rgb(56, 204, 137)'; // input box indicative colour
        firstNameIsValid = true; // valid, so now set to true
    }

    /* Last Name validation */
    const getLastName = lastName.value; // get input box value
    let lastNameIsValid = false; // bool used later, set to false by default or when input in invalid

    // if the input box is empty
    if(getLastName === '' || getLastName == null) {
        lastNameMsg.innerText = "Last name can't be empty"; // message to display
        lastNameMsg.classList.add('invalid-msg'); // css class to apply
        lastNameMsg.classList.remove('valid-msg'); // we remove this just in case it was added when the input was valid then they change the input so it became invalid again
        lastName.style.borderColor = 'rgb(204, 102, 114)'; // input box inidicative colour
        lastNameIsValid = false; // not valid so this remains false
    }
    else {
        lastNameMsg.innerText = "Looks right!"; // message to display
        lastNameMsg.classList.add('valid-msg'); // css class to apply
        lastNameMsg.classList.remove('invalid-msg'); // we remove this just in case it was added when the input was valid then they change the input so it became invalid again
        lastName.style.borderColor = 'rgb(56, 204, 137)'; // input box indicative colour
        lastNameIsValid = true; // valid, so now set to true
    }

    /* Email Validation */
    const getEmail = email.value; // get input box value
    const emailRegex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}'); // regex expression to verify parts of the email format
    const checkEmail = emailRegex.test(getEmail); // test the email input against the regex 
    let emailIsValid = false; // bool used later, set to false by default or when input in invalid

    // if the input box is empty
    if(getEmail === '' || getEmail == null) { 
        emailMsg.innerText = "Email can't be empty."; 
        emailMsg.classList.add('invalid-msg');
        emailMsg.classList.remove('valid-msg');
        email.style.borderColor = 'rgb(204, 102, 114)';
        emailIsValid = false; // not valid so this remains false
    }
    else {
        // if the input doesn't match the email format
        if (checkEmail == false) {
            emailMsg.innerText = "Email is not correct";
            emailMsg.classList.add('invalid-msg');
            emailMsg.classList.remove('valid-msg');
            email.style.borderColor = 'rgb(204, 102, 114)';
            emailIsValid = false; // not valid so this remains false
        }
        else {
            emailMsg.innerText = "Looks right!";
            emailMsg.classList.remove('invalid-msg');
            emailMsg.classList.add('valid-msg');
            email.style.borderColor = 'rgb(56, 204, 137)';
            emailIsValid = true; // valid, so now set to true
        }
    }

    /* Username validation */
    const getUsername = username.value; // get input box value
    let usernameIsValid = false; // bool used later, set to false by default or when input in invalid

    // if the input box is empty or over 16 characters
    // need to work on unique usernames
    if(getUsername === '' || getUsername == null) {
        usernameMsg.innerText = "Username can't be empty"; // message to display
        usernameMsg.classList.add('invalid-msg'); // css class to apply
        usernameMsg.classList.remove('valid-msg'); // we remove this just in case it was added when the input was valid then they change the input so it became invalid again
        username.style.borderColor = 'rgb(204, 102, 114)'; // input box inidicative colour
        usernameIsValid = false; // not valid so this remains false
    }
    else if (getUsername.length >= 16){
        usernameMsg.innerText = "Username is too long"; // message to display
        usernameMsg.classList.add('invalid-msg'); // css class to apply
        usernameMsg.classList.remove('valid-msg'); // we remove this just in case it was added when the input was valid then they change the input so it became invalid again
        username.style.borderColor = 'rgb(204, 102, 114)'; // input box inidicative colour
        usernameIsValid = false; // not valid so this remains false
    }
    else {
        usernameMsg.innerText = "Looks right!"; // message to display
        usernameMsg.classList.add('valid-msg'); // css class to apply
        usernameMsg.classList.remove('invalid-msg'); // we remove this just in case it was added when the input was valid then they change the input so it became invalid again
        username.style.borderColor = 'rgb(56, 204, 137)'; // input box indicative colour
        usernameIsValid = true; // valid, so now set to true
    }

    /* Password Validation */
    const getPassword = password.value; // get input box value
    const passwordRegex = new RegExp("^" +
    "(?=.*[0-9])" +         //at least 1 digit
    "(?=.*[a-z])" +         //at least 1 lower case letter
    "(?=.*[A-Z])" +         //at least 1 upper case letter
    "(?=.*[a-zA-Z])" +      //any letter
    //"(?=.*[@#$%^&+=])" +    //at least 1 special character
    "(?=\\S+$)" +           //no white spaces
    ".{4,}" +               //at least 4 characters
    "$");
    const checkPassword = passwordRegex.test(getPassword); // test the email input against the regex 
    let passwordIsValid = false; // bool used later, set to false by default or when input in invalid

    // if the input box is empty
    if(getPassword === '' || getPassword == null) { 
        passwordMsg.innerText = "Password can't be empty."; 
        passwordMsg.classList.add('invalid-msg');
        passwordMsg.classList.remove('valid-msg');
        password.style.borderColor = 'rgb(204, 102, 114)';
        passwordIsValid = false; // not valid so this remains false
    }
    else {
        // if the input doesn't match the email format
        if (checkPassword == false) {
            passwordMsg.innerText = "Password must contain numbers, capital and lowercase letters";
            passwordMsg.classList.add('invalid-msg');
            passwordMsg.classList.remove('valid-msg');
            password.style.borderColor = 'rgb(204, 102, 114)';
            passwordIsValid = false; // not valid so this remains false
        }
        else {
            passwordMsg.innerText = "Looks right!";
            passwordMsg.classList.remove('invalid-msg');
            passwordMsg.classList.add('valid-msg');
            password.style.borderColor = 'rgb(56, 204, 137)';
            passwordIsValid = true; // valid, so now set to true
        }
    }

    if(firstNameIsValid == true && lastNameIsValid == true && emailIsValid == true && usernameIsValid == true && passwordIsValid == true) { 
        // as all inputs have been verified now, we are good to go!
        console.log("validated");
        createProfileRequest();
    }
}

//Database Management

    async function createProfileRequest() {
        //const contEdit = document.getElementById('container-edit');
        //const cont = document.getElementById('container');
    
        const payload = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value, 
            username: document.getElementById('username').value,
            password: document.getElementById('password').value
        };
        
        const response = await fetch('http://localhost:3000/create-profile', {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        const jsonResponse = await response.json();
    
        document.getElementById('firstName').textContent = jsonResponse.firstName;
        document.getElementById('lastName').textContent = jsonResponse.lastName;
        document.getElementById('email').textContent = jsonResponse.email;
        document.getElementById('username').textContent = jsonResponse.username;
        document.getElementById('password').textContent = jsonResponse.password;
    
        //cont.style.display = 'block';
        //contEdit.style.display = 'none';
    }
    
    function createProfile() {
        //const contEdit = document.getElementById('container-edit');
        //const cont = document.getElementById('container');
    
        document.getElementById('firstName').value = document.getElementById('firstName').textContent;
        document.getElementById('lastName').value = document.getElementById('lastName').textContent;
        document.getElementById('email').value = document.getElementById('email').textContent;
        document.getElementById('username').value = document.getElementById('username').textContent;
        document.getElementById('password').value = document.getElementById('password').textContent;
    
        //cont.style.display = 'none';
        //contEdit.style.display = 'block';
    }
    
