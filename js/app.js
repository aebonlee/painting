//var
const CANVAS_SIZE = 600;
const INITIAL_COLOR = '#2c2c2c';
const canvas = document.getElementById('jsCanvas');
      canvas.width = CANVAS_SIZE;
      canvas.height = CANVAS_SIZE;
const ctx = canvas.getContext('2d');
      ctx.fillStyle = 'white';
      ctx.fillRect(0,0, CANVAS_SIZE, CANVAS_SIZE);
      ctx.strokeStyle = INITIAL_COLOR;
      ctx.fillStyle = INITIAL_COLOR;
      ctx.lineWidth = 2.5;
const colors = document.getElementsByClassName('jsColors');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const saveBtn = document.getElementById('jsSave');

let painting = false;
let filling = false;

//function
function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        // console.log('creating path in', x, y);
        ctx.beginPath();
        ctx.moveTo(x, y);
    }else{
        // console.log('creating line in', x, y);
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick() {
    if(filling === true){
        filling = false;
        mode.innerText = 'Fill';
    }else{
        filling = true;
        mode.innerText = 'Paint';
    }
}

function handleCanvasClick() {
    if (filling){
        //canvas.width = canvas.height = CANVAS_SIZE = 700
        ctx.fillRect(0,0, canvas.width, canvas.height);
    }
}

function handleCM(event) {
    //우클릭 save as img 방지
    event.preventDefault();
}

function handleSaveClick() {
    //'image/jpeg' 이미지 깨짐, default = png
    const image = canvas.toDataURL();
    const link = document.createElement('a');

    link.href = image;
    link.download = 'PaintJs[🎨🖼]';
    link.click();
}

if (canvas){
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mousedown', startPainting);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mouseleave', stopPainting);
    canvas.addEventListener('click', handleCanvasClick);
    canvas.addEventListener('contextmenu', handleCM);
}

Array.from(colors).forEach(color => color.addEventListener('click', handleColorClick));

if (range){
    range.addEventListener('input', handleRangeChange);
}

if (mode){
    mode.addEventListener('click', handleModeClick);
}

if (saveBtn){
    saveBtn.addEventListener('click', handleSaveClick);
}