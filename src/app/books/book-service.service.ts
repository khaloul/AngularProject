import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Movie } from './book';

@Injectable({
  providedIn: 'root'
})
export class MovieServiceService {

  private apiURL = "http://localhost:5000/api";
  httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json'
    })
    
    
    
    }
  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<any> {
    return this.httpClient.get(this.apiURL + '/livres/').pipe(
      catchError(this.errorHandler))
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
  
  create(movie: Movie): Observable<any> {

    return this.httpClient.post(this.apiURL + '/livres/', movie)
  }
  find(_id:object): Observable<any> {

    return this.httpClient.get(this.apiURL + '/livres/' + _id)
    }
    
    update(_id:object, movie:Movie): Observable<any> {
    
    return this.httpClient.put(this.apiURL + '/livres/' + _id, movie)
    }
    
    delete(_id:object){
    return this.httpClient.delete(this.apiURL + '/livres/' + _id)
    }
    uploadSignature(vals: any): Observable<any>{
      let data = vals;
      
      return this.httpClient.post('https://api.cloudinary.com/v1_1/dvefpcsve/upload',data)
  }
}
