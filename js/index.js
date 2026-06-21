let selectedRating = 0;
const ratingTexts = {
    1: "Poor",
    2: "Fair",
    3: "Good",
    4: "Very Good",
    5: "Excellent"
};

function openFeedback() {
    document.getElementById("feedbackOverlay").classList.add("active");
    document.getElementById("feedbackModal").classList.add("active");
    resetFeedbackForm();
}

function closeFeedback() {
    document.getElementById("feedbackOverlay").classList.remove("active");
    document.getElementById("feedbackModal").classList.remove("active");
    document.getElementById("thankYouModal").classList.remove("active");
}

// تفعيل أحداث الماوس والضغط على النجوم
document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('.star').forEach(star => {
        star.addEventListener('click', function() {
            selectedRating = parseInt(this.getAttribute('data-value'));
            updateStarsDisplay(selectedRating);
        });

        star.addEventListener('mouseover', function() {
            const currentHover = parseInt(this.getAttribute('data-value'));
            highlightStars(currentHover);
        });

        star.addEventListener('mouseout', function() {
            updateStarsDisplay(selectedRating);
        });
    });
});

function highlightStars(value) {
    document.querySelectorAll('.star').forEach(star => {
        const starValue = parseInt(star.getAttribute('data-value'));
        if (starValue <= value) {
            star.classList.add('hover');
        } else {
            star.classList.remove('hover');
        }
    });
    document.getElementById("ratingStatus").innerText = ratingTexts[value] || "Select Rating";
}

function updateStarsDisplay(rating) {
    document.querySelectorAll('.star').forEach(star => {
        const starValue = parseInt(star.getAttribute('data-value'));
        star.classList.remove('hover');
        if (starValue <= rating) {
            star.classList.add('selected');
        } else {
            star.classList.remove('selected');
        }
    });
    document.getElementById("ratingStatus").innerText = ratingTexts[rating] || "Select Rating";
}

function submitFeedback() {
    if (selectedRating === 0) {
        alert("Please select a star rating before submitting! 😊");
        return;
    }
    document.getElementById("feedbackModal").classList.remove("active");
    document.getElementById("thankYouModal").classList.add("active");
}

function resetToHome() {
    closeFeedback();
}

function resetFeedbackForm() {
    selectedRating = 0;
    document.getElementById("feedbackText").value = "";
    updateStarsDisplay(0);
}
// ========== MOBILE NAVBAR DROPDOWN LOGIC ==========
const menuToggle = document.getElementById('menuToggle');
const navContainer = document.getElementById('navContainer');

function toggleMenu() {
  navContainer.classList.toggle('active');
  if (navContainer.classList.contains('active')) {
    menuToggle.textContent = '✕';
  } else {
    menuToggle.textContent = '☰';
  }
}

if (menuToggle && navContainer) {
  menuToggle.addEventListener('click', toggleMenu);
}
document.addEventListener('click', (e) => {
  if (navContainer && navContainer.classList.contains('active')) {
    if (!navContainer.contains(e.target) && !menuToggle.contains(e.target)) {
      toggleMenu();
    }
  }
});