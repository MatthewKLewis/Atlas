import { Injectable } from '@angular/core';
import { Terrain } from '../models/terrain';

const GRID_SIZE = 20;

@Injectable({
  providedIn: 'root',
})
export class CanvasService {
  ctx: any;
  terrain: Terrain;

  constructor() {
    this.terrain = new Terrain(400);
  }

  initialize(guestCtx: CanvasRenderingContext2D) {
    this.ctx = guestCtx;
    this.render()
  }

  addLevel() {
    this.terrain.addLevel();
    this.render();
  }

  render() {
    this.terrain.tiles.forEach((tile: any) => {
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
        default:
          this.ctx.fillStyle = 'yellow';
          break;
      }
      this.ctx.fillRect(
        tile.x * GRID_SIZE,
        tile.y * GRID_SIZE,
        GRID_SIZE,
        GRID_SIZE
      );
    });
  }
}
