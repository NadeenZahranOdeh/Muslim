document.addEventListener('DOMContentLoaded', () => {
    const togglePassword =
    document.getElementById('togglePassword');
    const passwordInput =
    document.getElementById('passwordInput');
    togglePassword.addEventListener('click', () => {
        const type = passwordInput.type === 'password'? 'text': 'password';
        passwordInput.type = type;
    });

    const toggleConfirmPassword =
    document.getElementById('toggleConfirmPassword');
    const confirmPasswordInput =
    document.getElementById('confirmPasswordInput');
    toggleConfirmPassword.addEventListener('click', () => {
        const type =
        confirmPasswordInput.type === 'password'? 'text': 'password';
        confirmPasswordInput.type = type;
    });

});

document
.getElementById("googleBtn")
.addEventListener("click", () => {
    window.location.href =
    "https://localhost:5001/api/auth/google";

});
const passwordInput =
document.getElementById("passwordInput");

const confirmPassword =
document.getElementById("confirmPassword");

const passwordError =
document.getElementById("passwordError");

const confirmError =
document.getElementById("confirmError");

passwordInput.addEventListener("input", validatePassword);

function validatePassword(){

    const password =
    passwordInput.value;

    let messages = [];

    if(password.length < 8){
        messages.push(
        "Password is too short");
    }

    if(
        !/[A-Za-z]/.test(password) ||
        !/[0-9]/.test(password)
    ){
        messages.push(
        "Must include letters and numbers");
    }

    if(password.length < 10){
        messages.push(
        "Password is too weak");
    }

    passwordError.innerHTML =
    messages.join("<br>");
}
confirmPassword.addEventListener(
    "input",
    checkPasswords
);

function checkPasswords(){

    if(
        confirmPassword.value !==
        passwordInput.value
    ){

        confirmError.textContent =
        "Passwords do not match";

    }else{

        confirmError.textContent = "";

    }
}