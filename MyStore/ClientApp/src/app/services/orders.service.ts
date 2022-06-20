import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserOrder } from '../models/userorder.model';
import { OrderProductDTO } from '../models/order_productDTO.model';
import { UserOrderDTO } from '../models/userorderDTO.model';
import { OrderProduct } from '../models/order_product.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {


  //URLs for Orders
  apiUrl = 'https://localhost:7111/';
  userOrdersUrl = this.apiUrl + 'api/userorder/';
  submitOrderUrl = this.apiUrl + 'api/userorder/submitOrder';



  //URLs for OrderProducts
  orderItemsListUrl = this.apiUrl + `api/orderproduct/`;
  addListUrl = this.apiUrl + 'api/orderproduct/addtoorder';

  constructor(private http: HttpClient) { }


  //Order calls
  getOrders(id: number) {
    return this.http.get<UserOrder[]>(`${this.userOrdersUrl}${id}`);
  }

  addOrder(data: UserOrderDTO) {
    return this.http.post<any>(this.submitOrderUrl, data);
  }





  //Order Item calls
  getCustomersOrderItems(id: number){

    return this.http.get<Array<OrderProduct>>(`${this.orderItemsListUrl}${id}`);

  }


  addToOrder(data: OrderProductDTO) {
    return this.http.post(this.addListUrl, data);
  }

}
