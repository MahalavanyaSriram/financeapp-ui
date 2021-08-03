import { Injectable, HostListener } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { map, tap, mapTo, catchError } from 'rxjs/operators';
import { Tokens } from '../_model/tokens';
import { config } from '../config';

@Injectable()
export class LoginService {
    constructor(private http: HttpClient) { }
    private readonly JWT_TOKEN = 'JWT_TOKEN';
    private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
    private readonly REFRESH_TOKEN_EXPIRY = 'REFRESH_TOKEN_EXPIRY';
    public loggedUser: string;
    public loggedUserName: string;
    private decoded: any;
    loginStatus: boolean = false;
    tokenInfo: any;
    private options = { headers: new HttpHeaders().append('Content-Type', 'application/json') };

    login(user: { username: string, password: string }): Observable<boolean> {
        console.log('inside login');
        return this.http.post<any>(`${config.apiUrlAuth}/login`, user, this.options)
            .pipe(
                tap(tokens => this.doLoginUser(user.username, tokens)),
                mapTo(true),
                catchError(error => {
                    alert(error.error);
                    return of(false);
                }));
    }
    cacheRefresh() {
        this.doLogoutUser();
    }

    logout(): Observable<boolean> {
        console.log('inside logout');
        // this.doLogoutUser();

        return this.http.post(`${config.apiUrlAuth}/logout`, {
            'refreshToken': btoa(this.getRefreshToken())
        }, this.options).pipe(
            tap(() => this.doLogoutUser()),
            mapTo(true),
            catchError(error => {
                alert(error.error);
                return of(false);
            }));
    }
    //   @HostListener('window:unload', ['$event'])
    //   handleUnload(event) {
    //     this.logout();
    //   }
    registration(user: { username: string, email: string, password: string, firstname: String, lastname: String, role: String }) {

        return this.http.post<any>(`${config.apiUrlAuth}/login`, user, this.options)
            .pipe(map((response: Response) => {
                let token = Object.values(response);
                if (token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', token[0]);
                    this.loginStatus = true;
                }
            })
            );
    }
    isLoggedIn() {
        return !!this.getJwtToken();
    }

    refreshToken() {
        return this.http.post<any>(`${config.apiUrlAuth}/refresh`, {
            'refreshToken': btoa(this.getRefreshToken()),
            'username': btoa(this.loggedUserName),
        }).pipe(tap((tokens: Tokens) => {
            this.storeJwtToken(tokens.access_token);
        }));
    }

    getJwtToken() {
        return localStorage.getItem(this.JWT_TOKEN);
    }
    private doLoginUser(username: string, tokens: Tokens) {
        this.loggedUserName = username;
        this.loggedUser = this.getUserName(tokens.access_token);
        this.storeTokens(tokens);
    }

    private getUserName(jwt: string) {
        return this.getPayloadFromJWT(jwt).given_name;
    }

    private doLogoutUser() {
        this.loggedUser = null;
        this.loggedUserName = null;
        this.loginStatus = false;
        this.removeTokens();
    }

    private getRefreshToken() {
        return localStorage.getItem(this.REFRESH_TOKEN);
    }

    private storeJwtToken(jwt: string) {
        localStorage.setItem(this.JWT_TOKEN, jwt);
        this.loginStatus = true;
    }
private getRefreshExpiry(){
   const expiresAt =  localStorage.getItem(this.REFRESH_TOKEN_EXPIRY);
    if (expiresAt === undefined) return null;
        const refreshTokenExpiry = new Date(0);
        refreshTokenExpiry.setUTCSeconds(parseInt(expiresAt));
}
    private storeTokens(tokens: Tokens) {
        localStorage.setItem(this.JWT_TOKEN, tokens.access_token);
        localStorage.setItem(this.REFRESH_TOKEN, tokens.refresh_token);
        localStorage.setItem(this.REFRESH_TOKEN_EXPIRY, tokens.expired_at);
        this.loginStatus = true;
    }

    private removeTokens() {
        localStorage.removeItem(this.JWT_TOKEN);
        localStorage.removeItem(this.REFRESH_TOKEN);
        this.loginStatus = false;


    }
    getTokenExpirationDate(token: string): Date {
        const decodedValue = this.getPayloadFromJWT(token);
        if (decodedValue.exp === undefined) return null;
        const accessTokenExpiry = new Date(0);
        accessTokenExpiry.setUTCSeconds(decodedValue.exp);
        return accessTokenExpiry;
    }

    getPayloadFromJWT(jwt: string): any {
        const parts = jwt.split('.');
        if (parts.length !== 3) {
            throw new Error('JWT must have 3 parts');
        }
        return JSON.parse(atob(parts[1]));
    }

    isAccessTokenExpired(token?: string): boolean {
        const date = this.getTokenExpirationDate(token);
        if (date === undefined) return false;
        return !(date.valueOf() > new Date().valueOf());
    }
    isRefreshTokenExpired(token?: string): boolean {
        const date = this.getRefreshExpiry();
        if (date === undefined) return false;
        return !(date.valueOf() > new Date().valueOf());
    }

}
