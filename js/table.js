// Adds a new '2' or '4' value to a random empty tile
function addTile () {
    let empty = getEmptySpaces();
    let randomTile = getRandomTile(empty);
    let tileValue = 
    randomTile.setValue(Math.random() > FOUR_CHANCE ? 2 : 4);
    checkForEndGame();
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
    tile.elem.childNodes[0].innerHTML=value;
    tile.height = value / 2;
}

function leftMove () {
    let rows = [];
    for(let i = 0; i < GRID_SIZE; i++){
        let testRow = []; 
        for(let j = 0; j < GRID_SIZE; j++){
            testRow.push(table[i][j]);
        }
        rows.push(testRow);
    }
    postMove(rows);
}

function rightMove () {
    let rows = [];
    for(let i = 0; i < GRID_SIZE; i++){
        let testRow = []; 
        for(let j = GRID_SIZE - 1; j >= 0; j--){
            testRow.push(table[i][j]);
        }
        rows.push(testRow);
    }
    postMove(rows);
}

function upMove () {
    let rows = [];
    for(let i = 0; i < GRID_SIZE; i++){
        let testRow = []; 
        for(let j = 0; j < GRID_SIZE; j++){
            testRow.push(table[j][i]);
        }
        rows.push(testRow);
    }
    postMove(rows);
}

function downMove () {
    let rows = [];
    for(let i = 0; i < GRID_SIZE; i++){
        let testRow = []; 
        for(let j = GRID_SIZE - 1; j >= 0; j--){
            testRow.push(table[j][i]);
        }
        rows.push(testRow);
    }
    postMove(rows);
}

function postMove(rows){
    // Prevents adding new tile if board hasn't changed
    if(slide(rows)){
        addTile();
    }
    if(checkForEndGame()){
        lose();
    }
    saveTable();
}

function slide(rows){
    var hasChanged = false;
    for(let index = 0; index < rows.length; index++){
        let row = rows[index];
        // Check for combinations first
        for(let i = 0; i < row.length; i++){
            if(row[i].value != null){
                let j = i + 1;
                // Gets next nonempty element in row
                while(j < row.length && row[j].value == null){
                    j++;
                }
                if(j < row.length && row[i].value == row[j].value){
                    // Combines
                    row[i].incrementValue();
                    row[j].reset();
                    i = j;
                    hasChanged = true;
                    continue;
                }
            }
        }
        // Check for slide
        for(let i = 0; i < row.length; i++){
            if(row[i].value == null){
                for(let j = i; j < row.length; j++){
                    if(row[j].value != null){
                        row[i].setValue(row[j].value, row[j].height);
                        row[j].reset();
                        hasChanged = true;
                        break;
                    }
                }
            }
        }
    }
    return hasChanged;
}

function setTile(coord, value){
    table[coord[0]][coord[1]].setValue(value,1);
}

function checkForEndGame(){
   for(let i = 0; i < GRID_SIZE; i++){
        for(let j = 0; j < GRID_SIZE; j++){
            // If it finds an empty tile returns false
            if(table[i][j].value == null){
                return false;
            }
            // Checks for similar adjacent tiles
            let neighbors = getNeighbors(table[i][j].coordinate);
            for(let k = 0; k < neighbors.length; k++){
                if(neighbors[k].value == table[i][j].value)
                    return false;
            }
        }
   }
    return true;
}

// Gets adjacent tiles
function getNeighbors(coord){
    let toReturn = [];
    if(coord[0] >= 1){
        toReturn.push(table[coord[0] - 1][coord[1]]);
    }
    if(coord[0] < GRID_SIZE - 1){
        toReturn.push(table[coord[0] + 1][coord[1]]);
    }
    if(coord[1] >= 1){
        toReturn.push(table[coord[0]][coord[1] - 1]);
    }
    if(coord[1] < GRID_SIZE - 1){
        toReturn.push(table[coord[0]][coord[1] + 1]);
    }
    return toReturn;
}

// Increments score and updates DOM as well as local storage
function updateScore(val){
    var score = $('#score').text();
    score = parseInt(score);
    score += val;
    $('#score').text(score);
    if(score > localStorage.score){
        localStorage.setItem('score', score.toString());
        $('#high-score').text(score);
    }
}

// Resets table and DOM
function clearTable(){
    table = [];
    $('tr').remove();
}

// Saves the table to local storage
function saveTable(){
    localTable = [];
    for(var i = 0; i < GRID_SIZE; i++){
        for(var j = 0; j < GRID_SIZE; j++){
            if(table[i][j].value == null){
                localTable.push(0);
            }
            else {
                localTable.push(table[i][j].value);
            }
        }
    }   
    localStorage.setItem('table',localTable);
}

// Loads the table from local storage
function loadTable(){
    clearTable();
    localTable = localStorage.getItem('table').split(',');
    var GRID_SIZE = Math.sqrt(localTable.length);
    var index = 0;
    for(let i = 0; i < GRID_SIZE; i++){
        let row = document.createElement('tr');
        row.id = 'row-' + i;
        let rowjs = [];
        for(let j = 0; j < GRID_SIZE; j++,index++){
            let newTile = document.createElement('td');
            let newDiv = document.createElement('div');
            newDiv.className = "tile";
            newTile.appendChild(newDiv);
            var tile;
            // Null case
            if(localTable[index] != 0){
                tile = new Tile(newTile,localTable[index],[i,j]);
            }
            else {
                tile = new Tile(newTile,null,[i,j]);
            }
            newDiv.id = i + ',' + j;
            rowjs.push(tile);
            row.append(newTile);
        }
        $('#table').append(row);
        table.push(rowjs);
    }
}
