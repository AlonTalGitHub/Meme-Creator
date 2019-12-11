let gCanvas
let gCtx, gImg
let gIsDragActive = false;

let gCurrShape = 'triangle'


function openEditor(elImg) { 
    gImg = elImg;   
    elmainImgs = document.querySelector('.main-images-container'); 
    elmainImgs.hidden = true;

    elImgEditor = document.querySelector('.image-editor');
    elImgEditor.hidden = false; 
    initEditor();
}

function closeEditor() {
    elImgEditor = document.querySelector('.image-editor');
    elImgEditor.hidden = true;
    elmainImgs = document.querySelector('.main-images-container');
    elmainImgs.hidden = false; 
}


// ############ canvas operations ############

function initEditor() {
    gCanvas = document.querySelector('#my-canvas');
    gCtx = gCanvas.getContext('2d');
    drawImg();
    addEventListeners();
    window.addEventListener('resize',
        function () {
            gCanvas.width = window.innerWidth - 50
            gCanvas.height = window.innerHeight - 100;
        })
}


function addEventListeners() {
    window.addEventListener('resize',
        function () {
            gCanvas.width = window.innerWidth - 50
            gCanvas.height = window.innerHeight - 100;
        });

    // gCanvas.addEventListener('mousedown', function () {console.log('mousedown')});
    // gCanvas.addEventListener('mouseup', function () {console.log('mouseup')});
}

function drawLine(x, y) {
    gCtx.lineTo(x, y);
    // gCtx.closePath()
    gCtx.stroke();
}

function drawRect(x, y) {
    gCtx.save()
    gCtx.beginPath();
    gCtx.rect(x, y, 150, 150)
    gCtx.fillStyle = 'orange'
    gCtx.fillRect(x, y, 150, 150)
    // gCtx.strokeStyle = 'red'
    gCtx.stroke()
    gCtx.closePath()
    gCtx.restore()
}

function drawArc(x, y) {
    gCtx.beginPath();
    gCtx.strokeStyle = 'red'
    gCtx.arc(x, y, 50, 0, Math.PI * 2)
    gCtx.stroke();
}

function onDrawText(x=10, y=70) {
    var header = document.querySelector('.add-header').value;
    gCtx.font = 'bolder 50px Impact';
    console.log(gCtx);
    gCtx.fillStyle = "white";
    gCtx.save()
    gCtx.fillText(header, x, y);
    gCtx.strokeText(header, x, y);
    console.log(gCtx);
}

function drawTriangle(x, y) {
    gCtx.save()
    gCtx.beginPath();
    gCtx.moveTo(x, y);
    gCtx.lineTo(x - 50, y - 50);
    gCtx.lineTo(x + 50, y - 50);
    gCtx.closePath()
    gCtx.strokeStyle = 'blue'
    gCtx.fillStyle = '#ff0000'

    gCtx.stroke();
    gCtx.fill()
    gCtx.restore()

}

function saveAndRestoreExample() {
    gCtx.save()
    drawText('yovel1', 20, 60)
    gCtx.fillStyle = 'red'
    gCtx.font = '50px Impact white'
    gCtx.strokeStyle = 'red'
    gCtx.lineWidth = 3
    drawText('yovel2', 20, 160)
    gCtx.restore()
    drawText('yovel3', 20, 260)
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
    // You may clear part of the canvas
    // gCtx.clearRect(50, 50, 100, 100)
}

function drawImg() {
    // const img = document.querySelector('img');
    // gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    if (gImg)
        gCtx.drawImage(gImg, 0, 0, gCanvas.width, gCanvas.height)
    else {
        gImg = new Image()
        gImg.onload = () => {
            gCtx.drawImage(gImg, 0, 0, gCanvas.width, gCanvas.height)
        };
        gImg.src = 'img/cute.jpg'
    }
    // NOTE: the proportion of the image - should be as the canvas,
    // otherwise the image gets distorted
}

function downloadCanvas(elLink) {
    const data = gCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'my-img.png'
}

function setShape(shape) {
    gCurrShape = shape
}

function drag(ev) {
    if (!gIsDragActive) return;
    const offsetX = ev.offsetX
    const offsetY = ev.offsetY
    switch (gCurrShape) {
        case 'triangle':
            drawTriangle(offsetX, offsetY)
            break;
        case 'rectangle':
            drawRect(offsetX, offsetY)
            break;
        case 'text':
            drawText('test', offsetX, offsetY)
            break;
        case 'circle':
            drawArc(offsetX, offsetY)
        case 'line':
            drawLine(offsetX, offsetY)
            break;
    }
    gCtx.restore()

}

function stopDrag() {
    gIsDragActive = false;
}

function draw(ev) {
    gIsDragActive = true;
    gCtx.save();
    const offsetX = ev.offsetX
    const offsetY = ev.offsetY
    gCtx.strokeStyle = 'red'
    gCtx.lineWidth = 1
    gCtx.beginPath();
    gCtx.moveTo(offsetX, offsetY)
}

function resizeCanvas() {
    var elContainer =
        document.querySelector('.canvas-container');
    // Note: changing the canvas dimension this way clears the canvas
    gCanvas.width = elContainer.offsetWidth - 100
    gCanvas.height = elContainer.offsetHeight - 100

    // TODO: redraw..
}

