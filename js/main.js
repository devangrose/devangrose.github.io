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
    setListeners();
    // Add two random tiles
    addTile();
    addTile();

	if(!localStorage.score){
		localStorage.score = 0;
	}

    // Pulls high score from localStorage
    $('#high-score').text(localStorage.score);

    // Add listener to change size
    $('#change-size').on('click',function () {
        clearTable();
        GRID_SIZE = parseInt($('#new-size').val());
        console.log('Grid size:',GRID_SIZE);
        init();
    });

    // Mobile listeners
    $('body').on('swipeleft',function(){
        leftMove();
    });
    $('body').on('swiperight',function(){
        rightMove();
    });
    $('body').on('swipeup',function(){
        upMove();
    });
    $('body').on('swipedown',function(){
        downMove();
    });
    // Disables jQuery mobile loading message
	$( document ).on( "mobileinit", function() {
        $.mobile.loadingMessage = false;
		$.mobile.hidePageLoadingMsg();
	});

    // End game messaging
    $('#message-div').hide();
    $('#keep-playing').hide();
    $('#continue').on('click',function () {
        $('#message-div').fadeOut(FADE_SPEED,function(){
            $('#table').show();
        }); 
        setListeners();
    }); 

}
function lose(){
    sendMessage('You lose!');
    $('#keep-playing').hide();
    document.onkeydown = null;
}
function winGame(){
    sendMessage('You win!');
    setTimeout(function () {
        $('#keep-playing').fadeIn(200);
    },FADE_SPEED * 2);
    document.onkeydown = null;
}
function sendMessage(message){
    $('#table').fadeOut(FADE_SPEED,function(){
        $('#message').text(message);
        $('#message-div').fadeIn(200);
    });
}
function setListeners(){
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
}
$(document).ready(function(){
    init();
});
