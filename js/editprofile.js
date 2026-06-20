// 1. دالة التبديل بين الأقسام (Personal Info / Security)
function showSection(section){
    // إخفاء جميع الأقسام
    document.querySelectorAll('.content-section').forEach(sec => {
        sec.classList.remove('active-section');
    });

    document.querySelectorAll('.sidebar-menu .menu-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    if(section === 'personal'){
        document.getElementById('personalSection').classList.add('active-section');
        document.getElementById('btn-personal').classList.add('active');
    } else if(section === 'security'){
        document.getElementById('securitySection').classList.add('active-section');
        document.getElementById('btn-security').classList.add('active');
    }
}

function togglePasswordVisibility(inputId, toggleIcon) {
    const passwordInput = document.getElementById(inputId);
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleIcon.innerText = "🔒"; 
    } else {
        passwordInput.type = "password";
        toggleIcon.innerText = "👁️";
    }
}

function handleSaveChanges() {
    // التحقق إذا كان قسم الحماية Security هو المفتوح حالياً
    const isSecurityActive = document.getElementById('securitySection').classList.contains('active-section');
    const errorSpan = document.getElementById('passwordError');

    if (isSecurityActive) {
        const currentPass = document.getElementById('currentPassword').value;
        const newPass = document.getElementById('newPassword').value;
        const confirmPass = document.getElementById('confirmPassword').value;

        // إعادة تصفية وإخفاء رسالة الخطأ عند كل محاولة حفظ جديدة
        errorSpan.innerText = "";
        errorSpan.style.display = "none";

        // 1. التحقق من تعبئة جميع الحقول
        if (!currentPass || !newPass || !confirmPass) {
            errorSpan.innerText = "Please fill in all password fields.";
            errorSpan.style.display = "block";
            return;
        }

        // 2. التحقق من أن كلمة المرور لا تقل عن 8 خانات
        if (newPass.length < 8) {
            errorSpan.innerText = "Password must be at least 8 characters long!";
            errorSpan.style.display = "block";
            return;
        }

        // 3. التحقق من تطابق كلمة المرور الجديدة مع حقل التأكيد
        if (newPass !== confirmPass) {
            errorSpan.innerText = "Passwords do not match!";
            errorSpan.style.display = "block";
            return;
        }

        // في حال نجاح كل الفحوصات:
        alert("🔒 Success: Your password has been updated successfully!");
        
        // تحديث شارة الإشعارات في الـ Navbar بشكل تفاعلي
        const badge = document.getElementById('navNotificationBadge');
        if(badge) {
            let currentNotifications = parseInt(badge.innerText) || 0;
            badge.innerText = currentNotifications + 1;
        }

        // تفريغ الحقول بعد إتمام الحفظ بنجاح
        document.getElementById('currentPassword').value = "";
        document.getElementById('newPassword').value = "";
        document.getElementById('confirmPassword').value = "";

    } else {
        // في حال حفظ بيانات القسم الشخصي الآخر
        alert("👤 Success: Personal information saved successfully!");
    }
}

// 4. دالة تحديث الـ Progress ديناميكياً (يمكنك استدعاؤها عند إنهاء الطالب لأي درس)
// الـ subject يأخذ قيم مثل: 'quran', 'aqeedah', 'taweed', 'seerah', 'fiqh'
function updateProgress(subject, newPercentage) {
    const block = document.getElementById(`progress-${subject}`);
    if (block) {
        // تحديث النص المئوي
        block.querySelector('.percent-text').innerText = `${newPercentage}%`;
        // تحديث طول شريط الـ Fill الملون
        block.querySelector('.fill').style.width = `${newPercentage}%`;
    }
}

/* --- أمثلة لتجربة تحديث الـ Progress تلقائياً --- */
// يمكنك تفعيلها أو استدعاؤها من أي مكان في النظام حسب دراسة الطالب:
// updateProgress('quran', 85);   // ستتغير نسبة القرآن فوراً إلى 85% بحركة ناعمة
// updateProgress('taweed', 50);  // ستتغير نسبة التوحيد إلى 50%


// 5. زر التراجع (Discard) لإعادة تعيين المدخلات
function resetForm() {
    if(confirm("Are you sure you want to discard changes?")) {
        document.querySelectorAll('.main-content input').forEach(input => {
            if(input.type === "password") {
                input.value = "";
            }
        });
    }
}

// 6. التحكم بالصورة الشخصية (مأخوذ من كودك السابق ليعمل بشكل سليم)
const imageInput = document.getElementById("imageInput");
if(document.querySelector(".edit-avatar")) {
    document.querySelector(".edit-avatar").addEventListener("click",()=>{
        imageInput.click();
    });
}

if(imageInput) {
    imageInput.addEventListener("change",(e)=>{
        const file=e.target.files[0];
        if(file){
            const reader=new FileReader();
            reader.onload=function(){
                document.getElementById("profileImage").src=reader.result;
                document.getElementById("navbarUserImage").src=reader.result;
            }
            reader.readAsDataURL(file);
        }
    });
}

function logoutUser(){
    if(confirm("Are you sure you want to log out?")){
        window.location.href = "login.html";
    }
}

if(document.querySelector(".remove-avatar")) {
    document.querySelector(".remove-avatar").addEventListener("click",function(){
        if(confirm("Remove profile picture?")){
            document.getElementById("profileImage").src = "image/User profile.svg";
            document.getElementById("navbarUserImage").src = "image/User profile.svg";
        }
    });
}