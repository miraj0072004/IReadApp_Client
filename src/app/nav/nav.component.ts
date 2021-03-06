import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {username:'miraj', password:'password'};
  constructor(public authService: AuthService,
              private alertifyService: AlertifyService) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(      
      next =>{
        this.alertifyService.success('Logged in successfully');
      },
      error => {
        //console.log('Failed to log in');
        //console.log(error);
        this.alertifyService.error(error);

      });
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout()
  {
    this.authService.logout();
  }

}
