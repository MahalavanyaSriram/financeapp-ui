import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../_service/login.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { ErrorAlertService } from '../../_service/error-alert.service';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  loading: boolean;
  returnUrl: any;

  constructor(private loginService: LoginService, private router: Router, private route: ActivatedRoute, private errorAlertService: ErrorAlertService) { }

  ngOnInit() {
    // reset login status
    this.loginService.cacheRefresh();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }
  loginForm = new FormGroup({
    username: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required])

  });
  login(loginformValue: FormGroup) {
    this.loading = true;
    this.loginService.login({
      username: btoa(loginformValue.value.username),
      password: btoa(loginformValue.value.password)
    })
    .pipe(first())
    .subscribe(
        data => {
            this.router.navigate(['/fixedDeposits']);
        },
        error => {
            this.errorAlertService.error(error);
        this.loginForm.reset();
            this.loading = false;
        });
  }

}
