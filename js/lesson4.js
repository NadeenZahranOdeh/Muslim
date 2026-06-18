document.addEventListener("DOMContentLoaded", function() {
    const nextBtn = document.getElementById("nextLessonBtn");

    if (nextBtn) {
        if (localStorage.getItem("level4Passed") === "true") {
            nextBtn.classList.remove("disabled-btn");
            nextBtn.classList.add("active-next-btn");
            nextBtn.style.pointerEvents = "auto";
            nextBtn.style.cursor = "pointer";
            nextBtn.innerText = "Continue to Next Lesson";
        } else {
            nextBtn.classList.add("disabled-btn");
            nextBtn.classList.remove("active-next-btn");
            nextBtn.style.pointerEvents = "none";
            nextBtn.style.cursor = "not-allowed";
            nextBtn.innerText = "Continue to Next Lesson ";
        }
    }
});