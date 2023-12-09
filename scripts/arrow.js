"use strict";
import clock from "./timer.js"
import game from "./script.js"
var sets;
var indexArray;
var runningIndex = 0;
var arrayLength = 4;
var errors = 0;
function generateArrow(runningIndex, length) {
    // Get the canvas element and its 2d context
    const canvas = $("#arrowCanvas");
    const ctx = canvas[0].getContext('2d');
    // Arrow image source
    var arrowSrcFront = "./img/green-";
    const arrowSrcEnd = ".png"
    // Load the arrow image

    for (let i = 0; i < runningIndex; i++) {
        const arrowImage = new Image();
        var arrowImageSrc;
        if (indexArray[i] == 1) arrowImageSrc = arrowSrcFront + "up" + arrowSrcEnd;
        else if (indexArray[i] == 2) arrowImageSrc = arrowSrcFront + "left" + arrowSrcEnd;
        else if (indexArray[i] == 3) arrowImageSrc = arrowSrcFront + "down" + arrowSrcEnd;
        else if (indexArray[i] == 4) arrowImageSrc = arrowSrcFront + "right" + arrowSrcEnd;
        arrowImage.src = arrowImageSrc;
        arrowImage.onload = () => {
            ctx.drawImage(arrowImage, i * 60, 100, 40, 40);
        };
    }

    arrowSrcFront = "./img/red-";

    for (let i = runningIndex; i < length; i++) {
        const arrowImage = new Image();
        var arrowImageSrc;
        if (indexArray[i] == 1) arrowImageSrc = arrowSrcFront + "up" + arrowSrcEnd;
        else if (indexArray[i] == 2) arrowImageSrc = arrowSrcFront + "left" + arrowSrcEnd;
        else if (indexArray[i] == 3) arrowImageSrc = arrowSrcFront + "down" + arrowSrcEnd;
        else if (indexArray[i] == 4) arrowImageSrc = arrowSrcFront + "right" + arrowSrcEnd;
        arrowImage.src = arrowImageSrc;
        arrowImage.onload = () => {
            ctx.drawImage(arrowImage, i * 60, 100, 40, 40);
        };
    }
}

function generateArrowIndexs(size) {
    const array = [];
    for (let i = 0; i < size; i++) {
        const randomInt = Math.floor(Math.random()*4) + 1;
        array.push(randomInt);
    }
    return array;
}

function handleKeyDown(event) {
    // Check the event.key to determine which key was pressed
    switch (event.key) {
      case 'w':
        console.log('W key pressed');
        if (indexArray[runningIndex] == 1) inputSucceed();
        else inputFail();
        break;
      case 's':
        console.log('S key pressed');
        if (indexArray[runningIndex] == 3) inputSucceed();
        else inputFail();
        break;
      case 'a':
        console.log('A key pressed');
        if (indexArray[runningIndex] == 2) inputSucceed();
        else inputFail();
        break;
      case 'd':
        console.log('D key pressed');
        if (indexArray[runningIndex] == 4) inputSucceed();
        else inputFail();
        break;
      case 'q':
        console.log('Clearing Board...');
        $("#arrowCanvas")[0].getContext('2d').clearRect(0, 0, 800, 800);
        break;
    }
}

function startGenerate(runningIndex, length) {
    sets = 0;
    errors = 0;
    game.playerScore = 0;
    $("#scoreCanvas")[0].getContext('2d').clearRect(0, 0, 800, 800);
    arrayLength = length;
    $(document).on('keydown', handleKeyDown);
    indexArray = generateArrowIndexs(arrayLength);
    generateArrow(runningIndex, length);
}

function endGenerate() {
    runningIndex = 0;
    $(document).off('keydown', handleKeyDown);
    $("#arrowCanvas")[0].getContext('2d').clearRect(0, 0, 800, 800);

}

function inputSucceed() {
    game.playerScore++;
    console.log("Succeed!");
    $("#arrowCanvas")[0].getContext('2d').clearRect(0, 0, 800, 800);
    runningIndex++;
    if (runningIndex >= arrayLength) {
        sets++;
        runningIndex = 0;
        if (sets == 10) arrayLength++;
        else if (sets == 20) arrayLength++;
        else if (sets == 30) arrayLength++;
        indexArray = generateArrowIndexs(arrayLength);
        generateArrow(0, arrayLength);
    } 
    else {
        generateArrow(runningIndex, arrayLength);
    }
}

function inputFail() {
    errors++;
    if (errors == 3) {
        game.switchScreen("game-over");
    }
    var temp = $("#scoreCanvas")[0].getContext('2d');
    var cross = new Image();
    cross.src = "./img/x.png";
    console.log(temp);
    console.log(cross);
    cross.onload = () => {
        temp.drawImage(cross, errors * 30, 0, 40, 40);
    };
}

export {startGenerate, endGenerate};

