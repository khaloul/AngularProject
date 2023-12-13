import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Categories } from '../specialities';
import { CategoriesService } from '../specialities.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  @Input() cateID: object;
  @ViewChild('myModal') myModal!: ElementRef;
  display = "none";

  cate =new Categories();
  
  constructor(

    private categ: CategoriesService) { }
  ngOnInit(): void {

    this.categ.find(this.cateID).subscribe(data => {
      this.cate = data;
    });

  }
  openModal() {
    this.display = "block";
 
  }
  closeModal() {
    this.display = "none";
    

  }

  updatecate = () => {

    this.categ.update(this.cate._id,this.cate).subscribe((data => {
      console.log(data)
      this.closeModal()
      window.location.reload();
    }))
  }
  

}
