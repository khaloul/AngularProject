import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Categories } from './specialities';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private apiURL = 'http://localhost:5000/api'
  httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json'
    })
    
    
    
    }
    constructor(private httpClient: HttpClient) { }
    
    getAll(): Observable<any> {
    
    return this.httpClient.get(this.apiURL + '/specialites/ ')
    .pipe(
    catchError(this.errorHandler)
    )
    }
    errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
    errorMessage = error.error.message;
    } else {
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
    
    }
    create(cate: Categories): Observable<any> {

      return this.httpClient.post(this.apiURL + '/specialites/', cate)
    }
    
    
    
    find(_id:object): Observable<any> {
    
      return this.httpClient.get(this.apiURL + '/specialites/' + _id)
      }
      
      update(_id:object, cate:Categories): Observable<any> {
      
      return this.httpClient.put(this.apiURL + '/specialites/' + _id, cate)
      }
      
      delete(_id:object){
      return this.httpClient.delete(this.apiURL + '/specialites/' + _id)
      }
    
}
