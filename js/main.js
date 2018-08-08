function init (){
    // generate table and add it to DOM
    for(let i = 0; i < GRID_SIZE; i++){
        let row = document.createElement('tr');
        row.id = 'row-' + i;
        let rowjs = [];
        for(let j = 0; j < GRID_SIZE; j++){
            let newTile = document.createElement('td');
            let newDiv = document.createElement('div');
            newDiv.className = "tile";
            newTile.appendChild(newDiv);
            let tile = new Tile(newTile,null,[i,j]);
            newDiv.id = i + ',' + j;
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
                e.preventDefault();
				leftMove();
				break;
			case 38:
                e.preventDefault();
				upMove();
				break;
			case 39:
                e.preventDefault();
				rightMove();
				break;
			case 40:
                e.preventDefault();
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
