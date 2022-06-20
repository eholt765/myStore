import { Injectable } from '@angular/core';
import { Customer } from '../models/customer.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { CartProduct } from '../models/cart_product.model';
import { Id } from '../models/id.model';
import { Product } from '../models/product.model';



@Injectable({
  providedIn: 'root'
})
export class DatashareService {

  //MUST BE CLASSES NOT IMPORTS!!!

  private customerData = new BehaviorSubject<Customer>(new Customer)
  private logginData = new BehaviorSubject<boolean>(false)
  //private cartData: BehaviorSubject<Array<CartProduct>> = new BehaviorSubject([]);
  private cartData = new BehaviorSubject<CartProduct[]>([new CartProduct])
  private totalItems = new BehaviorSubject<number>(0);
  //private cartData = new BehaviorSubject<CartProduct[]>([])
  private products = new BehaviorSubject<Product[]>([new Product])
  //{productId: 0, name: '', price: 0, info : '', category : '', picture : '', quantity: 0}
  private search = new BehaviorSubject<string>('');


  count1 = 0;
  //count2 = 0;
  //item = {cartProductId: 0, productId: 0, customerId: 0, quantity: 0}

  currentCustomerData = this.customerData.asObservable();
  currentLogginData = this.logginData.asObservable();
  currentCartData = this.cartData.asObservable();
  currentTotalItems = this.totalItems.asObservable();
  currentProducts = this.products.asObservable();
  currentSearch = this.search.asObservable();

  constructor() { }

  ngOnInit() {
    this.getTotal();
  }

  setSearch(data){
    this.search.next(data);
  }

  getSearch(){
    return this.search;
  }

  setProducts(data){
    this.products.next(data);
  }

  getProducts(){
    return this.products;
  }

  setCustomerData(data) {
    this.customerData.next(data);
  }

  getCustomerData() {
    return this.customerData;
  }

  setLoginData(data) {
    this.logginData.next(data);
  }

  getLoginData() {
    return this.customerData;
  }

  setCartData(data) {
    this.cartData.next(data);
  }

  getCartData() {
    return this.cartData;
  }

  setTotalItems(data){
    this.totalItems.next(data);
  }

  getTotalItems(){
    return this.totalItems;
  }

  addCount(value: number){
    this.count1 += value;
    this.totalItems.next(this.count1)
  }

  decCount(value: number){
    this.count1 -= value;
    this.totalItems.next(this.count1)
  }

  async getTotal(){
    await this.currentCartData.subscribe(data => {
      let sum = 0;

      data.forEach((obj) => {
        sum += obj.quantity;
      });
      this.count1 = sum;
      this.setTotalItems(sum);
    });
  }

  //removeItem(item: CartProduct){
  //  this.item = item;

  //}
}

