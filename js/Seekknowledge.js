let questions = [
  {
    id: 1,
    author: {
      name: 'Mohammad Ali',
      title: 'SENIOR JURISCONSULT',
      avatarType: 'scholar-1',
      initials: 'MA'
    },
    status: 'Answered',
    question: 'How can I maintain my focus during prayers when my mind feels constantly cluttered by daily stresses?',
    answer: 'Focus in prayer (Khushu) is a journey, not a destination. It begins before the prayer itself, with a calm transition. Sheikh Abdullah advises starting with conscious breathing and a momentary pause between your daily tasks and the prayer mat. The Quran reminds us that success belongs to the believers who humble themselves in their prayers (Al-Mu’minun: 1-2). By setting aside distractions and dedicating even a few minutes to disconnect from worldly affairs before starting, you can achieve a deeper sense of connection and presence during your Salah.',
    date: 'May 16, 2024',
    createdAt: new Date('2024-05-16T10:00:00Z').getTime()
  },
  {
    id: 2,
    author: {
      name: 'Awaiting Assignment',
      title: 'COMMUNITY MEMBER',
      avatarType: 'pending',
      initials: '?'
    },
    status: 'Pending',
    question: 'What is the theological perspective on ethical investment in modern technology firms from a Fiqh standpoint?',
    answer: null,
    date: 'Yesterday',
    createdAt: Date.now() - 24 * 60 * 60 * 1000
  },
  {
    id: 3,
    author: {
      name: 'Ahmad Ali',
      title: 'ETHICS FACULTY',
      avatarType: 'scholar-2',
      initials: 'AA'
    },
    status: 'Answered',
    question: 'Guidelines for navigating digital fasting and mindfulness during the month of Ramadan?',
    answer: 'Ustadha Maryam highlights that fasting is not just of the stomach, but of the eyes, ears, and mind as well. Digital minimalism during Ramadan allows the soul to reclaim its silence, foster deeper contemplation, and maximize worship time. Try setting specific slots for device usage, turning off non-essential notifications, and replacing screen time with Quran recitation and reflection to experience a truly transformative month.',
    date: 'May 10, 2024',
    createdAt: new Date('2024-05-10T08:00:00Z').getTime()
  }
];

// State variables
let activeTab = 'All';
let sortBy = 'Newest';
let visibleCount = 2;
let expandedQuestions = {};

// DOM Elements
const askForm = document.getElementById('askForm');
const questionInput = document.getElementById('questionInput');
const categorySelect = document.getElementById('categorySelect');
const filterDropdownTrigger = document.getElementById('filterDropdownTrigger');
const filterDropdownMenu = document.getElementById('filterDropdownMenu');
const dropdownArrowIcon = document.getElementById('dropdownArrowIcon');
const activeTabLabel = document.getElementById('activeTabLabel');
const filterDropdownItems = document.querySelectorAll('.filter-dropdown-item');
const sortSelect = document.getElementById('sortSelect');
const questionFeed = document.getElementById('questionFeed');
const loadMoreContainer = document.getElementById('loadMoreContainer');
const loadMoreBtn = document.getElementById('loadMoreBtn');

// Initialize Icons
lucide.createIcons();

// Form Submit Handler
askForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = questionInput.value.trim();
  if (!text) return;

  const newQuestion = {
    id: Date.now(),
    author: {
      name: 'Awaiting Assignment',
      title: 'COMMUNITY MEMBER',
      avatarType: 'pending',
      initials: '?'
    },
    status: 'Pending',
    question: text,
    answer: null,
    date: 'Just now',
    createdAt: Date.now()
  };

  questions.unshift(newQuestion);
  questionInput.value = '';
  alert('Your question has been submitted to the scholars successfully!');
  renderQuestions();
});

// Dropdown Toggle
filterDropdownTrigger.addEventListener('click', (e) => {
  e.stopPropagation();
  const isHidden = filterDropdownMenu.style.display === 'none';
  filterDropdownMenu.style.display = isHidden ? 'flex' : 'none';
  if (isHidden) {
    dropdownArrowIcon.classList.add('open');
  } else {
    dropdownArrowIcon.classList.remove('open');
  }
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('#filterDropdownContainer')) {
    filterDropdownMenu.style.display = 'none';
    dropdownArrowIcon.classList.remove('open');
  }
});

// Tab Selection
filterDropdownItems.forEach(item => {
  item.addEventListener('click', (e) => {
    activeTab = e.target.getAttribute('data-tab');
    
    // Update active class
    filterDropdownItems.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');

    // Update label
    if (activeTab === 'All') activeTabLabel.textContent = 'All';
    if (activeTab === 'Answered') activeTabLabel.textContent = 'My Answered Questions';
    if (activeTab === 'Pending') activeTabLabel.textContent = 'My Pending Questions';

    filterDropdownMenu.style.display = 'none';
    dropdownArrowIcon.classList.remove('open');
    visibleCount = 2; // Reset visible count
    renderQuestions();
  });
});

// Sort Selection
sortSelect.addEventListener('change', (e) => {
  sortBy = e.target.value;
  visibleCount = 2; // Reset visible count
  renderQuestions();
});

