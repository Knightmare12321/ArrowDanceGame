// Get the canvas element and its 2d context
const canvas = $("#arrowCanvas");
const ctx = canvas[0].getContext('2d');
console.log(ctx);
// Arrow image source
const arrowImageSrc = "./img/green-arrow-up.png";
// Load the arrow image
for (let i = 0; i < 4; i++) {
    const arrowImage = new Image();
    arrowImage.src = arrowImageSrc;
    arrowImage.onload = () => {
        ctx.drawImage(arrowImage, i * 50, 100, 50, 50);
    };
}


generateArrowIndexs = (size) => {
    const array = [];
    for (let i = 0; i < size; i++) {
        const randomInt = Math.floor(Math.random()*4) + 1;
        array.push(randomInt);
    }
    return array;
}
