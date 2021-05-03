export class Terrain {
  tiles: Array<any>;
  count: number;
  iterations: number;
  edgeLength: number;

  constructor(side: number) {
    this.edgeLength = side;
    this.count = Math.sqrt(side);
    this.tiles = [];
    this.iterations = 0;
    for (let x = 0; x < this.count; x++) {
      for (let y = 0; y < this.count; y++) {
        this.tiles.push({
          x: x,
          y: y,
          i: Math.random() > 0.5 ? 0 : 1,
        });
      }
    }
    console.log(this.tiles);
  }

  findSurrounding() {
      
  }

  addLevel() {
    this.iterations++;
    var additor = this.iterations * 2 + 1;
    this.tiles.forEach((tile: any) => {
      if (tile.i != 0) {
        Math.random() > 0.5 + this.iterations / 10 ? tile.i++ : null;
      }
    });
  }
}
