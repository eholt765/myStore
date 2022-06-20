import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


// User-created component imports:
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { FooterMenuComponent } from './footer-menu/footer-menu.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './services/auth.service';
import { ProductsComponent } from './products/products.component';
import { ProductsService } from './services/products.service';
import { CartService } from './services/cart.service';
import { DatashareService } from './services/datashare.service';
import { CheckoutComponent } from './checkout/checkout.component';
import { AccountComponent } from './account/account.component';
import { OrderComponent } from './orders/order.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    FooterMenuComponent,
    LoginComponent,
    RegisterComponent,
    ProductsComponent,
    CheckoutComponent,
    AccountComponent,
    OrderComponent


  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'home', component: HomeComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'checkout', component: CheckoutComponent},
      { path: 'account', component: AccountComponent},
      { path: 'orders', component: OrderComponent}
    ]),
    BrowserAnimationsModule
  ],
  providers: [AuthService, ProductsService, CartService, LoginComponent, DatashareService, NavMenuComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
