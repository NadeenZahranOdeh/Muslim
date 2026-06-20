document.addEventListener("DOMContentLoaded", function() {
    if (sessionStorage.getItem("isAdminLoggedIn") !== "true") {
        window.location.href = "login.html";
        return;
    }
});

function filterFeedbackTable() {
    var input = document.getElementById("feedbackSearchInput");
    var filter = input.value.toLowerCase().trim();
    var table = document.getElementById("feedbackTable");
    var tr = table.getElementsByTagName("tr");
    for (var i = 1; i < tr.length; i++) {
        var matchFound = false;
        var tds = tr[i].getElementsByTagName("td");
        if (tds[0] && tds[2]) {
            var studentName = tds[0].textContent || tds[0].innerText;
            var feedbackText = tds[2].textContent || tds[2].innerText;
            
            if (studentName.toLowerCase().indexOf(filter) > -1 || feedbackText.toLowerCase().indexOf(filter) > -1) {
                matchFound = true;
            }
        }
        
        if (matchFound) {
            tr[i].style.display = "";
        } else {
            tr[i].style.display = "none";
        }
    }
}

function deleteFeedbackRow(buttonElement, username) {
    var confirmDelete = confirm("Are you sure you want to permanently delete the feedback from " + username + "?");
    if (confirmDelete) {
        var row = buttonElement.closest("tr");
        row.style.opacity = "0";
        row.style.transition = "opacity 0.2s ease";
        setTimeout(function() {
            row.remove();
        }, 200);
    }
}