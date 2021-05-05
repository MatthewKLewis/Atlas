import { Injectable } from '@angular/core';
import { Terrain, Tile } from '../models/terrain';

const GRID_SQUARE_SIZE = 8;
const GRID_EDGE_SIZE = 60

@Injectable({
  providedIn: 'root',
})
export class CanvasService {

  ctx: any;
  canvas: any;
  terrain: Terrain;
  mousedTile: Tile = new Tile(-1,-1,-1)

  constructor() {
    this.terrain = new Terrain(GRID_EDGE_SIZE);
  }

  initialize(guestCanvas: HTMLCanvasElement, guestCtx: CanvasRenderingContext2D) {
    this.ctx = guestCtx;
    this.canvas = guestCanvas
    this.canvas.width = GRID_SQUARE_SIZE * GRID_EDGE_SIZE
    this.canvas.height = GRID_SQUARE_SIZE * GRID_EDGE_SIZE
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

  render() {
    this.terrain.tiles.forEach((tile: Tile) => {
      switch (tile.i) {
        case 0:
          this.ctx.fillStyle = 'blue';
          break;
        case 1:
          this.ctx.fillStyle = 'aquamarine';
          break;
        case 2:
          this.ctx.fillStyle = 'green';
          break;
        case 3:
          this.ctx.fillStyle = 'chartreuse';
          break;
        case 4:
          this.ctx.fillStyle = 'yellow';
          break;
        case 5:
          this.ctx.fillStyle = 'orange';
          break;
        default:
          this.ctx.fillStyle = 'pink';
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
}
