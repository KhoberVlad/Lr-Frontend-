let nameUser = document.getElementById("userName");
let victoryUser = document.getElementById("victoryUser");
let numberUser = document.getElementById("numberUser");
let computerNumber = document.getElementById("numberComputer");
let victoryComputer = document.getElementById("victoryComputer");
let userCard = document.querySelector(".card-user");
let computerCard = document.querySelector(".card-computer");
let drawDifference = document.getElementById("draw");
alert(`Правила гри:
     Натисніть кнопку Generate, щоб розпочати раунд.
     Користувач і комп’ютер отримують випадкове число від 1 до 10.
    
     Переможець раунду визначається за більшим числом:
    - Якщо число користувача більше – він виграв раунд.
    - Якщо число комп’ютера більше – він виграв раунд.
    - Якщо числа рівні – нічия.
    
     Рахунок ведеться автоматично:
     - Кожна перемога користувача додає 1 до його рахунку.
     - Кожна перемога комп’ютера додає 1 до його рахунку.
    
     Після 10 раундів підводяться підсумки:
     - Хто набрав більше очок – оголошується переможцем гри.
     - Якщо рахунок рівний – оголошується нічия.`);
   
     let userName = prompt("Введіть ім'я:", "User");
     if (userName === null || userName.trim() === "") {
         userName = "User";
     }
    nameUser.textContent = userName;
    
    let score = {
        user: 0,
        computer: 0,
        draw: 0
    };
    function clearScore() {
        score.user = 0;
        score.computer = 0;
        score.draw = 0; 
        victoryUser.textContent = score.user;
        victoryComputer.textContent = score.computer;
        drawDifference.textContent = score.draw;
        numberUser.textContent = 0;
        computerNumber.textContent = 0;
        document.getElementById("winGif").style.display = "none";
    }
    function userWins() {
        score.user++;
        victoryUser.textContent = score.user;
    }
    
    function computerWins() {
        score.computer++;
        victoryComputer.textContent = score.computer;
    }
    
    function drawRound() {
        score.draw++;
        drawDifference.textContent = score.draw;
    }
    function showWinGif(type) {
        const winGif = document.getElementById("winGif");
        if (type === "user") {
          winGif.style.backgroundImage = "url('img/lit-baby.gif')";
        } else if (type === "computer") {
          winGif.style.backgroundImage = "url('img/yeah-i-won-vince-mc-mahon.gif')";
        }else if(type === "draw"){
            winGif.style.backgroundImage = "url('img/draw.gif')";
        }
        winGif.style.display = "block";
        setTimeout(() => {
          winGif.style.display = "none";
        }, 2500);
      }
      function generate() {
        let user = Math.floor(Math.random() * 10) + 1;
        let computer = Math.floor(Math.random() * 10) + 1;
    
        numberUser.textContent = user;
        computerNumber.textContent = computer;
    
        userCard.style.backgroundColor = "";
        computerCard.style.backgroundColor = "";
    
        if (user > computer) {
            userCard.style.backgroundColor = "green";
            computerCard.style.backgroundColor = "red";
            userWins();
            showWinGif("user"); 
        } else if (user < computer) {
            computerCard.style.backgroundColor = "green";
            userCard.style.backgroundColor = "red";
            computerWins();
            showWinGif("computer");
        } else {
            userCard.style.backgroundColor = "yellow";
            computerCard.style.backgroundColor = "yellow";
            drawRound();
            showWinGif("draw");
        }
    
        setTimeout(() => {
            userCard.style.backgroundColor = "";
            computerCard.style.backgroundColor = "";
        }, 1000);
        if(score.user == 3){
            alert(`Game over! Victory: ${userName}`);
            return; 
        }else if(score.computer == 3){
            alert(`Game over! Victory: Computer`);
            return; 
        }
    }