import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Movie } from '../book';
import { MovieServiceService } from '../book-service.service';
import { Categories } from 'src/app/specialities/specialities';
import { Publisher } from 'src/app/publisher/publisher';
import { CategoriesService } from 'src/app/specialities/specialities.service';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  @Input() MovieID: object;
  @ViewChild('myModal') myModal!: ElementRef;
  display = "none";
  movie: Movie = new Movie()
  Categories!: Categories[];
  publisher: Publisher[];
  showForm = false;
  constructor(
    private Movieserv: MovieServiceService,
    private categserv: CategoriesService,
) {}
  ngOnInit(){
  this.Movieserv.find(this.MovieID).subscribe(data => {
  this.movie = data;
  this.loadcateg()
  });
}
  loadcateg() {
    return this.categserv.getAll().subscribe(data =>
      this.Categories = data),
      (error: any) => console.log(error)
  }
  openModal() {
  this.display = "block";
  }
  closeModal() {
  this.display = "none";
  }
}
  

