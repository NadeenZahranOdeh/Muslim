document.addEventListener("DOMContentLoaded", function() {
    const newPasswordInput = document.getElementById("newPassword");
    const toggleNewPasswordBtn = document.getElementById("toggleNewPassword");

    toggleNewPasswordBtn.addEventListener("click", function() {
        togglePasswordVisibility(newPasswordInput, toggleNewPasswordBtn);
    });
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const toggleConfirmPasswordBtn = document.getElementById("toggleConfirmPassword");

    toggleConfirmPasswordBtn.addEventListener("click", function() {
        togglePasswordVisibility(confirmPasswordInput, toggleConfirmPasswordBtn);
    });
    confirmPasswordInput.addEventListener("input", function() {
        checkPasswordValidityAndMatch();
    });
});

function togglePasswordVisibility(inputElement, toggleBtnImage) {
    if (inputElement.type === "password") {
        inputElement.type = "text";
        toggleBtnImage.src = "image/eye-open.svg";
    } else {
        inputElement.type = "password";
        toggleBtnImage.src = "image/eye.svg";
    }
}
function checkPasswordValidityAndMatch() {
    const password = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const lengthValidation = document.getElementById("validationLength");
    const matchValidation = document.getElementById("validationMatch");
    const updateBtn = document.getElementById("updateBtn");

    if (password.length > 7) {
        lengthValidation.className = "validation-msg success-msg";
    } else {
        lengthValidation.className = "validation-msg error-msg";
    }

    if (password === confirmPassword && confirmPassword !== "") {
        matchValidation.className = "validation-msg success-msg";
        updateBtn.disabled = false; 
        updateBtn.innerText = "Update Password";
    } else {
        matchValidation.className = "validation-msg error-msg";
        updateBtn.disabled = true; 
        updateBtn.innerText = "Check Passwords";
    }
}

function handleFormSubmit(event) {
    event.preventDefault(); 
    if (document.getElementById("updateBtn").disabled === false) {
        alert("Your password has been successfully updated!");
        window.location.href = "pass.html";
    }
}
