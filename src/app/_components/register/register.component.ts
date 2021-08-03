import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/_service/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router:Router,private loginService: LoginService ) { }

  ngOnInit() {
  }
 registrationForm = new FormGroup({
   firstname: new FormControl(''),
   lastname: new FormControl(''),
    username: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required])

  });
  registration(registrationForm: FormGroup) {

    this.loginService.registration({username: registrationForm.value.username,email: registrationForm.value.email ,password: registrationForm.value.password,firstname: registrationForm.value.firstname,lastname: registrationForm.value.lastname,role: 'user'})
    .pipe(first())
    .subscribe(
        data => {
            this.router.navigate(['/fixedDeposits']);
        },
        error => {
        this.registrationForm.reset();
           
        });
  }

}
