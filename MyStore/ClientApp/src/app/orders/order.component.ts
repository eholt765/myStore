import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/customer.model';
import { UserOrder } from '../models/userorder.model';
import { OrderProduct } from '../models/order_product.model';
import { ProdInfo } from '../models/prodInfo.model';
import { DatashareService } from '../services/datashare.service';
import { OrdersService } from '../services/orders.service';
import { ProductsService } from '../services/products.service';
import { OrderInfo } from '../models/orderInfo.model';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  orderData: OrderProduct[] = [];
  products: OrderInfo[] = [];
  orders: UserOrder[] = [];


  id: number = 0;
  index : number = 0;
  len: number =0;

  p: OrderInfo = {product: {productId: 0,name: '',price: 0,info : '',category : '',picture : '', quantity: 0}, orderProduct:{orderProductId: 0, productId: 0, customerId: 0, orderId: 0, quantity: 0}, subTotal: 0}




  constructor(private datashare: DatashareService, private productService: ProductsService, private orderService: OrdersService) {

   }

  ngOnInit(){
    this.datashare.currentCustomerData.subscribe(data => {
      this.id = data.customerId;
    });
    this.getOrders();
    this.getOrderItems();
  }


  getCustomer(){
    this.datashare.getCustomerData().subscribe( data => {
      this.id = data.customerId;
    })
  }

  getOrders(){
    let userID = this.id;
    this.orderService.getOrders(userID).subscribe(data => {
      this.orders = data;
      this.len = data.length;
    });
  }

  getOrderItems(){
    let userID = this.id;
    this.orderService.getCustomersOrderItems(userID).subscribe(data => {
      this.orderData = data;
      data.forEach(obj => {
        this.getInfo(obj);
      })
    });

  }

  getInfo(obj:OrderProduct){
    let p : OrderInfo = {product: {productId: 0,name: '',price: 0,info : '',category : '',picture : '', quantity: 0}, orderProduct:{orderProductId: 0, productId: 0, customerId: 0, orderId: 0, quantity: 0}, subTotal: 0}
    if(obj.productId != 0){
      this.getProduct(obj.productId).subscribe(data =>{
        p.product = data;
        p.orderProduct = obj;
        p.subTotal = parseFloat((p.orderProduct.quantity * p.product.price).toFixed(2));
        this.products.push(p);
      })
    }
  }

  getProduct(id : number){
    return this.productService.getProd(id);
  }

}
