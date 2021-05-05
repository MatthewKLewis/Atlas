export class Tile {
  x: number;
  y: number;
  i: number;
  content: Array<any>;

  constructor(x: number, y: number, i: number) {
    this.x = x;
    this.y = y;
    this.i = i;
    this.content = [];
  }

  addHeight(chance: number) {
    if (this.i != 0) {
      Math.random() < chance ? this.i++ : null;
    }
  }
}

export class Terrain {
  tiles: Array<Tile>;
  count: number;
  iterationsAdded: number;
  edgeLength: number;

  constructor(side: number) {
    this.edgeLength = side;
    this.count = side * side;
    this.tiles = [];
    this.iterationsAdded = 0;
    for (let y = 0; y < this.edgeLength; y++) {
      for (let x = 0; x < this.edgeLength; x++) {
        this.tiles.push(new Tile(x, y, Math.random() < 0.5 ? 1 : 0));
      }
    }
    this.smooth(3);
    this.addLevel(3);
  }

  findSurroundingTiles(tileIndex: number) {
    var surroundingTiles = {
      topTile: new Tile(-1, -1, -1),
      bottomTile: new Tile(-1, -1, -1),
      leftTile: new Tile(-1, -1, -1),
      rightTile: new Tile(-1, -1, -1),
      position: 'error',
    };
    if (this.tiles[tileIndex].x == 0 && this.tiles[tileIndex].y == 0) {
      //add right and bottom
      surroundingTiles.rightTile = this.tiles[tileIndex + 1];
      surroundingTiles.bottomTile = this.tiles[tileIndex + this.edgeLength];
      surroundingTiles.position = 'top-left';
      return surroundingTiles;
    } else if (
      this.tiles[tileIndex].x == this.edgeLength - 1 &&
      this.tiles[tileIndex].y == this.edgeLength - 1
    ) {
      //add left and top
      surroundingTiles.leftTile = this.tiles[tileIndex - 1];
      surroundingTiles.topTile = this.tiles[tileIndex - this.edgeLength];
      surroundingTiles.position = 'bot-right';
      return surroundingTiles;
    } else if (
      this.tiles[tileIndex].x == 0 &&
      this.tiles[tileIndex].y == this.edgeLength - 1
    ) {
      //add right and top
      surroundingTiles.rightTile = this.tiles[tileIndex + 1];
      surroundingTiles.topTile = this.tiles[tileIndex - this.edgeLength];
      surroundingTiles.position = 'bot-left';
      return surroundingTiles;
    } else if (
      this.tiles[tileIndex].x == this.edgeLength - 1 &&
      this.tiles[tileIndex].y == 0
    ) {
      //add left and bottom
      surroundingTiles.leftTile = this.tiles[tileIndex - 1];
      surroundingTiles.bottomTile = this.tiles[tileIndex + this.edgeLength];
      surroundingTiles.position = 'top-right';
      return surroundingTiles;
    } else if (this.tiles[tileIndex].x == 0) {
      //return top right bottom
      surroundingTiles.topTile = this.tiles[tileIndex - this.edgeLength];
      surroundingTiles.rightTile = this.tiles[tileIndex + 1];
      surroundingTiles.bottomTile = this.tiles[tileIndex + this.edgeLength];
      surroundingTiles.position = 'left-edge';
      return surroundingTiles;
    } else if (this.tiles[tileIndex].y == 0) {
      //return left bottom right
      surroundingTiles.leftTile = this.tiles[tileIndex - 1];
      surroundingTiles.bottomTile = this.tiles[tileIndex + this.edgeLength];
      surroundingTiles.rightTile = this.tiles[tileIndex + 1];
      surroundingTiles.position = 'top-edge';
      return surroundingTiles;
    } else if (this.tiles[tileIndex].y == this.edgeLength - 1) {
      //return left top right
      surroundingTiles.leftTile = this.tiles[tileIndex - 1];
      surroundingTiles.topTile = this.tiles[tileIndex - this.edgeLength];
      surroundingTiles.rightTile = this.tiles[tileIndex + 1];
      surroundingTiles.position = 'bot-edge';
      return surroundingTiles;
    } else if (this.tiles[tileIndex].x == this.edgeLength - 1) {
      //return top bottom left
      surroundingTiles.topTile = this.tiles[tileIndex - this.edgeLength];
      surroundingTiles.leftTile = this.tiles[tileIndex - 1];
      surroundingTiles.bottomTile = this.tiles[tileIndex + this.edgeLength];
      surroundingTiles.position = 'right-edge';
      return surroundingTiles;
    } else {
      //return 4
      surroundingTiles.topTile = this.tiles[tileIndex - this.edgeLength];
      surroundingTiles.rightTile = this.tiles[tileIndex + 1];
      surroundingTiles.bottomTile = this.tiles[tileIndex + this.edgeLength];
      surroundingTiles.leftTile = this.tiles[tileIndex - 1];
      surroundingTiles.position = 'middle';
      return surroundingTiles;
    }
  }

