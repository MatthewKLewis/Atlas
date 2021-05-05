import { Component, OnInit } from '@angular/core';
import { CanvasService } from '../services/canvas.service';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-add-map',
  templateUrl: 'add-map.component.html',
  styleUrls: ['./add-map.component.scss'],
})
export class AddMapComponent implements OnInit {
  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;

  addMapForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public canvasService: CanvasService,
    private userService: UserService,
    private router: Router
  ) {
    this.addMapForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    });
  }
  get name() {
    return this.addMapForm.get('name');
  }

  ngOnInit(): void {
    var root = document.querySelector('app-add-map');
    this.canvas = <HTMLCanvasElement>root?.querySelector('#canvas');
    this.ctx = <CanvasRenderingContext2D>this.canvas.getContext('2d');
    this.canvasService.initialize(this.canvas, this.ctx);
  }

  reload() {
    location.reload()
  }

  mouseOver(evt:any) {
    var mouseX = evt.pageX - evt.originalTarget.offsetLeft;
    var mouseY = evt.pageY - evt.originalTarget.offsetTop
    this.canvasService.focusTileAt(mouseX, mouseY)
  }

  saveImage() {
    var link = document.createElement('a');
    link.download = 'download.png';
    link.href = this.canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    link.click();
  }
}
