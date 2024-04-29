import { GymRequest } from './../../interfaces/request/GymRequest';
import { environments } from './../../../environments/environments';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SuccessGymPageResponse, SuccessGymResponse} from '../../interfaces/response/GymResponse';
import { BehaviorSubject, Observable, catchError,  throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GymService {

  dashboardSubject = new BehaviorSubject<string>('mostrar');
  gymId= new BehaviorSubject<number>(0);

  constructor(private http:HttpClient) { 

  }


  /* ==================================== POST ==================================== */

  /* CREATE
  Crea un nuevo gimnasio.
  POST: api/v1/gyms 
  */
  create(gymRequest:GymRequest):Observable<SuccessGymResponse>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
      'Content-Type': 'application/json' // Indica que el cuerpo de la solicitud es JSON
    });

    return this.http.post<any>(`${environments.urlApi}/gyms`, gymRequest, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }

  /* ==================================== GET ==================================== */
  /* FIND ALL
  Busca y retorna la lista de todos los gimnasios
  GET: api/v1/gyms */
  findAll(page:number, size:number):Observable<SuccessGymPageResponse>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
    return this.http.get<any>(`${environments.urlApi}/gyms?page=${page}&size=${size}`, {headers}).pipe(
      catchError((error:HttpErrorResponse)=> {
        return throwError(()=> error);
      })
    )
  }

  /* FIND BY ID
  Busca y retorna un gimnasio específico por id
  GET: api/v1/gyms */
  findById(id:number):Observable<SuccessGymResponse>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
    return this.http.get<any>(`${environments.urlApi}/gyms/${id}`, {headers}).pipe(
      catchError((error:HttpErrorResponse)=> {
        return throwError(()=> error);
      })
    )
  }

  /* ==================================== PUT ==================================== */
  /* UPDATE BY ID
  Busca y actualiza el gimnasio en base al id
  PUT: api/v1/gyms/${id} */
  update(gymRequest:GymRequest, id:number):Observable<SuccessGymResponse>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
      'Content-Type': 'application/json' // Indica que el cuerpo de la solicitud es JSON
    });

    return this.http.put<any>(`${environments.urlApi}/gyms/${id}`, gymRequest, {headers}).pipe(
      catchError((error:HttpErrorResponse)=> {
        return throwError(()=> error);
      })
    )
  }

  /* ==================================== PATCH ==================================== */

  /* TOGGLE STATUS
  Busca y cambia el estado del gimnasio
  PATCH: api/v1/gyms/toggleStatus/{id} */
  toggleStatus(id: number): Observable<SuccessGymResponse> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
  
    return this.http.patch<any>(`${environments.urlApi}/gyms/toggleStatus/${id}`, {}, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }
  

  /* ==================================== DELETE ==================================== */
  /* DELETE
  Busca y elimina un gimnasio por id 
  DELETE: api/v1/gyms/{id}*/
  delete(id:number):Observable<SuccessGymResponse>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
  
    return this.http.delete<any>(`${environments.urlApi}/gyms/${id}`,{ headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }


  /* ==================================== BEHAVIORSUBJECT FUNCTIONS ==================================== */
  getDashboardSubject() {
    return this.dashboardSubject.asObservable();
  }

  updateDashboard(newValue: string) {
    this.dashboardSubject.next(newValue);
  }

  getGymIdSubject() {
    return this.gymId.asObservable();
  }

  updateGymId(newValue: number) {
    this.gymId.next(newValue);
  }
}
