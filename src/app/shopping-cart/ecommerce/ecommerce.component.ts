import { Component, ViewChild } from '@angular/core';
import { CardsComponent } from '../cards/cards.component';
import { PanierComponent } from '../panier/panier.component';

@Component({
  selector: 'app-ecommerce',
  templateUrl: './ecommerce.component.html',
  styleUrls: ['./ecommerce.component.css']
})
export class EcommerceComponent {
  public collapsed = true;
  orderFinished = false;
  @ViewChild('movieC')
  movieC: CardsComponent;
  @ViewChild('shoppingCartC')
  shoppingCartC: PanierComponent;
  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }
  finishOrder(orderFinished: any) {
    this.orderFinished = orderFinished;
    if (this.orderFinished===false){
      this.movieAdded.map((p)=>{
      p.quantity=0;
      })
      this.movieAdded =[]
      }
  }
  reset() {
    this.orderFinished = false;
  }

  movieAdded: any[] = []
  addMovieToCart(movie: any) {
    let existe = false;
    this.movieAdded.map((p) => {
      if (p.movie._id === movie.movie._id) { existe = true }
    })
    if (existe === false) this.movieAdded.push(movie);
  }

}
