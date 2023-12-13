import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Categories } from '../specialities';
import { CategoriesService } from '../specialities.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  @ViewChild('myModal') myModal!: ElementRef;
  
  
  cate =new Categories();
  showForm = false;
  display = "none";
  constructor(
   
    
    private categ: CategoriesService) { }
  ngOnInit(): void {
 
   

  }
  openModal() {
    this.display = "block";
    this.showForm = true;
  }
  closeModal() {
    this.display = "none";
    this.showForm = false;
    
  }
  

  
  ajoutcateg = () => {

    this.categ.create(this.cate).subscribe((data => {
      console.log(data)
      this.closeModal()
      window.location.reload();
    }))
  }
}
