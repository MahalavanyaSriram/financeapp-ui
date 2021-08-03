import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { LogInComponent } from './_components/log-in/log-in.component';
import { RegisterComponent } from './_components/register/register.component';
import { HeaderComponent } from './_components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { InvesmentsService } from './_service/invesments.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { LoginService } from './_service/login.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpCustomInterceptor } from './_Intreceptor/http-custom-interceptor';
import { FixedDepositComponent } from './_components/fixed-deposit/fixed-deposit.component';
import { CreateComponent } from './_components/create/create.component';
import { ErrorAlertComponent } from './_components/error-alert/error-alert.component';
import { ErrorInterceptor } from './_Intreceptor/ErrorInterceptor';
import { ErrorAlertService } from './_service/error-alert.service';
import { ClickStopPropagationDirective } from './_directives/click-stop-propagation.directive';
import { AlertComponent } from './_components/alert/alert.component';
import { AlertService } from './_service/alert.service';
import { ManageAlertsComponent } from './_components/manage-alerts/manage-alerts.component';
import { MutualFundComponent } from './_components/mutual-fund/mutual-fund.component';
import { ManageMutualFundsComponent } from './_components/manage-mutual-funds/manage-mutual-funds.component';
import { DeleteAlertComponent } from './_components/delete-alert/delete-alert.component';


@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    RegisterComponent,
    HeaderComponent,
    FixedDepositComponent,
    CreateComponent,
    ErrorAlertComponent,
    ClickStopPropagationDirective,
    AlertComponent,
    ManageAlertsComponent,
    MutualFundComponent,
    ManageMutualFundsComponent,
    DeleteAlertComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [InvesmentsService, LoginService, ErrorAlertService, AlertService,{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpCustomInterceptor,
    multi: true
  }, { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  entryComponents:[CreateComponent, ManageAlertsComponent, ManageMutualFundsComponent, DeleteAlertComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
