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
  inventory: any[] = [];
  shopInventory: any[] = [];

  showAll: boolean = false;

  constructor(
    public userService: UserService,
    public shopService: ShopService
  ) {}

  ngOnInit(): void {
    forkJoin([
      this.shopService.getShopItems(),
      this.userService.getProfile(),
    ]).subscribe(([shop, prof]) => {
      this.shopInventory = shop.list;
      this.userService.user = prof.user;
      this.userService.getInventory().subscribe((res:any)=>{
        this.inventory = res.list
        this.showAll = true;
      })
      this.clock = setInterval(() => {
        this.tick();
      }, 10000);
    });
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
      this.userService.user.money -= item.price;
      this.userService.addNewItem().subscribe((res: any) => {
        this.userService.user.inventory.push({ _id: res.item._id });
        this.inventory.push(res.item);
      });
    }
  }
  sell(e: any, item: any) {}
}
