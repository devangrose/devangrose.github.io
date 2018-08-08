function init (){
    // generate table and add it to DOM
    for(let i = 0; i < GRID_SIZE; i++){
        let row = document.createElement('tr');
        row.id = 'row-' + i;
        let rowjs = [];
        for(let j = 0; j < GRID_SIZE; j++){
            let newTile = document.createElement('td');
            let newDiv = document.createElement('div');
            newTile.appendChild(newDiv);
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

    // Pulls high score from localStorage
    $('#high-score').text(localStorage.score);

    // Add listener to change size
    $('#change-size').on('click',function () {
        clearTable();
        GRID_SIZE = parseInt($('#new-size').val());
        console.log('Grid size:',GRID_SIZE);
        init();
    });
}

$(document).ready(function(){
    init();
});
