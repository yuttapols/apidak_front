import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, concat } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

const API_ENDPOINT = environment.API_ENDPOINT;
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'accept': '*/*' }) };
const httpOptionsText = { headers: new HttpHeaders({ 'Content-Type': 'text/plain; charset=utf-8' }) };

@Injectable({
  providedIn: 'root'
})
export class CallserviceService {

  constructor(
    private http: HttpClient
  ) { }

  authen(userName : any , password : any) : Observable<any> {
    return this.http.get(API_ENDPOINT.concat('/login/authen?userName=' + userName + '&password=' + password));
  }

  findByUserId(userId : any) : Observable<any> {
    return this.http.get(API_ENDPOINT.concat('/login/findByUserId?userId=' + userId));
  }

}





