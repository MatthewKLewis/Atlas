import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    this.userService.updateInventoryAndMoney().subscribe((res:any)=>{
      console.log(res)
    })
    event.returnValue = false;
  }

  clock: any
  shopInventory: Map<string, any> = new Map()
  
  constructor(public userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.shopInventory.set('gundarium', {name: 'gundarium', price: 5, description: 'lunar titanium alloy'})

    this.userService.getProfile().subscribe((res:any)=>{
      this.userService.user = res.user
      this.clock = setInterval(()=>{
        this.userService.user.money++;
      }, 1000)
    },
    (err)=>{
      console.log('ERROR!')
      console.log(err)
    })
  }

  ngOnDestroy() {
    clearInterval(this.clock)
    this.userService.updateInventoryAndMoney().subscribe((res:any)=>{
      console.log(res)
    })
  }

  buy(shopItem: string) {
    var item = this.shopInventory.get(shopItem)
    if (item && item.price <= this.userService.user.money) {
      this.userService.user.money -= item.price;
      this.userService.user.inventory.push(item)
      console.log(item)
      this.userService.updateInventoryAndMoney().subscribe((res:any)=>{
        console.log(res)
      })
    }
  }
}
