import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {

  user:any

  constructor(public userService: UserService) { }

  ngOnInit(): void {
    this.userService.getProfile().subscribe((res:any)=>{
      this.user = res.user
      this.user.maps.push({name: 'Mappy'})
      this.user.maps.push({name: 'Happy'})
      this.user.maps.push({name: 'Sappy'})
    }, (err)=>{
      console.log('ERROR!')
      console.log(err)
    })
  }
}
