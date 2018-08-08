var GRID_SIZE = 4;
var table = [];
var FOUR_CHANCE = 0.15;
var score = 0;

var CLASSES = [
    'tile grey lighten-5',
    'tile orange lighten-5',
    'tile orange lighten-4',
    'tile orange lighten-3',
    'tile orange lighten-2',
    'tile orange lighten-1',
    'tile orange',
    'tile orange darken-1',
    'tile orange darken-2',
    'tile orange darken-3',
    'tile orange darken-4',
    'tile orange darken-5',
    
];

class Tile {
    constructor (element, value, coordinate) {
        this.value = value;
        this.elem = element;
        this.coordinate = coordinate;
        this.height = 0;
    }
	// Doubles the value of the Tile 
    incrementValue () {
        this.value = this.value * 2;
        this.elem.childNodes[0].innerHTML = this.value;
        updateScore(this.value);
        this.height++;
        this.elem.childNodes[0].className = CLASSES[this.height];
    }
	// Resets the value to blank state
	reset () {
		this.value = null;
        this.height = 0;
		this.elem.childNodes[0].innerHTML = ' ';
        this.elem.childNodes[0].className = 'tile';
	}
    setValue(val){
        this.value = val;
        this.elem.childNodes[0].innerHTML = val;
        var h = 0;
        while(val > 2){
            h++;
            val /=2;
        }
        this.height = h;
        this.elem.childNodes[0].className = CLASSES[this.height];
    }
}

Tile.prototype.toString = function tileToString (){
    return this.value;
};
