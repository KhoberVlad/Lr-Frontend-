function loopFor(x, endInterval, krock, output) {
    let result = [];
    for (; x <= endInterval; x += krock) {
        let func = (Math.sin(x) + x * x) / (x + 1);
        result.push({ x: x, y: func });
        let p = document.createElement("p");
        p.textContent = `X: ${x.toFixed(3)}, Y: ${func.toFixed(3)}`;
        output.appendChild(p);
    }
    return result;
}

function loopWhile(x, endInterval, krock, output) {
    let result = [];
    while (x <= endInterval) {
        let func = (Math.sin(x) + x * x) / (x + 1);
        result.push({ x: x, y: func });
        const p = document.createElement("p");
        p.textContent = `X: ${x.toFixed(3)}, Y: ${func.toFixed(3)}`;
        output.appendChild(p);
        x += krock;
    }
    return result;
}

function loopDoWhile(x, endInterval, krock, output) {
    let result = [];
    do {
        let func = (Math.sin(x) + x * x) / (x + 1);
        result.push({ x: x, y: func });
        const p = document.createElement("p");
        p.textContent = `X: ${x.toFixed(3)}, Y: ${func.toFixed(3)}`;
        output.appendChild(p);
        x += krock;
    } while (x <= endInterval);
    return result;
}

function tabulate() {
    const krock = Number(document.getElementById("krock").value);
    const startInterval = Number(document.getElementById("start-interval").value);
    const endInterval = Number(document.getElementById("end-interval").value);
    const output = document.getElementById("out");
    let x = startInterval;

    if (isNaN(krock) || krock === 0) {
        output.innerHTML = "<p>Помилка: Крок має бути дійсним числом і не дорівнювати нулю.</p>";
        return;
    }

    if ((startInterval > endInterval) && (krock > 0)) {
        output.innerHTML = "<p>Помилка: Інтервал задано некоректно (початок > кінець) для позитивного кроку.</p>";
        return;
    }
    
    if ((startInterval < endInterval) && (krock < 0)) {
         output.innerHTML = "<p>Помилка: Інтервал задано некоректно (початок < кінець) для від'ємного кроку.</p>";
        return;
    }
    
    output.innerHTML = "";

    const loopType = document.getElementById("loopSelect").value;
    
    if (loopType === "for") {
        loopFor(x, endInterval, krock, output);
    } else if (loopType === "while") {
        loopWhile(x, endInterval, krock, output);
    } else {
        loopDoWhile(x, endInterval, krock, output);
    }
}
function graphic(){
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const xStart = 3;
    const xEnd = 4;
    const step = 0.01;

    const padding = 50;
    const scaleX = (canvas.width - 2 * padding) / (xEnd - xStart);

    let values = [];
    for(let x = xStart; x <= xEnd; x += step){
        let y = Math.E ** (0.2 * (x ** 2));
        values.push({x, y});
    }

    let maxY = 0;
    for (let point of values) {
    if (point.y > maxY) {
        maxY = point.y;
        }
    }
    let minY = 0;

    maxY = maxY * 1.1;

    const scaleY = (canvas.height - 2 * padding) / (maxY - minY);

    function toCanvasX(x){ return padding + (x - xStart) * scaleX; }
    function toCanvasY(y){ return canvas.height - padding - (y - minY) * scaleY; }

    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1.5;

    ctx.moveTo(padding, toCanvasY(0));
    ctx.lineTo(canvas.width - padding, toCanvasY(0));
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.stroke();

    ctx.fillStyle = "black";
    ctx.font = "12px Arial";
    ctx.textAlign = "center";
    for (let x = xStart; x <= xEnd; x += 0.2) {
        let px = toCanvasX(x);
        ctx.beginPath();
        ctx.moveTo(px, toCanvasY(0) - 5);
        ctx.lineTo(px, toCanvasY(0) + 5);
        ctx.stroke();
        ctx.fillText(x.toFixed(1), px, toCanvasY(0) + 20);
    }

    let yTickCount = 5;
    let yStep = (maxY - minY) / yTickCount;

    ctx.textAlign = "right";
    for (let i = 0; i <= yTickCount; i++) {
        let y = minY + i * yStep;
        let py = toCanvasY(y);
        ctx.beginPath();
        ctx.moveTo(padding - 5, py);
        ctx.lineTo(padding + 5, py);
        ctx.stroke();
        ctx.fillText(y.toFixed(0), padding - 10, py + 5);
    }

    ctx.beginPath();
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2;
    let firstPoint = true;
    for (let p of values){
        let px = toCanvasX(p.x);
        let py = toCanvasY(p.y);
        if (firstPoint) {
            ctx.moveTo(px, py);
            firstPoint = false;
        } else {
            ctx.lineTo(px, py);
        }
    }
    ctx.stroke();
}