import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import { Ilogin, Iregister } from './interface';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  url = 'http://localhost:3000'
  constructor(private http: HttpClient) { }

  registerUser(data:Iregister): Observable<any>{
    return this.http.post<Iregister>(this.url + '/api-register', data)
    .pipe(
      catchError(this.handleError)
    )
  }

  getAllHealthUsers(): Observable<any>{
    return this.http.get<Iregister>(this.url + '/api-register')
    .pipe(
      catchError(this.handleError)
    )
  }

  loginUser(data:Ilogin): Observable<any>{
    return this.http.post<Ilogin>(this.url + '/api-login', data)
    .pipe(
      catchError(this.handleError)
    )
  }


  handleError(err:HttpErrorResponse){
    let message = '';


    if(err.error instanceof ErrorEvent){
      console.log(err, 'from an instance')
      message = `an error occured: ${err.error.message}`
    }
    else{
      console.log(err, 'from not an instance')
      message =  err.error
    }

    return throwError(message)


  }
}
