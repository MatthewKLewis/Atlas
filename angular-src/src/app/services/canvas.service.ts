import { Injectable } from '@angular/core';
import { Terrain, Tile } from '../models/terrain';

const GRID_SQUARE_SIZE = 6;
const GRID_EDGE_SIZE = 100;

@Injectable({
  providedIn: 'root',
})
export class CanvasService {

  ctx: any;
  canvas: any;
  terrain: Terrain;
  mousedTile: Tile = new Tile(-1,-1,-1,-1)

  defaultColors: Array<string> = ['#0c1b33', '#0d2c55', '#176814', 'green', '#92d822', 'yellow', '#f09928', '#fad6c1', 'white', 'red']
  randomColors: Array<string> = []

  constructor() {
    this.terrain = new Terrain(GRID_EDGE_SIZE);
  }

  initialize(guestCanvas: HTMLCanvasElement, guestCtx: CanvasRenderingContext2D) {
    this.ctx = guestCtx;
    this.canvas = guestCanvas
    this.canvas.width = GRID_SQUARE_SIZE * GRID_EDGE_SIZE
    this.canvas.height = GRID_SQUARE_SIZE * GRID_EDGE_SIZE
    for (let i = 0; i < 8; i++) {
      this.randomColors.push(this.returnRandomColor())    
    }
    this.render()
  }

  focusTileAt(x:number, y:number) {
    var pixelToGridX = Math.floor(x / GRID_SQUARE_SIZE)
    var pixelToGridY = Math.floor(y / GRID_SQUARE_SIZE)
    for (let i = 0; i < this.terrain.tiles.length; i++) {
      if (this.terrain.tiles[i].x == pixelToGridX && this.terrain.tiles[i].y == pixelToGridY) {
        this.mousedTile = this.terrain.tiles[i]
      }
    }
  }

  addNoise() {
    this.terrain.addNoise()
    this.render()
  }

  render() {
    this.terrain.tiles.forEach((tile: Tile) => {
      switch (tile.height) {
        case -2:
          this.ctx.fillStyle = this.defaultColors[9];
          //this.ctx.fillStyle = this.randomColors[0];
          break;
        case -1:
          this.ctx.fillStyle = this.defaultColors[0];
          //this.ctx.fillStyle = this.randomColors[0];
          break;
        case 0:
          this.ctx.fillStyle = this.defaultColors[1];
          //this.ctx.fillStyle = this.randomColors[1];
          break;
        case 1:
          this.ctx.fillStyle = this.defaultColors[2];
          //this.ctx.fillStyle = this.randomColors[2];
          break;
        case 2:
          this.ctx.fillStyle = this.defaultColors[3];
          //this.ctx.fillStyle = this.randomColors[3];
          break;
        case 3:
          this.ctx.fillStyle = this.defaultColors[4];
          //this.ctx.fillStyle = this.randomColors[4];
          break;
        case 4:
          this.ctx.fillStyle = this.defaultColors[5];
          //this.ctx.fillStyle = this.randomColors[5];
          break;
        case 5:
          this.ctx.fillStyle = this.defaultColors[6];
          //this.ctx.fillStyle = this.randomColors[6];
          break;
        case 6:
          this.ctx.fillStyle = this.defaultColors[7];
          //this.ctx.fillStyle = this.randomColors[6];
          break;
        default:
          this.ctx.fillStyle = this.defaultColors[8];
          //this.ctx.fillStyle = this.randomColors[7];
          break;
      }
      this.ctx.fillRect(
        tile.x * GRID_SQUARE_SIZE,
        tile.y * GRID_SQUARE_SIZE,
        GRID_SQUARE_SIZE,
        GRID_SQUARE_SIZE
      );
    });
  }

  returnRandomColor() {
    var colorString = '#'
    var possibleChars = '0123456789abcdef'
    var pCharArray = possibleChars.split('')

    for (let i = 1; i <= 6; i++) {
      colorString = colorString.concat(pCharArray[Math.floor((Math.random() * pCharArray.length))])
    }
    return colorString
  }
}
