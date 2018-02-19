var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var i, ship, timer = 0;

var aster = [];
var fire = [];
var expl = [];

var fonimg = new Image();
fonimg.src = 'source/fon.png';
var asterimg = new Image();
asterimg.src = 'source/astero.png';
var shipimg = new Image();
shipimg.src = 'source/ship01.png';
var fireimg = new Image();
fireimg.src = 'source/fire.png';
var explimg = new Image();
explimg.src = 'source/expl222.png';

fonimg.onload = function(){
    init();
    game();
};

var requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame||
        window.mozRequestAnimationFrame||
        window.oRequestAnimationFrame||
        window.msRequestAnimationFrame||
        function (callback) {
            window.setTimeout(callback, 1000/20);
        }
})();

function init() {
    canvas.addEventListener("mousemove", function (event){
        ship.x = event.offsetX - 25;
        ship.y = event.offsetY - 13;
    });
}
timer = 0;
ship = {x:300, y:300, animx:0, animy:0};




function game() {
    update();
    render();
    requestAnimationFrame(game);
}
function update() {
    //физика
    timer++;
    if (timer % 15 == 0) {
        aster.push({
            y: -50,
            x: Math.random() * 550,
            del: 0,
            dx: Math.random() * 2 - 1,
            dy: Math.random() * 2 + 1
        });
    }

    if (timer % 20 == 0) {
        fire.push({x: ship.x + 10, y: ship.y, dx: 0, dy: -5.2});
        fire.push({x: ship.x + 10, y: ship.y, dx: 0.5, dy: -5});
        fire.push({x: ship.x + 10, y: ship.y, dx: -0.5, dy: -5});
    }

    for (i in aster) {
        aster[i].x += aster[i].dx;
        aster[i].y += aster[i].dy;
        //границы
        if (aster[i].x >= 550 || aster[i].x <= 0) {
            aster[i].dx = -aster[0].dx;
        }
        if (aster[i].y >= 650) aster.splice(i, 1);

        for (j in fire) {
            if (Math.abs(aster[i].x + 25 - fire[j].x - 15) < 50 && Math.abs(aster[i].y - fire[j].y) < 25) {
                expl.push({x: aster[i].x - 25, y: aster[i].y - 25, animx: 0, animy: 0});
                aster[i].del = 1;
                fire.splice(j, 1);
                break;
            }
        }
        if (aster[i].del == 1) aster.splice(i, 1);
    }

    for (i in fire) {
        fire[i].x += fire[i].dx;
        fire[i].y += fire[i].dy;
        if (fire[i].y < -30) fire.splice(i, 1);
    }

    for (i in expl) {
        expl[i].animx = expl[i].animx + 0.5;
        if (expl[i].animx > 7) {
            expl[i].animy++;
            expl[i].animx = 0
        }
        if (expl[i].animx > 7) {
            expl.splice(i, 1);
        }
    }
}

function render() {
    context.drawImage(fonimg, 0, 0, 600, 600);
    context.drawImage(shipimg, ship.x, ship.y);
    for (i in fire) {
        context.drawImage(fireimg, fire[i].x, fire[i].y, 30, 30);
    }
    for (i in aster) {
        context.drawImage(asterimg, aster[i].x, aster[i].y, 50, 50);
    }
    for (i in expl) {
        context.drawImage(explimg, 128 * Math.floor(expl[i].animx),
            128 * Math.floor(expl[i].animy),
            128, 128, expl[i].x, expl[i].y, 100, 100);
    }
}
