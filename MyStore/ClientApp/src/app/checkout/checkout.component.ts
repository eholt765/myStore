import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CartProduct } from '../models/cart_product.model';
import { DatashareService } from '../services/datashare.service';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';
import { parse } from 'url';
import { CartService } from '../services/cart.service';
import { ProdInfo } from '../models/prodInfo.model';
import { OrdersService } from '../services/orders.service';
import { Customer } from '../models/customer.model';
import { OrderProduct } from '../models/order_product.model';
import { OrderProductDTO } from '../models/order_productDTO.model';
import { UserOrderDTO } from '../models/userorderDTO.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cartData: CartProduct[] = [];
  orderData: OrderProductDTO[]= [];

  products: ProdInfo[] = [];
  public totalItems : number = 0;
  public totalCost: number = 0;
  deleteID : number = 0;
  index : number = 0;

  cardNumber:string;
  pInfo: any [] = []
  p: ProdInfo = {product: {productId: 0,name: '',price: 0,info : '',category : '',picture : '', quantity: 0}, cartProduct:{cartProductId: 0, productId: 0, customerId: 0, quantity: 0}, subTotal: 0.00}

  public id: number;
  public inputCost: string;
  public inputItemCount: string;
  public last4: string;
  public orderId: number;

  checkOutForm: FormGroup;

  constructor(private router: Router, private datashare: DatashareService, private productService: ProductsService, private cs: CartService, private orderService: OrdersService, private fb: FormBuilder) {
    this.getCount();


    this.getCart();




    this.checkOutForm = this.fb.group({

      //required for DB submission
      'CustomerId': this.id,

      'Name' : [''],

      'Street': [''],

      'City': [''],

      'State': [''],

      'Zip': [''],

      'Count': this.inputItemCount,

      'Cost': this.inputCost,


      //IN HTML send card data through
      'FourCard': this.last4,

      //TODO require all other fields but wont be sent to DB


    })

    //

   }

  ngOnInit(){
    this.datashare.currentCustomerData.subscribe(data => {
      this.id = data.customerId;
    });
    this.getInfo();
    this.inputItemCount = this.totalItems.toString();

  }


  async checkout(){

    this.addOrder();
    //this.addOrderItems();

  }

  getLast4(str: string){
   let n = 4;
   this.last4 = (str.substring(str.length - n));
    console.log("last 4 are ["+ this.last4+"]");
  }




  addOrder(){
    console.log(this.inputCost);
    console.log(this.totalCost.toString());
    let orderDTO: UserOrderDTO = {customerId: this.id, name: this.checkOutForm.value.Name, street:this.checkOutForm.value.Street, city:this.checkOutForm.value.City, state: this.checkOutForm.value.State, zip:this.checkOutForm.value.Zip, fourCard:this.last4, cost:this.totalCost.toString(), itemCount:this.inputItemCount}

    this.orderService.addOrder(orderDTO).subscribe(data=>{
      this.orderId = data.orderId
      console.log(data);
      this.addOrderItems(this.orderId);
    });
  }


  addOrderItems(orderId: number){

    for(let i = 0; i<this.cartData.length; i++){
      //let op = new OrderProductDTO();
     // op.OrderId = this.orderId;
     // op.ProductId = this.cartData[i].productId;
     // op.Quantity = this.cartData[i].quantity;
      let op: OrderProductDTO = {OrderId: orderId, CustomerId: this.id, ProductId: this.cartData[i].productId, Quantity: this.cartData[i].quantity}
      this.orderService.addToOrder(op).subscribe(data =>{
        console.log(data);
      })
    }

  }


  getCustomer(){
    this.datashare.getCustomerData().subscribe( data => {
      this.id = data.customerId;
    })
  }

  getInfo(){

    //this.products = [];
    this.totalCost = 0;
    for(let i = 0; i<this.cartData.length; i++){
      //let total = 0;
      //let idNumb = this.cartData[i].productId
      let p = {product: {productId: 0,name: '',price: 0,info : '',category : '',picture : '', quantity: 0}, cartProduct:{cartProductId: 0, productId: 0, customerId: 0, quantity: 0}, subTotal: 0.00}
      if(this.cartData[i].productId != 0){
          this.getProduct(this.cartData[i].productId).subscribe(data =>{
            console.log(data);
            p.product = data;
            p.cartProduct = this.cartData[i];
          //p.quantityCart = this.cartData[i].quantity;
            p.subTotal = parseFloat((p.cartProduct.quantity * p.product.price).toFixed(2));
            this.totalCost += p.subTotal;
            this.products.push(p);
        });
      }
    }
    this.totalCost = parseFloat(this.totalCost.toFixed(2));
    this.inputCost = this.totalCost.toString();
    console.log(this.products);
  }


  getProduct(id : number){
    return this.productService.getProd(id);
  }



  getCount(){
    this.datashare.currentTotalItems.subscribe(data => {
      this.totalItems = data;
    });
  }

  getCart(){
    this.datashare.currentCartData.subscribe( data => {
      this.cartData = data;
      console.log(data)
    })
  }







  removeItem(){
    let obj2:ProdInfo = this.products[this.index]
    const index = this.products.indexOf(obj2);
    if (index !== -1) {
      this.products.splice(index, 1);
    }
  }

  deleteProd() {

    let id = this.products[this.index].cartProduct.cartProductId;
    this.totalCost -= this.products[this.index].subTotal;
    //this.totalItems -= this.productService[this.index].cartProduct.quantity
    let q = this.products[this.index].cartProduct.quantity;
    this.datashare.decCount(q);
    this.totalCost = parseFloat(this.totalCost.toFixed(2));
    this.inputCost = this.totalCost.toString();
    this.cs.deleteCustomersCart(id).subscribe(
     data=> {
       //console.log("deleted");
    });

    this.removeItem();

  }

  setIndex(i: number){
    this.index = i;
  }

  updateData(){
    let p2 = this.products[this.index].product;
    p2.quantity = p2.quantity + this.cartData[this.index].quantity;
    console.log(p2)
    this.productService.updateProd(p2.productId, p2).subscribe(

    );
  }


  checkoutCart(){
    for(let i = 0; i<this.cartData.length; i++){
      let id = this.cartData[i].cartProductId;
      this.cs.deleteCustomersCart(id).subscribe(
        data=> {
        //console.log("deleted");
      });
    }
    this.datashare.decCount(this.totalItems)
    //this.products= [];
    //this.cartData = [];
    //this.orderData = [];
    //this.pInfo = [];
    //this.totalItems = 0;
    this.router.navigate(['/home']);
  }






}
