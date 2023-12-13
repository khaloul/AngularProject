import { Component, OnInit } from '@angular/core';
import { Categories } from '../specialities';
import { CategoriesService } from '../specialities.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  
    cate:Categories[]=[]
    constructor(public categs: CategoriesService,private router: Router , public authService:AuthService) { }
  ngOnInit(): void {
    this.categs.getAll().subscribe((data:Categories[])=>this.cate=data);
  }
  
  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  
    // Use filter to create a new array based on the filter criteria
    this.cate = this.cate.filter((pub: Categories) =>
      pub.nomcategorie.toLowerCase().includes(filterValue) 
    );
  }
  deletePublisher(_id:object){
    this.categs.delete(_id).subscribe(() => {
    this.cate = this.cate.filter(item => item._id !== _id);
    console.log('Post deleted successfully!');
    })
    }
    navigateToBooks() {
      this.router.navigate(['/books/index']);
    }
      navigateToSpec() {
        this.router.navigate(['/spec/index']);
        }
        logout() {
          this.authService.doLogout();
          }
}
