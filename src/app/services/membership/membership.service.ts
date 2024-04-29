import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SuccessMembershipResponse } from '../../interfaces/response/MembershipResponse';
import { Observable, catchError, throwError } from 'rxjs';
import { MembershipRequest } from '../../interfaces/request/MembershipRequest';
import { environments } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {

  constructor(private http:HttpClient) { }

  /* ==================================== POST ==================================== */
  /* CREATE
  Crea y retorna un nuevo cliente
  POST: api/v1/clients */
  create(membershipRequest:MembershipRequest):Observable<SuccessMembershipResponse>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(`${environments.urlApi}/memberships`, membershipRequest, {headers}).pipe(
      catchError((error:HttpErrorResponse)=> {
        return throwError(()=> error);
      })
    )
  }


}
