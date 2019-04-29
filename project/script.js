let side = 25;
let xotArr = []; //խոտերի զանգված
let eatArr = [];
let preArr = [];
let heroArr=[];


let matrix = [
    [0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 2,1],
    [0, 1, 1, 0, 0, 2, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1,2, 1],
    [0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 3,1],
    [0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1,2, 1],
    [0, 1, 0, 0, 3, 1, 0, 0, 1, 0, 4, 1, 1, 1, 1, 1, 2,1],
    [0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1,1],
    [0, 0, 3, 0, 0, 1, 2, 0, 1, 0, 3, 4, 1, 1, 3, 1,1, 1],
    [0, 0, 0, 0, 0, 1, 0, 0, 1, 2, 0, 1, 1, 1, 1, 1,2, 1],
    [0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 4, 1, 1, 1, 1, 1,3,01],
    [3, 0, 0, 0, 0, 1, 0, 0, 1, 0, 2, 1, 1, 1, 1, 3,2, 1],
    [2, 0, 3, 0, 0, 1, 0, 0, 1, 3, 1, 1, 1, 1, 1, 1, 2,1],
    [2, 0, 0, 0, 0, 1, 0, 1, 1, 2, 2, 1, 1, 1, 1, 1,2, 1],
    [1, 1, 1, 1, 0, 1, 0, 1, 2, 2, 3, 1, 1, 1, 1, 1,2, 1],
]


function setup() {
    noStroke();
    frameRate(1);
    createCanvas(matrix[0].length * side, matrix.length * side); //կտավի չափերը դնել մատրիցայի չափերին համապատասխան
    background('#acacac');

    //Կրկնակի ցիկլը լցնում է օբյեկտներով խոտերի և խոտակերների զանգվածները
    //հիմնվելով մատրիցի վրա 
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                let eatgrass = new Eatgrass(x, y);
                eatArr.push(eatgrass);
            } else if (matrix[y][x] == 1) {
                let grass = new Grass(x, y);
                xotArr.push(grass);
                 
            }else if (matrix[y][x] == 3) {
                    let predator = new Predator(x, y);
                    preArr.push(predator);
                }
                else if(matrix[y][x]==3){
                    let hero= new hero(x,y);
                    heroArr.push(hero);


                }
        }
    }
}

//draw ֆունկցիան գծում է «կադրերը», վարկյանում 60 կադր արագությամբ
//եթե տրված չէ այլ կարգավորում frameRate ֆունկցիայի միջոցով
//draw ֆունկցիան ինչ որ իմաստով անվերջ կրկնություն է (цикл, loop)
function draw() {
    //Գծում է աշխարհը, հիմվելով matrix-ի վրա
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
            else if(matrix[i][j]==4){
                fill("pink");
                rect(j*side,i*side,side,side);
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


for(let i in preArr){
    preArr[i].eat()
}
for(let i in heroArr){
    heroArr[i].move()
}

}
