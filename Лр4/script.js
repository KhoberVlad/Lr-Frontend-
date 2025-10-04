function calculateDifferences() {
    let semesterStartInput = document.getElementById("semesterStart").value;
    let myBirthdayInput = document.getElementById("myBirthday").value;

    if (!semesterStartInput || !myBirthdayInput) {
        alert("Будь ласка, введіть обидві дати!");
        return;
    }

    let semesterStart = new Date(semesterStartInput);
    let myBirthday = new Date(myBirthdayInput);

    let earlierDate = myBirthday < semesterStart ? myBirthday : semesterStart;
    let laterDate = myBirthday > semesterStart ? myBirthday : semesterStart;

    let difference = laterDate - earlierDate;

    let days = Math.floor(difference / (1000 * 60 * 60 * 24));
    let hours = Math.floor(difference / (1000 * 60 * 60)) % 24;
    let minutes = Math.floor(difference / (1000 * 60)) % 60;

    document.getElementById("result").innerText = 
        `Між введеними датами пройшло: ${days} днів, ${hours} год, ${minutes} хв`;
}