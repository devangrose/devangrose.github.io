function init (){
    // generate table and add it to DOM
    for(let i = 0; i < GRID_SIZE; i++){
        let row = document.createElement('tr');
        row.id = 'row-' + i;
        let rowjs = [];
        for(let j = 0; j < GRID_SIZE; j++){
            let newTile = document.createElement('td');
            let tile = new Tile(newTile,null,[i,j]);
            newTile.id = i + ',' + j;
            rowjs.push(tile);
            row.append(newTile);
        }
        $('#table').append(row);
        table.push(rowjs);
    }

    // Set event listeners
    document.onkeydown = function(e) {
		switch (e.keyCode) {
			case 37:
				leftMove();
				break;
			case 38:
				upMove();
				break;
			case 39:
				rightMove();
				break;
			case 40:
				downMove();
				break;
		}
	};

    // Add two random tiles
    addTile();
    addTile();

}

$(document).ready(function(){
    init();
});
