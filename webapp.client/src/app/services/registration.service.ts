import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Industry } from '../models/industry';


@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }
   
  public getIndustries(): Observable<Industry[]> {
    return this.http.get<Industry[]>('/industries');
  }

  public register(data: any) {
    return this.http.post('/register', {
      companyName: data.companyName,
      industryId: data.selectedIndustryId,
      firstName: data.firstName,
      lastName: data.lastName,
      userName: data.userName,
      password: data.password,
      email: data.email
    }, {
      observe: 'response',
      responseType: 'text'
    })
      .pipe<boolean>(map((res: HttpResponse<string>) => {
        return res.ok;
      }));
  }
}
