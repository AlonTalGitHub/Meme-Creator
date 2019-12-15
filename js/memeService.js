'use strict'

var gMemes= [];
var gKeywords = { 'happy': 12, 'funny puk': 1, 'animals': 3, 'characters': 7, 'animation': 1};
var gImgs = [
            { id: 1, url: 'design/img/baby-dog.jpg', keywords: ['happy','dogs','baby', 'babies', 'animals'] },
            { id: 2, url: 'design/img/Ancient-Aliens.jpg', keywords: ['happy', 'characters'] },
            { id: 3, url: 'design/img/baby-eyes.jpg', keywords: ['happy', 'baby', 'babies'] },
            { id: 4, url: 'design/img/cat.jpg', keywords: ['happy', 'animals', 'cats'] },
            { id: 5, url: 'design/img/dogs.jpg', keywords: ['happy', 'animals', 'dogs'] },
            { id: 6, url: 'design/img/gene-wilder.jpg', keywords: ['happy', 'characters', 'famous'] },
            { id: 7, url: 'design/img/haim.jpg', keywords: ['happy', 'characters', 'famous'] },
            { id: 8, url: 'design/img/happy-baby.jpg', keywords: ['happy','baby', 'babies'] },
            { id: 9, url: 'design/img/leo.jpg', keywords: ['happy', 'characters', 'famous','leonardo dicaprio'] },
            { id: 10, url: 'design/img/lol-baby.jpg', keywords: ['happy'] },
            { id: 11, url: 'design/img/morpheus.jpg', keywords: ['happy', 'characters', 'morpheus'] },
            { id: 12, url: 'design/img/One-Does-Not-Simply.jpg', keywords: ['happy', 'characters'] },
            { id: 14, url: 'design/img/patrick.jpg', keywords: ['happy'] }, 
            { id: 15, url: 'design/img/putin.jpg', keywords: ['happy', 'characters', 'politicians', 'famous','putin vladimir'] },
            { id: 16, url: 'design/img/resling.jpg', keywords: ['happy'] },
            { id: 17, url: 'design/img/toy-story.jpg', keywords: ['happy', 'animation', 'toy story'] },
            { id: 18, url: 'design/img/trump.jpg', keywords: ['happy', 'characters', 'politicians', 'famous', 'trump donald'] }
            ];

var gCurrImg = null;          

var gMeme = {
    selectedImgId: 5,
    selectedTxtIdx: 0,
    txts: [
        {
            line: '',
            size: 30,
            lineXAxis: 10, 
            lineYAxis: 70,
            align: 'left',
            color: 'white'
        }
    ]
}

function getImagesToRender(searchKeyword) {
    if(!searchKeyword || searchKeyword === '') return gImgs;
    var imgsByKeywords = gImgs.filter((image) => { 
        return image.keywords.some((keyword) => keyword.startsWith(searchKeyword));
    });
    return imgsByKeywords;
}

function getImgByID(imageId) {
    return gImgs.find(function(image) {
        return image.id === imageId;
    });
}

function getMeme() {
    return gMeme;
}

function updateMeme(imageId) {
    gMeme.selectedImgId = imageId;
}

function setCurrImg(imageId) {
    gCurrImg = getImgByID(imageId);
}

function getCurrImage() {
    return gCurrImg;
}

function changeLineContent(memeObg, contentInput, txtIdx=0) {
    memeObg.txts[txtIdx].line = contentInput; 
}

function changeLineLocation(xDiff, yDiff, txtIdx=0) {
    const xCoord = gMeme.txts[txtIdx].lineXAxis;
    const yCoord = gMeme.txts[txtIdx].lineYAxis;
    if ((yCoord < 50 && yDiff < 0) || (yCoord > 480 && yDiff > 0)) return;
    gMeme.txts[txtIdx].lineXAxis += xDiff;
    gMeme.txts[txtIdx].lineYAxis += yDiff;
}


function changeFontSize(sizeDiff, txtIdx=0) {
    const fontSize = getFontSize(txtIdx);
    if ((fontSize <= 10 && sizeDiff < 0) || (fontSize > 40 && sizeDiff > 0)) return;
    gMeme.txts[txtIdx].size += sizeDiff;
}


function getFontSize(txtIdx=0) {
    return gMeme.txts[txtIdx].size;
}