  addLevel(iterations:number) {
    for (let i = 0; i < iterations; i++) {
      this.iterationsAdded++;
      this.tiles.forEach((tile: any) => {
        tile.addHeight(0.5 - (this.iterationsAdded / 10));
      });    
    }
  }

  smooth(iterations:number) {
    for (let j = 0; j < iterations; j++) {
      for (let i = 0; i < this.count; i++) {
        var surroundingTile = this.findSurroundingTiles(i);
        switch (surroundingTile.position) {
          case 'top-left':
            if (surroundingTile.rightTile.i == surroundingTile.bottomTile.i) {
              this.tiles[i].i = surroundingTile.rightTile.i;
            }
            break;
          case 'top-right':
            if (surroundingTile.leftTile.i == surroundingTile.bottomTile.i) {
              this.tiles[i].i = surroundingTile.leftTile.i;
            }
            break;
          case 'bot-left':
            if (surroundingTile.topTile.i == surroundingTile.rightTile.i) {
              this.tiles[i].i = surroundingTile.topTile.i;
            }
            break;
          case 'bot-right':
            if (surroundingTile.topTile.i == surroundingTile.leftTile.i) {
              this.tiles[i].i = surroundingTile.topTile.i;
            }
            break;
          case 'top-edge':
            if (
              surroundingTile.leftTile.i == surroundingTile.bottomTile.i &&
              surroundingTile.leftTile.i == surroundingTile.rightTile.i
            ) {
              this.tiles[i].i = surroundingTile.leftTile.i;
            }
            break;
          case 'bot-edge':
            if (
              surroundingTile.leftTile.i == surroundingTile.topTile.i &&
              surroundingTile.leftTile.i == surroundingTile.rightTile.i
            ) {
              this.tiles[i].i = surroundingTile.leftTile.i;
            }
            break;
          case 'right-edge':
            if (
              surroundingTile.leftTile.i == surroundingTile.topTile.i &&
              surroundingTile.leftTile.i == surroundingTile.bottomTile.i
            ) {
              this.tiles[i].i = surroundingTile.leftTile.i;
            }
            break;
          case 'left-edge':
            if (
              surroundingTile.rightTile.i == surroundingTile.topTile.i &&
              surroundingTile.rightTile.i == surroundingTile.bottomTile.i
            ) {
              this.tiles[i].i = surroundingTile.rightTile.i;
            }
            break;
          case 'middle':
            var sum = 0
            if (surroundingTile.topTile.i > 0) sum++
            if (surroundingTile.bottomTile.i > 0) sum++
            if (surroundingTile.leftTile.i > 0) sum++
            if (surroundingTile.rightTile.i > 0) sum++
            if (sum <= 1) this.tiles[i].i = 0
            if (sum >= 3) this.tiles[i].i = 1
            break;
          default:
            console.log('ERROR');
        }
      }
    }
  }    
}
