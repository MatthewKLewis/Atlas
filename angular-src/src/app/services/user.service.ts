import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  authToken: any;
  user: any;

  constructor(private http: HttpClient) {}

  storeUserData(token:any, user:any) {
    console.log('saving to local storage...')
    localStorage.setItem('id_token', token)
    localStorage.setItem('user', JSON.stringify(user))
    this.authToken = token;
    this.user = user
  }

  registerUser(user: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http
      .post('http://localhost:4100/users/register', user, { headers: headers })
  }

  logInUser(user: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http
      .post('http://localhost:4100/users/authenticate', {username: user.username, password: user.password}, { headers: headers })
  }

  checkExpired() {
    this.loadToken()
    const helper = new JwtHelperService()
    return helper.isTokenExpired(this.authToken)
  }

  logOutUser() {
    this.updateInventoryAndMoney().subscribe((res:any)=>{
      this.authToken = null
      this.user = null
      localStorage.clear()
    }, (err)=>{
      console.log(err)
      this.authToken = null;
      this.user = null
      localStorage.clear()
    })
  }

  getProfile(): Observable<any> {
    this.loadToken();
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authToken}`,
      'Content-Type': 'application/json'
    });
    return this.http.get('http://localhost:4100/users/profile', {headers: headers})
  }

  getInventory(): Observable<any> {
    this.loadToken();
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authToken}`,
      'Content-Type': 'application/json'
    });
    return this.http.get(`http://localhost:4100/inventoryItems/all/${this.user._id}`, {headers: headers})
  }


  addNewItem(): Observable<any> {
    return this.http.post('http://localhost:4100/inventoryItems/addNew', this.user)
  }

  updateInventoryAndMoney() {
    this.loadToken();
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authToken}`,
      'Content-Type': 'application/json'
    });
    return this.http.post('http://localhost:4100/users/updateInventoryAndMoney', this.user, {headers: headers}, )
  }
  
  loadToken() {
    const token = localStorage.getItem('id_token')
    this.authToken = token
  }
}
