const BACKGROUND_COLOUR = '#000000';
const LINE_COLOUR = '#FFFFFF';
const LINE_WIDTH = 15;

var currentX = 0;
var currentY = 0;
var previousX = 0;
var previousY = 0;

var canvas;
var context;

function prepareCanvas() {
    // console.log('Preparing Canvas');
    canvas = document.getElementById('my-canvas');
    context = canvas.getContext('2d');  // 2d box

    context.fillStyle = BACKGROUND_COLOUR;

    // x: 0, y: 0 that means origin
    // canvas.clientWidth this is width of the rectangle we need entire rectangle

    context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    // When we draw line inside the canvas, it want to be white
    // Width
    // -> now it is sharpe at edge, -) now it round at the edge, it will help to do round at edge
    context.strokeStyle = LINE_COLOUR;
    context.lineWidth = LINE_WIDTH;
    context.lineJoin = 'round';

    var isPainting = false;


    document.addEventListener('mousedown', function (event) {
        // console.log('Mouse Pressed!');
        isPainting = true;
        currentX = event.clientX - canvas.offsetLeft;
        currentY = event.clientY - canvas.offsetTop;

    });

    document.addEventListener('mousemove', function (event) {

        if (isPainting) {
            previousX = currentX;
            currentX = event.clientX - canvas.offsetLeft;

            previousY = currentY;
            currentY = event.clientY - canvas.offsetTop;

            draw();
        }


    });

    document.addEventListener('mouseup', function (event) {
        // console.log('Mouse Released');
        isPainting = false;

    });


    canvas.addEventListener('mouseleave', function (event) {
        isPainting = false;

    });

    // Touch Events
    canvas.addEventListener('touchstart', function (event) {
        // console.log('Touchdown!');
        isPainting = true;
        currentX = event.touches[0].clientX - canvas.offsetLeft;
        currentY = event.touches[0].clientY - canvas.offsetTop;

    });

    canvas.addEventListener('touchend', function (event) {
        isPainting = false;

    });

    canvas.addEventListener('touchcancel', function (event) {
        isPainting = false;

    });

    canvas.addEventListener('touchmove', function (event) {

        if (isPainting) {
            previousX = currentX;
            currentX = event.touches[0].clientX - canvas.offsetLeft;

            previousY = currentY;
            currentY = event.touches[0].clientY - canvas.offsetTop;

            draw();
        }


    });

}


function draw() {
    context.beginPath();
    context.moveTo(previousX, previousY);
    context.lineTo(currentX, currentY);
    context.closePath();
    context.stroke();
}

function clearCanvas() {
    currentX = 0;
    currentY = 0;
    previousX = 0;
    previousY = 0;
    // To keep our box black
    context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

}