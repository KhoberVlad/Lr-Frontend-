let nameUser = document.getElementById("userName");
let victoryUser = document.getElementById("victoryUser");
let victoryComputer = document.getElementById("victoryComputer");
let userCard = document.querySelector(".card-user");
let computerCard = document.querySelector(".card-computer");
let drawDifference = document.getElementById("draw");
let countPos = document.querySelector(".count");
const cardComputer = document.querySelector(".cardRandomCom");
const cardUser = document.querySelector(".cardRandomUser");
const pointOutputUser = document.querySelector(".point-user");
const pointOutputComp = document.querySelector(".point-comp");
const winGif = document.getElementById("winGif");

const btnPlay = document.getElementById("btnPlay");
const btnTakeCard = document.getElementById("btnTakeCard");
const btnClear = document.querySelector(".clear-btn");
const btnFinish = document.querySelector(".finish-button");

const screenWidth = window.screen.width;

let count = 0;
let isRoundActive = false; 
 alert(`Правила гри "21":

  🎯 Мета гри:
  Набрати якомога ближче до 21 очка, але не перевищити це число.

  🃏 Як грати:
  1. Натисніть кнопку "Play", щоб розпочати раунд.
  2. Ви і комп’ютер отримуєте по 2 карти.
  3. Значення карт:
     - 2–10 — це їхня цифра.
     - Валет, дама, король — по 10 очок.
     - Туз — 11 очок.

  🧮 Підрахунок:
  - Якщо ви маєте 21 і комп’ютер менше — ви виграли.
  - Якщо комп’ютер має 21 і ви менше — виграв комп’ютер.
  - Якщо обидва мають 21 або обидва перебрали (більше 21) — нічия.
  - Якщо у когось більше 21 — він програє.

  🏆 Рахунок:
  - За кожну перемогу додається 1 бал.
  - Після 3 перемог одного з гравців гра закінчується.
  - Якщо обидва мають однакову кількість перемог — нічия.

  Натисніть "OK", щоб почати гру!`);

  let userName = prompt("Введіть ім'я:", "User");
  if (!userName || userName.trim() === "") userName = "User";
  nameUser.textContent = userName;
  const suits = ["spades", "clubs", "diamonds", "hearts"];
  const ranks = [
    { name: "2", value: 2 }, { name: "3", value: 3 }, { name: "4", value: 4 },
    { name: "5", value: 5 }, { name: "6", value: 6 }, { name: "7", value: 7 },
    { name: "8", value: 8 }, { name: "9", value: 9 }, { name: "10", value: 10 },
    { name: "jack", value: 10 }, { name: "queen", value: 10 },
    { name: "king", value: 10 }, { name: "ace", value: 11 }
  ];
  let deck = [];
  let score = { user: 0, computer: 0 };
  let victory = { userVic: 0, compVic: 0, draw: 0 };
  
  // --- створити колоду ---
  function createDeck() {
    deck = [];
    for (let suit of suits) {
      for (let rank of ranks) {
        deck.push({
          name: `${rank.name} ${suit}`,
          value: rank.value,
          images: `img/${rank.name}_${suit}.svg`
        });
      }
    }
  }
  createDeck();
  
  function drawCardFor(player) {
    let index = Math.floor(Math.random() * deck.length);
    const card = deck.splice(index, 1)[0];
  
    if (player === "user") {
      score.user += card.value;
      pointOutputUser.textContent = `Count: ${ score.user}`;
      cardUser.innerHTML += `<div class ="images-card"><img src="${card.images}" alt="User card"> </div>`;
    } else {
      score.computer += card.value;
      pointOutputComp.textContent = `Count: ${score.computer}`;
      cardComputer.innerHTML += `<div class ="images-card"> <img src="${card.images}" alt="Computer card"> </div>`;
    }
  }
  
  function resetRound() {
    setTimeout(() => {
      winGif.style.display = "none";
      userCard.style.backgroundColor = "";
      computerCard.style.backgroundColor = "";
      cardUser.innerHTML = "";
      cardComputer.innerHTML = "";
      score.user = 0;
      score.computer = 0;
      pointOutputUser.textContent = `Count: ${0}`;
      pointOutputComp.textContent = `Count: ${0}`;
      isRoundActive = false;
      btnPlay.disabled = false;
      createDeck();
      userCard.style.height = "";
      computerCard.style.height = "";
      userCard.style.width = "";
      computerCard.style.width = "";
    }, 1800);
  }
  
  function clearTable() {
    score = { user: 0, computer: 0 };
    victory = { userVic: 0, compVic: 0, draw: 0 };
    pointOutputUser.textContent = `Count: ${0}`;
    pointOutputComp.textContent = `Count: ${0}`;
    victoryComputer.textContent = 0;
    victoryUser.textContent = 0;
    drawDifference.textContent = `Draw: ${victory.draw}`;
    winGif.style.display = "none";
    count = 0;
    countPos.innerHTML = `Спроба ${count} із 5`;
    cardUser.innerHTML = "";
    cardComputer.innerHTML = "";
    isRoundActive = false;
    btnPlay.disabled = false;
    computerCard.style.backgroundColor = "";
    userCard.style.backgroundColor = "";
    userCard.style.height = "";
    computerCard.style.height = "";
    userCard.style.width = "";
    computerCard.style.width = "";
    createDeck();
  }
  function getRandomCardUser() {
    if (!isRoundActive) {
      alert("Спочатку натисніть Play!");
      return;
    }
  
    if (score.user >= 21) {
      alert("Ви вже маєте 21 або більше! Завершіть раунд кнопкою Finish.");
      return;
    }
  
    drawCardFor("user");
  
    if (score.user > 21) showResult("comp");
    else if (score.user === 21) checkForMoreThan21();
    else if (score.user < 21 && score.computer < 16) drawCardFor("computer");
  }
  
  function checkForMoreThan21() {
    setTimeout(() => {
      let result = "";
      if (score.user === 21 && score.computer === 21) result = "draw";
      else if (score.user === 21 && score.computer < 21) result = "user";
      else if (score.computer === 21 && score.user < 21) result = "comp";
      else if (score.user > 21 && score.computer <= 21) result = "comp";
      else if (score.computer > 21 && score.user <= 21) result = "user";
      else if (score.user > 21 && score.computer > 21) result = "draw";
  
      if (result) showResult(result);
    }, 1000);
  }
  
  function showResult(winner) {
    switch (winner) {
      case "user":
        victory.userVic++;
        victoryUser.textContent = victory.userVic;
        winGif.style.backgroundImage = "url('gif/HappySeason9GIFbyTheOffice.gif')";
        winGif.style.display = "block";
        userCard.style.backgroundColor = "green";
        computerCard.style.backgroundColor = "red";
        break;
      case "comp":
        victory.compVic++;
        victoryComputer.textContent = victory.compVic;
        winGif.style.backgroundImage = "url('gif/ProWrestlingWinGIFbyLooneyTunes.gif')";
        winGif.style.display = "block";
        computerCard.style.backgroundColor = "green";
        userCard.style.backgroundColor = "red";
        break;
      case "draw":
        victory.draw++;
        drawDifference.textContent = `Draw: ${victory.draw}`;
        winGif.style.backgroundImage = "url('gif/draw.gif')";
        winGif.style.display = "block";
        userCard.style.backgroundColor = "yellow";
        computerCard.style.backgroundColor = "yellow";
        break;
    }
  
    if (victory.userVic === 3) {
      alert(`Game over! Victory: ${userName}`);
      clearTable();
      return;
    } else if (victory.compVic === 3) {
      alert(`Game over! Victory: Computer`);
      clearTable();
      return;
    }
  
    resetRound();
  }
  function getRandomCard() {
    if (isRoundActive) return;
    isRoundActive = true;
    btnPlay.disabled = true;
    
    if(screenWidth > 1920){
      userCard.style.height = "30%";
      computerCard.style.height = "30%";
      userCard.style.width = "70%";
      computerCard.style.width = "70%";
    }else if(screenWidth >= 1920){
      userCard.style.height = "50%";
      computerCard.style.height = "50%";
      userCard.style.width = "90%";
      computerCard.style.width = "90%";
    }else if(screenWidth < 768){
      userCard.style.width = "70%";
      computerCard.style.width = "70%";
      if(screenWidth >= 410 && screenWidth < 768){
        userCard.style.height = "260px";
        computerCard.style.height = "260px";
      }else{

      }
    }else if(screenWidth >= 768){
      userCard.style.width = "70%";
      computerCard.style.width = "70%";
      userCard.style.height = "300px";
      computerCard.style.height = "300px";
    }
    count++;
    countPos.innerHTML = `Спроба ${count} із 5`;
  
    createDeck();
    drawCardFor("user");
    drawCardFor("computer");
    drawCardFor("user");
    drawCardFor("computer");
  
    if (score.computer <= 16) drawCardFor("computer");
  
    checkForMoreThan21();
  }
  
  function finishGame() {
    if (!isRoundActive) {
      alert("Спочатку натисніть Play!");
      return;
    }
  
    let winner = "";
    if (score.user > score.computer && score.user <= 21) winner = "user";
    else if (score.user < score.computer && score.computer <= 21) winner = "comp";
    else if (score.user > 21 && score.computer <= 21) winner = "comp";
    else if (score.computer > 21 && score.user <= 21) winner = "user";
    else winner = "draw";
  
    showResult(winner);
  }
  
  btnPlay.addEventListener("click", getRandomCard);
  btnTakeCard.addEventListener("click", getRandomCardUser);
  btnClear.addEventListener("click", clearTable);
  btnFinish.addEventListener("click", finishGame);