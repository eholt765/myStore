import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartProduct } from '../models/cart_product.model';
import { CartProductDTO } from '../models/cart_productDTO.model';
import { DatashareService } from '../services/datashare.service';
import { Customer } from '../models/customer.model';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  apiUrl = `https://localhost:7111/`;
  itemsListUrl = this.apiUrl + `api/cartproduct/`;
  addListUrl = this.apiUrl + 'api/cartproduct/addtocart';
  updateUrl = this.apiUrl + 'api/cartproduct/updatecart';

  //api/customer/register
  //public myId : number = 1;
  //public cartData: Array<CartProduct> = new Array<CartProduct>();



  constructor(private http: HttpClient, private datashare: DatashareService) {

  }

  ngOnInit() {

  }

  getCustomersCart(id: number){

    return this.http.get<Array<CartProduct>>(`${this.itemsListUrl}${id}`);

  }


  addToCart(data: CartProductDTO) {
    return this.http.post(this.addListUrl, data);
  }

  updateCart(data: CartProductDTO) {
    return this.http.post(this.updateUrl, data);
  }

  //updateCartProd(id: number, body: CartProduct){
  //  return this.http.put<CartProduct>(`${this.updateUrl}${id}`, body);
  //}

  deleteCustomersCart(id: number){
    return this.http.delete(`${this.itemsListUrl}${id}`);
  }


}
