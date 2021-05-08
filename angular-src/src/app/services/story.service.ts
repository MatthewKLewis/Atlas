import { Injectable } from '@angular/core';
import { Timeline } from '../models/timeline'

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  history: Timeline

  constructor() {
    this.history = new Timeline(0, 100)
   }

  initialize() {
    console.log(this.history)
  }
}
