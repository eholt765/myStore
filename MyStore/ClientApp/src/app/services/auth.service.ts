import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginDTO } from '../models/loginDTO.model';
import { RegisterDTO } from '../models/registerDTO.model';
import { Customer } from '../models/customer.model';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = 'https://localhost:7111/';
  loginUrl = this.apiUrl + 'api/customer/login';
  registerUrl = this.apiUrl + 'api/customer/register';
  updateUrl = this.apiUrl + 'api/customer/';



  constructor(private http: HttpClient) {


  }

  //use the models for information that is brought into the system

  login(data : LoginDTO) {
    return this.http.post<any>(this.loginUrl, data);
  }
    //return this.http.post(this.loginUrl, data);

  register(data: RegisterDTO) {
    return (this.http.post(this.registerUrl, data));
  }

  update(id:number, data: RegisterDTO){
    return this.http.put(`${this.updateUrl}${id}`, data);
  }

  delete(id:number){
    return this.http.delete(`${this.updateUrl}${id}`);
  }

  //return this.http.get<Product[]>(this.allProductsUrl);
}
