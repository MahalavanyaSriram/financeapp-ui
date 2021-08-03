import { Injectable } from '@angular/core';
import { Alert } from '../_model/alert';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlerttypeObject } from '../_model/alerttypes';
import { config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private options = { headers: new HttpHeaders().append('Content-Type', 'application/json')};
private baseUrl:string = `${config.apiUrl}/alerts`;
  constructor( private http:HttpClient) { }
  getAllAlerts(): Observable<Alert[]> {
    const getAllUrl = `${this.baseUrl}/getAll`;
    return this.http.get(getAllUrl,this.options).pipe(map(response => response as Alert[]));
  }
  addAlert(alert: Alert){
    const addUrl = `${this.baseUrl}/save`;
    return this.http.post(addUrl,alert,this.options).toPromise().then(response => response as Response).
    catch(err => this.handleError(err));
  }
  getAlertTypes(): Promise<AlerttypeObject[]> {
    const getAlertTypes = `${this.baseUrl}/getAlertTypes`;
    return this.http.get(getAlertTypes,this.options).toPromise().then(response => response as AlerttypeObject[]);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
  
}
