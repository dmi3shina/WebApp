import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }

  public register(data: any) {
    return this.http.post('/register', {
      firstName: data.firstName,
      lastName: data.lastName,
      companyName: data.companyName,
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
