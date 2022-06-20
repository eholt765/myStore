import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  apiUrl = 'https://localhost:7111/';
  allProductsUrl = this.apiUrl + 'api/product';
  itemUrl = this.allProductsUrl + '/';

  constructor(private http: HttpClient) { }

  getAllProds() {
    return this.http.get<Product[]>(this.allProductsUrl);
  }

  getProd(id: number){
    return this.http.get<Product>(`${this.itemUrl}${id}`);
  }

  updateProd(id: number, body: Product){
    return this.http.put<Product>(`${this.itemUrl}${id}`, body);
  }
}
