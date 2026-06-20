document.addEventListener("DOMContentLoaded", function() {
    const nextBtn = document.getElementById("nextLessonBtn");

    function checkLessonUnlock() {
        if (!nextBtn) return;
        const isPassed = localStorage.getItem("level3Passed") === "true";

        if (isPassed) {
            nextBtn.classList.remove("disabled-btn");
            nextBtn.classList.add("active-next-btn");
            nextBtn.setAttribute("href", "lesson4.html");
            nextBtn.style.setProperty("pointer-events", "auto", "important");
            nextBtn.style.setProperty("cursor", "pointer", "important");
            nextBtn.style.setProperty("background-color", "#2a5a30", "important");
            nextBtn.style.setProperty("color", "#ffffff", "important");
            nextBtn.style.setProperty("opacity", "1", "important");
            nextBtn.style.textDecoration = "none";
            nextBtn.style.display = "inline-block";
            
            nextBtn.innerText = "Continue to Next Lesson →";
            nextBtn.onmouseenter = () => nextBtn.style.setProperty("background-color", "#3f8a48", "important");
            nextBtn.onmouseleave = () => nextBtn.style.setProperty("background-color", "#2a5a30", "important");
            
        } else {
            nextBtn.removeAttribute("href");
            nextBtn.style.setProperty("pointer-events", "none", "important");
            nextBtn.style.setProperty("cursor", "not-allowed", "important");
            nextBtn.style.setProperty("background-color", "#dcdde1", "important");
            nextBtn.style.setProperty("color", "#7f8c8d", "important");
            nextBtn.innerText = "Continue to Next Lesson (Locked 🔒)";
        }
    }
    checkLessonUnlock();
    window.addEventListener("focus", checkLessonUnlock);
    window.addEventListener("storage", checkLessonUnlock);
});