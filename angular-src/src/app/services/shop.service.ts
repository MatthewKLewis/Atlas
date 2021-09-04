import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt'
import { UserService } from './user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShopService {

  constructor(private http: HttpClient, private userService: UserService) {}

  getShopItems(): Observable<any> {
    this.userService.loadToken();
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userService.authToken}`,
      'Content-Type': 'application/json'
    });
    return this.http.get('http://localhost:4100/shopItems/all', {headers: headers})
  }

}
