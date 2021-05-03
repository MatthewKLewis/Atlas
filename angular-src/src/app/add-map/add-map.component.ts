import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

  canvas!: HTMLCanvasElement
  ctx!: CanvasRenderingContext2D

  addMapForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.addMapForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    });
  }
  get name() {    return this.addMapForm.get('name');  }

  ngOnInit(): void {
    var root = document.querySelector('app-add-map')
    this.canvas = <HTMLCanvasElement>root?.querySelector('#canvas')
    this.ctx = <CanvasRenderingContext2D>this.canvas.getContext('2d')
    console.log(this.canvas.width, this.canvas.height)
    
    this.ctx.fillStyle = 'blue'
    this.ctx.fillRect(10,10,10,10)
  }

  onSubmit() {}
}
