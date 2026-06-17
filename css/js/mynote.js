// 1. الألوان المتاحة
const cardColors = [
    { bg: '#E6DEC9', text: '#4D6530' }, 
    { bg: '#B9C9AD', text: '#4D6530' }, 
    { bg: '#E3D7C5', text: '#5c4d37' }  
];

// 2. الملاحظات الافتراضية
let notesList = [
    {
        id: 1,
        title: "Reflections on Tawheed",
        text: "The oneness of the Creator is reflected in the perfect harmony of the cosmos. Every leaf that falls doe...",
        date: "OCT 24, 2023",
        ref: "Surah Al-Baqarah",
        color: cardColors[0]
    },
    {
        id: 2,
        title: "Morning Adhkar Notes",
        text: "The repetition of divine names is a polishing of the mirror of the soul. As the rust of daily distraction is wiped...",
        date: "OCT 12, 2023",
        ref: "Daily Practice",
        color: cardColors[1]
    },
    {
        id: 3,
        title: "Morning Adhkar Notes",
        text: "The repetition of divine names is a polishing of the mirror of the soul. As the rust of daily distraction is wiped...",
        date: "OCT 12, 2023",
        ref: "Daily Practice",
        color: cardColors[2]
    }
];

let editNoteId = null;

// تشغيل العرض المبدئي للملاحظات عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", function() {
    renderNotes();
});

// الانتقال للـ Dashboard من الشاشة الفارغة الأولى
function openNotesList() {
    document.getElementById('emptyState').classList.add('hidden');
    document.getElementById('notesDashboard').classList.remove('hidden');
    renderNotes();
}

// فتح نافذة إضافة ملاحظة جديدة
function openAddNoteModal() {
    editNoteId = null; 
    document.getElementById('modalTitle').innerText = "Add Note";
    document.getElementById('addNoteModal').classList.remove('hidden');
    document.getElementById('noteText').value = '';
    document.getElementById('noteRef').value = ''; // تصفير حقل المرجع
    
    const card = document.getElementById('modalCard');
    card.setAttribute('data-color-index', '0');
    card.style.backgroundColor = cardColors[0].bg;
}

// إغلاق النافذة المنبثقة
function closeAddNoteModal() {
    document.getElementById('addNoteModal').classList.add('hidden');
}

// تغيير الألوان عند النقر على البالتة
function changeModalColor() {
    const card = document.getElementById('modalCard');
    let currentIndex = parseInt(card.getAttribute('data-color-index')) || 0;
    let nextIndex = (currentIndex + 1) % cardColors.length;
    
    card.setAttribute('data-color-index', nextIndex);
    card.style.backgroundColor = cardColors[nextIndex].bg;
}

// دالة حفظ الملاحظة المبسطة والآمنة
function saveNote() {
    const text = document.getElementById('noteText').value.trim();
    let ref = document.getElementById('noteRef').value.trim();
    
    if (text === "") {
        alert("Please write a note first before saving!");
        return;
    }

    // إذا ترك المستخدم حقل المرجع فارغاً، نضع قيمة افتراضية
    if (ref === "") {
        ref = "General";
    }

    const card = document.getElementById('modalCard');
    const colorIndex = parseInt(card.getAttribute('data-color-index')) || 0;
    const title = text.length > 25 ? text.substring(0, 25) + "..." : text;

    if (editNoteId !== null) {
        // وضع التعديل
        const noteIndex = notesList.findIndex(n => n.id === editNoteId);
        if (noteIndex !== -1) {
            notesList[noteIndex].title = title;
            notesList[noteIndex].text = text;
            notesList[noteIndex].ref = ref; // تحديث المرجع الملوّن
            notesList[noteIndex].color = cardColors[colorIndex];
        }
    } else {
        // وضع إضافة ملاحظة جديدة
        const newNote = {
            id: Date.now(),
            title: title,
            text: text,
            date: "JUN 16, 2026", 
            ref: ref, // حفظ المرجع الجديد هنا
            color: cardColors[colorIndex]
        };
        notesList.unshift(newNote);
    }
    
    closeAddNoteModal();
    renderNotes();
}

function renderNotes() {
    const grid = document.getElementById('notesGrid');
    if (!grid) return;
    
    grid.innerHTML = '';

    notesList.forEach(note => {
        const colorIdx = cardColors.findIndex(c => c.bg === note.color.bg);

        const cardHtml = `
            <div class="note-card" style="background-color: ${note.color.bg}; color: ${note.color.text}">
                <div class="card-header">
                    <span class="card-date">${note.date}</span>
                    <div class="options-menu-container">
                        <span class="three-dots" onclick="toggleOptionsMenu(event, ${note.id})">•••</span>
                        <div class="options-dropdown hidden" id="dropdown-${note.id}">
                            <button onclick="openEditNoteModal(${note.id}, ${colorIdx})" style="color: #4D6530; background:none; border:none; padding:8px 15px; width:100%; text-align:left; cursor:pointer; font-weight:600;">Edit ✏️</button>
                            <button onclick="deleteNote(${note.id})" style="color: #c94444; background:none; border:none; padding:8px 15px; width:100%; text-align:left; cursor:pointer; font-weight:600;">Delete 🗑️</button>
                        </div>
                    </div>
                </div>
                <h3 class="card-title-text" style="margin-bottom: 8px; font-size: 18px; font-weight: 700;">${note.title}</h3>
                <p class="card-body-text">${note.text}</p>
                <div class="card-footer" style="margin-top: 15px;">
                    <span class="ref-tag">Ref: ${note.ref}</span>
                </div>
            </div>
        `;
        grid.insertAdjacentHTML('beforeend', cardHtml);
    });
}

function openEditNoteModal(id, colorIdx) {
    const note = notesList.find(n => n.id === id);
    if (!note) return;

    editNoteId = id; 
    document.getElementById('modalTitle').innerText = "Edit Note";
    document.getElementById('noteText').value = note.text;
    document.getElementById('noteRef').value = note.ref; // جلب المرجع القديم ليتسنى للمستخدم تعديله
    
    const card = document.getElementById('modalCard');
    card.setAttribute('data-color-index', colorIdx);
    card.style.backgroundColor = note.color.bg;

    document.getElementById('addNoteModal').classList.remove('hidden');
}

function toggleOptionsMenu(event, id) {
    event.stopPropagation(); 
    
    const openDropdowns = document.querySelectorAll('.options-dropdown');
    openDropdowns.forEach(dropdown => {
        if (dropdown.id !== `dropdown-${id}`) {
            dropdown.classList.add('hidden');
        }
    });

    const dropdown = document.getElementById(`dropdown-${id}`);
    if (dropdown) {
        dropdown.classList.toggle('hidden');
    }
}

function deleteNote(id) {
    notesList = notesList.filter(note => note.id !== id);
    renderNotes();
}

document.addEventListener('click', function() {
    const openDropdowns = document.querySelectorAll('.options-dropdown');
    openDropdowns.forEach(dropdown => {
        dropdown.classList.add('hidden');
    });
});