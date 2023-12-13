import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Movie } from 'src/app/books/book';
import { MovieServiceService } from 'src/app/books/book-service.service';
@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  @Output() movieAdded = new EventEmitter();
  addMovieToCart(movie:any) {
  this.movieAdded.emit(movie);
  }
  
  movie: Movie[] = [];
  movieOrders: any[] = [];
  constructor(private movserv: MovieServiceService) { }
  ngOnInit() {
    this.loadMovie();
  }
  loadMovie() {
    this.movserv.getAll()
      .subscribe({
        next: (movie: any) => {
          this.movie = movie;
          this.movie.forEach(movi => {
            this.movieOrders.push({ movi: movi, quantity: 0 });
          })
        },
        error: (e) => {
          console.log(e);
        },
      });
  }
}
