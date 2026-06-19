document.addEventListener("DOMContentLoaded", () => {
    const adhkarToggles = document.querySelectorAll(".adhkar-toggle");
    const adhkarRatio = document.getElementById("adhkarRatio");

    function updateAdhkarProgress() {
        let completed = 0;
        adhkarToggles.forEach(toggle => {
            if (toggle.checked) completed++;
        });
        adhkarRatio.textContent = `${completed}/${adhkarToggles.length}`;
    }

    adhkarToggles.forEach(toggle => {
        toggle.addEventListener("change", updateAdhkarProgress);
    });


    // ==========================================
    // 2. نظام تتبع الصلاة الذكي المرتبط بالوقت (Prayer Tracker)
    // ==========================================
    const prayerRows = document.querySelectorAll(".prayer-row");
    const prayerPercentEl = document.getElementById("prayerPercent");

    function updatePrayerPercentage() {
        const allButtons = document.querySelectorAll(".circle-btn");
        let checkedCount = 0;
        allButtons.forEach(btn => {
            if (btn.classList.contains("checked")) checkedCount++;
        });
        const percent = allButtons.length > 0 ? Math.round((checkedCount / allButtons.length) * 100) : 0;
        prayerPercentEl.textContent = `${percent}%`;
    }

    // مصفوفة تحويل الأوقات النصية إلى كائن Date حقيقي للمقارنة الحالية
    function parsePrayerTime(timeStr) {
        const now = new Date();
        const [time, modifier] = timeStr.split(' ');
        let [hours, minutes] = time.split(':');
        if (hours === '12') hours = '00';
        if (modifier === 'PM') hours = parseInt(hours, 10) + 12;
        
        return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0);
    }

    prayerRows.forEach(row => {
        const timeStr = row.dataset.time;
        const prayerName = row.querySelector(".prayer-name").textContent;
        const targetTime = parsePrayerTime(timeStr);
        const buttons = row.querySelectorAll(".circle-btn");

        buttons.forEach(btn => {
            btn.addEventListener("click", () => {
                const currentTime = new Date();
                
                // شرط الحماية لمنع استباق مواعيد الصلاة غير الحادثة بعد
                if (currentTime < targetTime) {
                    alert(`It is not yet prayer time ${prayerName} Next! The estimated prayer time is: ${timeStr}`);
                    return;
                }

                btn.classList.toggle("checked");
                updatePrayerPercentage();
            });
        });
    });


    // ==========================================
    // 3. نظام المهام التفاعلي المتكامل (Personal Tasks)
    // ==========================================
    const tasksContainer = document.getElementById("tasksContainer");
    const taskModal = document.getElementById("taskModal");
    const openTaskModalBtn = document.getElementById("openTaskModal");
    const closeTaskModalBtn = document.getElementById("closeTaskModal");
    const submitTaskBtn = document.getElementById("submitTaskBtn");
    const taskNameInput = document.getElementById("taskNameInput");
    const taskCategoryInput = document.getElementById("taskCategoryInput");

    // مصفوفة مهام أولية افتراضية في حال خلو الذاكرة المحلية
    let myTasks = JSON.parse(localStorage.getItem("userPersonalTasks")) || [
        { id: 1, name: "Read 5 pages of Seerah", category: "Learning", completed: false },
        { id: 2, name: "Memorize Ayat al-Kursi", category: "Spirituality", completed: false },
        { id: 3, name: "Review Fiqh notes", category: "Learning", completed: false }
    ];

    function saveTasksToStorage() {
        localStorage.setItem("userPersonalTasks", JSON.stringify(myTasks));
    }

    function renderTasks() {
        tasksContainer.innerHTML = "";
        
        // التحقق مما إذا كانت جميع المهام قد اكتملت بالفعل (أو القائمة فارغة)
        const isAllDone = myTasks.length > 0 && myTasks.every(t => t.completed);

        if (isAllDone || myTasks.length === 0) {
            // عرض واجهة الإتمام الأنيقة المتوافقة مع الصورة الثانية
            tasksContainer.innerHTML = `
                <div class="all-completed-state">
                    <div class="check-icon-circle">✓</div>
                    <h3>All tasks completed!</h3>
                    <p>Your schedule is clear. Take this moment to reflect or start a new learning module.</p>
                    <div class="badges-inline">
                        <span class="mini-badge">• Weekly Goal: 12/12</span>
                        <span class="mini-badge">• Day Streak: 7</span>
                    </div>
                </div>
            `;
            return;
        }

        // ترتيب المهام: غير المكتمل أولاً ثم المكتمل بالأسفل
        const sortedTasks = [...myTasks].sort((a, b) => a.completed - b.completed);

        sortedTasks.forEach(task => {
            const taskDiv = document.createElement("div");
            taskDiv.className = `task-card ${task.completed ? 'completed' : ''}`;
            
            taskDiv.innerHTML = `
                <div class="task-info-block">
                    <span class="task-meta">${task.category}</span>
                    <p class="task-text">${task.name}</p>
                </div>
                <button class="circle-btn fard-btn ${task.completed ? 'checked' : ''}" data-id="${task.id}"></button>
            `;

            // تفعيل ضغط دائرة اتمام المهمة الشخصية
            const checkBtn = taskDiv.querySelector(".circle-btn");
            checkBtn.addEventListener("click", () => {
                const targetTask = myTasks.find(t => t.id === task.id);
                if (targetTask) {
                    targetTask.completed = !targetTask.completed;
                    saveTasksToStorage();
                    renderTasks();
                }
            });

            tasksContainer.appendChild(taskDiv);
        });
    }

    // أحداث الـ Modal
    openTaskModalBtn.addEventListener("click", () => {
        taskModal.classList.add("active");
        taskNameInput.value = "";
    });

    closeTaskModalBtn.addEventListener("click", () => {
        taskModal.classList.remove("active");
    });

    submitTaskBtn.addEventListener("click", () => {
        const name = taskNameInput.value.trim();
        const category = taskCategoryInput.value;

        if (!name) {
            alert("Please enter a task name!");
            return;
        }

        const newTask = {
            id: Date.now(), // مُعرف فريد معتمد على الوقت
            name: name,
            category: category,
            completed: false
        };

        myTasks.push(newTask);
        saveTasksToStorage();
        renderTasks();
        taskModal.classList.remove("active");
    });

    // تشغيل التهيئة المبدئية عند تحميل الصفحة
    renderTasks();


    // ==========================================
    // 4. نظام الحلقات الدائرية (Sacred Studies Rings)
    // ==========================================
    const rings = document.querySelectorAll(".ring-fill");
    rings.forEach(ring => {
        const radius = ring.r.baseVal.value;
        const circumference = radius * 2 * Math.PI;
        const progressPercent = parseInt(ring.dataset.progress);
        
        ring.style.strokeDasharray = `${circumference} ${circumference}`;
        const offset = circumference - (progressPercent / 100) * circumference;
        ring.style.strokeDashoffset = offset;
    });

});