let input = document.querySelector("#input");
let arr = [12, -5, 33, 0, -20, 45, 7, -8, 19, 2, -1, 30, -12, 8, 17, -25, 40, 6, -7, 10];
function searchNumber() {
    const value = Number(input.value);
    let flag = true;
    while(flag){
        if (isNaN(value)) {
            alert("Введено невірне значення!");
            return; 
        }
    
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === value) {
                alert("Елемент знайдено!");
                return; 
            }
        }
    
        alert("Елемент не знайдено!");
        flag = false;
    }
}
