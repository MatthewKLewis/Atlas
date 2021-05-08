import { Component, OnInit } from '@angular/core';
import { StoryService } from '../services/story.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  constructor(public storyService: StoryService) { }

  ngOnInit(): void {
    this.storyService.initialize()
  }

}
