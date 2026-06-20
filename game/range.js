const correctOrder = [
  "Takbir (Allahu Akbar)",
  "Recite Al-Fatiha",
  "Ruku (Bowing)",
  "Stand after Ruku",
  "Sujood (Prostration)",
  "Sit between Sujood",
  "Final Tashahhud",
  "Salam (End Prayer)"
];

let steps = [];
const container = document.getElementById("stepsContainer");
const resultDiv = document.getElementById("result");

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function renderSteps() {
  container.innerHTML = "";
  steps.forEach((step, index) => {
    const div = document.createElement("div");
    div.className = "step";
    div.draggable = true;
    div.innerText = step;

    div.addEventListener("dragstart", () => {
      div.classList.add("dragging");
      div.dataset.index = index;
    });

    div.addEventListener("dragend", () => {
      div.classList.remove("dragging");
    });

    container.appendChild(div);
  });
}

container.addEventListener("dragover", (e) => {
  e.preventDefault();
  const dragging = document.querySelector(".dragging");
  const afterElement = getDragAfterElement(container, e.clientY);

  if (afterElement == null) {
    container.appendChild(dragging);
  } else {
    container.insertBefore(dragging, afterElement);
  }
});

function getDragAfterElement(container, y) {
  const elements = [...container.querySelectorAll(".step:not(.dragging)")];

  return elements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

document.getElementById("checkBtn").addEventListener("click", () => {
  const currentSteps = [...container.children].map(el => el.innerText);
  let score = 0;

  [...container.children].forEach((el, index) => {
    if (el.innerText === correctOrder[index]) {
      el.classList.add("correct");
      el.classList.remove("wrong");
      score++;
    } else {
      el.classList.add("wrong");
      el.classList.remove("correct");
    }
  });

  const percentage = Math.round((score / correctOrder.length) * 100);

  if (percentage === 100) {
    resultDiv.innerText = "Excellent! Correct order 🌿";
  } else {
    resultDiv.innerText = "You scored " + percentage + "% — Try again 🤍";
  }
});

document.getElementById("resetBtn").addEventListener("click", () => {
  steps = shuffle([...correctOrder]);
  resultDiv.innerText = "";
  renderSteps();
});

steps = shuffle([...correctOrder]);
renderSteps();