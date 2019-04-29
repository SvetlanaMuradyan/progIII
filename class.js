//խոտի կլասը
class Grass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 10;
        this.multiply = 0; //բազմացման գործակից

    }

    //շրջապատի հետազոտության մատրիցը
    newDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    //հետազոտում է շրջապատը, որոնում է հետաքրքրող կերպարներին
    //կերպարը որոշվում է t արգումենտով
    getDirections(t) {
        this.newDirections();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == t) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }


    mul() {
        this.multiply++;
        if (this.multiply >= 3) {
            let fundCords = this.getDirections(0);
            let cord = random(fundCords);
            if (cord) {
                let x = cord[0];
                let y = cord[1];
                let norXot = new Grass(x, y);
                xotArr.push(norXot);
                matrix[y][x] = 1;
                this.multiply = 0;
            }
        }
    }



}

class Eatgrass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.energy = 20;

    }

    //շրջապատի հետազոտության մատրիցը
    newDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    getDirections(t) {
        this.newDirections();
        let foundc = [];
        for (let i in this.directions) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == t) {
                    foundc.push(this.directions[i]);
                }
            }
        }
        return foundc;
    }

    move() {
        let fundCords = this.getDirections(0);
        let cord = random(fundCords);

        if (cord) {
            let x = cord[0];
            let y = cord[1];
            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;

        }
    }

    eat() {
        let fundCordss = this.getDirections(1);
        let cord = random(fundCordss);

        if (cord) {
            let x = cord[0];
            let y = cord[1];
            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
            this.multiply++;
            this.energy++;
            for (let i in xotArr) {
                if (x == xotArr[i].x && y == xotArr[i].y) {
                    xotArr.splice(i, 1);
                }
            }

            if (this.multiply >= 10) {
                this.mul()
                this.multiply = 0;
            }


        } else {

            this.move();
            this.energy--;
            if (this.energy <= 3) {
                this.die();
            }
        }
    }

    mul() {

        let fundCords = this.getDirections(0);
        let cord = random(fundCords);

        if (cord) {
            let x = cord[0];
            let y = cord[1];

            this.multiply++;

            let norXotaker = new Eatgrass(x, y);
            eatArr.push(norXotaker);

            matrix[y][x] = 2;
            this.multiply = 0;
        }
    }


    die() {

        matrix[this.y][this.x] = 0;

        for (var i in eatArr) {
            if (this.x == eatArr[i].x && this.y == eatArr[i].y) {
                eatArr.splice(i, 1);
            }
        }
    }

}
class Predator {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.energy = 30;
        this.directions = [];
    }
    predatorDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    getPrDirections(p) {
        this.predatorDirections();
        let foundCord = [];
        for (let i in this.directions) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == p) {
                    foundCord.push(this.directions[i]);
                }
            }
        }
        return foundCord;
    }
    move() {

        let fundCords = this.getPrDirections(0);
        let cord = random(fundCords);

        if (cord) {
            let x = cord[0];
            let y = cord[1];


            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;


            this.x = x;
            this.y = y;

        }
    }
    eat() {

        let fundPCords = this.getPrDirections(2);
        let cord = random(fundPCords);


        if (cord) {
            let x = cord[0];
            let y = cord[1];


            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;


            this.x = x;
            this.y = y;


            this.multiply++;


            this.energy++;


            for (let i in eatArr) {
                if (x == eatArr[i].x && y == eatArr[i].y) {
                    eatArr.splice(i, 1);
                }
            }


            if (this.multiply >= 10) {
                this.mul()
                this.multiply = 0;
            }


        } else {

            this.move();
            this.energy--;
            if (this.energy <= 3) {
                this.die();
            }
        }
    }
    mul() {

        let fundCordsp = this.getPrDirections(0);
        let cord = random(fundCordsp);


        if (cord) {
            let x = cord[0];
            let y = cord[1];

            this.multiply++;


            let norPredator = new Predator(x, y);
            preArr.push(norPredator);


            matrix[y][x] = 3;
            this.multiply = 0;
        }
    }
    die() {

        matrix[this.y][this.x] = 0;

        for (var i in preArr) {
            if (this.x == preArr[i].x && this.y == preArr[i].y) {
                preArr.splice(i, 1);
            }
        }
    }
}
class Hero {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.energy = 40;
    }
    DirectHero() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    getHeroD(p) {
        this.DirectHero();
        let foundCord = [];
        for (let i in this.directions) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == p) {
                    foundCord.push(this.directions[i]);
                }
            }
        }
        return foundCord;
    }
    move() {

        let foundhcords = this.getHeroD(0);
        let hrCords = random(foundhcords)


        if (hrCords) {
            let x = hrCords[0]
            let y = hrCords[1]
            matrix[y][x] = 4
            matrix[this.y][this.x] = 0
            this.x = x
            this.y = y

        }
    }
    eat() {
        var fundcord = this.getHeroD(3)
        var cord = random(fundcord)

        if (cord) {
            var x = cord[0];
            var y = cord[1];
            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
            this.multiply++;
            this.energy++;

            for (let i in preArr) {
                if (x == preArr[i].x && y == preArr[i].y) {
                    preArr.splice(i, 1);
                }
            }
            if (this.multiply >= 8) {
                this.mul()
                this.multiply = 0;
            }


        } else {

            this.move();
            this.energy--;
            if (this.energy <= 3) {
                this.die();
            }
        }
    }

    mul() {

        let fundCords = this.getHeroD(0);
        let cord = random(fundCords);


        if (cord) {
            let x = cord[0];
            let y = cord[1];

            this.multiply++;


            let norGeroy = new Hero(x, y);
            heroArr.push(norGeroy);


            matrix[y][x] = 4;
            this.multiply = 0;
        }
    }


    die() {
        matrix[this.y][this.x] = 0;

        for (var i in heroArr) {
            if (this.x == heroArr[i].x && this.y == heroArr[i].y) {
                heroArr.splice(i, 1);
            }
        }
    }
}

