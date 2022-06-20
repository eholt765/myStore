import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { Customer } from '../models/customer.model';
import {  Input, Output, EventEmitter } from '@angular/core';
import { DatashareService } from '../services/datashare.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private cartService: CartService, private datashare: DatashareService){
    this.loginForm = this.fb.group({
      'Email_or_Username' : new FormControl(null, [Validators.required]),
      'Password' :  [null, [Validators.required]]
    })
  }

  ngOnInit() {
  }


  login() {
    this.authService.login(this.loginForm.value).subscribe(data => {
      this.datashare.setCustomerData(data),
      this.datashare.setLoginData(true);

      if(data.customerId != 0){
      this.cartService.getCustomersCart(data.customerId).subscribe(otherdata => {
        this.datashare.setCartData(otherdata);
        let sum = 0;

        otherdata.forEach((obj) => {
          sum += obj.quantity;
        })

        this.datashare.addCount(sum);
      })
    }
      this.router.navigate(['/home']);
    });

  }


}
