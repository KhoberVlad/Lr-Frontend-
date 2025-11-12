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

let wordsMedium = [
  {en: "garden", ua: "сад"},
  {en: "teacher", ua: "вчитель"},
  {en: "family", ua: "сім'я"},
  {en: "computer", ua: "комп’ютер"},
  {en: "weather", ua: "погода"},
  {en: "holiday", ua: "свято"},
  {en: "library", ua: "бібліотека"},
  {en: "beautiful", ua: "гарний"},
  {en: "morning", ua: "ранок"},
  {en: "evening", ua: "вечір"},
  {en: "country", ua: "країна"},
  {en: "travel", ua: "подорож"},
  {en: "hospital", ua: "лікарня"},
  {en: "kitchen", ua: "кухня"},
  {en: "music", ua: "музика"},
  {en: "language", ua: "мова"},
  {en: "street", ua: "вулиця"},
  {en: "rain", ua: "дощ"},
  {en: "market", ua: "ринок"},
  {en: "breakfast", ua: "сніданок"}
];

let wordsHard = [
  {en: "achievement", ua: "досягнення"},
  {en: "environment", ua: "довкілля"},
  {en: "knowledge", ua: "знання"},
  {en: "responsibility", ua: "відповідальність"},
  {en: "development", ua: "розвиток"},
  {en: "government", ua: "уряд"},
  {en: "communication", ua: "спілкування"},
  {en: "experience", ua: "досвід"},
  {en: "opportunity", ua: "можливість"},
  {en: "relationship", ua: "стосунки"},
  {en: "decision", ua: "рішення"},
  {en: "education", ua: "освіта"},
  {en: "technology", ua: "технологія"},
  {en: "improvement", ua: "покращення"},
  {en: "employment", ua: "зайнятість"},
  {en: "independence", ua: "незалежність"},
  {en: "imagination", ua: "уява"},
  {en: "investment", ua: "інвестиція"},
  {en: "requirement", ua: "вимога"},
  {en: "success", ua: "успіх"}
];
const allWords = [...words, ...wordsMedium, ...wordsHard];
let score = {
  correct: 0,
  incorrect: 0,
  attempt: 19
};
let radio ={
  begin: 0,
  medium: 0,
  hard: 0
}
let currentWord = null;
function getRandomWord() {
  const level = $("input[name='level']:checked").attr("id");

  if (level === "Beginner") {
    currentWord = words[Math.floor(Math.random() * words.length)];
  } else if (level === "Medium") {
    currentWord = wordsMedium[Math.floor(Math.random() * wordsMedium.length)];
  } else if (level === "Hard") {
    currentWord = wordsHard[Math.floor(Math.random() * wordsHard.length)];
  }else if (level === "All") {
    currentWord = allWords[Math.floor(Math.random() * allWords.length)];
  }

  $("#word").text(currentWord.en);
  $("#answerInput").val("");
  $("#progress-attemp").text(`${score.attempt}/20`);
}
$("#choose").click(function() {
  $(".wrapper").show();
  $(".level").hide();
  getRandomWord(); 
});
$("#translateBtn").click(function() {
  if (score.attempt < 20) {
    setTimeout(() => {
      getRandomWord();
    }, 1200);
  }
});
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
function showResultGif() {
  $('.gif-overlay').addClass('active');
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
  $overlay.one('click', function () {
    $(this).fadeOut(400);
  });
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

$(document).ready(function () {
  $(".level").addClass("active");
  $("#choose").click(function() {
    $(".wrapper").show();
    $(".level").hide();
    getRandomWord();
  });
  $("#changeDiffBtn").on("click", function () {
    $(".level").show().addClass("active");
    $("#word").text("");
    $("#answerInput").val("");
    $("#answerResult").text("");
    $("#progress-attemp").text(`0/20`);
    score = { correct: 0, incorrect: 0, attempt: 0 };
    $(".good").text("Correct: 0");
    $(".bad").text("Incorrect: 0");
  });
  $("#translateBtn").click(function () {
    if (score.attempt >= 20) return;
  
    if (!currentWord || !currentWord.ua) {
      $("#answerResult").text("Спочатку вибери слово!");
      return;
    }
  
    let userAnswer = $("#answerInput").val().trim().toLowerCase();
    let correctAnswer = currentWord.ua.toLowerCase();
  
    if (userAnswer === correctAnswer) {
      score.correct++;
      $(".good").text(`Correct: ${score.correct}`);
      $("#answerResult").text(`Вірно`);
    } else {
      score.incorrect++;
      $(".bad").text(`Incorrect: ${score.incorrect}`);
      $("#answerResult").text(` Не вірно, відповідь: ${correctAnswer}`);
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
  let dictionaryGenerated = false;
  $("#dictionaryPages").on("click", function () {
    if (dictionaryGenerated) return; 
    $(".pages-translate").removeClass("active");
    $(".pages-dictionary").addClass("active");
    const level = $("input[name='level']:checked").attr("id");

    if (level === "Beginner") {
      $("#wordList").empty();
      words.forEach(function(word) {
        $("#wordList").append(
          `<li class="list">${word.en} — ${word.ua}</li>`
        );
      });
    } else if (level === "Medium") {
      wordsMedium.forEach(function(word) {
        $("#wordList").append(
          `<li class="list">${word.en} — ${word.ua}</li>`
        );
      });
    } else if (level === "Hard") {
      wordsHard.forEach(function(word) {
        $("#wordList").append(
          `<li class="list">${word.en} — ${word.ua}</li>`
        );
      });
    }else if(level === "All"){
      allWords.forEach(function(word) {
        $("#wordList").append(
          `<li class="list">${word.en} — ${word.ua}</li>`
        );
      });
    }
    
  dictionaryGenerated = true;
  });

  $("#translatePages").on("click", function () {
    $(".pages-translate").addClass("active");
    $(".pages-dictionary").removeClass("active");
  });
  $("#restartBtn").on("click", function () {
    resetGame();
  });
});
