alert("Варіант: 28\nПІБ: Хобер Владислав Сергійович");                                                   
function calculate() {
    let N = parseInt(document.getElementById("inputN").value);

    let x = N;
    let y = 2 * N + 1;
    let z = N + 2;

    let result = `Початкові значення: x=${x}, y=${y}, z=${z}<br>`;

    x += y - x++ * z;
    result += `Після x += y - x++ * z: x=${x}, y=${y}, z=${z}<br>`;

    z = x++ + y * 5;
    result += `Після z = x++ + y * 5: x=${x}, y=${y}, z=${z}<br>`;

    x = y - x++ * z;
    result += `Після x = y - x++ * z: x=${x}, y=${y}, z=${z}<br>`;

    document.getElementById("output").innerHTML = result;
  }
  document.getElementById("calcBtn").onmouseout = calculate;