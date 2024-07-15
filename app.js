const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

const saveBtn = document.querySelector('#save-btn');
const textInput = document.getElementById('text');
const fileInput = document.getElementById('file');
const eraserBtn = document.getElementById('eraser-btn');
const destroyBtn = document.getElementById('destroy-btn');
const modeBtn = document.querySelector('#mode-btn');
const colorOptions = Array.from(document.querySelectorAll('.color-option'));
const color = document.querySelector("#color")
const lineWidth = document.querySelector("#line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
ctx.lineWidth = 5;
let isPainting = false;
let isFilling = false;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

function onMove(e) {
    if(isPainting) {
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        return;
    }
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
}

function onMouseDown() {
    isPainting = true;
}

function cancelPainting() {
    isPainting = false;
}

function onLineWidthChange(e) {
    ctx.lineWidth = e.target.value;
}

function onColorChange(e) {
    ctx.strokeStyle = e.target.value;
    ctx.fillStyle = e.target.value;
}

function onColorClick(e) {
    const colorValue = e.target.dataset.color;
    ctx.strokeStyle = colorValue;
    ctx.fillStyle = colorValue;
    color.value = colorValue;
}

function onModeClick() {
    if (isFilling) {
        isFilling = false;
        modeBtn.innerText = "Fill";
    } else {
        isFilling = true;
        modeBtn.innerText = "Draw";
    }
}

function onCanvasClick() {
    if (isFilling) {
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}

function onDestroyClick() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function onEraserClick() {
    ctx.strokeStyle = "white";
    isFilling = false;
    modeBtn.innerText = "Fill";

}

function onFileChange(e) {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.src = url;
    img.onload = function () {
        ctx.drawImage(img, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}

function onDoubleClick(e) {
    const text = textInput.value;
    if (text !== "") {
        ctx.save();
        ctx.lineWidth = 1;
        ctx.font = "48px serif";
        ctx.fillText(text, e.offsetX, e.offsetY);
        ctx.restore();
    }
}

function onSaveClick() {
    const url = canvas.toDataURL();
    const a = document.createElement("a");
    a.href = url;
    a.download = "myDrawung.png";
    a.click();
}

canvas.addEventListener("dblclick", onDoubleClick);
canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasClick)

lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange)

colorOptions.forEach(color => color.addEventListener("click", onColorClick))

modeBtn.addEventListener("click", onModeClick);

destroyBtn.addEventListener("click", onDestroyClick);
eraserBtn.addEventListener("click", onEraserClick);
fileInput.addEventListener("change", onFileChange);

saveBtn.addEventListener("click", onSaveClick);



//
// const colors = [
//     "#ff3838",
//     "#ffb8b8",
//     "#c56cf0",
//     "#ff9f1a",
//     "#fff200",
//     "#32ff7e",
//     "#7efff5",
// ]

// let x_coord = 0;
// let y_coord = 0;
//
// function onclick(event){
//     ctx.beginPath();
//     ctx.moveTo(x_coord,y_coord);
//     ctx.strokeStyle = colors[Math.floor(Math.random()*colors.length)];
//     ctx.lineTo(event.offsetX, event.offsetY);
//     ctx.stroke();
// }
//
// function cursor_move(event){
//     x_coord = event.offsetX;
//     y_coord = event.offsetY;
//     ctx.beginPath();
//     ctx.arc(x_coord, y_coord, 5, 0, 2*Math.PI);
//     ctx.fillStyle = colors[Math.floor(Math.random()*colors.length)];
//     ctx.fill();
// }
//
// canvas.addEventListener("mousemove", onclick);
// canvas.addEventListener("click", cursor_move);

