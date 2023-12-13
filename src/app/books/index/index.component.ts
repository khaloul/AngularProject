import { Component, OnInit } from '@angular/core';
import { Movie } from '../book';
import { MovieServiceService } from '../book-service.service';
import { data } from 'autoprefixer';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  Mov:Movie[]=[]
  constructor(public MovieServiceService: MovieServiceService,private router: Router,public authService:AuthService) { }
ngOnInit(): void {
  this.MovieServiceService.getAll().subscribe((data:Movie[])=>this.Mov=data);
  console.log('post added');

}

filter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();

  // Use filter to create a new array based on the filter criteria
  this.Mov = this.Mov.filter((Mov: Movie) =>
  Mov.titre.toLowerCase().includes(filterValue) 
  );
}
navigateToBooks() {
  this.router.navigate(['/books/index']);
}
navigateToSpec() {
  this.router.navigate(['/spec/index']);
}
deleteMovie(_id:object){
  this.MovieServiceService.delete(_id).subscribe(res => {
  this.Mov = this.Mov.filter(item => item._id !== _id);
  console.log('Post deleted successfully!');
  })
  }
  logout() {
    this.authService.doLogout();
    }
 
}
