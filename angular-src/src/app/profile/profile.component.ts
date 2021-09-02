import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShopService } from '../services/shop.service';
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
  shopInventory: any[] = []
  
  constructor(public userService: UserService, public shopService: ShopService, private router: Router) { }

  ngOnInit(): void {
    this.shopService.getShopItems().subscribe((res:any)=>{
      console.log(res)
      this.shopInventory = res.list
    })
    this.userService.getProfile().subscribe((res:any)=>{
      this.userService.user = res.user
      this.clock = setInterval(()=>{
        this.userService.user.money++;
      }, 1000)
    },
    (err)=>{
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
    var item = this.shopInventory.find((item)=> {return item.name == shopItem})
    if (item && item.price <= this.userService.user.money) {
      if (!this.userService.user.inventory) {
        this.userService.user.inventory = {}
      }
      if (item.name in this.userService.user.inventory) {
        this.userService.user.money -= item.price;
        this.userService.user.inventory[item.name] ++;
      } else {
        this.userService.user.money -= item.price;
        this.userService.user.inventory[item.name] = 1
      }
      this.userService.updateInventoryAndMoney().subscribe((res:any)=>{
        console.log(res)
      })
    }
  }
}
