function saveAdminResponse(questionId) {
    
    const inputField = document.getElementById(`input-${questionId}`);
    if (!inputField) return; 
    
    const responseText = inputField.value.trim();
    if (responseText === "") {
        alert("Please type a valid response before saving!");
        return;
    }

    const badge = document.getElementById(`badge-${questionId}`);
    if (badge) {
        badge.className = "status-badge answered";
        badge.innerText = "Answered";
    }
    const targetCell = document.getElementById(`cell-${questionId}`);
    if (targetCell) {
        targetCell.className = "saved-response-text";
        targetCell.innerText = responseText;
    }
}

function filterQuestionsTable() {
    const input = document.getElementById("questionSearchInput");
    const filter = input.value.toLowerCase().trim();
    const table = document.getElementById("questionsTable");
    const tr = table.getElementsByTagName("tr");
    for (let i = 1; i < tr.length; i++) {
        let matchFound = false;
        const tds = tr[i].getElementsByTagName("td");
        for (let j = 0; j < 3; j++) {
            if (tds[j]) {
                const textValue = tds[j].textContent || tds[j].innerText;
                if (textValue.toLowerCase().includes(filter)) {
                    matchFound = true;
                    break;
                }
            }
        }
        tr[i].style.display = matchFound ? "" : "none";
    }
}