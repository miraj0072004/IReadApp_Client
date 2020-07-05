import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/user';
import { Observable, Observer } from 'rxjs';

@Injectable()
export class AuthService {

register(user: User) {
  if (user.username === 'miraj' && user.password === 'password') {
    //this.logInSwitch = true;
    //Observable.create((observer: Observer<boolean>) => {observer.next(true)});
    return Observable.create((observer: Observer<boolean>) => {observer.next(true),observer.complete()});
  }
  return Observable.create((observer: Observer<boolean>) => {observer.error('Registration Failed')});
}

constructor(private http: HttpClient) { }


logInSwitch = false;

login(model: any) {
  if (model.username === 'miraj' && model.password === 'password') {
    this.logInSwitch = true;
    //Observable.create((observer: Observer<boolean>) => {observer.next(true)});
    return Observable.create((observer: Observer<boolean>) => {observer.next(true)});
  }
  return Observable.create((observer: Observer<boolean>) => {observer.error('Invalid credentials')});
}

loggedIn()
{
  return this.logInSwitch;
}

logout()
{
    this.logInSwitch = false;
}
}
