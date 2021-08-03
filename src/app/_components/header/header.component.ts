import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../_service/login.service';
import { Router } from '@angular/router';
import { ErrorAlertService } from 'src/app/_service/error-alert.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor( public loginService : LoginService, private router:Router , private errorAlertService : ErrorAlertService) { }
  displayStatus:boolean;
  ngOnInit() {
  }
  logout() {
this.loginService.logout().subscribe(
      data => {
          this.router.navigate(['/login']);
      },
      error => {
          this.errorAlertService.error(error);
      
      });;;
}

}
