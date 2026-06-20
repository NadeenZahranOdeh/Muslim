document.addEventListener("DOMContentLoaded", function() {
    if (sessionStorage.getItem("isAdminLoggedIn") !== "true") {
        window.location.href = "login.html";
        return;
    }

    // ================= تفعيل الرسم البياني (CHART.JS) =================
    const ctx = document.getElementById('growthChart').getContext('2d');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
    const activeStudentsData = [150, 320, 510, 480, 760, 990, 1245]; 

    new Chart(ctx, {
        type: 'line', 
        data: {
            labels: months,
            datasets: [{
                label: 'Active Students Trend',
                data: activeStudentsData,
                borderColor: '#2a5a30', 
                backgroundColor: 'rgba(42, 90, 48, 0.05)', 
                borderWidth: 3,
                tension: 0.3, 
                fill: true,
                pointBackgroundColor: '#c9973a', 
                pointRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false } 
            },
            scales: {
                y: { beginAtZero: true, grid: { color: '#f1f5f9' } },
                x: { grid: { display: false } }
            }
        }
    });

});

function sendGlobalAlert() {
    const text = document.getElementById("announcementText").value.trim();
    if(text === "") {
        alert("Please write something first!");
        return;
    }
    
    localStorage.setItem("globalAnnouncement", text);
    alert("📢 Spiritual banner successfully broadcasted to all users!");
    document.getElementById("announcementText").value = "";
}