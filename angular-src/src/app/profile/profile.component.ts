import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: any
  shopInventory: Map<string, any> = new Map()

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {

    //Shop Defaults
    this.shopInventory.set('gundarium', {name: 'gundarium', price: 5, description: 'lunar titanium alloy'})

    this.userService.getProfile().subscribe((res:any)=>{
      this.user = res.user
      setInterval(()=>{
        this.user.money++;
      }, 5000)
    },
    (err)=>{
      console.log('ERROR!')
      console.log(err)
    })
  }

  buy(shopItem: string) {
    var item = this.shopInventory.get(shopItem)
    if (item && item.price <= this.user.money) {
      this.user.money -= item.price;
      console.log(item)
    }
  }
}
