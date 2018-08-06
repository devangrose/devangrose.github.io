// Adds a new '2' or '4' value to a random empty tile
function addTile () {
    let empty = getEmptySpaces();
    let randomTile = getRandomTile(empty);
    let tileValue = 
    newTile(randomTile, Math.random() > FOUR_CHANCE ? 2 : 4);
}

// Returns an array of empty spaces
function getEmptySpaces () {
    let toReturn = [];
    for( let i = 0; i < GRID_SIZE; i++){
        for( let j = 0; j < GRID_SIZE; j++){
            if(table[i][j].value == null){
                toReturn.push(table[i][j]);
            }
        }
    }
    return toReturn;
}

// Returns a random tile object from an array
function getRandomTile (emptyTiles) {
    let index = Math.floor(Math.random() * emptyTiles.length);
    return emptyTiles[index];
}

// Accepts a tile object and sets its value
// and updates the DOM
function newTile (tile, value) {
    tile.value = value;
    tile.elem.innerHTML = value;
}

function leftMove () {
	console.log('left');
}

function rightMove () {
	console.log('right');
}

function upMove () {
	console.log('up');
}

function downMove () {
	console.log('down');
    var testRow = [];
    for(var i = GRID_SIZE - 1; i > 0; i--){
        testRow.push(table[0][i]);
    }
    console.log(slide(testRow));
}

// Slides tiles to the left
function slide (row) {
	//for(var index = 0; index < GRID_SIZE; index++){
        //var row = rows[index];
        // Steps through the row 
        for(var i = 0; i < GRID_SIZE; i++){
            // Checks consecutive spots for swap condidates
            for(var j = i + 1; j < GRID_SIZE; j++){
                // Case: empty followed by non-empty
                if(row[i].value == null && row[j] != null){
                    // swaps values
                    row[i].value = row[j].value;
                    row[j].reset();
                    break;
                }
                // Case: combine
                else if (row[i].value == row[j].value){
                    row[i].incrementValue();
                    row[j].reset();
                    break;
                }
            }
            console.log(row);
        }   
	//}
    return row;
}
function setTile(coord, value){
    table[coord[0]][coord[1]].setValue(value);
}
