let s1 = "ПривітСвітПривіт";
// let s2 = "Hello";
let s2 = "Світ";

function substring(s1, s2) {
    if (s1.includes(s2)) {
        return s1.replace(s2, "");
    } else {
        return s1;
    }
}
let result = substring(s1, s2);
console.log(result); 