import { Component, OnInit } from '@angular/core';
import { DatashareService } from '../services/datashare.service';
import { Customer } from '../models/customer.model';
import { CartProduct } from '../models/cart_product.model';
import { CartService } from '../services/cart.service';
import { Id } from '../models/id.model';
import { Subject} from 'rxjs';
import { ProductsService } from '../services/products.service';
import { Product } from '../models/product.model';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';




@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  public isLoggedinData: boolean = false;

  public totalItems : number = 0;

  products: Product[]= [];
  searchForm: FormGroup
  searchText = '';

  constructor(private datashare: DatashareService, private cartService: CartService, private ps: ProductsService, private router: Router, private fb: FormBuilder){
    this.getCount();
    //this.getProds();
    this.searchForm = this.fb.group({

      'SearchTerm': ['']

    })
  }

  ngOnInit() {
   this.isLoggedIn();
   this.getAllProducts();
  }

  getCount(){
    this.datashare.currentTotalItems.subscribe(data => {
      this.totalItems = data;
    });
  }

  async isLoggedIn(){
    await this.datashare.currentLogginData.subscribe(data => {
      this.isLoggedinData = data;
    });
  }

  search(){
    this.searchText = this.searchForm.value.SearchTerm;
    this.datashare.setSearch(this.searchForm.value.SearchTerm);
    this.router.navigate(['/products']);
  }

  getAllProducts(){
    this.datashare.getProducts().subscribe(
      response => {
        this.products = response;
        console.log(response);
      }
    );
  }



}
