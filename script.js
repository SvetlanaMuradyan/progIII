let side = 25;
let xotArr = []; //խոտերի զանգված
let eatArr = [];
let preArr = [];//խոտակերների զանգված
let heroArr = [];
let monsArr=[];




let matrix = []; // Մատրիցի ստեղծում
let rows = 100; // Տողերի քանակ
let columns = 100; // Սյուների քանակ

for (let y = 0; y < rows; y++) {
    matrix[y] = []; // Մատրիցի նոր տողի ստեղծում
    for (let x = 0; x < columns; x++) {
        let a = Math.floor(Math.random() * 100);
        if (a >= 0 && a < 20) {
            matrix[y][x] = 0; // Մատրիցի 20 տոկոսը կլինի 0
        }
        if (a >= 20 && a < 40) {
            matrix[y][x] = 1; // Մատրիցի 20 տոկոսը կլինի 1
        }
        else if (a >= 40 && a < 50) {
            matrix[y][x] = 2; // Մատրիցի 10 տոկոսը կլինի 2
        }
        else if (a >= 50 && a < 70) {
            matrix[y][x] = 3; // Մատրիցի 20 տոկոսը կլինի 3
        }
        else if (a >= 70 && a < 90) {
            matrix[y][x] = 4; // Մատրիցի 20 տոկոսը կլինի 4
        }
        else if (a >= 90 && a < 100) {
            matrix[y][x] = 5; // Մատրիցի 10 տոկոսը կլինի 5
        }
    }
}

// console.log(matrix)
function setup() {
    noStroke();
    frameRate(5);
    createCanvas(400, 400); 
    background('#acacac');


     
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                let eatgrass = new Eatgrass(x, y);
                eatArr.push(eatgrass);
            } else if (matrix[y][x] == 1) {
                let grass = new Grass(x, y);
                xotArr.push(grass);

            }
             else if (matrix[y][x] == 3) {
                let predator = new Predator(x, y);
                preArr.push(predator);

            }
            else if (matrix[y][x] == 4) {
                let hero = new Hero(x, y);
                heroArr.push(hero);

            }
            else if (matrix[y][x] == 5) {
                let monster = new Monster(x, y);
                monsArr.push(monster);

            }
        }
    }
}
function draw() {
    console.log('ss')
    background('#acacac');
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] == 1) {
                fill("green");
                rect(j * side, i * side, side, side);
            } else if (matrix[i][j] == 2) {
                fill("orange");
                rect(j * side, i * side, side, side);
            } else if (matrix[i][j] == 3) {
                fill('red');
                rect(j * side, i * side, side, side);
            }
            else if (matrix[i][j] == 0) {
                fill('#acacac');
                rect(j * side, i * side, side, side);
            }
            else if (matrix[i][j] == 4) {
                fill('pink')
                rect(j * side, i * side, side, side)
            }
            else if (matrix[i][j] == 5) {
                fill('blue')
                rect(j * side, i * side, side, side)
            }
        }
    }
    //յուրաքանչյուր խոտ փորձում է բազմանալ
    for (var i in xotArr) {
        xotArr[i].mul();
    }
    //յուրաքանչյուր խոտակեր փորձում է ուտել խոտ
    for (var i in eatArr) {
        eatArr[i].eat();
    }
    for (let i in preArr) {
        preArr[i].eat()
    }
    for (let i in heroArr) {
        heroArr[i].eat()
    }
    for (let i in monsArr) {
        monsArr[i].eat()
    }
}