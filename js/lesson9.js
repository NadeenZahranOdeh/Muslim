document.addEventListener("DOMContentLoaded", function() {
    // جلب حالة اكتمال اللعبة والسكور من ذاكرة المتصفح
    const isCompleted = localStorage.getItem('lesson9_completed');
    const savedScore = localStorage.getItem('prayer_game_score');
    const nextBtn = document.getElementById('nextLessonBtn');

    if (nextBtn) {
        if (isCompleted === 'true' || parseInt(savedScore) >= 50) {
            nextBtn.classList.remove('disabled-btn');
            nextBtn.classList.add('active-next-btn');
            nextBtn.innerText = "Continue to Next Lesson";
        } else {
            nextBtn.classList.add('disabled-btn');
            nextBtn.classList.remove('active-next-btn');
            nextBtn.innerText = "Continue to Next Lesson";
        }
    }
});