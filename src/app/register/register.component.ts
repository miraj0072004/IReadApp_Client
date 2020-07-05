import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { User } from '../_models/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter();
  user: User;
  registerForm: FormGroup;
  

 // @Input() valuesFromHome:any;
  constructor(private authService: AuthService,
              private alertifyService: AlertifyService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    // this.registerForm = new FormGroup ({
    //   username : new FormControl('', Validators.required),
    //   password : new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
    //   confirmPassword : new FormControl('', Validators.required)
    // }, this.passwordMatchValidator);

    
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      country: ['',Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    },{validator: this.passwordMatchValidator});
  }

  passwordMatchValidator( g: FormGroup)
  {
    return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch' : true};
  }

  register() {
    // console.log(this.model);
    // this.authService.register(this.model).subscribe(
    //   () => {
    //     //console.log('registration successful!');
    //     this.alertifyService.success('registration successful!');
    //   },
    //   (error) => {
    //     //console.log(error);
    //     this.alertifyService.error(error);
    //   }
    // );

    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);

      this.authService.register(this.user).subscribe(()=>
      {
        this.alertifyService.success('Registration successful');
      },
      (error) =>
      {
        this.alertifyService.error(error);
      }, () =>
      {
        this.authService.login(this.user).subscribe(()=>
        {
          this.router.navigate(['/browse']);
        });
      });
    }

    console.log(this.registerForm.value);
  }

  cancel() {
    // console.log('cancelled');
    this.cancelRegister.emit(false);
  }
}
