const slides = document.getElementById('slides');
const totalSlides = slides.children.length;
let index = 0;

document.getElementById('next').addEventListener('click', () => {
  index = (index + 1) % totalSlides;
  slides.style.transform = `translateX(-${index * 100}%)`;
});

document.getElementById('prev').addEventListener('click', () => {
  index = (index - 1 + totalSlides) % totalSlides;
  slides.style.transform = `translateX(-${index * 100}%)`;
});

setInterval(() => {
  index = (index + 1) % totalSlides;
  slides.style.transform = `translateX(-${index * 100}%)`;
}, 4000);

const quizData = [
  { q: 'What does CSS stand for?', o: ['Cascading Style Sheets', 'Creative Style Syntax', 'Computer Style System'], a: 0 },
  { q: 'Which JavaScript method is used to fetch API data?', o: ['request()', 'fetch()', 'load()'], a: 1 },
  { q: 'Media queries are used for?', o: ['Security', 'Responsive Design', 'Databases'], a: 1 }
];

let qIndex = 0;
let score = 0;

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const scoreEl = document.getElementById('score');

function loadQuiz() {
  optionsEl.innerHTML = '';
  questionEl.textContent = quizData[qIndex].q;

  quizData[qIndex].o.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.addEventListener('click', () => checkAnswer(i, btn));
    optionsEl.appendChild(btn);
  });
}

function checkAnswer(selected, button) {
  const correct = quizData[qIndex].a;
  if (selected === correct) {
    score++;
    button.classList.add('correct');
  } else {
    button.classList.add('wrong');
  }

  setTimeout(() => {
    qIndex++;
    if (qIndex < quizData.length) {
      loadQuiz();
    } else {
      questionEl.textContent = 'Quiz Completed!';
      optionsEl.innerHTML = '';
      scoreEl.textContent = `Your Score: ${score} / ${quizData.length}`;
    }
  }, 700);
}

loadQuiz();
document.getElementById('jokeBtn').addEventListener('click', async () => {
  const jokeBox = document.getElementById('joke');
  jokeBox.textContent = 'Loading...';

  try {
    const res = await fetch('https://official-joke-api.appspot.com/random_joke');
    const data = await res.json();
    jokeBox.textContent = `${data.setup} — ${data.punchline}`;
  } catch {
    jokeBox.textContent = 'Failed to load joke.';
  }
});