// Load More
loadMoreBtn.addEventListener('click', () => {
  visibleCount += 2;
  renderQuestions();
});

// Event Delegation for Read More buttons
questionFeed.addEventListener('click', (e) => {
  if (e.target.classList.contains('read-more-btn')) {
    const id = parseInt(e.target.getAttribute('data-id'));
    expandedQuestions[id] = !expandedQuestions[id];
    renderQuestions();
  }
});

function getFilteredAndSortedQuestions() {
  let filtered = questions.filter(q => {
    if (activeTab === 'All') return true;
    return q.status === activeTab;
  });

  filtered.sort((a, b) => {
    if (sortBy === 'Newest') {
      return b.createdAt - a.createdAt;
    } else {
      return a.createdAt - b.createdAt;
    }
  });

  return filtered;
}

function renderQuestions() {
  const filtered = getFilteredAndSortedQuestions();
  const displayed = filtered.slice(0, visibleCount);
  
  questionFeed.innerHTML = '';

  if (displayed.length === 0) {
    questionFeed.innerHTML = `
      <div class="feed-card empty-state">
        <i data-lucide="help-circle" style="width: 32px; height: 32px; color: #8D9280; margin-bottom: 12px;"></i>
        <p>No questions found in this tab.</p>
      </div>
    `;
    loadMoreContainer.style.display = 'none';
    lucide.createIcons();
    return;
  }

  displayed.forEach(q => {
    const isPending = q.status === 'Pending';
    const isExpanded = expandedQuestions[q.id];
    
    // Avatar styles based on status
    const avatarBg = isPending ? '#513E2E' : '#E6E2D8';
    const avatarColor = isPending ? '#D6CFBE' : '#364D1B';
    const avatarBorder = isPending ? '1px solid #63503D' : 'none';
    
    const avatarContent = isPending 
      ? `<i data-lucide="user" style="width: 20px; height: 20px; color: #D6CFBE;"></i>`
      : q.author.initials;

    const badgeContent = isPending
      ? `<i data-lucide="clock" style="width: 14px; height: 14px;"></i> Pending`
      : `<i data-lucide="check-circle" style="width: 14px; height: 14px;"></i> Answered`;

    let answerHtml = '';
    if (!isPending) {
      if (q.answer && q.answer.length > 150) {
        const textToShow = isExpanded ? q.answer : `${q.answer.slice(0, 150)}...`;
        const btnText = isExpanded ? 'Read less' : 'Read more';
        answerHtml = `
          <div class="answer-box">
            ${textToShow}
            <button class="read-more-btn" data-id="${q.id}">${btnText}</button>
          </div>
        `;
      } else {
        answerHtml = `<div class="answer-box">${q.answer || ''}</div>`;
      }
    } else {
      answerHtml = `
        <div class="awaiting-response-box">
          <i data-lucide="alert-circle" style="width: 16px; height: 16px;"></i>
          Waiting for scholar response. Typically takes 2-3 business days.
        </div>
      `;
    }

    const cardHtml = `
      <div class="feed-card ${isPending ? 'pending' : ''}">
        <div class="feed-card-header">
          <div class="user-profile">
            <div class="user-avatar" style="background-color: ${avatarBg}; color: ${avatarColor}; border: ${avatarBorder}">
              ${avatarContent}
            </div>
            <div class="user-info">
              <span class="user-name">${q.author.name}</span>
              <span class="user-title">${q.author.title}</span>
            </div>
          </div>

          <div class="status-badge ${q.status.toLowerCase()}">
            ${badgeContent}
          </div>
        </div>

        <div class="question-text">"${q.question}"</div>
        
        ${answerHtml}

        <div class="feed-card-footer">
          <span>${q.date}</span>
          ${isPending ? '<span class="progress-text">Response in progress</span>' : ''}
        </div>
      </div>
    `;

    questionFeed.insertAdjacentHTML('beforeend', cardHtml);
  });

  if (visibleCount < filtered.length) {
    loadMoreContainer.style.display = 'flex';
  } else {
    loadMoreContainer.style.display = 'none';
  }

  lucide.createIcons();
}

// Initial render
renderQuestions();
// الانتظار حتى تحميل الصفحة بالكامل
document.addEventListener("DOMContentLoaded", function () {
    const publicToggle = document.getElementById("publicToggle");
    const toggleLabel = document.getElementById("toggleLabel");

    if (publicToggle && toggleLabel) {
        
        function updateToggleLabel() {
            if (publicToggle.checked) {
                toggleLabel.textContent = "Public";
            } else {
                toggleLabel.textContent = "Private";
            }
        }
        updateToggleLabel();
        publicToggle.addEventListener("change", updateToggleLabel);
    }
});
function toggleMenu() {
  navContainer.classList.toggle('active');
  if (navContainer.classList.contains('active')) {
    menuToggle.textContent = '✕';
  } else {
    menuToggle.textContent = '☰';
  }
}

if (menuToggle && navContainer) {
  menuToggle.addEventListener('click', toggleMenu);
}

document.addEventListener('click', (e) => {
  if (navContainer && navContainer.classList.contains('active')) {
    if (!navContainer.contains(e.target) && !menuToggle.contains(e.target)) {
      toggleMenu();
    }
  }
});