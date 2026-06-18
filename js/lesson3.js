document.addEventListener("DOMContentLoaded", function() {
    const nextBtn = document.getElementById("nextLessonBtn");

    if (nextBtn) {
        // التحقق مما إذا كان الطالب قد اجتاز اللعبة بنسبة 50% أو أكثر
        if (localStorage.getItem("level3Passed") === "true") {
            // فك قفل الزر بالكامل وتحويله للون الأخضر التفاعلي
            nextBtn.classList.remove("disabled-btn");
            nextBtn.classList.add("active-next-btn");
            nextBtn.style.pointerEvents = "auto";
            nextBtn.style.cursor = "pointer";
            nextBtn.innerText = "Continue to Next Lesson";
        } else {
            // إبقاء الزر معطلاً ورمادي اللون حتى ينجح في اللعبة
            nextBtn.classList.add("disabled-btn");
            nextBtn.classList.remove("active-next-btn");
            nextBtn.style.pointerEvents = "none";
            nextBtn.style.cursor = "not-allowed";
            nextBtn.innerText = "Continue to Next Lesson";
        }
    }
});
