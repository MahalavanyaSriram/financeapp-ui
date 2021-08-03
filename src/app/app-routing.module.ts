import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './_components/log-in/log-in.component';
import { RegisterComponent } from './_components/register/register.component';
import { FixedDepositComponent } from './_components/fixed-deposit/fixed-deposit.component';
import { AlertComponent } from './_components/alert/alert.component';
import { MutualFundComponent } from './_components/mutual-fund/mutual-fund.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', component: LogInComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'fixedDeposits', component: FixedDepositComponent },
  {path: 'mutualFunds', component: MutualFundComponent },
  { path: 'alerts', component: AlertComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
