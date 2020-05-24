import { Router } from '@angular/router';
import { User } from './../_Models/user';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit, Input , Output, EventEmitter} from '@angular/core';
import { AlerifyService } from '../_services/alerify.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker/public_api';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
user: User ;
registerForm: FormGroup;
// Partial class makes all prperties optional
bsConfig: Partial <BsDatepickerConfig>;


@Output() cancelRegister = new EventEmitter();
  constructor(private authService: AuthService, private alertify: AlerifyService, private fb: FormBuilder , private router: Router) { }

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-red'
    },
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm =  this.fb.group({
      gender: ['male'],
      username: ['', Validators.required ],
      knownAs: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {validator: this.passwordMatchValidator});
  }
  passwordMatchValidator(g: FormGroup) {
 return  g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch': true };
  }


  register() {
    if (this.registerForm.valid) {
this.user = Object.assign({}, this.registerForm.value);
this.authService.register(this.user).subscribe( () => {
  this.alertify.success('registration successful');
    }, error => {
      this.alertify.error(error);

    }, () => {
      this.authService.login(this.user).subscribe( () => {
this.router.navigate(['/members']);
      });
    });

    }
  }
  cancel() {
    this.cancelRegister.emit(false);
}

}
