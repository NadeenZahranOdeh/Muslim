// ========== STEP DATA ==========
const steps = [
  {
    index: 0,
    arabicTitle: "التحضير",
    enTitle: "Preparation",
    desc: "Purification: Purify yourself by performing wudu before prayer, then stand on the prayer mat.",
    speech: "Watch carefully to understand\nThis video covers the Preparation step in detail – including Wudu, intention, and facing the Qiblah correctly",
    videoId: "video/step1.mp4" 
  },
 {
    index: 1,
    arabicTitle: "تكبيرة الإحرام",
    enTitle: "Opening Takbir",
    desc: "Raise both hands to your earlobes and say 'Allahu Akbar' — this is the Opening Takbir that begins the prayer.",
    speech: "Pay attention to this step\nThe Opening Takbir is the gate of prayer — say 'Allahu Akbar' clearly and with full presence of heart",
    videoId: "video/step2.mp4" 
  },
 {
    index: 2,
    arabicTitle: "قراءة الفاتحة",
    enTitle: "Recitation of Al-Fatiha",
    desc: "Recite Surah Al-Fatiha with proper Tajweed. It is obligatory in every rakat of prayer.",
    speech: "Listen and follow along\nAl-Fatiha is recited in every unit of prayer — learn its meaning to deepen your connection with Allah",
    videoId: "video/step3.mp4"
  },
 {
    index: 3,
    arabicTitle: "الركوع",
    enTitle: "Ruku (Bowing)",
    desc: "Bow down with your back straight and parallel to the ground. Say 'Subhana Rabbiyal Adheem' three times.",
    speech: "Focus on the posture here\nIn Ruku, your back must be straight and parallel to the floor — humility through the body",
    videoId: "video/step4.mp4"
  },
 {
    index: 4,
    arabicTitle: "الاعتدال",
    enTitle: "Rising from Ruku",
    desc: "Rise from bowing and stand fully upright. Say 'Sami Allahu liman hamidah' then 'Rabbana lakal hamd'.",
    speech: "Notice the transition carefully\nEvery movement in prayer has its own remembrance — rise slowly and with full tranquility",
    videoId: "video/step5.mp4"
  },
 {
    index: 5,
    arabicTitle: "السجود",
    enTitle: "Sujood",
    desc: "Prostration: Place your forehead on the ground. Seven body parts must touch the floor. Say 'Subhana Rabbiyal A'la'.",
    speech: "This is the closest position to Allah\nIn Sujood, you are at your highest — seven points connect you to the earth and the divine",
    videoId: "video/step6.mp4" 
  },
 {
    index: 6,
    arabicTitle: "الجلوس",
    enTitle: "Sitting Between Prostrations",
    desc: "Sit briefly between the two sujood. Say 'Rabbighfirli' — ask Allah for forgiveness before the second prostration.",
    speech: "A moment of supplication\nThis brief sit is a chance to ask Allah's forgiveness before returning to Sujood",
    videoId: "video/step7.mp4"
  },
 {
    index: 7,
    arabicTitle: "التشهد",
    enTitle: "Tashahhud",
    desc: "Sit after the second rakat and recite the Tashahhud. Raise your index finger and send blessings upon the Prophet ﷺ.",
    speech: "The testimony of faith\nIn Tashahhud, you bear witness that only Allah is God and Muhammad is His messenger",
    videoId: "video/step8.mp4"
  },
{
    index: 8,
    arabicTitle:"التسليم",
    enTitle: "Taslim",
    desc: "Turn your head to the right and then to the left, saying 'Assalamu Alaikum wa Rahmatullah'.",
    speech: "The final peace\nConcluding your prayer by spreading peace to the right and to the left",
    videoId: "video/step8.mp4"
  }
];

// ========== STATE ==========
let currentStep = 1; // 0-indexed, start on step 2 (active)
const totalSteps = steps.length;
const VISIBLE_COUNT = 3;

// ========== ELEMENTS ==========
const cardsTrack = document.getElementById('cardsTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const speechBubble = document.getElementById('speechBubble');
const bubbleText = document.getElementById('bubbleText');
const videoArabicTitle = document.getElementById('videoArabicTitle');
const videoEnTitle = document.getElementById('videoEnTitle');
const videoDesc = document.getElementById('videoDesc');
const videoSection = document.getElementById('videoSection');

// ========== CAROUSEL LOGIC ==========
function getCardWidth() {
  const card = cardsTrack.querySelector('.step-card');
  if (!card) return 0;
  const gap = 20;
  return card.offsetWidth + gap;
}

function updateCarousel() {
  // Update active card
  const cards = cardsTrack.querySelectorAll('.step-card');
  cards.forEach((card, i) => {
    card.classList.toggle('active', i === currentStep);
  });

  // Shift track so active card is in center (index 1 of 3 visible)
  const cardW = getCardWidth();
  const offset = (currentStep - 1) * cardW;
  const clampedOffset = Math.max(0, Math.min(offset, (totalSteps - VISIBLE_COUNT) * cardW));
  cardsTrack.style.transform = `translateX(-${clampedOffset}px)`;

  // Update arrows
  prevBtn.style.opacity = currentStep === 0 ? '0.4' : '1';
  nextBtn.style.opacity = currentStep === totalSteps - 1 ? '0.4' : '1';

  // Update speech bubble
  updateSpeechBubble(currentStep);
}

function updateSpeechBubble(stepIndex) {
  const step = steps[stepIndex];
  bubbleText.innerHTML = step.speech.replace('\n', '<br/>');
  speechBubble.style.animation = 'none';
  void speechBubble.offsetWidth;
  speechBubble.style.animation = 'bubblePop 0.3s ease';
}

function goToStep(index) {
  if (index < 0 || index >= totalSteps) return;
  currentStep = index;
  updateCarousel();
}

prevBtn.addEventListener('click', () => {
  if (currentStep > 0) goToStep(currentStep - 1);
});

nextBtn.addEventListener('click', () => {
  if (currentStep < totalSteps - 1) goToStep(currentStep + 1);
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') goToStep(currentStep - 1);
  if (e.key === 'ArrowRight') goToStep(currentStep + 1);
});

// ========== VIDEO SCROLL & UPDATE ==========
function scrollToVideo(stepIndex) {
  const step = steps[stepIndex];
  videoArabicTitle.textContent = step.arabicTitle;
  videoEnTitle.textContent = step.enTitle;
  videoDesc.textContent = step.desc;
  const mainVideoPlayer = document.getElementById('mainVideoPlayer');
  if (mainVideoPlayer && step.videoId) {
    mainVideoPlayer.src = step.videoId; 
    mainVideoPlayer.load();           
    mainVideoPlayer.play().catch(e => {
      console.log("التشغيل التلقائي بحاجة إلى تفاعل أولاً من المستخدم:", e);
    });
  }
  const overlay = document.querySelector('.video-overlay');
  if (overlay) {
    overlay.style.opacity = '0';
    overlay.style.transform = 'translateY(10px)';
    setTimeout(() => {
      overlay.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      overlay.style.opacity = '1';
      overlay.style.transform = 'translateY(0)';
    }, 50);
  }
  videoSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// ========== INJECT KEYFRAMES ==========
const style = document.createElement('style');
style.textContent = `
  @keyframes bubblePop {
    0%   { transform: scale(0.95); opacity: 0.7; }
    60%  { transform: scale(1.03); opacity: 1; }
    100% { transform: scale(1); opacity: 1; }
  }
`;
document.head.appendChild(style);

// ========== INIT ==========
window.addEventListener('load', () => {
  updateCarousel();
});

window.addEventListener('resize', () => {
  updateCarousel();
});