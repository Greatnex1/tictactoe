"use strict"

/*

A SIMPLE TIC-TAC-TOE GAME IN JAVASCRIPT

(1) Grid layout

The game grid is represented in the array Grid.cells as follows:

[0] [1] [2]
[3] [4] [5]
[6] [7] [8]

The cells (array elements) hold the following numeric values:
0 if not occupied, 1 for player, 3 for computer.
This allows us to quickly get an overview of the game state:
if the sum of all the cells in a row is 9, the computer wins,
if it is 3 and all the cells are occupied, the human player wins,
etc.

(2) Strategy of makeComputerMove()

The computer first  looks for almost completed rows, columns, and
diagonals, where there are two fields occupied either by the human
player or by the computer itself. If the computer can win by
completing a sequence, it does so; if it can block the player from
winning with the next move, it does that. If none of that applies,
it plays the center field if that's free, otherwise it selects a
random free field. This is not a 100 % certain strategy, but the
gameplay experience is fairly decent.

*/

//Event Bindings
//closing the modal dialog by pressing the Esc key
document.onkeypress = function(evt){
    evt ||window.event;
    var modal = document.getElementsByClassName("modal")[0]
    if(evt.keyCode === 27){
        modal.style.display = "none";
    }
}

//Helper Function

function sumArray(array){
    var sum   = 0, i = 0;
    for (let i = 0; i < array.lengt++; i++) {
        sum += arr[i];
        
    }
    return  sum;
}

function isInArray(element,array){
    if(array.indexOf(element)> -1){
        return true;
    }
    return false;
}

function shuffleArray(array){
    var counter = array.length, temp, index;
    while(counter > 0){
        index  = Math.floor(Math.random()*counter);
        counter--;
        temp =  array[counter]
        array[counter]= array[index]
        array[index] = temp;
    }
    return array;
}

function intRandom(min,max){
    var rand = min +  Math.random() * (max + 1 - min);
    return Math.floor(rand)
}

//global variables
var moves = 0, winner = 0, x =1, o = 3, player = x, computer = o,
    whoseTurn = x, gameOver = false,
     score =  {
        ties: 0,
        player: 0,
        computer: 0
    },
    xText = "<span class=\"x\">&times;</class>",
    oText = "<span class=\"x\">o;</class>" ,
    playerText = xText,
    computerText = oText,
    difficulty = 1,
    myGrid = null;

    //grid constructor
    function  Grid() {
        this.cells = new Array(9)
    }
        //grid methods

Grid.prototype.getFreeCellIndices = function(){
    var i =0, resultArray =[];
    for(i= 0; i<this.cells.length;i++){
        if(this.cells[i]=== 0){
            resultArray.push(i);
        }
    }
    return resultArray;
};
Grid.prototype.getRowValues =   function(index){
    if(index !== 0 && index !== 1 && index !==2){
        console.error("Wrong arg for getRowValues!" )
        return undefined;
    }
    var i = index * 3;
    return this.cells.slice(i, i + 3);
}
Grid.prototype.getRowIndices = function (index){
    if(index !== 0 && index !==1 && index !==2){
        console.error("Wrong arg for getColumnValues!")
        return undefined;
    }
    var row = []
    index = index * 3
    row.push(index)
    row.push(index + 1)
    row.push(index + 2)
    return row;
}
Grid.prototype.getColumnIndices = function(index){

    if(index !== 0 && index !==1 && index !==2){
        console.error("Wrong arg for getColumnIndices!")
        return undefined;
    }
    var i, column = [];
    for (i = index; i < this.cells.length; i += 3) {
        column.push(i);
    }
    return column;
};
Grid.prototype.getDiagValues = function (arg) {
    var cells = [];
    if (arg !== 1 && arg !== 0) {
        console.error("Wrong arg for getDiagValues!");
        return undefined;
    } else if (arg === 0) {
        cells.push(this.cells[0]);
        cells.push(this.cells[4]);
        cells.push(this.cells[8]);
    } else {
        cells.push(this.cells[2]);
        cells.push(this.cells[4]);
        cells.push(this.cells[6]);
    }
    return cells;
};

Grid.prototype.getDiagIndices = function (arg) {
    if (arg !== 1 && arg !== 0) {
        console.error("Wrong arg for getDiagIndices!");
        return undefined;
    } else if (arg === 0) {
        return [0, 4, 8];
    } else {
        return [2, 4, 6];
    }
};
Grid.prototype.getFirstWithTwoInARow = function (agent) {
    if (agent !== computer && agent !== player) {
        console.error("Function getFirstWithTwoInARow accepts only player or computer as argument.");
        return undefined;
    }
    var sum = agent * 2,
        freeCells = shuffleArray(this.getFreeCellIndices());
    for (var i = 0; i < freeCells.length; i++) {
        for (var j = 0; j < 3; j++) {
            var rowV = this.getRowValues(j);
            var rowI = this.getRowIndices(j);
            var colV = this.getColumnValues(j);
            var colI = this.getColumnIndices(j);
            if (sumArray(rowV) == sum && isInArray(freeCells[i], rowI)) {
                return freeCells[i];
            } else if (sumArray(colV) == sum && isInArray(freeCells[i], colI)) {
                return freeCells[i];
            }
        }
        for (j = 0; j < 2; j++) {
            var diagV = this.getDiagValues(j);
            var diagI = this.getDiagIndices(j);
            if (sumArray(diagV) == sum && isInArray(freeCells[i], diagI)) {
                return freeCells[i];
            }
        }
    }
    return false;
};
Grid.prototype.reset = function () {
    for (var i = 0; i < this.cells.length; i++) {
        this.cells[i] = 0;
    }
    return true;
};

//MAIN


