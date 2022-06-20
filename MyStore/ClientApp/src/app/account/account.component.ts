import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CartProduct } from '../models/cart_product.model';
import { DatashareService } from '../services/datashare.service';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';
import { parse } from 'url';
import { Customer } from '../models/customer.model';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { ArgumentOutOfRangeError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  public customer:Customer = {customerId: 0,firstName: '',lastName : '',userName : '',email : ''};

  public hasItems = false;
  itemCount:number = 0;

  updateForm: FormGroup;


  constructor(private datashare: DatashareService, private fb: FormBuilder, private authService: AuthService, private cs: CartService, private router: Router, private productService: ProductsService) {
    this.updateForm = this.fb.group({
      'FirstName' : [''],
      'LastName' : [''],
      'UserName' : [''],
      'Email' : [''],
      'Password' :  ['']
    })


   }

  ngOnInit(){
    this.getCustomer();
    this.getCart();

  }

  getCustomer(){
    this.datashare.getCustomerData().subscribe( data => {
      this.customer = data;
    })
  }

  getCart(){
    this.datashare.currentCartData.subscribe( data => {
      if (data.length > 0){
        this.hasItems = true;
      }
    })

  }

  update(){
    this.authService.update(this.customer.customerId, this.updateForm.value).subscribe(
      data => {
        this.datashare.setCustomerData(data),
        console.log(data);
      }
    );
    this.router.navigate(['/home']);

  }

  logout(){
    this.cs.getCustomersCart(this.customer.customerId).subscribe(otherdata => {
      let sum = 0;

      otherdata.forEach((obj) => {
        sum += obj.quantity;
      })

      this.datashare.decCount(sum);

    })
    this.datashare.setCustomerData(this.customer = {customerId: 0,firstName: '',lastName : '',userName : '',email : ''});
    this.datashare.setLoginData(false);
    this.datashare.setCartData([]);


    this.router.navigate(['/home']);
  }

  viewOrders(){
    this.router.navigate(['/orders']);
  }

  goToCart(){
    this.router.navigate(['/checkout']);
  }






  deleteCustomer(){
    this.authService.delete(this.customer.customerId).subscribe(
      data => {
        console.log(data);
        this.datashare.setCustomerData(this.customer = {customerId: 0,firstName: '',lastName : '',userName : '',email : ''});
        this.datashare.setLoginData(false);
      }
    );
    this.router.navigate(['/home']);
  }


}
