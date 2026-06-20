function handleAdminLogin(event) {
    event.preventDefault();
    const usernameInput = document.getElementById("adminUsername").value.trim();
    const passwordInput = document.getElementById("adminPassword").value;
    const errorBanner = document.getElementById("errorBanner");
    const DEFAULT_ADMIN_USER = "admin";
    const DEFAULT_ADMIN_PASS = "admin123";

    if (usernameInput === DEFAULT_ADMIN_USER && passwordInput === DEFAULT_ADMIN_PASS) {
        errorBanner.style.display = "none";
        sessionStorage.setItem("isAdminLoggedIn", "true");
        window.location.href = "dashboard.html";
    } else {
        errorBanner.style.display = "block";
        document.getElementById("adminPassword").value = "";
    }
}
function togglePasswordVisibility() {
    const passwordInput = document.getElementById("adminPassword");
    const toggleBtn = document.getElementById("togglePasswordBtn");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleBtn.src = "../image/eye.svg"; 
    } else {
        passwordInput.type = "password";
        toggleBtn.src = "../image/eye-open.svg"; 
    }
}