let gCanvas
let gCtx
let gIsDragActive = false;

let gCurrShape = 'triangle'

function init() {
    renderImages();
}
function renderImages(searchKeyword) {
    var images = getImagesToRender(searchKeyword);
    var strElImgs = images.map(function (image) {
        return `<img class="image" src="${image.url}" alt="image" onclick="initEditor(${image.id})" />\n`
    });

    var elImgs = document.querySelector('.images-container');
    elImgs.innerHTML = strElImgs.join('');
}


function openEditor() { 
    elmainImgs = document.querySelector('.main-images-container'); 
    elmainImgs.hidden = true;

    elImgEditor = document.querySelector('.image-editor');
    elImgEditor.hidden = false; 
}

function closeEditor() {
    elImgEditor = document.querySelector('.image-editor');
    elImgEditor.hidden = true;
    elmainImgs = document.querySelector('.main-images-container');
    elmainImgs.hidden = false; 
    
}

// ############ canvas operations ############

function initEditor(imageId) {
    onSetCurrImg(imageId);
    onUpdateMeme(imageId);
    openEditor();
    gCanvas = document.querySelector('#my-canvas');
    gCtx = gCanvas.getContext('2d');
    drawImg();
}

function onUpdateMeme(imageId){
    updateMeme(imageId);
}

function onSetCurrImg(imageId) {
    setCurrImg(imageId);
}

function drawImg() {
        elCurrImg = new Image();
        let currImg = getCurrImage();
        elCurrImg.src = currImg.url;
        gCtx.drawImage(elCurrImg, 0, 0, gCanvas.width, gCanvas.height)
}

function addEventListeners() {
    window.addEventListener('resize',
        function () {
            gCanvas.width = window.innerWidth - 50;
            gCanvas.height = window.innerHeight - 100;
            drawImg();

        });
}

function drawLine(x, y) {
    gCtx.lineTo(x, y);
    gCtx.stroke();
}

function drawRect(x, y) {
    gCtx.save()
    gCtx.beginPath();
    gCtx.rect(x, y, 50, 50)
    gCtx.fillStyle = 'blue'
    gCtx.fillRect(x, y, 50, 50)
    gCtx.stroke()
    gCtx.closePath()
    gCtx.restore()
}

function drawArc(x, y) {
    gCtx.beginPath();
    gCtx.strokeStyle = 'black'
    gCtx.arc(x, y, 50, 0, Math.PI * 2)
    gCtx.stroke();
}

function onDrawText(x=10, y=70) {
    var header = document.querySelector('.add-header').value;
    gCtx.beginPath();
    gCtx.font = 'bold 50px Impact';
    gCtx.fillStyle = "white";
    gCtx.strokeStyle = 'black'
    gCtx.save()
    gCtx.fillText(header.toUpperCase(), x, y);
    gCtx.strokeText(header.toUpperCase(), x, y);
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

function clearCanvas() {
    drawImg();
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
    gCanvas.width = elContainer.offsetWidth - 100
    gCanvas.height = elContainer.offsetHeight - 100
}

