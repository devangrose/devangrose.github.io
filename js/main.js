$(document).ready(function(){
    init();
});

function init (){
    // Initializes first high score
	if(!localStorage.score){
		localStorage.setItem('score','0');
	}
    if(!localStorage.table){
        initTable();
    }

    // Initializes table state
    loadTable();

    // Initial state
    $('#tableElement').hide();
    $('#score-holder').hide();
    $('#new-game').hide();
    $('#start').on('click',function(){
        // Set event listeners
        setListeners();
        $('#initial-board').fadeOut(FADE_SPEED,function(){
            $('#score-holder').show();
            $('#tableElement').fadeIn(FADE_SPEED);
            $('#new-game').show();
        });
    });
    // New Game
    $('#new-game').on('click',function () {
        clearTable();
        initTable();
    });
    


    // Pulls high score from localStorage
    $('#high-score').text(localStorage.score);

    // Add listener to change size
    $('#change-size').on('click',function () {
        clearTable();
        GRID_SIZE = parseInt($('#new-size').val());
        if($('#initial-board').is(':hidden')){
            $('#tableElement').show();
        }
        $('#score').text('0');
        initTable();
    });

    // Add listener to play again
    $('#again').on('click',function (){
        $('#score').text('0');
        clearTable();
        initTable();
        $('#message-div').hide();
        setListeners();
        $('#table').fadeIn(FADE_SPEED);
        $('#new-game').show();
    });

    // End game messaging
    $('#message-div').hide();
    $('#keep-playing').hide();
    $('#continue').on('click',function () {
        $('#message-div').fadeOut(FADE_SPEED,function(){
            $('#table').show();
            $('#new-game').show();
        }); 
        setListeners();
    }); 

    // Disables jQuery mobile loading message
    $(".ui-loader").hide();
}

function initTable(){
    // Generate table and add it to DOM
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
    // Add two random tiles
    addTile();
    addTile();
    saveTable();    
}

function lose(){
    $('#keep-playing').hide();
    $('#play-again').show();
    $('#new-game').hide();
    sendMessage('You lose!');
    clearTable();
    initTable();
    removeListeners();
}

function winGame(){
    sendMessage('You win!');
    $('#play-again').hide();
    $('#keep-playing').show();
    $('#new-game').hide();
    setTimeout(function () {
    $('#keep-playing').fadeIn(200);
    },FADE_SPEED * 2);
    removeListeners();
}

function sendMessage(message){
    $('#table').fadeOut(FADE_SPEED,function(){
        $('#message').text(message);
        $('#message-div').fadeIn(200);
    });
}

function setListeners(){
    // Arrow key listeners
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
}

function removeListeners() {
    document.onkeydown = null;
    // Mobile listeners
    $('body').off('swipeleft',function(){
        leftMove();
    });
    $('body').off('swiperight',function(){
        rightMove();
    });
    $('body').off('swipeup',function(){
        upMove();
    });
    $('body').off('swipedown',function(){
        downMove();
    });
}
