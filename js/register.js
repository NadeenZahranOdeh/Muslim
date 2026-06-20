'use strict';

document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signupForm");
    const fullNameInput = document.getElementById("fullNameInput");

    if (signupForm) {
        signupForm.addEventListener("submit", (e) => {
            // 1. منع الصفحة من التحديث التلقائي الفوري
            e.preventDefault(); 

            // 2. التقاط الاسم المكتوب
            if (fullNameInput) {
                const fullName = fullNameInput.value.trim();
                
                if (fullName) {
                    // 3. تخزين الاسم في ذاكرة المتصفح
                    localStorage.setItem("username", fullName);
                }
            }

            // 4. الانتقال إلى الصفحة التالية فوراً وبشكل مضمون
            window.location.href = "index.html"; 
        });
    }
});