import { Tile } from './tile'

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
        this.tiles.push(
          new Tile(x, y, Math.random() < 0.50 ? 1 : 0, x + y * this.edgeLength)
        );
      }
    }
    this.smooth(4); //cellular automata
    this.elevate(5); //peak in middle
    this.addNoise(); //add noise
    this.shallowfy(); //make tidal shallows
    this.addCity(3); //add cities
    this.tiles.forEach((tile: Tile) => {
      tile.generateDescription();
    });
  }

  /** METHODS **/
  addCity(count: number) {
    for (let i = 0; i < count; i++) {
      var added = false;
      while (!added) {
        var tile = this.tiles[Math.floor(Math.random() * this.count + 1)];
        var surrounds = this.findSurroundingTiles(tile.index);
        if (
          surrounds.topTile &&
          surrounds.bottomTile &&
          surrounds.rightTile &&
          surrounds.leftTile
        ) {
          if (
            tile.height > 0 &&
            surrounds.topTile.height > 0 &&
            surrounds.bottomTile.height > 0 &&
            surrounds.rightTile.height > 0 &&
            surrounds.leftTile.height > 0
          ) {
            tile.height = -2;
            surrounds.topTile.height = -2;
            surrounds.bottomTile.height = -2;
            surrounds.rightTile.height = -2;
            surrounds.leftTile.height = -2;
            added = true;
          }
        }
      }
    }
  }

  addNoise() {
    this.tiles.forEach((tile: Tile) => {
      if (tile.height != 0 && Math.random() > 0.5) tile.addHeight();
      if (tile.height == 0 && Math.random() > 0.3) tile.reduceHeight();
    });
  }

  elevate(level: number) {
    var height = 1;
    for (let i = 1; i <= level; i++) {
      this.tiles.forEach((tile: any) => {
        var surroundingTiles = this.findSurroundingTiles(tile.index);
        if (
          tile.height > 0 &&
          surroundingTiles.position == 'middle' &&
          surroundingTiles.topTile.height >= height &&
          surroundingTiles.bottomTile.height >= height &&
          surroundingTiles.leftTile.height >= height &&
          surroundingTiles.rightTile.height >= height
        ) {
          tile.addHeight();
        }
      });
      height++;
    }
  }

  shallowfy() {
    this.tiles.forEach((tile: any) => {
      var surroundingTiles = this.findSurroundingTiles(tile.index);
      if ((tile.height <= 0 && surroundingTiles.position == 'middle') && (
        surroundingTiles.topTile.height >= 1 ||
        surroundingTiles.bottomTile.height >= 1 ||
        surroundingTiles.leftTile.height >= 1 ||
        surroundingTiles.rightTile.height >= 1)) {
        tile.height = 0;
      }
    });
  }

  findSurroundingTiles(tileIndex: number) {
    var surroundingTiles = {
      topTile: new Tile(-1, -1, -1, -1),
      bottomTile: new Tile(-1, -1, -1, -1),
      leftTile: new Tile(-1, -1, -1, -1),
      rightTile: new Tile(-1, -1, -1, -1),
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

  getTileIndexFromCoords(x: number, y: number) {
    var tileIndex = x + y * this.edgeLength;
    return tileIndex;
  }

  smooth(iterations: number) {
    for (let j = 0; j < iterations; j++) {
      for (let i = 0; i < this.count; i++) {
        var surroundingTiles = this.findSurroundingTiles(i);
        switch (surroundingTiles.position) {
          case 'top-left':
            if (
              surroundingTiles.rightTile.height ==
              surroundingTiles.bottomTile.height
            ) {
              this.tiles[i].height = surroundingTiles.rightTile.height;
            }
            break;
          case 'top-right':
            if (
              surroundingTiles.leftTile.height ==
              surroundingTiles.bottomTile.height
            ) {
              this.tiles[i].height = surroundingTiles.leftTile.height;
            }
            break;
          case 'bot-left':
            if (
              surroundingTiles.topTile.height ==
              surroundingTiles.rightTile.height
            ) {
              this.tiles[i].height = surroundingTiles.topTile.height;
            }
            break;
          case 'bot-right':
            if (
              surroundingTiles.topTile.height ==
              surroundingTiles.leftTile.height
            ) {
              this.tiles[i].height = surroundingTiles.topTile.height;
            }
            break;
          case 'top-edge':
            if (
              surroundingTiles.leftTile.height ==
                surroundingTiles.bottomTile.height &&
              surroundingTiles.leftTile.height ==
                surroundingTiles.rightTile.height
            ) {
              this.tiles[i].height = surroundingTiles.leftTile.height;
            }
            break;
          case 'bot-edge':
            if (
              surroundingTiles.leftTile.height ==
                surroundingTiles.topTile.height &&
              surroundingTiles.leftTile.height ==
                surroundingTiles.rightTile.height
            ) {
              this.tiles[i].height = surroundingTiles.leftTile.height;
            }
            break;
          case 'right-edge':
            if (
              surroundingTiles.leftTile.height ==
                surroundingTiles.topTile.height &&
              surroundingTiles.leftTile.height ==
                surroundingTiles.bottomTile.height
            ) {
              this.tiles[i].height = surroundingTiles.leftTile.height;
            }
            break;
          case 'left-edge':
            if (
              surroundingTiles.rightTile.height ==
                surroundingTiles.topTile.height &&
              surroundingTiles.rightTile.height ==
                surroundingTiles.bottomTile.height
            ) {
              this.tiles[i].height = surroundingTiles.rightTile.height;
            }
            break;
          case 'middle':
            var sum = 0;
            if (surroundingTiles.topTile.height > 0) sum++;
            if (surroundingTiles.bottomTile.height > 0) sum++;
            if (surroundingTiles.leftTile.height > 0) sum++;
            if (surroundingTiles.rightTile.height > 0) sum++;

            if (sum <= 1) this.tiles[i].height = 0;
            if (sum >= 3) this.tiles[i].height = 1;
            break;
          default:
            console.log('ERROR');
        }
      }
    }
  }
}