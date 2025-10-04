const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirm-password");
let output1 = document.querySelector("#output1");
let output2 = document.querySelector("#output2");
function checkPasswords() {
    if (confirmPassword.value === "") {
        output.innerHTML = "";
        return;
    }

    if (password.value === confirmPassword.value) {
        output1.innerHTML = "<p class='output-true'><img src='icons8-галочка.svg' alt=''><span>Confirm</span></p>";
        output2.innerHTML = "<p class='output-true'><img src='icons8-галочка.svg' alt=''><span>Confirm</span></p>";
    } else {
        output1.innerHTML = "<p class='output-false'><img src='crosslinear_106242.svg' alt=''><span>Passwords do not match</span></p>";
        output2.innerHTML = "<p class='output-false'><img src='crosslinear_106242.svg' alt=''><span>Passwords do not match</span></p>";
    }
}

password.addEventListener("input", checkPasswords);
confirmPassword.addEventListener("input", checkPasswords);