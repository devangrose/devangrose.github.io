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
    let rows = [];
    for(let i = 0; i < GRID_SIZE; i++){
        let testRow = []; 
        for(let j = GRID_SIZE - 1; j >= 0; j--){
            testRow.push(table[i][j]);
        }
        rows.push(testRow);
    }
    slide(rows);
}

function upMove () {
	console.log('up');
}

function downMove () {
	console.log('down');
}
function slide(rows){
    for(let index = 0; index < rows.length; index++){
        let row = rows[index];
        // Check for combinations first
        for(let i = 0; i < row.length; i++){
            if(row[i].value != null){
                for(let j = i + 1; j < row.length; j++){
                    if(row[i].value == row[j].value){
                        // combine 
                        console.log('combined',row[i].value,row[j].value);
                        row[i].incrementValue();
                        row[j].reset();
                        break;
                    }
                }
            }
        }

        // Check for slide
        for(let i = 0; i < row.length; i++){
            if(row[i].value == null){
                for(let j = i; j < row.length; j++){
                    if(row[j].value != null){
                        row[i].setValue(row[j].value);
                        row[j].reset();
                        break;
                    }
                }
            }
        }
    }
    return rows;
}
function setTile(coord, value){
    table[coord[0]][coord[1]].setValue(value);
}
