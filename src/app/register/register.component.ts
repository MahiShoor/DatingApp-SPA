import { AuthService } from './../_services/auth.service';
import { Component, OnInit, Input , Output, EventEmitter} from '@angular/core';
import { AlerifyService } from '../_services/alerify.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
model: any = {};

@Output() cancelRegister = new EventEmitter();
  constructor(private authService: AuthService, private alertify: AlerifyService) { }

  ngOnInit() {
  }
  register() {
    this.authService.register(this.model).subscribe(() => {
     this.alertify.success('registration successful');
      }, error => {
        this.alertify.error(error);

      }

      );
    console.log(this.model);
  }
  cancel() {
    this.cancelRegister.emit(false);
}

}
