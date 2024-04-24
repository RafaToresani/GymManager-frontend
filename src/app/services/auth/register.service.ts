import { AuthResponse } from './../../interfaces/response/AuthResponse';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { RegisterRequest } from '../../interfaces/request/RegisterRequest';
import { environments } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient) { }

  register(registerRequest:RegisterRequest):Observable<AuthResponse>{
    return this.http.post<any>(`${environments.urlHost}auth/register`, registerRequest).pipe(
      tap((AuthResponse)=> {
        return AuthResponse;
      }),
      catchError((error:HttpErrorResponse) => {
        return throwError(()=>error);
      })
    )
  }
}
