import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {

constructor(private http: HttpClient) { }


logInSwitch = false;

login(model: any) {
  if (model.username === 'miraj' && model.password === 'password') {
    this.logInSwitch = true;
    return true;
    
  }

  
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
