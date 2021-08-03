import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FixedDeposit } from '../_model/fixeddeposit';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { map , delay} from 'rxjs/operators';
import { InstitutionObject } from '../_model/institution';
import { MutualFund } from '../_model/mutualfund';
import { config } from '../config';


@Injectable({
 
  providedIn: 'root'
})
export class InvesmentsService {
  private options = { headers: new HttpHeaders().append('Content-Type', 'application/json')};
  private baseUrl:string = `${config.apiUrl}/investments`;
  constructor( private http:HttpClient) { }
  getAllInvestments(): Observable<FixedDeposit[]> {
    const getAllUrl = `${this.baseUrl}/fd/getAll`;
    return this.http.get(getAllUrl,this.options).pipe(map(response => response as FixedDeposit[]));
  }
  addInvestment(investment: FixedDeposit){
    const addUrl = `${this.baseUrl}/fd/save`;
    return this.http.post(addUrl,investment,this.options).toPromise().then(response => response as Response).
    catch(err => this.handleError(err));
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
  getAllInstitution(): Promise<InstitutionObject[]> {
    const getInstitutions = `${this.baseUrl}/getInstitutions`;
    return this.http.get(getInstitutions,this.options).toPromise().then(response => response as InstitutionObject[]);
  }
  checkIvestmentId(investmentId: String):  Observable<any> {
    const addUrl = `${this.baseUrl}/fd/isValid`;
    return this.http.post(addUrl,JSON.stringify({ investmentId: investmentId}),this.options);
  }
  getAllMutualFunds(): Observable<MutualFund[]> {
    const getAllUrl = `${this.baseUrl}/mf/getAll`;
    return this.http.get(getAllUrl,this.options).pipe(map(response => response as MutualFund[]));
  }
  addAllMutualFunds(mutualfund: MutualFund){
    const addUrl = `${this.baseUrl}/mf/save`;
    return this.http.post(addUrl,mutualfund,this.options).toPromise().then(response => response as Response).
    catch(err => this.handleError(err));
  }
  checkMutualFundId(folioNumber: String):  Observable<any> {
    const addUrl = `${this.baseUrl}/mf/isValid`;
    return this.http.post(addUrl,JSON.stringify({ folioNumber: folioNumber}),this.options);
  }
  deleteInvestments(investmentid: String){
    const addUrl = `${this.baseUrl}/fd/delete`;
    return this.http.post(addUrl,JSON.stringify({ id: investmentid}),this.options).toPromise().
    catch(err => this.handleError(err));
  }
  deleteMutualFund(mutualfundid: String){
    const addUrl = `${this.baseUrl}/mf/delete`;
    return this.http.post(addUrl,JSON.stringify({ folioNumber: mutualfundid}),this.options).toPromise().
    catch(err => this.handleError(err));
  }
}

