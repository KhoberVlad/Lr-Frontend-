let words = [
  {en: "apple", ua: "яблуко"},
  {en: "house", ua: "дім"},
  {en: "car", ua: "автомобіль"},
  {en: "book", ua: "книга"},
  {en: "sun", ua: "сонце"},
  {en: "moon", ua: "місяць"},
  {en: "water", ua: "вода"},
  {en: "tree", ua: "дерево"},
  {en: "flower", ua: "квітка"},
  {en: "dog", ua: "собака"},
  {en: "cat", ua: "кіт"},
  {en: "school", ua: "школа"},
  {en: "table", ua: "стіл"},
  {en: "chair", ua: "стілець"},
  {en: "window", ua: "вікно"},
  {en: "door", ua: "двері"},
  {en: "city", ua: "місто"},
  {en: "river", ua: "річка"},
  {en: "mountain", ua: "гора"},
  {en: "friend", ua: "друг"}
];

let score = {
  correct: 0,
  incorrect: 0,
  attempt: 0
};

let currentWord = null;

// --- Функція вибору випадкового слова ---
function getRandomWord() {
  currentWord = words[Math.floor(Math.random() * words.length)];
  $("#word").text(currentWord.en);
  $("#answerInput").val("");
  $("#progress-attemp").text(`${score.attempt}/20`);
}

// --- Функція показу гіфки з результатом ---
function showResultGif() {
  const $overlay = $('#resultGif');
  const $img = $overlay.find('img');
  let gifUrl = '';

  if (score.correct === 20) {
    gifUrl = 'https://media.giphy.com/media/111ebonMs90YLu/giphy.gif'; 
  } else if (score.correct >= 10) {
    gifUrl = 'https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif';
  } else {
    gifUrl = 'https://media.giphy.com/media/3o6ZtaO9BZHcOjmErm/giphy.gif'; 
  }

  $img.attr('src', gifUrl);
  $overlay.fadeIn(500);

  // При кліку — сховати гіфку
  $overlay.one('click', function () {
    $(this).fadeOut(400);
  });
}

// --- Функція скидання гри ---
function resetGame() {
  score.correct = 0;
  score.incorrect = 0;
  score.attempt = 0;
  $(".good").text(`Correct: 0`);
  $(".bad").text(`Incorrect: 0`);
  $("#progress-attemp").text(`0/20`);
  $("#answerResult").text(``);
  getRandomWord();
}

$(document).ready(function () {

  getRandomWord();

  // --- Перевірка відповіді ---
  $("#translateBtn").click(function () {
    if (score.attempt >= 20) return; // зупиняємо після 20 питань

    let userAnswer = $("#answerInput").val().trim().toLowerCase();
    let correctAnswer = currentWord.ua.toLowerCase();

    if (userAnswer === correctAnswer) {
      score.correct++;
      $(".good").text(`Correct: ${score.correct}`);
      $("#answerResult").text(`✅ Вірно`);
    } else {
      score.incorrect++;
      $(".bad").text(`Incorrect: ${score.incorrect}`);
      $("#answerResult").text(`❌ Не вірно, відповідь: ${correctAnswer}`);
    }

    score.attempt++;
    $("#progress-attemp").text(`${score.attempt}/20`);

    // якщо ще не кінець — нове слово
    if (score.attempt < 20) {
      setTimeout(() => {
        $("#answerResult").text(``);
        getRandomWord();
      }, 1200);
    } else {
      // якщо 20 — показуємо результат
      setTimeout(() => {
        $("#answerResult").text(`Тест завершено!`);
        showResultGif();
      }, 1000);
    }
  });

  // --- Кнопка словника ---
  $("#dictionaryPages").on("click", function () {
    $(".pages-translate").removeClass("active");
    $(".pages-dictionary").addClass("active");

    $("#wordList").empty(); // щоб не дублювало слова
    words.forEach(function(word) {
      $("#wordList").append(
        `<li class="list">${word.en} — ${word.ua}</li>`
      );
    });
  });

  // --- Кнопка перекладу ---
  $("#translatePages").on("click", function () {
    $(".pages-translate").addClass("active");
    $(".pages-dictionary").removeClass("active");
  });
  $("#restartBtn").on("click", function () {
    resetGame();
  });
});
