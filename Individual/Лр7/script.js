let container = document.createElement("div");
container.id = "container";
document.body.append(container);

let canvas = document.createElement("canvas");
canvas.id = "stars";
container.append(canvas);

let form = document.createElement("form");
form.id = "form";
container.append(form);

let label = document.createElement("label");
label.id = "label";
label.htmlFor = "input";
label.textContent = "Ваше питання:"; 
form.append(label);

let input = document.createElement("input");
input.id = "input";
form.append(input);

let button = document.createElement("button");
button.id = "button";
button.type = "button"; 
button.textContent = "Задати питання";
button.onclick = randomAnswer;
form.append(button);

let magicBall = document.createElement("div");
magicBall.id = "magic-ball";
container.append(magicBall);

let div2 = document.createElement("div");
div2.id = "div-answer";
magicBall.append(div2);

let textAnswer = document.createElement("p");
textAnswer.id = "answer";
div2.append(textAnswer);

let answers = [
  "Yes", 
  "No", 
  "Maybe", 
  "Definitely", 
  "Ask again later"
];

function randomAnswer() {
  let question = input.value.trim();

  if (!question.endsWith("?")) {
    textAnswer.textContent = "❗ Поставте запитання зі знаком питання!";
    textAnswer.style.color = "red";
    return;
  }

  let index = Math.floor(Math.random() * answers.length);
  let answerText = answers[index];
  textAnswer.textContent = answerText;
  textAnswer.style.color = "white"; 
}

const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
const numStars = 200;

for (let i = 0; i < numStars; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 2,
    alpha: Math.random(),
    speed: 0.005 + Math.random() * 0.02
  });
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  stars.forEach(star => {
    star.alpha += star.speed;
    if (star.alpha <= 0 || star.alpha >= 1) {
      star.speed = -star.speed; 
    }

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
    ctx.fill();
  });

  requestAnimationFrame(drawStars);
}

drawStars();

window.onresize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};
