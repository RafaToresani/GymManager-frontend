import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from 'rxjs';
import { AuthResponse } from '../../interfaces/response/AuthResponse';
import { LoginRequest } from '../../interfaces/request/LoginRequest';
import { environments } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUserLoginOn: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);
  currentUserData: BehaviorSubject<AuthResponse> = new BehaviorSubject<AuthResponse>({
    userId:0,
    email: '',
    token: '',
    role: ''
  });

  constructor(private http: HttpClient) {
    this.currentUserLoginOn = new BehaviorSubject<Boolean>(sessionStorage.getItem('token') != null);
    this.currentUserData = new BehaviorSubject<AuthResponse>({
      userId: sessionStorage.getItem('userId') ? parseInt(sessionStorage.getItem('userId')!) : 0,
      email: sessionStorage.getItem('email') || '',
      token: sessionStorage.getItem('token') || '',
      role: sessionStorage.getItem('role') || ''
    });
  }


  login(credentials:LoginRequest):Observable<AuthResponse>{
    return this.http.post<any>(`${environments.urlHost}auth/login`, credentials).pipe(
      tap((response:AuthResponse)=> {
        //Caso de éxito
        /* Guarda en el session storage los valores de retorno de auth response */
        sessionStorage.setItem("token", response.token);
        sessionStorage.setItem("email", response.email);
        sessionStorage.setItem("userId", response.userId.toString());
        sessionStorage.setItem("role", response.role);
        this.currentUserData.next(response);
        this.currentUserLoginOn.next(true);
      }),
      map((response)=> {
        //transformo el json response a AuthResponse.
        const auth : AuthResponse = {
          email: response.email,
          userId: response.userId,
          token: response.token,
          role: response.role
        }
        return auth;
      }),
      catchError((error:HttpErrorResponse)=> {
        this.logout();
        return throwError(()=> error);
      })
    );
  }
  logout() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("role");
    this.currentUserLoginOn.next(false);
  }

  get userData():Observable<AuthResponse>{
    return this.currentUserData.asObservable();
  }

  get userLoginOn(): Observable<Boolean>{
    return this.currentUserLoginOn.asObservable();
  }

}
