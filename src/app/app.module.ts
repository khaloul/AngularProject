import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoviesModule } from './books/books.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthorsModule } from './authors/authors.module';
import { PublisherModule } from './publisher/publisher.module';
import { CategoriesModule } from './specialities/specialities.module';
import { AuthModule } from './auth/auth.module';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import { LandingService } from './landing.service';
import { HomeComponent } from './landing/home/home.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MoviesModule,
    AuthorsModule,
    PublisherModule,
    CategoriesModule,
    AuthModule,
    HttpClientModule,
    ShoppingCartModule

  ],
  providers: [LandingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
