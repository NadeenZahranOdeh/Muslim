function checkQuizStatus() {
    const nextBtn = document.getElementById("nextLessonBtn");
    if (!nextBtn) return;
    const urlParams = new URLSearchParams(window.location.search);
    const isPassed = urlParams.get('passed');

    if (isPassed === "true") {
        nextBtn.classList.remove("disabled-btn");
        nextBtn.setAttribute("href", "lesson2.html");
    } else {
        nextBtn.classList.add("disabled-btn");
        nextBtn.setAttribute("href", "javascript:void(0);");
    }
}
document.addEventListener("DOMContentLoaded", checkQuizStatus);
window.addEventListener("pageshow", checkQuizStatus);

