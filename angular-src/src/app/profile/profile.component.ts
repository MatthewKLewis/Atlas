import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShopService } from '../services/shop.service';
import { UserService } from '../services/user.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  @HostListener('window:beforeunload', ['$event']) unloadHandler(event: Event) {
    this.userService.updateInventoryAndMoney().subscribe((res: any) => {
      console.log(res);
    });
    event.returnValue = false;
  }

  clock: any;
  shopInventory: any[] = [];
  craftingBench: any[] = [];

  constructor(
    public userService: UserService,
    public shopService: ShopService,
    private router: Router
  ) {}

  ngOnInit(): void {
    forkJoin([
      this.shopService.getShopItems(),
      this.userService.getProfile()
    ]).subscribe(([shop, prof])=>{
      this.shopInventory = shop.list;
      this.userService.user = prof.user;
      this.clock = setInterval(() => {
        this.tick()
      }, 10000);
    })
  }
  ngOnDestroy() {
    clearInterval(this.clock);
    this.userService.updateInventoryAndMoney().subscribe((res: any) => {
      console.log(res);
    });
  }

  tick() {
    this.userService.user.money += 1;
  }

  buy(shopItem: string) {
    var item = this.shopInventory.find((item) => {
      return item.name == shopItem;
    });
    if (item && item.price <= this.userService.user.money) {
      //array based inventory
      this.userService.user.money -= item.price;
      this.userService.user.inventory.push({
        name: item.name,
        value: item.price,
      });
      this.userService.updateInventoryAndMoney().subscribe((res: any) => {
        console.log(res);
      });
    }
  }
  sell(e: any, item: any) {
    var foundIndex = this.userService.user.inventory.findIndex(
      (el: any) => el.name == item.key
    );
    if (foundIndex != -1) {
      this.userService.user.money +=
        this.userService.user.inventory[foundIndex].value * 0.7;
      this.userService.user.inventory.splice(foundIndex, 1);
    } else {
      console.log('not in inventory error!');
    }
  }

  //Display
  returnStackedInventory(): Map<string, number> {
    this.userService.sortInventory();
    var stackedInventory: Map<string, number> = new Map();
    var current = { name: 'error' };
    var cnt = 0;
    for (var i = 0; i < this.userService.user.inventory.length; i++) {
      if (this.userService.user.inventory[i].name != current.name) {
        if (cnt > 0) {
          //console.log(current.name + ' comes --> ' + cnt + ' times');
          stackedInventory.set(current.name, cnt);
        }
        current.name = this.userService.user.inventory[i].name;
        cnt = 1;
      } else {
        cnt++;
      }
    }
    if (cnt > 0) {
      //console.log(current.name + ' COMES --> ' + cnt + ' times');
      stackedInventory.set(current.name, cnt);
    }
    return stackedInventory;
  }
}
