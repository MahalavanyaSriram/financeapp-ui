import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ErrorAlertService } from '../../_service/error-alert.service';


@Component({
    selector: 'errorAlert',
    templateUrl: 'error-alert.component.html'
})

export class ErrorAlertComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    message: any;

    constructor(private errorAlertService: ErrorAlertService) { }

    ngOnInit() {
        this.subscription = this.errorAlertService.getMessage().subscribe(message => { 
          console.log(message);
          return   this.message = message; 
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}