document.addEventListener("DOMContentLoaded", function() {
    // جلب حالة اكتمال اللعبة والسكور من ذاكرة المتصفح
    const isCompleted = localStorage.getItem('lesson2_completed');
    const savedScore = localStorage.getItem('prayer_game_score');
    const nextBtn = document.getElementById('nextLessonBtn');

    if (nextBtn) {
        // التحقق من الشرط: إذا تحقق شرط الـ 50% أو أعلى بنجاح
        if (isCompleted === 'true' || parseInt(savedScore) >= 50) {
            
            // فك القفل عن الزر: إزالة كلاس التعطيل وإضافة كلاس التفعيل الأخضر
            nextBtn.classList.remove('disabled-btn');
            nextBtn.classList.add('active-next-btn');
            
            // تحديث نص الزر ليوضح للطالب أنه نجح ويستطيع العبور
            nextBtn.innerText = "Continue to Next Lesson (Passed! 🎉)";
        } else {
            // في حال لم يلعب بعد أو سكور أقل من 50% يظل الزر معطلاً
            nextBtn.classList.add('disabled-btn');
            nextBtn.classList.remove('active-next-btn');
            nextBtn.innerText = "Continue to Next Lesson";
        }
    }
});