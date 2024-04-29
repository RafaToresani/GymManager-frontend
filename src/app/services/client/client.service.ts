import { ClientResponse, SuccessClientResponse } from './../../interfaces/response/ClientResponse';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { SuccessClientPageResponse } from '../../interfaces/response/ClientResponse';
import { environments } from '../../../environments/environments';
import { ClientRequest } from '../../interfaces/request/ClientRequest';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  
  dashboardSubject = new BehaviorSubject<string>('mostrar');
  clientId= new BehaviorSubject<number>(0);
  clienteByDni: BehaviorSubject<ClientResponse | null> = new BehaviorSubject<ClientResponse | null>(null);

  constructor(private http:HttpClient) { }


  /* ==================================== POST ==================================== */
  /* CREATE
  Crea y retorna un nuevo cliente
  POST: api/v1/clients */
  create(clientRequest:ClientRequest):Observable<SuccessClientResponse>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(`${environments.urlApi}/clients`, clientRequest, {headers}).pipe(
      catchError((error:HttpErrorResponse)=> {
        return throwError(()=> error);
      })
    )
  }

  /* ==================================== GET ==================================== */
  
  /* FIND ALL PAGE
  Busca y retorna la lista de todos los clientes
  GET: api/v1/clients?page=0&size=10 */

  findAllPage(page:number, size:number):Observable<SuccessClientPageResponse>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
    return this.http.get<any>(`${environments.urlApi}/clients?page=${page}&size=${size}`, {headers}).pipe(
      catchError((error:HttpErrorResponse)=> {
        return throwError(()=> error);
      })
    )
  }

  /* FIND BY ID
  Busca y retorna el cliente en base al id
  GET: api/v1/clients/id */
  findById(id: number):Observable<SuccessClientResponse> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
    return this.http.get<any>(`${environments.urlApi}/clients/${id}`, {headers}).pipe(
      catchError((error:HttpErrorResponse)=> {
        return throwError(()=> error);
      })
    )
  }

  /* FIND BY DNI
  Busca y retorna un cliente por dni
  GET: api/v1/clients/findByDni/dni */
  findByDni(dni: number):Observable<SuccessClientResponse> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
    return this.http.get<any>(`${environments.urlApi}/clients/findByDni/${dni}`, {headers}).pipe(
      catchError((error:HttpErrorResponse)=> {
        return throwError(()=> error);
      })
    )
  }

  /* ==================================== PUT ==================================== */
  /* UPDATE CLIENT
  Busca y actualiza el cliente en base al id
  PUT: api/v1/clients/id  */
  updateClient(clientRequest:ClientRequest, id:number):Observable<SuccessClientResponse>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    });
    return this.http.put<any>(`${environments.urlApi}/clients/${id}`, clientRequest, {headers}).pipe(
      catchError((error:HttpErrorResponse)=> {
        return throwError(()=> error);
      })
    )
  }

  /* ==================================== DELETE ==================================== */
  /* DELETE CLIENT
  Busca y elimina el cliente en base al id
  DELETE: api/v1/clients/id  */

  deleteById(id: number):Observable<SuccessClientResponse> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
    return this.http.delete<any>(`${environments.urlApi}/clients/${id}`, {headers}).pipe(
      catchError((error:HttpErrorResponse)=> {
        return throwError(()=> error);
      })
    )
  }

  /* ==================================== BEHAVIOR SUBJECT FUNCTIONS ==================================== */


  getDashboardSubject() {
    return this.dashboardSubject.asObservable();
  }

  updateDashboard(newValue: string) {
    this.dashboardSubject.next(newValue);
  }


  getClientIdSubject() {
    return this.clientId.asObservable();
  }

  updateClientId(newValue: number) {
    this.clientId.next(newValue);
  }

  getClientByDni(){
    return this.clienteByDni.asObservable();
  }

  updateClientByDni(client:ClientResponse){
    this.clienteByDni.next(client);
  }
}
