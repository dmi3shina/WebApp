import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Industry } from '../models/industry';

export interface User {
  companyName: string;
  industryId: number;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }
   
  public getIndustries(): Observable<Industry[]> {
    return this.http.get<Industry[]>('/industries');
  }

  public register(user: User) {
    return this.http.post('/register', user, {
      observe: 'response',
      responseType: 'text'
    })
      .pipe<boolean>(map((res: HttpResponse<string>) => {
        return res.ok;
      }));
  }
}
