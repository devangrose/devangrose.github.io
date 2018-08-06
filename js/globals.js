var GRID_SIZE = 4;
var table = [];
var FOUR_CHANCE = 0.15;

class Tile {
    constructor (element, value, coordinate) {
    this.value = value;
    this.elem = element;
    this.coordinate = coordinate;
    }
    incrementValue () {
        this.value = this.value * 2;
        this.elem.innerHTML = this.value;
    }
	kill () {
		this.value = null;
		this.elem.innerHTML = '';
	}
}
