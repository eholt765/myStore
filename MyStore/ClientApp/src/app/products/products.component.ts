import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CartService } from '../services/cart.service';
import { DatashareService } from '../services/datashare.service';
import { NavMenuComponent } from '../nav-menu/nav-menu.component';
import { CartProduct } from '../models/cart_product.model';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[]= [];
  userCart: CartProduct[]= [];
  addForm: FormGroup;
  public id: number;
  public index: number;
  public numbOfProds: number = 0;
  public search = '';

//, private cpDTO: CartProductDTO
  constructor(private productService: ProductsService, private fb: FormBuilder, private cartSerive: CartService, private datashare: DatashareService, private nmc : NavMenuComponent) {
    this.addForm = this.fb.group({

      'CustomerId': this.id,

      'ProductId' : this.index,

      'Quantity': [''],

    })
    this.getUserCart();
    console.log(this.userCart,"cart products");
  }

  ngOnInit(){
    this.getAllProducts();
    this.datashare.currentCustomerData.subscribe(data => {
      this.id = data.customerId;
    });

    this.datashare.currentSearch.subscribe(data =>{
      this.search = data;
      console.log("You searched",data);
      this.Search(data);
    })



  }

  Search(searchText: string){

    if(searchText!== ""){

      let searchValue = searchText.toLowerCase();

      this.products = this.products.filter((prod:any) =>{
        return prod.name.toLowerCase().match(searchValue);

      });

      this.numbOfProds = this.products.length;
      console.log("returned # of products",this.numbOfProds)
      //console.log(this.products);
    }
    else{
      return this.getAllProducts();
    }
  }

  getAllProducts(){
    this.productService.getAllProds().subscribe(
      response => {
        this.products = response;
        this.numbOfProds = this.products.length;
    console.log("returned # of products",this.numbOfProds)
        this.datashare.setProducts(response);
        console.log(response);
      }
    );
  }


  getCustomerId(){
      let x = 0;
      this.datashare.currentCustomerData.subscribe(data => {
        x = data.customerId;
      });
      return x;
  }

  getUserCart(){
    this.datashare.currentCartData.subscribe(data=>{
      this.userCart = data;
    })
  }

  async addOrUpdate(){
    let addedToCart = false;
    //this.getUserCart();
    this.userCart.forEach(obj =>{

      if(obj.productId == this.addForm.value.ProductId){
        addedToCart = true;
        this.addForm.value.Quantity += obj.quantity;
        this.updateProduct();
        this.addForm.value.Quantity -= obj.quantity;
      }
    })



    if(addedToCart == false){
      this.addProduct();
     //console.log("added normal");
    }
    console.log(this.userCart,"cart products");
  }


  async updateProduct(){
    this.addForm.value.CustomerId = this.id;

    await this.cartSerive.updateCart(this.addForm.value).subscribe();

    this.refreshCart();

  }

  async refreshCart(){
     await this.cartSerive.getCustomersCart(this.addForm.value.CustomerId).subscribe(data => {
      //console.log(data);
      this.datashare.setCartData(data);
      this.userCart = data;
    });
  }


  async addProduct(){

    this.addForm.value.CustomerId = this.id;

    await this.cartSerive.addToCart(this.addForm.value).subscribe();

    this.refreshCart();
  }



  incValue() {
    this.datashare.addCount(this.addForm.value.Quantity);
  }

  decValue(q:number){
    this.datashare.decCount(q);
  }


  updateData(){
    let p: Product = this.products[this.index];
    p.quantity = p.quantity - this.addForm.value.Quantity;
    //console.log(p)
    this.products[this.index] = p;
    this.productService.updateProd(this.products[this.index].productId, p).subscribe(
    );
  }

  public setProdID(p:Product){
    this.addForm.value.ProductId = p.productId;
  }

  public setIndex(i:number){
    this.index = i;

  }





}