class Monster {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.energy = 50;

    }
    get() {

        this.directions = [
            [this.x, this.y + 2],
            [this.x, this.y - 2],
            [this.x + 2, this.y],
            [this.x - 2, this.y],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y + 2],
            [this.x + 2, this.y + 2],
            [this.x - 2, this.y - 2]
        ];
    }

    getdirect(k) {
        this.get();
        let foundCord = [];
        for (let i in this.directions) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == k) {
                    foundCord.push(this.directions[i]);
                }
            }
        }
        return foundCord;
    }
    move() {

        let fundCords = this.getdirect(0);
        let cord = random(fundCords);
        if (cord) {
            let x = cord[0];
            let y = cord[1];


            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;


            this.x = x;
            this.y = y;

        }
    }



    eat() {
        var fund1 = this.getdirect(1)
        var fund2 = this.getdirect(3)
        var fund3 = this.getdirect(4)
        var fundCords = fund1.concat(fund2);
        var fundCords1 = fundCords.concat(fund3)

        let cord = random(fundCords1);

        if (cord) {
            let x = cord[0];
            let y = cord[1];


            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
            this.multiply++;
            this.energy++;


            for (let i in preArr) {
                if (x == preArr[i].x && y == preArr[i].y) {
                    preArr.splice(i, 1);
                }
            }
            for (let i in eatArr) {
                if (x == eatArr[i].x && y == eatArr[i].y) {
                    eatArr.splice(i, 1);
                }
            }
            for (let i in heroArr) {
                if (x == heroArr[i].x && y == heroArr[i].y) {
                    heroArr.splice(i, 1);
                }
            }
            if (this.multiply >= 9) {
                this.mul()
                this.multiply = 0;
            }
        }
        else {
            //եթե չկա հարմար սնունդ 
            this.move();
            this.energy--;
            if (this.energy <= 2) {
                this.die();
            }

        }

    }



    mul() {

        let fundCords = this.getdirect(0);
        let cord = random(fundCords);


        if (cord) {
            let x = cord[0];
            let y = cord[1];

            this.multiply++;

            let normons = new Monster(x, y);
            monsArr.push(normons);

            matrix[y][x] = 5;
            this.multiply = 0;
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (var i in monsArr) {
            if (this.x == monsArr[i].x && this.y == monsArr[i].y) {
                monsArr.splice(i, 1);
            }
        }
    }

}


