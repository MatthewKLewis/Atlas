export class Tile {
    index: number;
    x: number;
    y: number;
    height: number;
    content: Array<any>;
    description: string;
  
    constructor(x: number, y: number, height: number, index: number) {
      this.index = index;
      this.x = x;
      this.y = y;
      this.height = height;
      this.content = [];
      this.description = 'mouse over a tile';
    }
  
    addHeight() {
      this.height++;
    }
  
    generateDescription() {
      switch (this.height) {
        case -2:
          this.description = 'city';
          break;
        case -1:
          this.description = 'deep sea';
          break;
        case 0:
          this.description = 'sea';
          break;
        case 1:
          this.description = 'tidewater';
          break;
        case 2:
          this.description = 'lowlands';
          break;
        case 3:
          this.description = 'plains';
          break;
        case 4:
          this.description = 'hills';
          break;
        case 5:
          this.description = 'ridges';
          break;
        case 6:
          this.description = 'heights';
          break;
        case 7:
          this.description = 'mountains';
          break;
        default:
          this.description = 'error';
          break;
      }
    }
  
    reduceHeight() {
      this.height--;
    }
  }