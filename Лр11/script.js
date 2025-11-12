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

let score = { correct: 0, incorrect: 0, attempt: 19 };
let currentWord = null;

function getRandomWord() {
  currentWord = words[Math.floor(Math.random() * words.length)];
  $("#word").text(currentWord.en);
  $("#answerInput").val("");
  $("#progress-attemp").text(`${score.attempt}/20`);
}

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

function showResultModal() {
  let percent = Math.round((score.correct / 20) * 100);
  let level = "";

  if (score.correct >= 16) level = "Високий рівень";
  else if (score.correct >= 10) level = "Середній рівень";
  else level = "Низький рівень";

  $("#dialog").html(
    `<b>Ваш результат:</b> ${score.correct}/20 правильних<br>
     <b>Процент:</b> ${percent}%<br>
     <b>Рівень:</b> ${level}`
  );

  $("#dialog").dialog({
    modal: true,
    title: "Результат тесту",
    width: 350,
    resizable: false,
    buttons: {
      "🔁 Повторити тест": function() {
        $(this).dialog("close");
        resetGame();
      },
      "📖 Переглянути словник": function() {
        $(this).dialog("close");
        $(".pages-translate").removeClass("active");
        $(".pages-dictionary").addClass("active");
        $("#wordList").empty();
        words.forEach(w => $("#wordList").append(`<li>${w.en} — ${w.ua}</li>`));
      }
    }
  });
}


$(document).ready(function () {
  getRandomWord();

  $("#translateBtn").click(function () {
    if (score.attempt >= 20) return;

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

    if (score.attempt < 20) {
      setTimeout(() => {
        $("#answerResult").text(``);
        getRandomWord();
      }, 1000);
    } else {
      setTimeout(() => {
        $("#answerResult").text(`Тест завершено!`);
        showResultModal();
      }, 800);
    }
  });

  $("#dictionaryPages").on("click", function () {
    $(".pages-translate").removeClass("active");
    $(".pages-dictionary").addClass("active");
    $("#wordList").empty();
    words.forEach(w => $("#wordList").append(`<li>${w.en} — ${w.ua}</li>`));
  });

  $("#translatePages").on("click", function () {
    $(".pages-translate").addClass("active");
    $(".pages-dictionary").removeClass("active");
  });

  $("#restartBtn").on("click", function () {
    resetGame();
  });
});