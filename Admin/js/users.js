document.addEventListener("DOMContentLoaded", function() {
    if (sessionStorage.getItem("isAdminLoggedIn") !== "true") {
        window.location.href = "login.html";
        return;
    }
});

function filterUsersTable() {
    const input = document.getElementById("userSearchInput");
    const filter = input.value.toLowerCase();
    const table = document.getElementById("usersTable");
    const tr = table.getElementsByTagName("tr");

    for (let i = 1; i < tr.length; i++) {
        let matchFound = false;
        const tds = tr[i].getElementsByTagName("td");
        
        for (let j = 1; j <= 4; j++) {
            if (tds[j]) {
                const textValue = tds[j].textContent || tds[j].innerText;
                if (textValue.toLowerCase().indexOf(filter) > -1) {
                    matchFound = true;
                    break;
                }
            }
        }
        tr[i].style.display = matchFound ? "" : "none";
    }
}

function deleteUserRow(buttonElement, userId) {
    const confirmDelete = confirm(`Are you sure you want to permanently delete User ID: ${userId}?`);
    if (confirmDelete) {
        const row = buttonElement.closest("tr");
        row.style.opacity = "0";
        setTimeout(() => {
            row.remove();
        }, 200);
    }
}

function openAddUserModal() {
    document.getElementById("addUserModal").classList.add("open");
}

function closeAddUserModal() {
    document.getElementById("addUserModal").classList.remove("open");
    document.getElementById("addNewUserForm").reset();
}
function handleCreateUser(event) {
    event.preventDefault();

    const username = document.getElementById("newUsername").value.trim();
    const email = document.getElementById("newEmail").value.trim();
    const country = document.getElementById("newCountry").value.trim();
    const city = document.getElementById("newCity").value.trim();

    const tableBody = document.getElementById("usersTableBody");
    const currentRowsCount = tableBody.getElementsByTagName("tr").length + 1;
    const generatedId = String(currentRowsCount).padStart(3, '0');
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td>${generatedId}</td>
        <td class="username-td">${username}</td>
        <td>${email}</td>
        <td>${country}</td>
        <td>${city}</td>
        <td style="text-align: center;">
            <button class="delete-user-btn" onclick="deleteUserRow(this, '${generatedId}')">Delete <i class="fa-solid fa-trash-can"></i></button>
        </td>
    `;
    tableBody.insertBefore(newRow, tableBody.firstChild);
    closeAddUserModal();
}