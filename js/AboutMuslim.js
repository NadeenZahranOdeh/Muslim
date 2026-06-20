function openFeedback() {
    document.getElementById("feedbackModal").style.display = "block";
    document.getElementById("feedbackOverlay").style.display = "block";
}

function closeFeedback() {
    document.getElementById("feedbackModal").style.display = "none";
    document.getElementById("feedbackOverlay").style.display = "none";
}
document.addEventListener("DOMContentLoaded", function() {
    const stars = document.querySelectorAll(".star");
    const status = document.getElementById("ratingStatus");

    stars.forEach(star => {
        star.addEventListener("click", function() {
            let val = this.getAttribute("data-value");
            status.innerText = `Rating: ${val} / 5 ⭐`;
            
            stars.forEach(s => {
                if(s.getAttribute("data-value") <= val) {
                    s.style.color = "#c9973a"; 
                } else {
                    s.style.color = "#ccc";
                }
            });
        });
    });
});

function submitFeedback() {
    alert("Thank you for your spiritual contribution! Feedback sent.");
    closeFeedback();
}