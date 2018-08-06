var GRID_SIZE = 4;
var table = [];
var FOUR_CHANCE = 0.15;

class Tile {
    constructor (element, value, coordinate) {
    this.value = value;
    this.elem = element;
    this.coordinate = coordinate;
    }
	// Doubles the value of the Tile 
    incrementValue () {
        this.value = this.value * 2;
        this.elem.innerHTML = this.value;
    }

	// Resets the value to blank state
	reset () {
		this.value = null;
		this.elem.innerHTML = '';
	}
    setValue(val){
        this.value = val;
        this.elem.innerHTML = val;
    }
}


var pika = new Pokemon (100, [moves['tackle'],moves['thundershock']],img);
